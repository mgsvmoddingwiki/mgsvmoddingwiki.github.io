---
title: Running a Local Server
permalink: /Meta/Running_a_Local_Server/
tags: [Meta, Guides]
---

In this guide we'll cover how to get a local version of your wiki fork running in your browser, so you can check how changes will appear exactly as they'll appear on the original wiki site.

> This is intended for users who want the most accurate preview and control over the final output.

![Showing how changes are auto-detected and appear live in the browser. The build time has been trimmed in the GIF for brevity.](/assets/Meta/Running_a_Local_Server/Live changes example.gif)

## Prerequisites

- This guide assumes you've followed the [Using Github Desktop](/Meta/Creating_Editing_Pages/Using_Github_Desktop) guide, so you have a fork of the wiki locally.
- This guide uses Windows, though you can achieve this under Linux, too.

{% include spoiler-start title="Info for Linux users" %}

Official Jekyll and Ruby install instructions can be found for Ubuntu [here](https://jekyllrb.com/docs/installation/ubuntu/) (other distro info [here](https://jekyllrb.com/docs/installation/other-linux/)).

If using Linux run the bash (`.sh`) versions of the `install` and `run` scripts mentioned in the steps below.

Since Github Desktop isn't available for Linux you'll have to use an alternative git front-end or just the git CLI, to make the initial fork clone and (optionally but recommended) manage commits.

> You can alternatively run Linux in a virtual machine on a Windows host and manage files/git on the Windows side, by cloning the wiki to a directory on the host and sharing it with the VM.

> **The build process uses Powershell scripts** for generating the search index and recent changes files, to populate the search results and any section's sidebar items (like can be seen in this Meta section).<br/>
<br/>
Powershell is available in Linux packages but if you don't want to install it just keep in mind those aspects won't behave as expected.
{:.note}

{% include spoiler-end %}
{:.important}

---

## Installing Jekyll and Ruby

> **Important:** The latest Ruby version (v4) has breaking changes with building the site locally. Use Ruby v3 instead for the time being. The steps below have been adjusted to link to the v3.4 installer.
{:.important}

1. Go to the Ruby installer page [here](https://rubyinstaller.org/downloads/archives/). Select the *Ruby+Devkit 3.4.8-1 (x64)* version ([direct download link](https://github.com/oneclick/rubyinstaller2/releases/download/RubyInstaller-3.4.8-1/rubyinstaller-devkit-3.4.8-1-x64.exe)).
2. Run the installer and click through the defaults. It consumes around 900MB of space.
    > If you get a Windows SmartScreen message blocking the installer click the underlined *More info* text then click the *Run anyway* button.
3. At the end of the installer you'll be prompted by default to install the dev components. Confirm and a CMD window will appear. Press `Enter` key to continue when asked.
    - After it states `succeeded` you'll be prompted a second time to press `Enter`. This just exits the CMD window since it's already complete.

---

## Installing the wiki dependencies

1. Now open the local version of your wiki fork (if you're unclear where that is open Github Desktop then click *Show in Explorer*).
2. Double-click the `install.bat` script in the root directory of your fork. This installs the required Jekyll dependencies for the local wiki fork and only has to be done once. It will take a moment before progress appears. The window will auto close when finished.
    > It's easier to distinguish file types by having file extensions visible in Windows File Explorer.
    {:.tip}

---

## Running the local server

Now we're ready to run the server. Any time you'd like to run it just do the following.

1. In the root directory of your fork double-click the `run.bat` script. This will build the wiki then run a web server locally on Windows that can be accessed via a browser.
    > The server is only accessible on your system, not over the internet.
2. The script will prompt for whether you'd like to use incremental or full builds for the current session. Press `1` or `Enter` key for the incremental build type (faster).  
    > The alternative full build option will rebuild the whole wiki any time a change is detected. This is useful if you've changed some permalink metadata and need the search results and sidebar [sections](/Meta/Creating_Editing_Pages/Metadata_Organization/Creating_a_Section) to sync up with the changes.
3. Minimize the CMD window and launch a browser.
4. Enter `localhost:4000` in the addressbar to visit the local wiki running on your system!

> You'll notice a new `_site` directory in the root of the wiki directory appear. This directory only contains the compiled versions of pages/files for the local server and is ignored by Github Desktop when detecting file changes, so avoid editing any of the files within.
{:.note}

> You may get a Windows firewall pop-up mentioning Ruby is connecting to the internet but this can be closed and it won't notify again.
{:.tip}

> If after launching the run script the window automatically closes and the server doesn't work then check the [Troubleshooting](#troubleshooting) section below.
{:.important}

### Closing the local server

You can stop the local server running at any time by closing the CMD window you minimized, or by focusing the CMD window and pressing `Ctrl+C` (the 'cancel' command) twice to terminate the process.

---

## Making changes

You can make changes to the wiki as you would normally, by editing/adding/deleting files on your local fork via Windows Explorer.

Any changes will be auto detected by Jekyll incrementally and the parts of the wiki that have changed will be re-built. The changes can be viewed in a browser.

You can then submit your changes back to the original wiki as per the [Github Desktop](/Meta/Creating_Editing_Pages/Using_Github_Desktop) guide.

![The build time has been trimmed in the GIF for brevity](/assets/Meta/Running_a_Local_Server/Live changes example.gif)

> It takes a moment to rebuild for each change so there'll be a delay between the change(s) and when they'll appear. The changes should automatically appear in the browser without requiring a refresh, once they've been built and are ready.
{:.note}

---

## Troubleshooting

- Running an older version of Ruby 3 instead of the currently recommended version 3.4.8 will produce errors when trying to use the run script and the window will auto close and the local server won't run. In this case follow the steps in the spoiler below.

{% include spoiler-start title="How to change your installed Ruby version (Windows)" %}

1. Uninstall the prior Ruby version in Windows by searching *Add or remove programs* in the start menu and filtering the list of programs with `ruby` and uninstalling it.
2. Install the version of Ruby recommended in the steps further above.
3. Delete the `.env-files/Gemfile.github.lock` file in your wiki fork directory.
> This file gets generated when installing the dependencies and is ignored by git when making changes so don't worry about it.
4. Re-run the `install.bat` script and let it install the Ruby dependencies.
5. Launch `run.bat` and select whichever option you want to run the local server.

The run script window should now remain open and the local server work.

{% include spoiler-end %}

- If you updated your fork of the repo to sync to the upstream version and aren't seeing the updated changes try hard reloading your browser cache (typically with the hotkey `Ctrl+Shift+R` or in some browsers holding `Shift` and clicking the reload button).

- Any edits to a wiki page that affect the search results or a section sidebar tree will require a full rebuild of wiki if you want those changes to appear in them. Examples of changes that would need this: if you've deleted a page or changed its metadata (tag/title/etc).
    
    - This means close any existing run script window and then relaunch the run script and select option `2` (the full build option) when prompted. After it's built once you can exit the run script window again and go back to using the incremental build (option `1`) if you prefer.
    
    > The reason this is needed is because those particular build scripts only get triggered on a fresh, complete build (via a Jekyll hook in the Ruby plugin) and not on just a full build per se.\
    \
    Ie: even if you're already using option 2 of the run script only the first build upon launching the script will run the scripts but not on subsequently detected changes even though Jekyll is still rebuilding the rest of the site.
    {:.note}

- If you get an error when using the run script of `git : The term 'git' is not recognized...`, it means the git binary isn't detected in your environment variables. You can **ignore this** if you don't care about the Recent Changes widget not working as it only affects building that list, the rest of the wiki will still work. Otherwise see the notes in the spoiler below.

{% include spoiler-start title="Notes about git for the building process" %}

You may be wondering why git isn't already in the environment variables when Github Desktop is installed. That's because Github Desktop deliberately doesn't add it to the PATH in case you have a separate git binary installed.

As mentioned though, the only thing git is used for when building the wiki is for the recent changes widget, so if you don't care about that you can ignore the error.

If you want you can manually add Github Desktop's git directory to the Windows PATH so the error doesn't occur by searching the start menu for `environment` and selecting *Edit environment variables for your account*.

Then in the window select the *Path* item, click the *Edit* button, then in the new window click the *Add* button and paste in the following directory path as a new entry (replace the `<version number>` in the example with the Github Desktop version, eg. `3.4.2` or whatever the version of Github Desktop is currently installed).

```
%USERPROFILE%\AppData\Local\GitHubDesktop\app-<version number>\resources\app\git\cmd
```

> Note that since the version number in the directory path changes with each Github Desktop update this isn't a very robust approach compared to say installing standalone git for Windows.
{:.note}

{% include spoiler-end %}
