---
title: Creating a basic custom route
permalink: /Creating_a_basic_custom_route/
---

This covers the very basics of using the Route Builder in Foxkit,
allowing you to make a basic route that will make a soldier move between
two set points repeatedly. It will not cover opening Foxkit in Unity, or
using source control to access Foxkit. For both of those topics there
are many other tutorials online. It will also not cover creating .mgsv
files in Makebite, or installing them with Snakebite. So proceed under
the assumption that you know how to do those things. In order to create
routes you will need the following tools:

  - [Unity
    Version 2018.3.6f1](https://unity3d.com/get-unity/download/archive)
  - [Foxkit](https://github.com/youarebritish/FoxKit) (Clone the source)
  - [Side Op
    Companion](https://www.nexusmods.com/metalgearsolidvtpp/mods/571)
    (Also install the Infinite Heaven Quick Menu preset that comes with
    this)

The first thing you want to do is launch the game and head to the
location that you want to make a side op in. Once you are there hold
down the call button and press Up on the keyboard to set all of the
enemy soldiers to friendly. Next you will travel to the nearest outpost
or area with enemy troops. Place a marker on one of them and hold the
call button again. This time press Down and the screen will print the
soldier's name, and the nearest CP. Take note of the CP name.
[thumb|839x839px](/File:20200423202203_1.jpg "wikilink")

Once you have that information you can proceed to where you would like
to place your route. Navigate to the exact point you would like your
route to begin and face the direction you would like the soldier to be
facing at the beginning of the route. Hold down the Call key and press
the Crouch key. This will print the coordinates of you location and
orientation to ih_log.txt. That file is located in a folder named "mod"
that can be found in the main MGS_TPP folder. Repeat this step for the
second point of your route. You can now exit MGSV.

Open up ih_log.txt in your text editor of choice. Scroll to the bottom
to find some important pieces of information. The first is a line that
contains the quest area you were in when you took your coordinates. Next
to that it will say if it is an acceptable location to place a side op.
Below that information are the coordinates that you took.
[thumb|834x834px](/File:Notepad.png "wikilink")

Keep this information open, as you will need it for the remaining steps.
Open up Foxkit in Unity, this may take a moment the first time you open
it. Right click in the hierarchy area. In the menu that appears select
Foxkit -\>