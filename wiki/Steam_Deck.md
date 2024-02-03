---
title: Steam Deck
permalink: /Steam_Deck/
tags: [Guides]
---

Quick guide to installing and using [SnakeBite](/SnakeBite_Mod_Manager) under Linux for the Deck.

## Setup

1. Go to desktop mode on your Deck by holding down the power button and selecting *Switch to desktop*.

2. In the bottom left of the desktop you'll see the *Discover* app store. Open it and search for `Wine` (has a tasty glass of red wine for a logo) and download it.

3. Next, download SnakeBite from [here](https://www.nexusmods.com/metalgearsolidvtpp/mods/106).

4. When SnakeBite is downloaded, navigate to your download folder and using the right track pad you must right click `SnakeBiteInstaller.exe`, then *Open with...* then click your newly installed Wine.\
\
Once downloaded, you will see both `SnakeBite` and `SnakeBite.ink` - you will need to execute `SnakeBite.ink` every time you wish to use it. In order to execute it, right click it using the track pad and click *Open with...* then your newly installed Wine.

5. You'll now need to locate your game directory. This part seems tricky at first, but ultimately isn't once you know what to do. Click the 3 dots to start locating the directory - go to: `/home/deck/` then once your in `deck` you need to click the bar which you can type in and pull up the Steam keyboard using the STEAM button + X.\
\
You'll then need to type `.local` then click enter so you enter the hidden .local folder. You should now be able to go to `/share/steam/steamapps/common/MGS_TPP`. Follow the next steps in order to install your downloaded mods.

6. **Back up the SnakeBite config file**. This step is important since if you relaunch SnakeBite in Linux it causes the config to get reset, which means without a backup of the config file you'd have to re-run the setup again for it to dectect any installed mods.
    
    1. Navigate to the SnakeBite directory. Below should be the correct path but it might vary for you.\
    ```
    /home/deck/Games/snakebite-mod-manager/drive_c/users/deck/AppData/Local/SnakeBite_Url_ba73accc39ab166ed4d68f35b081fb8ca6cc17bc/<version>
    ```
    > Where `<version>` is whatever the SnakeBite version you have installed, eg: `0.9.2.2`.

    2. Copy the `user.config` file located there to some other place like a regular documents directory.


## Restoring the SnakeBite config

Whenever you want to launch SnakeBite again you'll first need to restore the `user.config` file you made a backup of in step 6 above.

You can do this manually by pasting it to the same path you copied it from originally, or you can run a script that can automate this for you.

> Alternatively you can go through the SnakeBite setup again but that's more time-consuming.

### Using a script to automate this

Made a simple script that copies a file from a source to a destination. First download it to your Deck.

{% include download file="/assets/Steam_Deck/Copy-SnakeBite-Config.sh" %}

1. Right-click it and select *Properties* then in the *Permissions* tab tick *Is executable*.
2. Open the script in a text editor. Steam Deck includes KWrite by default.
3. Open both the original SnakeBite directory that `user.config` is within and the directory in which you keep the backup of the file.
4. Right-click your backup version of `user.config` and select *Copy Location*.
5. Then in the text editor paste the path between the double quotes of the `source=""` variable (like `source="<pasted path goes here>"`).
6. Do the same for the original SnakeBite `user.config` by copying its location and pasting its path between the double quotes of the `dest=""` variable in the script. Then save the script.

Now you can double-click the script to copy the backup file to the SnakeBite location, prior to launching SnakeBite, so it properly detects your existing mods. You should see a notification message confirming whether the copy was successful.