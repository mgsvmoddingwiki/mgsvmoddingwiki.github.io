# Check git history for most recent commits containing page changes and output to JSON (for use in recent changes widget)

. "$PSScriptRoot/shared-config.ps1"

# ------
# Config
# ------

$outputFile = "_site/assets/js/recentcommits.json"
$maxDates = 15

# -------------
# Parse history
# -------------

function Get-LinkTitlePair {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$CommitChecksum,

        [Parameter(Mandatory)]
        [string]$FilePath,

        [Parameter()]
        [bool]$IsVirtualPage = $false
    )
    process {
        $combo = @{}
        $repolinkbase = "https://github.com/mgsvmoddingwiki/mgsvmoddingwiki.github.io/blob" # will only be valid for matching commits to this repo obviously
        $combo['checksum'] = ${CommitChecksum}
        $combo['repolink'] = "${repolinkbase}/${CommitChecksum}/${FilePath}"

        # Special handling for readme which lacks a permalink
        if ($FilePath -eq "README.md") {
            $combo['title'] = "Home"
            $combo['permalink'] = "/"
            return $combo
        }

        # Instead of getting the content from the current repo grab the original file's content from that commit, since then any subsequently renamed files may share the same permalink and it also means if any redirects or 404s are present currently for that permalink the site will naturally handle them.
        $fileContent = git show "${CommitChecksum}:${FilePath}" 2>&1 | Out-String

        if ($fileContent) {
            $metadataBlock = $fileContent | Get-MetadataBlock -IsVirtualPage $IsVirtualPage

            if ($metadataBlock) {
                $metadata = Parse-Metadata -MetaBlock $metadataBlock

                ForEach ($entry in $metadata.GetEnumerator()) {
                    $name = $entry.Key
                    $value = $entry.Value

                    if ($name -eq "title") {
                        $combo['title'] = Parse-Title -Title $value -FallbackPath $FilePath
                    }

                    if ($name -eq "permalink") {
                        $combo['permalink'] = Parse-Permalink -Permalink $value
                    }

                }
            }
        }
        return $combo
    }
}

$commits = @(git log --format="%H|%ai" --all) # get all commits, with checksum and ISO 8601 date
$result = @{}
$uniqueDates = [System.Collections.ArrayList]@()

ForEach ($line in $commits) {
    if ($uniqueDates.Count -ge $maxDates) { break }

    $parts = $line -split '\|'
    $commitChecksum = $parts[0]
    $commitDate = $parts[1].Substring(0, 10) # extract date

    $filesChanged = @(git diff-tree --no-commit-id --name-only -r --diff-filter=AM $commitChecksum) # AM = added/modified files only

    ForEach ($file in $filesChanged) {
        $dirMatch = $regularPageDirs | Where-Object { $file.StartsWith("$_") }
        $isMd = ($file -in $regularPageFiles) -or ($dirMatch -and $file.ToLower().EndsWith('.md'))
        $isTxt = ($virtualPageDirs | Where-Object { $file.StartsWith("$_") }) -and $file.ToLower().EndsWith('.txt')

        if ($isMd -or $isTxt) {
            if (!$result.ContainsKey($commitDate)) {
                $pair = Get-LinkTitlePair -CommitChecksum $commitChecksum -FilePath $file -IsVirtualPage $isTxt
                $result[$commitDate] = @($pair)
                $uniqueDates.Add($commitDate) | Out-Null
            } else {
                $pair = Get-LinkTitlePair -CommitChecksum $commitChecksum -FilePath $file -IsVirtualPage $isTxt
                $result[$commitDate] += $pair
            }
        }
    }
}

# Sort keys in descending order and dedupe permalinks for each date (preserving commit order)
$sorted = $result.GetEnumerator() | Sort-Object -Property Name -Descending
$result = [ordered]@{}
ForEach ($item in $sorted) {
    $uniqueFiles = [ordered]@{}
    ForEach ($obj in $item.Value) {
        if ($obj -and $obj.permalink) {
            $uniqueFiles[$obj.permalink] = $obj
        }
    }
    $result[$item.Key] = @($uniqueFiles.Values)
}

# -------------
# Generate JSON
# -------------

$result | ConvertTo-Json | Set-Content -Path $outputFile