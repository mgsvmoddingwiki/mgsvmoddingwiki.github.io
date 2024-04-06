#!/usr/bin/env bash

choice () {
    while true; do
    read -rsn1 -p "${prompt}" input
    if [ "$input" = "" ]; then
        # If Enter/space pressed
        return "99"
    elif [[ "${choices[@]}" =~ "${input}" ]]; then
        # Convert order in array to integer for exit code
        for i in "${!choices[@]}"; do
            if [[ "${choices[$i]}" = "${input}" ]]; then
                return "$((${i}+1))";
            fi
        done
    else
        resetline "${#prompt}"
        choice
    fi
    return "$?"
    break
    done
}

resetline () {
    # ANSI escape sequence to set cursor at start of line
    echo -en "\033[${1}D"
}

incremental () {
    local text="${inc_text[${1}]}"

    if [[ "${1}" == "1" || "${1}" == "99" ]]; then
        text="${inc_text[1]}"
        incremental="--incremental"
    fi

    resetline "${#prompt}"
    echo "${script_name} Selected: ${text}. Starting build and server..."
    echo
}

script_name="[`basename  $0`]"
inc_text[1]="incremental builds"
inc_text[2]="full builds"

echo "Options for this session:"
echo
echo "    [1] / [Enter] Use ${inc_text[1]} (default)"
echo "    [2]           Use ${inc_text[2]}"
echo

prompt="Select desired option: "
choices=("1" "2")
choice
incremental "$?"

# Set expected environment variable for bundle so it knows where the Gemfile is located
export BUNDLE_GEMFILE=".env-files/Gemfile.github"

# Generate the site (also use 'live reload' so any file change in repo will automatically re-generate site)
bundle exec jekyll serve --host localhost --force_polling --livereload "${incremental}"
