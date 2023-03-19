---
title: Metal Gear Solid V Save Manager
permalink: /Metal_Gear_Solid_V_Save_Manager/
tags: [Tools]
---

**<u>PROJECT DISCONTINUED</u>**

**MGSV Save Manager** is a simple, C\# based application to manager
Metal Gear Solid V: The Phantom Pain save files.

Current features include support for multiple users, save files,
renaming, creating and deleting save files.

<s>Download the latest release from the Project GitHub.</s>

## History

The idea for save manager came from having to manually move save folders
yourself, if you wanted to have multiple saves with MGSV: The Phantom
Pain since the game only has a single save slot builtin, quite a
contrast compared to the previous games in series.

The first version included only a simple switching between two save
files, where all paths were hard coded into the script, which at the
time was written in Python 3 and using the Windows 10 Linux subsystem
and bash, making the script not portable at all.

The next versions added more automation. First was added automated Steam
directory finder, to mitigate the user's need to type in where the
client was installed. After that came support for more than two save
files and user scanning, to switch between users.

The final Python 3 version of the save manager included previously
mentioned features, but also save creation and deletion. Also the Bash
was replaced with the native Windows command line. However, as the
creation of a graphical user interface is not that easy and flexible
with Python tkinter GUI library, the next step was to switch language.

The language of choice was C\#, since the game's PC version is supported
only on Windows, and GUI tools are quite well supported and easy to use.
Designing the GUI for the release 2.0 was done first to see, what
features should be ported and how to connect them to each other. Most of
the background functionality was quite easy to port over, since the
Python script mostly used Windows command line tools and only required
to change how those tools were called from within the code. As the C\#
programs are compiled, a bunch of different scripts and files are no
longer required to run the program, making the release even more
portable, especially compared to the Python script which required Python
to be installed or compiled to an executable with a bunch of Python
libraries packed alongside it.

## Features

![](/assets/MGSV%20SaveManager2.3%20Settings.png){:.thumb .legacy-small width="375px"}
Currently supported features

  - Multiple users
  - Multiple saves
  - Renaming saves
  - Creating new saves
  - Deleting saves
  - Launch the game
  - Configure graphical settings
      - Resolution and used display not yet supported.

Possible features (depending on the feasibility)

  - Separate Ground Zeroes save management
  - Configure game settings (subtitles, reflex mode etc.)
  - Game completion percentage next to the currently used save
  - Hours played
  - New version available notifications

## How to use

Before running the program: If you want your new saves to be fresh saves
(starting from beginning of the game), disable the Steam Cloud Sync for
BOTH MGSV: The Phantom Pain and MGSV: Ground Zeroes. Otherwise Steam
will download the latest cloud save on game launch. If you are happy
with new saves being copies of old saves and want to keep cloud sync on,
just ignore this part part and continue.

When first running the program, it will create a local directory for
saves and config files under **C:\\MGSV_saves**. Then, depending on how
many users are found from the Steam directory, two different approaches
are done.

1.  If only single user found, that user is automatically selected
2.  If multiple users, select user from the user list and click
    **Apply**

The program then will create a local copy of the currently used MGSV:
TPP save named **Original**. The first save can be renamed if so wished
using the **Rename Save** field and applying.

If multiple users are available, use **Change User** dropdown menu to
switch between them.

Create a new save using the **New Save** field and applying, the program
will then automatically switch to that save and backup the previous
save.

Switching between saves can be done using the **Change Save** dropdown
menu and applying the selection. Previous save will be backed up
accordingly.

Delete saves using the **Delete Save** dropdown and applying. The
program will then switch you to the first save found in the save
directory. Save cannot be deleted when there is only a single save
present.

If you delete or move saves manually while the program is running, use
**Save Scan** button to re-scan the save folder.

## <s>Source code and feedback</s>

<s>You can view the source code on the project GitHub page.</s>

<s>Feedback and bug reports should be posted there in the Issues
section. With bug reports, please describe the bug/error as accurately
as possible for more efficient bug tracking and fixing.</s>
