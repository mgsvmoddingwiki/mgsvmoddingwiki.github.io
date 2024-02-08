@echo off
setlocal enableextensions enabledelayedexpansion

set "scriptname=[%~n0.bat]"
title MGSV Wiki ^| Run local server

:: Set expected environment variable for bundle so it knows where the Gemfile is located
set "BUNDLE_GEMFILE=.env-files/Gemfile.github"

:: Generate the site (also use 'live reload' so any file change in repo will automatically re-generate site)
bundle exec jekyll serve --host localhost --force_polling --livereload --incremental
if !errorlevel! equ 0 (
	exit
	) else (
	echo. & echo !scriptname! Error encountered. Exit code: !errorlevel! & echo.
	rem Custom pause prompt text to use 'exit' instead of 'continue' wording
	pause >nul|set /p "=!scriptname! Press any key to exit... " & exit
	)

exit /b