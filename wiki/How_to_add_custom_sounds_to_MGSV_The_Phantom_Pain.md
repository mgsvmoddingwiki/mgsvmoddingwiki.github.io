---
title: How to add custom sounds to MGSV The Phantom Pain
permalink: /How_to_add_custom_sounds_to_MGSV_The_Phantom_Pain/
---

In this article I'll be explaining how to change sounds in MGSV. This
guide will assume you have none of the tools required or any experience
with modding.

There are a few things you need to have done before you begin, so before
we actually do anything let's go over a checklist.

**<big>Things to have done before you begin:</big>**

1.  An easy to access folder that will act as your workstation
2.  Have [File
    Monolith](https://www.nexusmods.com/metalgearsolidvtpp/mods/739?tab=description)
    in your MGSV folder
3.  Have [Ravioli Game
    tools](https://www.scampers.org/steve/sms/other.htm) in an easy to
    access location, preferably within the workstation folder.
4.  Have
    [Wwise 2015.1.9](https://www.audiokinetic.com/downloads/previous/)
    downloaded. (This requires more depth and will be explained below)
5.  Have [Snakebite Mod
    Manager](https://www.nexusmods.com/metalgearsolidvtpp/mods/106)
    downloaded and installed.
6.  Have [Audacity](https://www.audacityteam.org/) installed.
7.  Have [MGSV Sound Replacement
    Tool](https://www.nexusmods.com/metalgearsolidvtpp/mods/826)
    downloaded and in your workstation folder.
8.  Have the sound file you want to add to the game labeled and in the
    workstation folder.

**<big>Context for these programs:</big>**

Before we go further I'll give a brief rundown of these programs and
what they're used for.

**File Monolith:** You can't just open MGSV files like a folder and
browse the ones you want and pick them out. So file monolith has tools
that makes copies of the files within the MGSV archives and extracts
them into a readable format. If you don't know how to use File Monolith
refer to [this
guide](https://metalgearmodding.fandom.com/wiki/File_Monolith) to
familiarize yourself.

**Ravioli Game Tools:** So this is an open source tool kit that comes
with a few things, we only need "Ravioli Explorer" because it can read
the file that the game sounds are packed in and listen to each one
without needing to unpack the archive.

**Wwise 2015.1.9:** Don't ask why you need this specific version, it's
just the one that works for some reason. Downloading it and getting it
working is tricky so I'll elaborate on that soon. But what this does is
it converts the soundfile you want to add into a format the game can
read, that being ".wem"

**Snakebite Mod Manager:** Once you are done replacing the files it
allows you to pack and install mods without damaging the original game
files. Familiarize yourself with [this
guide](https://metalgearmodding.fandom.com/wiki/SnakeBite_Mod_Manager).

**Audacity:** This is a generic audio editing tool, basically we need it
to make any adjustments to sounds before we put them in the game. MGSV
sounds also have different attributes depending on what they're used for
and we will use audacity to make sure the attributes of the sound we
want to add match those that we want to replace. I'll go into detail on
it later in this guide.

**MGSV Sound Replacement Tool:** An amazing tool that allows us to take
the sound files we spent so much time editing and creating and allows us
to overwrite existing ones in the game. Will detail use later on in this
guide.

**<big>Downloading Wwise:</big>**

When you try and download Wwise 2015.1.9 from their website, it'll
likely prompt you to make an account and sign in, unfortunately to avoid
legal altercations you're gonna have to do that. Make an account and
sign in and it should take you [to this
page](https://www.audiokinetic.com/download/):
[none|thumb|524x524px](/File:Wwise_home_screen.png "wikilink") Using the
image on above as a guide, click on "older versions", alternatively
click [here](https://www.audiokinetic.com/downloads/previous/).
[none|thumb|522x522px](/File:Wwise_shit2.png "wikilink")

It should now take you to the page in the above screenshot. Download
"Windows Web Installer". Then click "Offline Setup for windows" to
expand the category and download "Wwise Authoring (64-bit)" "Wwise
Authoring Data" and "VC 2013 Redistributable (64-bit)". You may have the
"VC 2013" file installed already but just download and run it anyways to
be sure.

Next step is to run all these files one at a time **except** the
"windows web installer" that is last, because it will run a check if you
have all these components installed.

If you have all those parts installed then here is the kicker. You need
to now turn off your internet and run the installer. Otherwise it will
try and download the files and fail and kick you out.

Once you have Wwise installed then you can turn the internet back on and
move on. This is the hardest part of the process.

## **Step 1: Find a sound you want to add**

This is pretty self explanatory, you need to know what you want to add.
I'm gonna just assume you have whatever sound you want to add saved as a
.mp3 or .wav or something in your workstation folder.

## **Step 2: Find the sound you want to replace**

This is tricky. The sounds in MGSV aren't labeled, so you can't just
search "footstep" and have it be labeled for you. You need to either
know the name of the file you want to replace or go through the sound
bank and listen to them until you figure out which one. Now in the game
many different sounds are stored in many different parts of the games
files. For the sake of this guide we'll assume you want to change a
gunshot sound, which is located in common_bank_01.sbp in chunk0.dat.
Once you have chunk0 unpacked it should be in "Assets\\tpp\\sound".

You \*can\* do anything you want with the files here since they're just
copies but what you should do is copy it and make a folder in your
workstation folder and name it "original common sbp" or something so you
know this is the vanilla game's sound bank.

So before we go any further, you have two ways of identifying the sound
you need to change. The first is by using the [sound
codes](https://metalgearmodding.fandom.com/wiki/Sound_Codes?venotify=created)page
on the wiki. If you find the sound you're looking for keep node of it's
file name.

The second is by using Ravioli Explorer. But before that we need to do
one last thing.

**Step 2.5: Using MGSV Sound Replacement Tool**

So the MGSV is a modified version of Wwise, with almost everything
stripped away from it. The .exe will unpack and repack the
common_bank_01.sbp we copied earlier. So make a copy of the
"Wwise.exe" and put it in the same folder as "common_bank_01.sbp" then
drag the .sbp onto the .exe to open it. This will create two folders, a
Wwise_Input and a Wwise_Output. For now open the Wwise_Output folder
and make a copy of "common_bank_01_BNK.log" this is a file that has
the filename and info on every sound file in this sound bank. You'll
need it. This isn't the last we'll be using the sound replacement tool
but for now you can leave it alone.

**Finishing Step 2: Using Ravioli Explorer**

You only need to use Ravioli Explorer if you do not know which file you
want to replace yet. That is- you have not found the sound file you are
looking for in the sound [codes
section](https://metalgearmodding.fandom.com/wiki/Sound_Codes?venotify=created).
If you have not found it and need to look for the sound then you simply
click on "Ravioli Explorer" and click open file at the top left then
navigate to "Wwise_Output" then open "common_bank_01.bnk" from there
you can navigate through