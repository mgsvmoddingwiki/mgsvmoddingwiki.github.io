@echo off
setlocal enableextensions enabledelayedexpansion

set "scriptname=[%~n0.bat]"
title MGSV Wiki ^| Run local server

:: Build options
set "inctext[1]=incremental builds"
set "inctext[2]=full builds"

echo Options for this session: & echo.
echo     [1] / [Enter] Use !inctext[1]! (default)
echo     [2]           Use !inctext[2]!

echo. & <nul set /p "=Select desired option: "
call :choice "12"
call :incremental !errorlevel!

:: Set expected environment variable for bundle so it knows where the Gemfile is located
set "BUNDLE_GEMFILE=.env-files/Gemfile.github"

:: Generate the site (also use 'live reload' so any file change in repo will automatically re-generate site)
bundle exec jekyll serve --host localhost --force_polling --livereload !incremental!
if !errorlevel! equ 0 (
    exit
    ) else (
    echo. & echo !scriptname! Error encountered. Exit code: !errorlevel! & echo.
    rem Custom pause prompt text to use 'exit' instead of 'continue' wording
    pause >nul|set /p "=!scriptname! Press any key to exit... " & exit
    )

exit /b

:: Calls
:choice
    setlocal disabledelayedexpansion
    set "n=0" & set "c=" & set "e=" & set "map=%~1"
    if not defined map endlocal & exit /b 0
    for /f "eol=1 delims=" %%i in ('xcopy /lwq "%~f0" :\') do set "c=%%i" & rem detect and store input
    set "c=%c:~-1%" & rem obtain last character
    if defined c (
        for /f delims^=^ eol^= %%i in ('cmd /von /u /c "echo(!map!"^|find /v ""^|findstr .') do (
            set /a "n += 1" & set "e=%%i"
            setlocal enabledelayedexpansion
            if /i "!e!"=="!c!" (
                echo(!c!
                for /f %%j in ("!n!") do endlocal & endlocal & exit /b %%j
                )
            endlocal
            )
        ) else (
        rem If Enter pressed
        echo(default selected
        endlocal
        exit /b 99
        )
    endlocal & goto :choice
    exit /b

:incdefault
    set "inctext=!inctext[1]!"
    set "incremental=--incremental"
    exit /b

:incremental
    set "inctext=!inctext[%1]!"
    if %1 equ 1 call :incdefault
    if %1 equ 99 call :incdefault
    cls & echo !scriptname! Selected: !inctext!. Starting build and server... & echo.
    exit /b

endlocal