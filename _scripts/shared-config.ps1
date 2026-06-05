# Keep in mind these paths resolve against the current working directory (normally root of site), which when run via the Github Actions workflow or Ruby build index plugin will behave as expected.

$regularPageFiles = @(
    "README.md" # home page, since it's uniquely in root
)

$regularPageDirs = @(
    "wiki/"
)

$virtualPageDirs = @(
    "wiki/Entity_Reference/"
)

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

function Parse-Metadata {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$MetaBlock
    )
    process {
        $metadata = @{}
        $lines = $MetaBlock -split "`n"
        # Key names of YAML arrays to handle
        $arrayTagNames = [System.Collections.ArrayList]@(
            "tags"
            "redirect_to"
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
                        $bool = $null
                        $metadata[$key] = if ([bool]::TryParse($value, [ref]$bool)) { $bool } else { $value } # convert to true boolean if is `true`/`false`
                    }
                }
            }
        }
        return $metadata
    }
}

function Parse-Title {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Title,

        [Parameter(Mandatory)]
        [string]$FallbackPath
    )
    process {
        if ([string]::IsNullOrWhiteSpace($Title)) {
            $Title = Split-Path $FallbackPath -Leaf # fallback to filename if only contains whitespace
        } else {
            # Capture everything between single quotes (if present in title), after any prefixed exclamation marks (character escaping) and ignore leading/trailing whitespace
            $Title = $Title | Select-String -Pattern "^[!'\s]*(.*?)['\s]*$" -AllMatches | % { $_.Matches.groups[1] } | % { $_.Value }
        }
        return $Title
    }
}

function Parse-Permalink {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Permalink
    )
    process {
        $Permalink = $Permalink.Trim() # without assigning it will return two copies of the string to the caller
        # Force trailing forwardslash if lacking it for lookup consistency
        if (!$Permalink.EndsWith('/')) {
            $Permalink = $Permalink + '/'
        }
        return $Permalink
    }
}