# Script reads text files from specified path(s) then generates a new Javascript array

$rootDirs = [System.Collections.ArrayList]@(
    # Additional array items don't require comma delimiters
    "wiki/Entity_Reference/"
)
$indexFile = "assets/js/virtualindex.js"
$items = [System.Collections.ArrayList]@()

ForEach($path in $rootDirs) {
    $list = (Get-ChildItem -Path $path -Recurse -Include *.txt).FullName
    $files = $files + $list # assumes more than one file anywhere within the first $rootDirs location, to preserve new lines when concatenating (currently there's only one root directory specified in the array and it has plenty of files)
}

ForEach($file in $files) {
    if ($file) {
        # Capture only strings between first HTML comment
        # Assumes following structure:
        # <!--
        # title: <value>
        # permalink: <value>
        # tags: [<value(s)>]
        # -->
        $metadata = Get-Content $file -Raw | Select-String -Pattern "^<!--\s*([\s\S]+)\s*-->\s" -AllMatches | % { $_.Matches.groups[1] } | % { $_.Value }
        # Capture everything following the HTML comment and remove some unnecessary sub-strings
        $body = Get-Content $file -Raw | Select-String -Pattern "-->[\s]+([\s\S]*)" -AllMatches | % { $_.Matches.groups[1] } | % { $_.Value -replace "`n"," " -replace "`r"," " -replace "\s+"," " -replace "``","" }
        $filePath = $file | Select-String -Pattern "(wiki/.*)" -AllMatches | % { $_.Matches.groups[1] } | % { "/" + $_.Value }

        # Parse the metadata
        $item = [PSCustomObject]@{}
        ForEach ($line in $($metadata -split "`r`n")) {
            $strings = $line | Select-String -Pattern "^(.*): (.*)" -AllMatches
            $name = $strings | % { $_.Matches.groups[1] } | % { $_.Value }
            $value = $strings | % { $_.Matches.groups[2] } | % { $_.Value }
            if ($name -eq "title") {
                # Capture everything between single quotes (if present in title) and ignore leading/trailing whitespace
                $string = $value | Select-String -Pattern "^[\s]*[']?(.*?)['\s]*$" -AllMatches | % { $_.Matches.groups[1] } | % { $_.Value }
                $item | Add-Member -Name "title" -Value $string -Type NoteProperty
            }
            if ($name -eq "permalink") {
                $string = $value.Trim()
                if (-Not ($string.EndsWith('/'))) {
                    # Add trailing forwardslash to URL
                    $string = $string + '/'
                }
                $item | Add-Member -Name "url" -Value $string -Type NoteProperty
            }
            if ($name -eq "tags") {
                # Create array of tags for object
                $string = $value | Select-String -Pattern "\[(.*)\]" -AllMatches | % { $_.Matches.groups[1] } | % { $_.Value }
                $tags = [System.Collections.ArrayList]@()
                ForEach ($tag in $($string -split ", ")) {
                    $tags.Add($tag) | Out-Null # suppress console output
                }
                $item | Add-Member -Name "tags" -Value $tags -Type NoteProperty

            }
        }
        $item | Add-Member -Name "content" -value $body -Type NoteProperty
        $item | Add-Member -Name "filePath" -value $filePath -Type NoteProperty
        $item | Add-Member -Name "virtualPage" -value $true -Type NoteProperty
        $items.Add($item) | Out-Null
    }
}

# Convert to JSON array of objects
$json = $items | ConvertTo-Json

# Generate new Javascript file
"export const virtualIndex = {0}" -f $json | Set-Content -Path $indexFile


