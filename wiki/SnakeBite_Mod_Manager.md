---
title: SnakeBite Mod Manager
permalink: /SnakeBite_Mod_Manager/
tags: [Tools, File Tools]
---

**SnakeBite** is an unofficial, open-source mod manager for Metal Gear
Solid V: The Phantom Pain.

The Mod Manager can install and uninstall Mod Files (.MGSV file
extension) to the game's data patch archives (0\\00.dat and 0\\01.dat).
Additionally, the mod manager can save and load collections of mods as
Mod Preset Files (.MGSVPreset file extension).

**Makebite** is a companion application for SnakeBite, which serves to
format and build .MGSV Mod Files. **Makebite is automatically installed
alongside SnakeBite**.

SnakeBite logs the user's currently installed mods in *snakebite.xml*,
located in the game's base directory. The *snakbite.xml* file is updated
whenever mods are managed through SnakeBite, to ensure the integrity of
the modified game files.

SnakeBite and Makebite both log the user's current session in a Debug
file, named *log.txt*, located in the SnakeBite install directory. The
file is updated in real-time, and provides helpful diagnostics to users.

## **SnakeBite** **Menu Descriptions**

### Startup Launcher

![](/assets/Snakebite.png){:.thumb .legacy-small width="220px"} After installation and
setup, the Startup Launcher is displayed.

  - ***Start Game:*** Launches The Phantom Pain via Steam and exit the
    mod manager. Note that installed mods will still affect The Phantom
    Pain even if the game is launched directly through Steam.

<!-- end list -->

  - ***Mods:*** Opens the mod installation and uninstallation interface.
  - ***Settings:*** Opens the Settings Interface.
  - ***Exit*:** Quits the Mod Manager.

The MGSV Game Version and SnakeBite Application Version are displayed at
the bottom-left corner of the Startup Launcher. Double-click on the
version text to open SnakeBite's Install folder. By default, this
launcher is displayed upon starting SnakeBite, but the user can choose
to skip directly to the Mod Interface on startup (Mods -\> Options -\>
Skip Startup Launcher).

### Mod Interface

![](/assets/Installation%20Interface.png){:.thumb .legacy-small width="220px"} The Mod
Interface is the main menu for SnakeBite. Mods can be installed, viewed
and uninstalled through the Mod Interface. Additionally, a number of
functions and shortcuts can be accessed through the window's menu
bar.![](/assets/SnakeBiteModInstaller.gif){:.thumb .legacy-small width="220px"}

  - ***Install .MGSV File(s):*** Prompts the user to select one or more
    .MGSV Mod Files.
      - Upon selecting a file, the SnakeBite Install Manager window will
        appear. This menu can preview mod information, add and remove
        mods from the installation list, and modify the order in which
        the mods will be installed. The Install Manager will also check
        for conflicts between mods. Clicking the *Continue Installation*
        button will begin the installation process for the selected
        mods.
      - When a mod is installed, clicking mod's name will show
        information about it. This information includes the name of the
        mod, the author of the mod, a link to the mod's website, and a
        description of the mod provided by the author.
      - Unlike NexusMods' mod managers, all installed mods are
        considered "active" and will affect the game for as long as they
        are installed. The checkboxes beside the installed mods do not
        activate or deactivate mods. **Mods that are currently installed
        with SnakeBite are always active**. The user can launch the game
        through Steam or via SnakeBite: mods will be active regardless.

<!-- end list -->

  - **Uninstall Checked Mod(s):** ''Uninstalls any mod with a
    checkmark to the left of its name.
      - Double-clicking on a mod will mark the checkbox, thus marking
        the mod for uninstallation.
      - Clicking the checkbox in the top-left corner of the Mod
        Interface window will mark all installed mods for installation.
      - The checkboxes are **ONLY** utilized for uninstalling mods.
        Unlike the Nexus Mod Manager or Mod Organizer, the checkboxes do
        not activate or deactivate mods.
  - ***Launch Game:*** Launches The Phantom Pain via Steam and exit the
    mod manager.
  - ***Browse SnakeBite Compatible Mods:*** Opens the default web
    browser to a NexusMods search page. The page displays search results
    for any Phantom Pain mod that contains the text '\[SBWM\]' in the
    long description.
      - It is recommended that Mod Authors add \[SBWM\] to their mod's
        description, for the convenience of SnakeBite users. The tag
        will also improve visibility for your mod.
      - Even if a mod is tagged with \[SBWM\], it could still be
        out-of-date with the latest version of MGSV. mods that are
        out-of-date (particularly script-heavy mods) could cause
        infinite loading screens or game crashes, but they may still
        work as intended. For example, texture mods will often run
        properly, even if they were intended for an earlier game
        version.

![](/assets/Dropdown-Menus.gif){:.thumb .legacy-small width="220px"}

In addition to these primary functions, the Mod Interface also contains
a number of Drop-Down Menus.

#### Files Menu

  - ***Open Game Directory:*** Opens the directory containing
    mgsvtpp.exe.
  - ***Launch Makebite:*** Starts Makebite, the application for building
    .MGSV Mod Files.
      - Makebite can be launched directly or via SnakeBite. For more
        information regarding Makebite, refer to the Makebite section of
        this article.
  - ***Browse SnakeBite Mods:*** Opens the web browser to the NexusMods
    search results for mods tagged with \[SBWM\].
  - ***Save .MGSVPreset File:*** Creates a 'Mod Preset' file, which
    packs all installed mods into a compact save file.
      - The Preset file will save your 00.dat and 01.dat as they are in
        their current state. If non-SnakeBite mod files are contained in
        these archives, they will be saved as well. Note, however, that
        non-SnakeBite mod files typically end up in a_chunk7.dat and
        a_texture7.dat, which are not saved to the Preset file.
      - The Preset file will **not** save any files that are created by
        mods, even if they were installed through SnakeBite. For
        example, Infinite Heaven creates save files to store user
        preferences. These save files will not be packed into the Preset
        file.
  - ***Load .MGSVPreset File:*** Installs all mods contained within the
    selected Mod Preset file. **Any mods that are already installed will
    be removed**.
      - By default, SnakeBite will automatically create a Mod Preset
        file before any change is made to the game data
        (Installing/Uninstalling Mods). This Preset is named
        RevertChanges.MGSVPreset, and is saved to the Game Directory.
        Users can attempt to restore the previous state of the Mod
        Manager using this file, in the event of a critical (or
        otherwise unsavory) management failure. However, this safety net
        requires a dependent amount of time and storage space to create.
        The user can turn off this feature in the Settings menu
        (Options... -\> Settings... -\> Uncheck 'Save
        RevertChanges.MGSVPreset').
  - ***Exit:*** Quits the Mod Manager.

#### Options Menu

  - ***Skip Startup Launcher:*** If this option is checked, SnakeBite
    will open directly to the Mod Interface menu on startup.
      - The Startup Launcher is essentially aesthetic, since all of its
        features are available through the Mod Interface. Users can
        check this option if they wish to forgo the launcher's visual
        appeal.
  - ***Settings:*** Open the Settings Interface.

#### Help Menu

  - ***About Snakebite:*** Displays a list of topics, each providing
    information about various aspects of modding with SnakeBite Mod
    Manager.
  - ***Visit the Modding Wiki:*** Opens the web browser to the Metal
    Gear Modding Wiki homepage. Welcome\!
  - ***Open Debug Logs:*** Opens the Logs directory, which contains the
    4 most recent debug logs.
      - *log.txt* provides debug logging for the current management
        session. ''log_prev.1.txt, log_prev.2.txt, *and*
        log_prev.3.txt'' are copies of the log files for the previous 3
        sessions.
  - ***Report a Bug:*** Opens the web browser to the SnakeBite Bugs tab
    on NexusMods.

### <u>Settings Interface</u>

![](/assets/SnakeBiteSettings.png){:.thumb .legacy-small width="220px"} The Settings
Interface can be accessed from both the Startup Launcher and the Mod
Interface. This menu provides the user with tools and toggles for
handling mod data as well as miscellaneous SnakeBite settings.

  - ***MGSV Installation:*** Displays the current installation path for
    mgsvtpp.exe.
      - The installation path can be reselected by clicking on the
        ellipses button to the right of the text box.
  - ***Setup Wizard:*** Reinitializes the Setup Process.
      - This function can be used to create new data backups and
        potentially fix database errors. However, if the user is
        accessing the setup process from the Settings Interface, it's
        **highly likely that their current data is already modified**.
        Be aware that backing up data that has already been modified is
        **not** the same as backing up the original game data.
  - ***Restore Backup Game Files:*** Removes all data that is currently
    being managed by SnakeBite and restores original game data.
      - If SnakeBite encounters an error which cannot be fixed by
        loading a backup Preset file (such as RevertChanges.MGSVPreset),
        the user may need to restore their original game data.
      - Game data is restored with the backup files, which were created
        during the initial setup. If these backup files are not found
        within the game directory, SnakeBite will not be able to restore
        the original game data and this option will not be available for
        the user.
      - Backup files have a '.ORIGINAL' file extension. SnakeBite
        expects Chunk0.dat.original, 00.dat.original and 01.dat.original
        to be stored in the same directory as their modified versions.
        For example: 00.dat.original will be stored in
        MGS_TPP\\master\\0\\, the same directory as 00.dat (the
        modified file which is currently being managed by SnakeBite)
  - ***Enable Launcher Sounds:*** Toggles Metal Gear audio effects to
    play while using the Startup Launcher.
  - ***Save RevertChanges.MGSVPreset:*** Toggles the automated creation
    of RevertChanges.MGSVPreset during mod installation/uninstallation.
      - If enabled, this Preset file will be built upon installing or
        uninstalling a mod. The Preset essentially saves the "Last Known
        Good" mod configuration, in the event of a management failure.
      - RevertChanges.MGSVPreset is stored in the Game Directory,
        alongside mgsvtpp.exe and snakebite.xml.
      - The time to build the Preset File and the space required to
        store it are dependent on the mods that are currently installed.
        Due to this, the user can toggle this feature at their
        discretion.
  - ***Toggle Mods On/Off:*** Activates or disables all installed mods.
      - This function is only available if the user has created backups
        of their original game data, since the process will swap out the
        modified data with the original backups.
      - Both the original file backups and the modified data will remain
        safe if this option is toggled. SnakeBite does not modify the
        files beyond changing their filenames.

## **Backup Files**

While SnakeBite serves as a reliable method for users to manage their
mods, complications can still occur in certain circumstances. Game
updates or bugs with SnakeBite itself could cause the mod manager and/or
the game to function improperly. For this reason, it is heavily
recommended that the user create Backup Files, which store the original
contents of *chunk0.dat, 0\\00.dat* and *0\\01.dat*. Storing backups
through SnakeBite will allow the user to *Restore Original Game Files*
from the SnakeBite Settings window, as well as the ability to *Toggle
Mods On/Off.* **Without backups, the user will need to revalidate their
game files through Steam to redownload roughly 2 GB of game data
whenever a problem occurs.**
![](/assets/Backup%20existing%20data.jpg){:.thumb .legacy-small width="244px"} Backups can
be created through the Setup Wizard. When the user runs SnakeBite for
the first time, the Setup Wizard will prompt the user to backup existing
data. Alternatively, the user can run the Setup Wizard at any time
through the SnakeBite Settings window. If backup data already exists,
SnakeBite will prompt the user to overwrite the preexisting backups.
Upon creating backups, the user's current *chunk0.dat, 0\\00.dat* and
*0\\01.dat* are copied and renamed as *chunk0.dat.original,
0\\00.dat.original* and *0\\01.dat.original*.

To restore backup files at any time, the user can open the SnakeBite
settings and click Restore Original Game Files. Doing so will replace
the current game files with the backup files and delete the
snakebite.xml from the game directory. It is recommended that the user
also verifies the game cache (through Steam, not SnakeBite) to ensure
the integrity of the original game files.

**Notice: Restoring the Original Game Files will consume the current
backup files, so the user should remember to create new backups during
the Setup Wizard.**

## **Mod Preset Files**

As described earlier, a 'Mod Preset' is a collection of mods which can
be saved and loaded with SnakeBite. Saving a Preset will pack your
current modded game data into a .MGSVPreset file. Loading a Preset will
simply replace your game data with the files stored in the .MGSVPreset
file. Presets are a fast and simple method of organizing your favorite
mods or trying new mod combinations. You can also utilize Presets as
restore checkpoints if SnakeBite encounters a serious error or your game
data becomes corrupted.

By default, SnakeBite creates 'RevertChanges.MGSVPreset' before a mod
installation/uninstallation, so you can easily undo an action if it
caused a critical error. However, saving a large number of mods needs a
bit of time and storage space, so you can choose to skip this option by
unchecking the 'Save RevertChanges.MGSVPreset' checkbox in the Settings
menu. RevertChanges.MGSVPreset is saved to your Game Directory.

## **MakeBite**

![](/assets/MakebiteInfiniteHeaven.png){:.thumb .legacy-small width="220px"} Makebite
is SnakeBite's companion app for creating .MGSV Mod Files. Makebite will
build a Mod File based on the list of files in a folder specified by the
user. In addition, the user can provide information about the mod by
using the forms on the left-hand side of the application.

When MakeBite builds a mod, it creates an .xml detailing the author's
description combined with a list of the files that were in the specified
folder. SnakeBite includes this .xml along with all of the files that
were in the folder in a .zip file, with its extension renamed to .MGSV.
**To reiterate, the user can treat the .MGSV file as a .zip file, and
even rename the extension and open the zipped folder (rename
example.mgsv to example.zip to easily access the contents of a mod).**

When SnakeBite installs a mod created with MakeBite, it references the
.xml to get the information that will be displayed to the user about the
mod, as well as the list of files it will be installing.

## **Makebite Usage**

![First](/assets/FormattingHelp.png){:.thumb .legacy-small width="220px"}, a user
should create a folder and add all of the files they have modified into
this folder. .fpk and .fpkd files can be unpacked, and deleted (along
with their .xml file), leaving only the \_fpk and \_fpkd folder behind.
**Any unmodified files in the \_fpk and \_fpkd folders can also be
removed, as SnakeBite automatically finds and adds any files missing
from the archive.** *(Note: Only .fpk and .fpkd files can be unpacked and deleted. Other archive files, such as .pftxs files, must be packed into an archive.)* File Monolith's [File
Proliferator](https://metalgearmodding.wikia.com/wiki/File_Monolith#File_Proliferator)
tool is intended to automate most of this process, as it can generate a
MakeBite-ready file structure from input files selected by the
user.![Video tutorial for creating a SnakeBite mod.](/assets/SnakeBite%20In-Depth-%20Creating%20SnakeBite%20Files%20for%20Your%20Mods.jfif){:.thumb width="330px"}
Once the folder is prepared, the user can start MakeBite. In MakeBite,
the user can specify a name for their mod, the version of the mod, the
version of The Phantom Pain the mod is intended for, their mod's
website, and a description of their mod. After that, the user can click
the button with the ellipsis to select the folder that contains all of
their files. Once the folder is selected, a list of all of the files in
the folder will appear under *Mod Files*. In most cases, if a file does
not have a hashed name, the line should begin with */Assets/*. Once all
of this is done, the user simply needs to click the *Do it (build
archive)* button and select an output folder to build their .mgsv
file.

