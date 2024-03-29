---
title: Creating a basic custom route
permalink: /Creating_a_basic_custom_route/
tags: [Guides, Routes]
---

This covers the very basics of using the Route Builder in FoxKit,
allowing you to make a basic route that will make a soldier move between
two set points repeatedly. It will not cover opening FoxKit in Unity, or
using source control to access FoxKit. For both of those topics there
are many other tutorials online. It will also not cover creating .mgsv
files in Makebite, or installing them with Snakebite. So proceed under
the assumption that you know how to do those things. In order to create
routes you will need the following tools:

  - [Unity
    Version 2018.3.6f1](https://unity3d.com/get-unity/download/archive)
  - [FoxKit](https://github.com/youarebritish/FoxKit) (Clone the source)
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
![](/assets/20200423202203%201.jpg){:.thumb width="839px"}

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
![](/assets/Notepad.png){:.thumb width="834px"}

Keep this information open, as you will need it for the remaining steps.
Open up FoxKit in Unity, this may take a moment the first time you open
it. Right click in the hierarchy area. In the menu that appears select
FoxKit -\> Route Set.
![](/assets/Unity1.png){:.thumb width="551px"}

This will create a new game object, as well as open an area where you
can begin to edit your new route. Click the button to create a new route
within your route set. This will create a child object that contains the
route, and the first node for the route nested within it.
![](/assets/Unity2.png){:.thumb width="612px"}

Click on the first node. With the first node open you are able to edit
the coordinates of it under the Local Transform option. Paste in the
first set of coordinates that you took here. IMPORTANT - The X
coordinate should always have the opposite positive or negative value as
the coordinate that you took. So if your taken X coordinate is 100, then
you would enter -100 in Unity. If your taken coordinate is -100, then
you would enter 100 in Unity.
![](/assets/Unity3.png){:.thumb width="572px"}

Once the first value is set, click on the button to create a new node.
![](/assets/Unity4.png){:.thumb width="569px"}

With the new node created and selected, enter the values for the second
set of coordinates that you took. Remember to flip the positive or
negative on the X coordinate.
![](/assets/Unity5.png){:.thumb width="567px"}

Once both coordinates are placed, click on the Parent Route set object
in the Hierarchy, and then click on the button to save your route to a
.frt file. Save it to the Route Assets folder in the SOC Assets folder
that gets installed with SOC.
![](/assets/Unity7.png){:.thumb width="610px"}

Open up SOC to create a new sideop. Enter in a file name for it, an
unique Quest Number for it, set the location to the map the route is
meant for, place coordinates for the general area that the route is in
and then choose the correct Quest Area (found in ih_log.txt), the
correct Quest CP (this was found from the tagged soldier in game) and
then select your route file. Fill Radius, Quest Category, and Rank to
whatever you wish. ![](/assets/SOC1.png){:.thumb width="540px"}

Fill out the Flavor text fields and then press the button to proceed to
the next part of SOC. ![](/assets/SOC2.png){:.thumb width="804px"}

Spawn a sol_quest enemy, assign him to your custom route and then press
the button to build your side op.

In order for your custom route's name to appear in the 'Sneak Route' and
'Caution Route' drop down menu, you will need to add it to SOC's route
dictionary, otherwise it will appear as a string of numbers, as below:
![](/assets/SOC3.png){:.thumb .legacy-small width="372px"}

You will need to copy the name of your route, in this example the route
is called **rt_RouteSet_c_0000** and paste it in to the
**route_name_dictionary.txt** file located in your SideOp Companion
folder. The file path for this will be: SideOp Companion
\[folder\]\\SOCassets\\ToolAssets\\**route_name_dictionary**

Once you have saved this text file the names of your created routes will
appear as you named them in Fox Kit when building your SideOp

Once built, create the .mgsv file from the SideOp Build folder that SOC
creates, and then install it. Run the game and go to your custom side op
to see the fruits of your labor\!
![](/assets/Game.png){:.thumb width="832px"}

