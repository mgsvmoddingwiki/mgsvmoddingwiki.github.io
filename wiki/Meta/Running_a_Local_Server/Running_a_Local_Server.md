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

{% include spoiler-end %}

## Installing Jekyll and Ruby

1. Download RubyInstaller from [here](https://rubyinstaller.org/downloads/). Select the *With Devkit* x64 version that's bolded.
2. Run the installer and click through the defaults. It consumes around 900MB of space.
    > If you get a Windows SmartScreen message blocking the installer click the underlined *More info* text then click the *Run anyway* button.
3. At the end of the installer you'll be prompted by default to install the dev components. Confirm and a CMD window will appear. Press `Enter` key to continue.
    - After it states `succeeded` you'll be prompted a second time to press `Enter`. This just exits the CMD window since it's already complete.

## Installing the wiki dependencies

1. Now open the local version of your wiki fork (if you're unclear where that is open Github Desktop then click *Show in Explorer*).
2. Double-click the `install.bat` script in the root directory of your fork. This installs the required Jekyll dependencies for the local wiki fork and only has to be done once. It will take a moment before progress appears.
    > **Tip:** it's easier to distinguish file types by having file extensions visible in Windows File Explorer.

## Running the local server

Now we're ready to run the server. Any time you'd like to run it just do the following.

1. In the root directory of your fork double-click the `run.bat` script. This will build the wiki then run a web server locally on Windows that can be accessed via a browser.
    > The server is only accessible on your system, not over the internet.
2. Minimize the CMD window and launch a browser.
3. Enter `localhost:4000` in the addressbar to visit the local wiki running on your system!

> You'll notice a new `_site` directory in the root of the wiki directory appear. This directory only contains the compiled versions of pages/files for the local server and is ignored by Github Desktop when detecting file changes, so avoid editing any of the files within.

### Closing the local server

You can stop the local server running at any time by opening the CMD window you minimized and pressing `Ctrl+C` (the 'cancel' command) then confirming the two prompts by pressing `y` and `Enter`.

## Making changes

You can make changes to the wiki as you would normally, by editing/adding/deleting files on your local fork via Windows Explorer.

Any changes will be auto detected by Jekyll incrementally and the parts of the wiki that have changed will be re-built. The changes can be viewed in a browser.

You can then submit your changes back to the original wiki as per the [Github Desktop](/Meta/Creating_Editing_Pages/Using_Github_Desktop) guide.

![The build time has been trimmed in the GIF for brevity](/assets/Meta/Running_a_Local_Server/Live changes example.gif)

> **Note:** it takes a moment to rebuild for each change so there'll be a delay between the change(s) and when they'll appear. The changes should automatically appear in the browser without requiring a refresh, once they've been built and are ready.

> **Note:** certain changes that affect 'includes' like category auto indexes may not be detected with the default incremental buiild (since incremental builds only update the page/files that have been detected as modified). In such a case you can close the local server via CMD then re-run the `run.bat` which will build the entire site again.

> **Tip:** you can check what's happening by viewing the CMD window while the local server is running.

