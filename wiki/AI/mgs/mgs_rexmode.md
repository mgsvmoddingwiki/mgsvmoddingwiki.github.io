---
title: MG Sahelanthropus REX mode
permalink: /AI/mgs/mgs_rexmode/
tags: [AI, Metal Gear]
---

## Rex mode
![Sahelanthropus Rex Mode Art from "The Art of Metal Gear Solid V" (page 111)](/assets/AI/images/mgs/sally_art rex.png){:.thumb .right}

REX mode is the name given to the sequence where Sahelanthropus changes its pose to an pose similar to MG REX to fire its railgun.<br><br>

Rex mode is used on battle sequence 7 and it needs pequod active and firing at Sahelanthropus from an nearby position to be triggered.<br>
Sniping Points for REX mode are easy to manage. It uses `TppHidePointData` dataset entities to define REX Sniping points.

You can add REX sniping points anywhere, even on sky, but make sure there is terrain or a model with collision enabled with Sahelanthropus bellow the Sniping Point Coordinates otherwise it will fall.<br>

### How to Manage REX sniping points

> Requires Foxkit
{:.important}

As written above, REX sniping points are managed on datasets with `TppHidePointData` entities, for this example im going to use Foxkit to add 1 more REX sniping point on Nova Braga to an already existing dataset.<br>
In this example, i want the sniping point to be on the red cross facing the airport like in the picture bellow:

![](/assets/AI/images/mgs/shlb_rexpoint_example.png)

First thing to is to open the dataset that you are using to manage the REX sniping points, if you dont have one yet, create it.<br>
After that add an `TppHidePointData`, on the Foxkit´s Entity tab, make sure the `type` is set to `Type 1` and create an Transform entity.<br>

![](/assets/AI/images/mgs/shlb_rexpoint_example_02.png)

Now with the `TppHidePointData` Transform entity created you can define the coordinates and rotation for the REX sniping point, in my case, i will place it on the end of the runway facing the airport.

![](/assets/AI/images/mgs/shlb_rexpoint_example_01.png)

>The direction of the blue arrow is the direction that Sahelanthropus will be facing
{:.important}

After you finish adding or deleting the REX sniping points, you can export the dataset and load it on the mission files, everything else will be managed by the game executable file (.exe).

{% include youtube id="50CCaRfzkxo" %}

>Use only one dataset to manage REX sniping points<br>
>The game will automatically chose the REX sniping point that Sahelanthropus will use, usually, it chooses one near the player where Sahelanthropus can see the player<br>
>The limit for REX sniping points is currently unknown
{:.important}

## Rex mode (Mantis Jump Attack)

{% include youtube id="8LUjT8fkdvc" %}

>This is managed by the routes loaded into the mission, check Dominion Route assignment page
{:.important}