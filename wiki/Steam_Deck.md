---
title: Steam Deck
permalink: /Steam_Deck/
tags: [Guides]
---

Guides to installing and using [SnakeBite](/SnakeBite_Mod_Manager) under Linux for the Deck.

> Various Deck users have found different methods work for them, so test and see which steps work for you.

## Steps

1. Go to desktop mode on your Deck by holding down the power button and selecting *Switch to desktop*.

2. In the bottom left of the desktop you'll see the *Discover* app store. Open it and search for `Wine` (has a tasty glass of red wine for a logo) and download it.

3. Next, download SnakeBite from [here](https://www.nexusmods.com/metalgearsolidvtpp/mods/106).

4. When SnakeBite is downloaded, navigate to your download folder and using the right track pad you must right click `SnakeBiteInstaller.exe`, then *Open with...* then click your newly installed Wine.\
\
Once downloaded, you will see both `SnakeBite` and `SnakeBite.ink` - you will need to execute `SnakeBite.ink` every time you wish to use it. In order to execute it, right click it using the track pad and click *Open with...* then your newly installed Wine.

5. You'll now need to locate your game directory. This part seems tricky at first, but ultimately isn't once you know what to do. Click the 3 dots to start locating the directory - go to: `/home/deck/` then once your in `deck` you need to click the bar which you can type in and pull up the Steam keyboard using the STEAM button + X.\
\
You'll then need to type `.local` then click enter so you enter the hidden .local folder. You should now be able to go to `/share/steam/steamapps/common/MGS_TPP`. Follow the next steps in order to install your downloaded mods.

If all goes well SnakeBite will work fine even after re-opening it. If instead SnakeBite doesn't remember your installed mods after re-opening then check the alternate method below or the [Troubleshooting](#Troubleshooting) section. 

---

## Alternate method

If you are having trouble getting SnakeBite to work properly on your Steam Deck through the above method, you can also try turning it into a Steam shortcut.

1. After downloading SnakeBite, right click on `SnakeBite.exe` and select *Add to Steam*.
2. Open up your library in Steam and navigate to `SnakeBite.exe`.
3. Open up the Properties for `SnakeBite.exe` in Steam, look for a field named *Target*.
4. Replace the target with the full path and filename (with extension) for `SnakeBite.lnk`.
5. Go to the Compatibility Tab and click the checkbox next to *Force the use of a specific Steam Play compatibility tool*.
6. From the drop down that appears select *Proton Experimental*.
7. Close the shortcut Properties and open up the controller settings for your shortcut.
8. Choose the Web Browser (or really any Keyboard and Mouse) profile.
9. **Optional:** While you're probably better off always launching this shortcut in Desktop Mode, it is possible to run it in Game Mode, just bind a key to Toggle Magnifier and you will be able to scroll the view of the windows around freely.

---

## Troubleshooting

Some users experience SnakeBite forgetting its settings and installed mods after re-opening it, regardless of which method used. Below are some suggested workarounds.

### Workaround 1: Re-installing SnakeBite

This is a blunt approach to the issue but you can go through the SnakeBite setup again each time you want to access SnakeBite to get it to detect the installed mods.

### Workaround 2: Restoring a valid SnakeBite config file

With this approach we'll copy a valid SnakeBite config file to the expected location in Linux and make sure it's there when launching SnakeBite. This method worked for a user who installed SnakeBite via Lutris.

{% include spoiler-start title="Click to view steps" %}

First download the following config file. It's the Windows version of the file tweaked for the Deck.

{% include download file="/assets/Steam_Deck/user.config" %}

> The key difference to the Windows version is the `InstallPath` `value` in the file has been modified to be instead the standard Steam Deck path for MGSV TPP.

1. At the time of writing the SnakeBite version in the above file for the `LastSBVersion` `value` is `0.9.2.2`. If SnakeBite has been updated to a newer version in the future you'll have to edit that value in the file to match, then keep a backup of your modified version.

2. Navigate to the following SnakeBite directory on the Deck. Below should be the correct path but it might vary for you.
```
/home/deck/Games/snakebite-mod-manager/drive_c/users/deck/AppData/Local/SnakeBite_Url_ba73accc39ab166ed4d68f35b081fb8ca6cc17bc/<version>
```
> Where `<version>` represents whatever the SnakeBite version you have installed, eg: `0.9.2.2`.

3. Copy the valid `user.config` to that directory.

4. Test launching SnakeBite to check if it has recognized your installed mods.

### Restoring the SnakeBite config

Whenever you want to launch SnakeBite again you'll first need to restore the valid `user.config` file before launching SnakeBite. It's useful to keep a backup copy in some separate directory on the Deck.

This can be done manually by pasting the backup version of the file to the same path as above, or you can run a script that can automate this for you.

#### Using a script to automate this

This is a simple script that copies a file from a source to a destination. First download it to your Deck.

{% include download file="/assets/Steam_Deck/Copy-SnakeBite-Config.sh" %}

1. Right-click it and select *Properties* then in the *Permissions* tab tick *Is executable*.
2. Open the script in a text editor. Steam Deck includes KWrite by default.
3. Open both the SnakeBite directory that `user.config` was copied to above and the directory in which you keep a backup of it.
4. Right-click your backup version of `user.config` and select *Copy Location*.
5. Then in the text editor paste the path between the double quotes of the `source=""` variable (like `source="<pasted path goes here>"`).
6. Do the same for the original SnakeBite `user.config` by copying its location and pasting its path between the double quotes of the `dest=""` variable in the script. Then save the script.

Now you can double-click the script to copy the backup file to the SnakeBite location, prior to launching SnakeBite, so it properly detects your existing mods. You should see a notification message confirming whether the copy was successful.

{% include spoiler-end %}