# Script reads text files from specified path(s) then generates new Javascript arrays for the search index

. "$PSScriptRoot/shared-config.ps1"

# ---------
# Functions
# ---------

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
    process {
        $files = [System.Collections.ArrayList]@()
        $items = [System.Collections.ArrayList]@()
        $fileExt = '.md'
        if ($IsVirtualPage) {
            $fileExt = '.txt'
        }

        ForEach($path in $PathDirs) {
            $list = Get-ChildItem -Path $path -Recurse -File |
                Where-Object { $_.Extension.ToLower() -eq $fileExt.ToLower() } |
                Select-Object -ExpandProperty FullName
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
                            $string = Parse-Title -Title $value -FallbackPath $file
                            $item | Add-Member -Name "title" -Value $string -Type NoteProperty
                        }

                        if ($name -eq "permalink") {
                            $string = Parse-Permalink -Permalink $value
                            $item | Add-Member -Name "url" -Value $string -Type NoteProperty
                        }

                        if ($name -eq "image") {
                            $item | Add-Member -Name "image" -Value $value -Type NoteProperty
                        }

                        if ($name -eq "featured") {
                            $item | Add-Member -Name "featured" -Value $value -Type NoteProperty
                        }

                        if ($name -eq "stub") {
                            $item | Add-Member -Name "stub" -Value $value -Type NoteProperty
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
}

# -------------------
# Generate main index
# -------------------

# Output to final rendered site directory
# Note: requires full output directory structure exists prior to script running, hence why the Jekyll hook from `builds-via-scripts.rb` plugin, that calls this script, is set to run after the rest of the site has been generated.
$indexFile = "_site/assets/js/mainindex.js"

$items = Generate-Index -PathDirs $regularPageDirs -PathExtraFiles $regularPageFiles

$json = $items | ConvertTo-Json
"export const mainIndex = {0}" -f $json | Set-Content -Path $indexFile

# ----------------------
# Generate virtual index
# ----------------------

$indexFile = "_site/assets/js/virtualindex.js"

$items = Generate-Index -PathDirs $virtualPageDirs -IsVirtualPage $true

$json = $items | ConvertTo-Json
"export const virtualIndex = {0}" -f $json | Set-Content -Path $indexFile