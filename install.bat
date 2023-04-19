@echo off
setlocal enableextensions enabledelayedexpansion

set "scriptname=[%~n0.bat]"
title MGSV Wiki ^| Install dependencies

:: Installs the required dependencies specified in the Gemfile
bundle install --gemfile=".env-files/Gemfile.github"
if !errorlevel! equ 0 (
	exit
	) else (
	echo. & echo !scriptname! Error encountered. Exit code: !errorlevel! & echo.
	rem Custom pause prompt text to use 'exit' instead of 'continue' wording
	pause >nul|set /p "=!scriptname! Press any key to exit... " & exit
	)

exit /b