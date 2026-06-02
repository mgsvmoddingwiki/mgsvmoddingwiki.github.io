# Copies the user-facing includes to a readable dir on the served site for use with LiquidJS

# ------
# Config
# ------

$source = "_includes"
$dest = "_site/assets/js/js-includes"

# ----
# Copy
# ----

New-Item -Path $dest -ItemType Directory -Force | Out-Null

# Copy only root files that have no extension (ie: the user-facing ones)
Get-ChildItem -Path $source -File |
    Where-Object { $_.Extension -eq "" } |
    ForEach-Object { Copy-Item -Path $_.FullName -Destination (Join-Path $dest $_.Name) }