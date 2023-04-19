#!/usr/bin/env bash

# Set expected environment variable for bundle so it knows where the Gemfile is located
export BUNDLE_GEMFILE=".env-files/Gemfile.github"

# Generate the site (also use 'live reload' so any file change in repo will automatically re-generate site)
bundle exec jekyll serve --host 0.0.0.0 --force_polling --livereload