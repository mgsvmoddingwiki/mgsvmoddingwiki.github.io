# Script reads text files from specified path(s) then generates new Javascript arrays for the search index

# ---------
# Functions
# ---------

function Get-MetadataBlock {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory, ValueFromPipeline)]
        [string]$InputContent,

        [Parameter()]
        [bool]$IsVirtualPage = $false
    )
    process {
        # Regex capturing everything between the first two lines that contain the metadata block characters
        $pattern = '(?sm)^---\s*(.*?)\s*^---'
        if ($IsVirtualPage) {
            $pattern = '(?sm)^<!--\s*(.*?)\s*^-->'
        }

        if ($InputContent -match $pattern) {
            Write-Output $matches[1]
        } else {
            Write-Warning "No metadata block found"
        }
    }
}

function Get-ContentAfterMetadata {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory, ValueFromPipeline)]
        [string]$InputContent,

        [Parameter()]
        [bool]$IsVirtualPage = $false
    )
    process {
        # Regex to match up until the metadata block end and capture everything following
        $pattern = '(?sm)^---\s*(.*?)\s*^---\s*(?<after>.*)$'
        if ($IsVirtualPage) {
            $pattern = '(?sm)^<!--\s*(.*?)\s*^-->\s*(?<after>.*)$'
        }
        if ($InputContent -match $pattern) {
            Write-Output $matches['after']
        } else {
            Write-Warning "Metadata block not found; cannot extract content after metadata"
        }
    }
}

function Parse-Metadata {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$MetaBlock
    )

    $metadata = @{}
    $lines = $MetaBlock -split "`n"
    # Tag names of YAML arrays to handle
    $arrayTagNames = [System.Collections.ArrayList]@(
        "tags"
    )

    for ($i = 0; $i -lt $lines.Count; $i++) {
        $line = $lines[$i].Trim()
        if (![string]::IsNullOrWhiteSpace($line)) {
            if ($line -match '^(?<key>\w+):\s*(?<value>.*)$') {
                $key = $matches['key']
                $value = $matches['value']

                if ($arrayTagNames.Contains($key)) {
                    $array = [System.Collections.ArrayList]@()
                    # If single line syntax
                    if ($value -match '\[.*\]') {
                        $trimmed = $value.Trim('[',']')
                        if (![string]::IsNullOrEmpty($trimmed)) {
                            $array += @($trimmed -split ',' | ForEach-Object { $_.Trim() })
                        }
                        $metadata[$key] = $array
                    # If multi-line syntax
                    } elseif ($value -eq '' -or $value -notmatch '\S') {
                        # Look ahead for lines beginning with `-`
                        while (($i + 1) -lt $lines.Count) {
                            $next = $lines[$i+1]
                            if ($next.Trim() -match '^-') {
                                $array += $next.Trim() -replace '^- ',''
                                $i++ # increment outer loop index so after while loop ends the outer loop skips already parsed value lines
                            } else {
                                break
                            }
                        }
                        $metadata[$key] = $array
                    } else {
                        $metadata[$key] = $value
                    }
                } else {
                    $metadata[$key] = $value
                }
            }
        }
    }
    return $metadata
}

function Generate-Index {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [object[]]$PathDirs,

        [Parameter()]
        [object[]]$PathExtraFiles,

        [Parameter()]
        [bool]$IsVirtualPage = $false
    )

    $files = [System.Collections.ArrayList]@()
    $items = [System.Collections.ArrayList]@()
    $fileExt = '.md'
    if ($IsVirtualPage) {
        $fileExt = '.txt'
    }

    ForEach($path in $rootDirs) {
        $list = (Get-ChildItem -Path $path -Recurse -Include *$fileExt).FullName
        $files.AddRange($list) # concatenate
    }

    if ($PathExtraFiles) {
        ForEach($path in $PathExtraFiles) {
            $files.Add($path) | Out-Null
        }
    }

    ForEach($file in $files) {
        if ($file) {
            $fileContent = Get-Content $file -Raw
            $metadataBlock = $fileContent | Get-MetadataBlock -IsVirtualPage $IsVirtualPage

            if ($metadataBlock) {
                $metadata = Parse-Metadata -MetaBlock $metadataBlock

                # Capture everything following the metadata and remove some unnecessary sub-strings
                $body = ($fileContent | Get-ContentAfterMetadata -IsVirtualPage $IsVirtualPage) -replace '`n',' ' -replace '`r',' ' -replace '\s+',' ' -replace '``',''

                $filePath = $file | Select-String -Pattern '(wiki/.*)' -AllMatches | % { $_.Matches.groups[1] } | % { '/' + $_.Value }

                $item = [PSCustomObject]@{}
                ForEach ($entry in $metadata.GetEnumerator()) {
                    $name = $entry.Key
                    $value = $entry.Value

                    if ($name -eq "title") {
                        if ([string]::IsNullOrWhiteSpace($value)) {
                            $string = Split-Path $file -Leaf # fallback to filename if only contains whitespace
                        } else {
                            # Capture everything between single quotes (if present in title), after any prefixed exclamation marks (character escaping) and ignore leading/trailing whitespace
                            $string = $value | Select-String -Pattern "^[!'\s]*(.*?)['\s]*$" -AllMatches | % { $_.Matches.groups[1] } | % { $_.Value }
                        }
                        $item | Add-Member -Name "title" -Value $string -Type NoteProperty
                    }

                    if ($name -eq "permalink") {
                        $string = $value.Trim()
                        # Force trailing forwardslash if lacking it for lookup consistency
                        if (!$string.EndsWith('/')) {
                            $string = $string + '/'
                        }
                        $item | Add-Member -Name "url" -Value $string -Type NoteProperty
                    }

                    if ($name -eq "tags") {
                        $item | Add-Member -Name "tags" -Value $value -Type NoteProperty
                    }
                }

                # Add fallback values for missing keys
                if (!$item.PSObject.Properties['tags']) {
                    $item | Add-Member -Name "tags" -Value @() -Type NoteProperty
                }

                if (!$item.PSObject.Properties['url']) {
                    # Add URL for home page if not present
                    if ($file -eq 'README.md') {
                        $item | Add-Member -Name "url" -Value '/' -Type NoteProperty
                    }
                }

                # Add remaining keys
                $item | Add-Member -Name "content" -value $body -Type NoteProperty
                if ($IsVirtualPage) {
                    $item | Add-Member -Name "filePath" -value $filePath -Type NoteProperty
                    $item | Add-Member -Name "virtualPage" -value $true -Type NoteProperty
                }

                $items.Add($item) | Out-Null
            }
        }
    }

    return $items
}

# -------------------
# Generate main index
# -------------------

$rootDirs = [System.Collections.ArrayList]@(
    "wiki/"
)

$extraFiles = [System.Collections.ArrayList]@(
    "README.md" # home page
)

# Output to final rendered site directory
# Note: requires full output directory structure exists prior to script running, hence why the Jekyll hook from `run-index-build.rb` plugin, that calls this script, is set to run after the rest of the site has been generated.
$indexFile = "assets/js/mainindex.js"

$items = Generate-Index -PathDirs $rootDirs -PathExtraFiles $extraFiles

$json = $items | ConvertTo-Json
"export const mainIndex = {0}" -f $json | Set-Content -Path $indexFile

# ----------------------
# Generate virtual index
# ----------------------

$rootDirs = [System.Collections.ArrayList]@(
    # Additional array items don't require comma delimiters
    "wiki/Entity_Reference/"
)

$indexFile = "assets/js/virtualindex.js"

$items = Generate-Index -PathDirs $rootDirs -IsVirtualPage $true

$json = $items | ConvertTo-Json
"export const virtualIndex = {0}" -f $json | Set-Content -Path $indexFile