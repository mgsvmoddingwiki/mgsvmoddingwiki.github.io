---
title: Radio Identifiers to English Voice Lines
permalink: /RadioIDToEnglishVoice/
tags: [Sound, Missions, Lua, Reference]
---


## Common Radio Messages

`TppRadio.Play("f1000_rtrg0115")` will play a radio call for Ocelot to say `"ENOUGH what do you think you're doing?!?"`, but I couldn't find a reference sheet for translating these commmon radio identifier strings to their english radio messages, so I made this. 
- Most of the lines are verbatim, but some of the less interesting calls are abridged.
- There were a few strings that didn't play anything when I called them in-game (could be conditional, maybe because huey was already kicked out on my save?). I marked these as `null`.
- There were a few strings that only played the radio on/off noise but without any voice line. I marked these as `empty`.

My testing was done in Africa free roam. I heard the following lines:
``` lua
RadioTable = { 
		"f1000_mprg0050", -- Miller: we found out there's an english-speaking soldier in the region (russian)
		"f1000_rtrg0010", -- Miller: beyond there is outside the mission area
		"f1000_esrg1610", -- Ocelot: the gate's closed, what about the side entrance?
		"f1000_rtrg0690", -- Miller: the language specialist is cooperative, free life like folks in the west
		"f1000_rtrg0040", -- Miller: If you want to continue the mission, move away from the chopper
		"f1000_esrg1650", -- Ocelot: looks muddy, crawling would provide great cover
		"f1000_rtrg9020", -- Miller: mission complete, phew, at least you made it out in one piece
		"f1000_rtrg0910", -- Miller: damn they're still on alert.
		"f1000_rtrg0015", -- Ocelot: watch it, any further and you'll leave the mission area
		"f1000_esrg1620", -- Ocelot: that's the mine's perimeter fence
		"f1000_rtrg0020", -- Miller: what's wrong boss, mission abort?
		"f1000_esrg1630", -- Ocelot: security's tight & it's a narrow space, how about go below
		"f1000_rtrg0030", -- Miller: once you're on that chopper you're aborting the mission, are you giving up?!
		"f1000_esrg1640", -- Ocelot: crawling through the mud provides great camo, particularly when your close to the enemmy
		"f1000_rtrg9010", -- Miller: mission complete, that was rough || mission complete, I know we can do better next time
		"f1000_rtrg0900", -- Miller: you lost em, you need to focus boss
		"f1000_rtrg0050", -- Miller: roger dispatching chopper
		"f1000_esrg1660", -- Ocelot: you should be able to pick the lock on that door
		"f1000_rtrg9030", -- Miller: mission complete, great work || mission complete, boss
		"f1000_rtrg0920", -- Miller: we got enemy movement, security around the target will be light
		"f1000_rtrg0060", -- Miller: roger
		"f1000_esrg1670", -- Ocelot: a hut; good place to stay out of sight
		"f1000_rtrg9040", -- Miller: yes mission complete, boss that was exceptional || alright mission complete boss, maybe you'll actually break a sweat next time
		"f1000_rtrg0930", -- Ocelot: enemy lost sight, they'll try to hunt you down
		"f1000_rtrg0070", -- Miller: roger that snake || boss are you sure about this?!
		"f1000_esrg1680", -- Ocelot: that's a small hut, perfect for someone to hide in
		"f1000_rtrg9050", -- Miller: mission complete and how || amazing, mission complete, that right there is why you're the best boss. the one and only
		"f1000_rtrg0940", -- Ocelot: the enemy's given up their search but they haven't given the all clear yet, stay alert
		"f1000_rtrg0080", -- Miller: open your eyes he's on our side!
		"f1000_esrg1690", -- Ocelot: the inside is pretty exposed, doesn't seem like a good hiding space
		"f1000_rtrg8010", -- Miller: you're clear of the hotzone, mission complete
		"f1000_rtrg0950", -- Ocelot: boss you don't understand what he said? makes sense, that horn
		"f1000_rtrg0085", -- Ocelot: what are you doing that's one of ours
		"f1000_esrg1700", -- Ocelot: looks like a rest tent, isn't a clear view inside. perfect place to hide
		"f1000_rtrg8020", -- Miller: mission complete, and the target's safe
		"f1000_rtrg0960", -- Miller: that soviet soldier in the green beret is speaking english. must be a language specialist (russian)
		"f1000_rtrg0090", -- Ocelot: I'll ready another chopper boss (begrudgingly)
		"f1000_esrg1710", -- Ocelot: that tent must be for resting between shifts, not much room 
		"f1000_rtrg8030", -- Miller: alright out of the hotzone, mission complete
		"f1000_rtrg0970", -- Miller: interpreter cooperative- always dreamed of the free life like folks in the west
		"f1000_rtrg0100", -- Miller: subject onboard, leave the rest to us
		"f1000_esrg1720", -- Ocelot: looks like the power system, destroying will limit visibility
		"f1000_rtrg8040", -- Miller: we can't let them follow you, throw them off your tail first
		"f1000_rtrg0980", -- Miller: cooperative friendly language specialist
		"f1000_rtrg0160", -- Ocelot: it'll be dawn soon, easier to see but goes for the enemy as well. also route shift
		"f1000_rtrg0105", -- Ocelot: alright, we'll bring em out
		"f1000_esrg1730", -- Ocelot: your visibility in trees is bad but cover is good
		"f1000_rtrg8050", -- Miller: alright, coast is clear, mission complete
		"f1000_rtrg0990", -- Miller: one of the soldiers you extracted was a language specialist, very cooperative
		"f1000_rtrg0170", -- Ocelot: about time for a guard shift, be prepared for a different guard detail
		"f1000_rtrg0110", -- Ocelot: ENOUGH what do you think you're doing?
		"f1000_esrg1740", -- Ocelot: there's some high ground good for recon. give you a view of the entire base
		"f1000_rtrg8060", -- Miller: what, you're going back?!?
		"f1000_rtrg1000", -- Miller: english interpreter extracted is very cooperative
		"f1000_rtrg0180", -- Ocelot: rain should help to mask footsteps
		"f1000_rtrg0115", -- ENOUGH what do you think you're doing?
		"f1000_esrg1750", -- Ocelot: you'll have a clear view from the side of the road. good place to do your search & get spotted
		"f1000_rtrg0190", -- Ocelot: it's getting misty. that'll keep visibility down, but watch you don't walk right into an enemy
		"f1000_rtrg0120", -- Miller: boss that's a serious injury it won't heal on its own, treat with first aid 
		"f1000_esrg1760", -- Ocelot: a place with that kind of visibility will test your powers of observation. mark as many as you can to reduce being seen
		"f1000_rtrg0200", -- Ocelot: Mist. Wait is it them?
		"f1000_rtrg0125", -- Ocelot: that's a serious injury, find cover and use first aid
		"f1000_esrg1770", -- Ocelot: banana field, all that cover = good cover. visibility won't be good, keep ears open
		"f1000_rtrg0210", -- Ocelot: So a sandstorm's come in. sandstorms effectively make you blind and deaf. but that goes for the enemy too. use the situation to your advantage
		"f1000_rtrg0130", -- Miller: so your suppressor is worn out, gun is loud as any, be careful
		"f1000_esrg1780", -- Ocelot: trees and underbrush good cover, but not the best places to look for the target. useful situations for cqc
		"f1000_rtrg0135", -- Ocelot: your suppressor's no longer effective. bear in mind your weapon will be loud from now on.
		"f1000_esrg1790", -- (empty)
		"f1000_rtrg0140", -- Ocelot: destroying anti air unit put a hole in their defenses the chopper can come in closer now
		"f1000_esrg1800", -- (empty)
		"f1000_rtrg0145", -- Ocelot: good you took out an anti air emplacement
		"f1000_esrg1810", -- Ocelot: anyone who can tell you the name of that village is long gone. only a dozen or so houses. crops are not special.
		"f1000_rtrg0150", -- Ocelot: I've updated the information on your idroid.
		"f1000_esrg1820", -- Ocelot: worsening conflict robbed the villagers of peace. it's a ghost town. occupied by factions
		"f1000_rtrg0155", -- Ocelot: I've sent new information to your idroid, take a look
		"f1000_esrg1830", -- Ocelot: rock is cradle of spirits
		"f1000_rtrg0225", -- Ocelot: you're outside your weapons effective range, why not try getting a little closer to your target? take bullet drop into account -tip
		"f1000_esrg1840", -- Ocelot: steel barricades on the hillside, heh, talk about an iron curtain
		"f1000_oprg0015", -- Ocelot: take a look at your map on idroid & use the enemy locations to help you plan an infil route
		"f1000_esrg1850", -- Ocelot: gate's wide open not stealthy approach
		"f1000_oprg0025", -- Ocelot: if you don't want the enemy to spot you, stay as low as possible and stick to walls 
		"f1000_oprg0095", -- null
		"f1000_esrg1860", -- Ocelot: building's only half finished but looks like someone's in there. they keep adding to the building as they need it
		"f1000_rtrg0300", -- Miller: Vehicles aren't your best bet for traveling offroad. How about going on horseback?
		"f1000_oprg0035", -- null
		"f1000_rtrg0310", -- Miller: you're still pretty far from the objective, why not steal an enemy vehicle
		"f1000_rtrg2620", -- Miller: target extracted objective complete we'll let them know he's been dealt with. objectives complete, get on the chopper
		"f1000_oprg0045", -- null
		"f1000_rtrg0320", -- Miller: boss we have an emergency get back to mother base now I mean it
		"f1000_rtrg2630", -- Miller: at mother base target confirmed dead, objectives complete exfil by chopper or on land
		"f1000_oprg0055", -- Ocelot: sticking to cover lets you get a beat on the enemy's position. know where your gonna shoot before you stick your head out
		"f1000_rtrg0330", -- Miller: A long time in the field is bad for the body and mind. I think it's time you take a break- do it for me
		"f1000_rtrg2640", -- Miller: boss, continue out of the mission area to complete the mission
		"f1000_oprg0065", -- null
		"f1000_oprg0180", -- Miller: mission objs clear, time to rtb. call in the chopper
		"f1000_rtrg0340", -- Miller: long time in the field is bad for the body and mind, I think it's time you take a break, do it for me
		"f1000_rtrg2650", -- Miller: you're clear of the hotzone, mission complete
		"f1000_oprg0075", -- null
		"f1000_rtrg0350", -- Miller: boss, do you realize what time it is right now? do yourself a favor and take a break
		"f1000_rtrg2660", -- Miller: boss, get out of there and find a place to recover. you can recover by resting don't overdo it out there
		"f1000_oprg0085", -- Ocelot: targeting from a distance, effective range tip
		"f1000_oprg0105", -- Ocelot: if we had a good military dog we'd have an easier time locating people
		"f1000_rtrg2060", -- there's one of the prisoners, check to see if that's target
		"f1000_oprg0115", -- why don't you get DD out there, put his nose to good use
		"f1000_rtrg2070", -- Miller: it's too dangerous to make contact iwth the prisoner right now. wait for the enemy to stand down first
		"f1000_oprg0125", -- Miller: binos are equiped with dir micro tip
		"f1000_rtrg2080", -- Miller: that's the target prisoner, he's injured, half starved too. no way he could stand the shock of a fulton, get em out by chopper
		"f1000_oprg0135", -- Miller: (beep beep) you've completed your objective, now get out of the hotzone.
		"f1000_rtrg2090", -- Miller: he's coming too huh? || subject on board leave the rest to us
		"f1000_rtrg7010", -- Miller: you've completed objective now get out of hotzone
		"f1000_rtrg2100", -- Miller: dead huh? poor sonofabitch, boss let's focus on the contract. head for the village
		"f1000_oprg0145", -- Miller: i've sent vis of the targets to your idroid take a good look
		"f1000_rtrg2510", -- Miller: target neutralized, one remaining
		"f1000_esrg0010", -- Miller: is that the target? take a good look as his face, we need to id the target
		"f1000_rtrg0360", -- Miller: completed without being spotted, I can't believe it even after 9 years in that coma
		"f1000_rtrg2670", -- Miller: boss, get out of there and find a place to recover. you can recover by resting don't overdo it out there
		"f1000_rtrg0370", -- Miller: mission complete without a single kill, no sense without a profit huh? smooth work boss
		"f1000_rtrg0126", -- Ocelot: boss that is a serious injury, perform first aid now, that wound won't heal on its own
		"f1000_rtrg0380", -- Miller: job done but are you sure you're feel up for this boss
		"f1000_rtrg2680", -- Miller: you can bring up the target's location on your idroid
		"f1000_rtrg0390", -- Miller: just one of those days huh? happens to the best of us, sometimes
		"f1000_rtrg0400", -- Ocelot: that soldier you extracted gave us some information.
		"f1000_rtrg2690", -- Miller: you can find its location on your idroid 
		"f1000_mprg0010", -- Ocelot: reports of a pashto interpretter in that area
		"f1000_rtrg2700", -- Miller: you can check the map on your idroid
		"f1000_mprg0020", -- Ocelot: heard there's an afrikaans interpreter
		"f1000_rtrg2710", -- Miller: open the menu tab then mission info from there you can find additional mission information
		"f1000_mprg0030", -- Ocelot: there should be a kikongo interpreter in the area
		"f1000_rtrg2720", -- Miller: careful when you're firing that thing, enemy might hear it
		"f1000_mprg0040", -- Ocelot: if you extract him, could be plenty useful for us.
		"f1000_rtrg2730", -- Ocelot: any time you need advice just give me a call 
		"f1000_rtrg0410", -- Miller: got a lead from some work from soldier you extracted, added to sideops list. up to you boss
		"f1000_rtrg2740", -- Ocelot: Hm. That's Marking. Focus on a threat and it'll be marked automatically. marking -tips
		"f1000_rtrg0420", -- Miller: whether we take it or not is up to you boss. added to your sideops list. take a look
		"f1000_rtrg2750", -- Miller: take a look through your binos and you can mark him. marked enemmies can be sensed nearby
		"f1000_rtrg0430", -- Ocelot: soldiers are using new gear, maybe resistance against your tactics
		"f1000_rtrg2760", -- Ocelot: take a look at the map on your idroid and use enemy position to plan an infil route
		"f1000_rtrg0440", -- Miller: I put the mission details on a cassette tape, refer to it if you decide to accept the mission
		"f1000_rtrg2770", -- Miller: watch yourself if you let go it's a long way down. just move carefully when you come back
		"f1000_rtrg0450", -- Ocelot: you can listen to the tapes you picked up using your idroid. if your interested why not play while on the move
		"f1000_rtrg2780", -- Miller: you can move back and forth while hanging, you can also climb back up or let go and drop just be sure of your surroundings before you do
		"f1000_rtrg0460", -- Ocelot: gmp explanation
		"f1000_rtrg2790", -- Miller: out of ammo? take some from an enemy weapon
		"f1000_rtrg0470", -- Ocelot: you hear that? we're intercepting the soviets communications and passing them onto you but you need an inter
		"f1000_rtrg2800", -- Miller: out of ammo? take some from an enemy weapon
		"f1000_rtrg0480", -- Miller: there's supplies waiting for you at the mission start point and details, you can find the location on your idroid
		"f1000_rtrg2810", -- Miller: out of ammo? let the support unit help out if you need to restock. transmit request from idroid and i'll send
		"f1000_rtrg0490", -- Miller: you're quite a distance from the mission start point, it would probably be faster to call chopper
		"f1000_rtrg2820", -- Ocelot: you can take ammunition from weapons dropped by the enemy of course thats only if the ammo type match up
		"f1000_rtrg0500", -- Miller: alright head for mission start point.
		"f1000_rtrg2830", -- Miller: Snake, youre out of ammo.
		"f1000_rtrg0510", -- Miller: boss, use your idroid to select a destination
		"f1000_rtrg2840", -- Miller: cqc is effective for dealing with nearby enemies
		"f1000_rtrg0520", -- Miller: you're leaving the mission area are you aborting the mission?
		"f1000_rtrg2850", -- Ocelot: outside your weapons effective range tip
		"f1000_rtrg0530", -- Miller: boss, fulton designed for personnel can't carry that cargo develop special
		"f1000_rtrg2860", -- Miller: your tranquilizer gun's effective range isnt that great, bullet drop tip
		"f1000_rtrg0540", -- Miller: wait a minute boss, theres a risk the fulton might get spotted by nearby enemies tip
		"f1000_rtrg2870", -- Miller: you placed some c4. get to a safe distance before detonating it
		"f1000_rtrg0550", -- Ocelot: you can place markers on your map wherever youd like I'd recommend to keep from getting lost
		"f1000_rtrg2880", -- Miller: c4 tip
		"f1000_rtrg0560", -- Miller: those are raw diamonds, collecting will raise gmp
		"f1000_rtrg2890", -- Ocelot: understanding the language and interpretting are two different things tip
		"f1000_rtrg0570", -- Miller: cargo's got raw materials, they're using those bands on the outside to tell them apart tip
		"f1000_rtrg2900", -- Ocelot: i'll let you know if we find a soldier with a russian interpretter skill
		"f1000_rtrg0580", -- Miller: those materials have already been processed. not much but we can use them straight away
		"f1000_rtrg2910", -- Ocelot: dont leave bodies out in the open, find some place to drop them out of sight
		"f1000_rtrg0590", -- Miller: emblem customization tip
		"f1000_rtrg2920", -- Ocelot: grey wolves in the area
		"f1000_rtrg0600", -- Ocelot: if you run into trouble give us a call, we may be able to offer some advice
		"f1000_rtrg2930", -- Ocelot: side-striped jackals in the area
		"f1000_rtrg0610", -- Miller: after grabbing an enemy, try interrogating them tip
		"f1000_rtrg2940", -- Ocelot: african wild dogs in the area
		"f1000_esrg0020", -- Ocelot: a gun emplacement, might want to use it before the enemy uses it on you 
		"f1000_rtrg2950", -- Ocelot: brown bears
		"f1000_esrg0030", -- Ocelot: if youve got some explosives destroying emplacement would be easy
		"f1000_rtrg2960", -- Ocelot: eurasian brown bears
		"f1000_esrg0040", -- Ocelot: mortar shells travel in curved projectory tip
		"f1000_rtrg2970", -- Ocelot: planning to walk the whole wilderness on foot? use your horse.
		"f1000_esrg0050", -- Ocelot: mortars do a lot of damage tip
		"f1000_rtrg2980", -- Ocelot: suns down already? it goes without saying that darkness is good for infiltration. but your vision will be affected just the same.
		"f1000_esrg0060", -- Ocelot: that's a walker gear, fast and can operate offroad too. you'd do best to avoid them
		"f1000_rtrg2990", -- Ocelot: if you need to pass the time, go ahead and smoke that cigar of your's. just remember, miller can't wait forever. 
		"f1000_esrg0070", -- Ocelot: that's a walker gear, you could steal it for yourself or destroy it if you got explosives on you
		"f1000_rtrg3000", -- Ocelot: how bout it, can you see the village from there? use binos to recon the place
		"f1000_esrg0080", -- Ocelot: so this is raven territory. totem
		"f1000_rtrg3010", -- Ocelot: look at where the enemies are stationed- look at their gear, take it all in. There should be a command post somewhere, see any buildings with tighter security?
		"f1000_esrg0090", -- Ocelot: I hope to hell you're not planning on catching and eating that, save the survival routine for another time
		"f1000_rtrg3020", -- Ocelot: a parabolic antenna, could be intel of something in there
		"f1000_esrg0100", -- Ocelot: hornbill, rhino horn
		"f1000_rtrg3030", -- Miller: thinking of using c4? tip
		"f1000_esrg0110", -- Ocelot: black stork
		"f1000_rtrg3040", -- Miller: alright now get to a safe distance before you set it off. to detonate it, hold the ready button then press the action button.
		"f1000_esrg0120", -- Ocelot: ill be damned, sacred ibis
		"f1000_mprg0060", -- Miller: that's the target's predicted field of movement. it's up to you to find em 
		"f1000_esrg0130", -- Ocelot: a vulture
		"f1000_mprg0070", -- Miller: that's the target's predicted field of movement, the target should be somewhere in that area
		"f1000_esrg0140", -- Ocelot: martial eagle
		"f1000_mprg0080", -- Miller: the target is somewhere in the area, find him
		"f1000_esrg0150", -- Ocelot: rodent is gerbil
		"f1000_mprg0090", -- Miller: the target is there, whats your approach gonna be?
		"f1000_esrg0160", -- Ocelot: a hedgehog
		"f1000_mprg0100", -- Miller: there's the target.
		"f1000_esrg0170", -- Ocelot: an afghan pika
		"f1000_mprg0110", -- Miller: thats the target's predicted field of movement, we need more intel
		"f1000_esrg0180", -- Ocelot: a karakil sheep
		"f1000_mprg0120", -- Miller: that's the target's predicted field, we could nail down a location if we had another lead
		"f1000_esrg0190", -- Ocelot: a cashmere goat
		"f1000_mprg0130", -- Miller: we have a fix on the targets location, head over there and extract him
		"f1000_esrg0200", -- Ocelot: a nubian goat
		"f1000_mprg0140", -- Miller: there's the target, destroy that and we bring down the enemy's communications.
		"f1000_esrg0210", -- Ocelot: a boar goat has delicous meat
		"f1000_mprg0160", -- Miller: that's the target, take em out
		"f1000_esrg0220", -- Ocelot: a wild donkey, hard time riding it
		"f1000_esrg0230", -- Ocelot: zebras around
		"f1000_mprg0150", -- Ocelot: dowan deh har means sloped town.
		"f1000_esrg0240", -- Ocelot: an okapi =0
		"f1000_mprg0180", -- Miller: high ground, looks perfect for reconning the village.
		"f1000_esrg0250", -- Ocelot: a wolf
		"f1000_mprg0170", -- Miller: that's the target's predicted location, they should be somewhere in that area
		"f1000_esrg0260", -- Ocelot: an african wild dog
		"f1000_esrg0540", -- Miller: that's the target, get him out of there
		"f1000_esrg0270", -- Ocelot: a jackal side-striped 
		"f1000_esrg0550", -- Miller: there's the target, no major injuries, doubt he'll have the strength to walk though. go ahead and fulton extract him
		"f1000_esrg0280", -- Ocelot: a black sidestriped jackal anubis
		"f1000_esrg0570", -- Miller: that's the target but badly wounded, don't expect much action out of him, what are you gonna do?
		"f1000_esrg0290", -- Ocelot: a brown bear
		"f1000_esrg0580", -- Miller:  that's the target, he's badly wounded.
		"f1000_rtrg0620", -- Ocelot: good, you captured it alive.
		"f1000_esrg0590", -- Miller: hm, is that the target?
		"f1000_rtrg0630", -- Ocelot: that's a pretty rare animal you caught.
		"f1000_esrg0600", -- Miller: is that him? take a good look at his face, we need to id the target
		"f1000_rtrg0640", -- Ocelot: tsuchinoko =0
		"f1000_esrg0560", -- Miller: there's the target, no major injuries, you shouldn't have any trouble fulton extracting him
		"f1000_rtrg0650", -- Ocelot: a tree pinguin
		"f1000_esrg0610", -- Ocelot: that's one of the targets, eliminate him || eliminate that target
		"f1000_rtrg0660", -- Ocelot: a karakal 
		"f1000_esrg0620", -- Miller: that's the target, he looks looks injured 
		"f1000_rtrg0670", -- Ocelot: a fox
		"f1000_esrg0630", -- Ocelot: boss they'll kill him if you let this carry on. hurry and rescue him
		"f1000_rtrg0680", -- Ocelot: honey badger
		"f1000_esrg0650", -- Ocelot: a watch tower, you can use it to search for target
		"f1000_esrg0420", -- Ocelot: a soviet soldier 
		"f1000_esrg0660", -- Ocelot: target should be eaiser to spot from the top of that cliff, see anywhere you can climb up?
		"f1000_esrg0430", -- Ocelot: soviet solder cont.
		"f1000_esrg0670", -- Miller: he's too far away, can't tell if he's the target from that distance. think you can get closer?
		"f1000_esrg0460", -- Ocelot: a zrs security guard
		"f1000_esrg0680", -- Miller: the target; don't waste an opportunity to eliminate him.
		"f1000_esrg0470", -- Miller: so those xof scum live on even after skull face's death, maybe they've returned to the original chain of command but zero 
		"f1000_esrg0690", -- Miller: target confirmed dead, forget about him boss we need to move on
		"f1000_esrg0530", -- Miller: that's one of us, a dd soldier
		"f1000_esrg0700", -- Miller: target's barely alive, he won't last long
		"f1000_oprg0150", -- Ocelot: dhorse can get you places fast and knows rough terrain
		"f1000_esrg0640", -- Miller: an intel showing their security layout. that might lead us to targets, can you get to that file? we'll analyze it here.
		"f1000_oprg0160", -- Ocelot: like your horse, ddog follows commands tip 
		"f1000_esrg0710", -- Miller: he's not the target || that soldier doesn't look like the target
		"f1000_oprg0170", -- Ocelot: quiet commands two tasks tip
		"f1000_esrg0720", -- Miller: try interrogating the enemy, they may know the target location
		"f1000_rtrg1010", -- Miller: boss we have an emergency, mother base is under attack, the enemy is overrun one of our platforms and are holding staff hostage
		"f1000_rtrg1020", -- Miller: boss Mother base under attack again. the security team couldn't hold them back, we need more security team
		"f1000_rtrg1030", -- Miller: an update boss, the security team retook the platform the enemy have captured. all but one of the enemies were killed
		"f1000_rtrg1040", -- Miller: boss listen a moment, I want to bolster our security team for platforms so from now on give some thought to building up a security team. without a strong deterrent we're just asking to get attacked again
		"f1000_esrg0910", -- Ocelot: (beep beep) afrikaaner CFA soldiers that look different from UNITA
		"f1000_rtrg0700", -- Miller: there's a english specialist who can translate to russion in the area
		"f1000_esrg1030", -- Miller: armored vehicle, you don't want to take on that cannon
		"f1000_rtrg0710", -- Miller: what's this?
		"f1000_rtrg0730", -- Miller: use your binocurlars to see what's going on inside base
		"f1000_rtrg0720", -- Miller: there it is!
		"f1000_rtrg0740", -- Miller: eyes open, boss.
		"f1000_rtrg0750", -- Miller: they've really tightended security, eyes open boss
		"f1000_rtrg0760", -- Miller: keep low, check your surroundings carefully
		"f1000_rtrg0770", -- Miller: it's the enemy, don't let em see you!
		"f1000_rtrg0780", -- Miller: enemy soldier, hide, quickly!
		"f1000_rtrg0790", -- Miller: watch out, the enemy's close.
		"f1000_rtrg0800", -- Miller: they spotted you, get away from there now!
		"f1000_rtrg0810", -- Miller: the enemy's trying to take you out, don't push yourself, fall back to a safe position
		"f1000_rtrg0820", -- Ocelot: boss, sometimes it's best to fall back. the enemy won't want to chase you too far
		"f1000_rtrg0870", -- Miller: pull back now, the enemy reinforcements are coming
		"f1000_rtrg0880", -- Miller: boss they've set up checkpoints, if you plan on escaping by land you'll have to slip through somehow
		"f1000_rtrg0890", -- Miller: looks like they've lost visual on you
		"f1000_rtrg1005", -- Miller: one of the soviet soldiers you extracted was an english interpreter. very cooperative
		"f1000_rtrg1050", -- Miller: he speaks russian, what we need is an interpretter. intel gathering is a problem if you don't speak the enemy's language. need a staff member with the interpretter skill to do simul interpretation
		"f1000_rtrg1060", -- Ocelot: reinforcements from the south- they're moving to surround you.
		"f1000_rtrg1070", -- Miller: they saw you, deal with them
		"f1000_rtrg1080", -- Miller: move!
		"f1000_rtrg1090", -- Miller: you should lower your stance.
		"f1000_rtrg1100", -- Ocelot: if you dont want the enemy to spot you, stay low as possible. sticking to walls is also a good idea
		"f1000_rtrg1110", -- Miller: interrogete him, find out what he knows 
		"f1000_rtrg1120", -- Miller: wait, theres something there, did they set a trap, look carefully
		"f1000_rtrg1130", -- Miller: boss you've entered a building always keep an escape route in mind when indoors, otherwise you'll have nowhere to run
		"f1000_rtrg1140", -- Miller: boss, stop!
		"f1000_rtrg1150", -- Miller: hey hold on thats- what's gotten into you?!?
		"f1000_rtrg1160", -- Miller: boss, what the hell was that?!?
		"f1000_rtrg1170", -- Miller: oh I'm gonna tell everyone about this!
		"f1000_rtrg1180", -- Miller: if you wanna extract him, call in the chopper and we'll get him out
		"f1000_rtrg1200", -- Miller: security's pretty light around target this could be your best chance
		"f1000_rtrg1210", -- Miller: huh badly wounded, we can rule out a fulton extraction. we'll just have to do it by chopper. call the chopper from your idroid boss
		"f1000_rtrg1220", -- Miller: get the targets to the rv
		"f1000_rtrg1230", -- Ocelot: if you need a sniper rifle, call in a supply drop
		"f1000_rtrg1240", -- Ocelot: from that range you'd be better off with a sniper rifle. if you need one, just order it at mother base. 
		"f1000_rtrg1250", -- Miller: that's the target, eliminate him however you see fit
		"f1000_rtrg1260", -- Miller: that's the target, how you eliminate them is up to you boss
		"f1000_rtrg1270", -- Miller: boss head toward the objective
		"f1000_rtrg1280", -- Miller: look for the target
		"f1000_rtrg1290", -- Ocelot: locate the target
		"f1000_rtrg1300", -- Miller: hurry up and carry the target toward the objective
		"f1000_rtrg1310", -- Miller: where's the target? has to be around there somehwere
		"f1000_rtrg1320", -- Miller: you have to extract the target || get em out of there
		"f1000_rtrg1330", -- Miller: i need you to get back to the mission
		"f1000_rtrg1340", -- Miller: if you're not sure how to proceed contact me by radio. I might have just the advice you need
		"f1000_rtrg1350", -- Miller: boss lets try somewhere else?
		"f1000_rtrg1360", -- Miller: your objective's complete exfiltrate the area
		"f1000_rtrg1370", -- Miller: good you completed the obejctive now get out of there. exfiltrate by chopper or on land 
		"f1000_rtrg1380", -- Miller: target extracted. exfiltrate the hotzone boss.
		"f1000_rtrg1390", -- Miller: either exfiltrate by chopper, or make your way outside the mission area by land
		"f1000_rtrg1400", -- Miller: objetives complete, get on the chopper
		"f1000_rtrg1420", -- Miller: continue out of mission area to complete mission
		"f1000_rtrg1405", -- Miller: exfiltrate by chopper or on land || you've completed your objective get out of the hotzone 
		"f1000_rtrg1410", -- Miller: no time to hang around, get out of the hotzone
		"f1000_rtrg1430", -- Miller: i marked the hotzone on your map, check your idroid
		"f1000_rtrg1440", -- Miller: hurry you've got to get out of there || hurry up and get out of there
		"f1000_rtrg1450", -- Miller: i sent vis of the targets to your idroid, take a good look
		"f1000_rtrg1460", -- Miller: how bout you try listening to the tape
		"f1000_rtrg1470", -- Miller: youve run out of explosive, see anything in the area? take a look around. if you need a supply drop call it in from your idroid
		"f1000_rtrg1480", -- (empty)
		"f1000_rtrg1490", -- Miller: i've updated the info on your idroid take a look
		"f1000_rtrg1500", -- Miller: i've updated your map info check it on your idroid 
		"f1000_rtrg1510", -- Miller: info updated it's on your idroid 
		"f1000_rtrg1520", -- Ocelot: I've updated the information on your idroid 
		"f1000_rtrg1530", -- Miller: you got an intel file.
		"f1000_rtrg1540", -- Miller: analyzing the intel file you picked up. unfortunately there's nothing new in it
		"f1000_rtrg1550", -- Miller: ok subject is in
		"f1000_rtrg1560", -- Miller: target extraction confirmed || alright target extracted
		"f1000_rtrg1570", -- Miller: is that everyone?
		"f1000_rtrg1580", -- Miller: alright, target extracted || your gonna extract him?
		"f1000_rtrg1590", -- Miller: fulton system has a low success rate for wounded extractees. the strain on the body would be too much. it would be better off if you used the chopper instead
		"f1000_rtrg1600", -- Miller: we're better off extracting the wounded via chopper
		"f1000_rtrg1610", -- Miller: boss just to make sure we're on the same page here, the fulton recovery system can't go through the ceiling cant go through the cieling. make sure there's nothing overhead first
		"f1000_rtrg1620", -- Miller: cooperative interpreter you extracted. fan of the legendary big boss
		"f1000_rtrg1630", -- Miller: interpreter you extracted is a fan of the legendary big boss
		"f1000_rtrg1640", -- Ocelot: that's the way! || Miller: nice work, keep it up!
		"f1000_rtrg1650", -- Miller: raughsh, now that's some lateral thinking
		"f1000_rtrg1660", -- Miller: nearly there snake || you can do it boss!
		"f1000_rtrg1670", -- Miller: 6 minutes remaining
		"f1000_rtrg1680", -- Ocelot: boss leave the intel files til later the enemy is on combat alert
		"f1000_rtrg1690", -- Ocelot: sigh, that the remains of an intel file? no way to decipher it now
		"f1000_rtrg1700", -- Ocelot: sigh, that the remains of an intel file? no way to decipher it now. what now, I guess you'll have to search another outpost
		"f1000_rtrg1710", -- Miller: russian language interpretation is ready to go. now you'll know what soviet soldiers are saying, you can even interrogate them.
		"f1000_rtrg1720", -- Miller: analyzing the intel file you picked up. hrm there's no new information, hurry up and get out of there
		"f1000_rtrg1730", -- Miller: they killed a target! || another one dead
		"f1000_rtrg1740", -- Miller: I'm changing the rv, confirm it on your idroid || new rv marked I'll send its location
		"f1000_rtrg1750", -- Miller: I'll send the chopper, get the target to the rv
		"f1000_rtrg1760", -- Miller: ok now use your idroid to call call the chopper for pickup
		"f1000_rtrg1820", -- Miller: lz (falter) confirmed || roger that snake
		"f1000_rtrg1770", -- Miller: use a flare grenade to call chopper to your current position, just don't forget you might put it in danger of getting shot down
		"f1000_rtrg1780", -- Miller: boss you can't call the choper there
		"f1000_rtrg1790", -- Miller: choose an lz and we'll send the chopper there 
		"f1000_rtrg1800", -- Miller: keep an eye out for nearby enemies, they could try to shoot down the chopper 
		"f1000_rtrg1810", -- Miller: roger dispatching chopper
		"f1000_rtrg1830", -- Miller: that's a negative, can't send a chopper til youve eliminated the enemy, sorry boss it's all up to you
		"f1000_rtrg1840", -- Miller: the chopper will be arriving any minute, hurry to the rv
		"f1000_rtrg1850", -- Miller: the enemy's anti air radar has picked up our chopper, double time it to the rv 
		"f1000_rtrg1860", -- Miller: get to chopper asap!
		"f1000_rtrg1870", -- Miller: alright get in time to go!
		"f1000_rtrg1880", -- Miller: alright, take the chopper out of there.
		"f1000_rtrg1890", -- Miller: alright, now get out of there!
		"f1000_rtrg1900", -- Miller: if you wanna continue mission move away from chopper. I'm pulling the chopper out for now.
		"f1000_rtrg1910", -- Miller: they shot down the chopper! I'll prep a backup chopper just make sure you don't send it somewhere hot
		"f1000_rtrg1920", -- Miller: not again, we lost another chopper! boss get it together, make sure the enemy's clear before you call in the chopper!
		"f1000_rtrg1930", -- Miller: DAMN IT THAT'S ANOTHER CHOPPER DOWN WHAT'S GOING ON OUT THERE? snake the heavy handed approach isn't going to work
		"f1000_rtrg1940", -- Miller: they shot down the chopper, ill ready a backup chopper, call it on your idroid
		"f1000_rtrg1950", -- Miller: enemy chopper inbound heading to the rv. it's coming after our's, take it out
		"f1000_rtrg1960", -- Ocelot: that's the way, enemy chopper confirmed down
		"f1000_rtrg1970", -- Miller: good work the chopper's touching down get on.
		"f1000_rtrg1980", -- Miller: you can link up with the chopper at the designated rv, head to the rv
		"f1000_rtrg1990", -- Miller: the choppers waiting at the rv, hurry.
		"f1000_rtrg2000", -- Miller: I'm sending another chopper, hang in there.
		"f1000_rtrg2010", -- Ocelot: it's an enemy gaurd post, watch yourself
		"f1000_rtrg2020", -- Miller: you destroyed their antiair radar? it wasn't one of the targets, but it's put a hole in their air survellance. the chopper can get in close now, you can designate an area near the outpost [new lz nearby notification]
		"f1000_rtrg2030", -- Miller: boss, that prisoner we rescued provided some intel.
		"f1000_rtrg2040", -- Miller: that prisoner doesn't look like the target
		"f1000_rtrg2050", -- Ocelot: a prisoner, is that the target? even if it isn't you might get some information if you wrestle him
		"f1000_rtrg2110", -- Miller: dead huh? poor sonofabitch, boss let's focus on the contract
		"f1000_rtrg2120", -- Miller: is that him? take a good look at their faces so we can id the targets
		"f1000_rtrg2130", -- Miller: check target's current location.
		"f1000_rtrg2140", -- Miller: snake, I marked targets position on your idroid!
		"f1000_rtrg2150", -- Miller: we gotta fix on the target.
		"f1000_rtrg2160", -- Miller: we know where to find the target. check your idroid.
		"f1000_rtrg2170", -- Miller: there, that's the target
		"f1000_rtrg2180", -- Miller: that's the target (sideop voice)
		"f1000_rtrg2190", -- Miller: that looks like the target
		"f1000_rtrg2200", -- Miller: that's one of the targets
		"f1000_rtrg2210", -- Miller: i sent the information to your map screen but as leads go this covers too wide an area
		"f1000_rtrg2220", -- Miller: ok your map information's updated
		"f1000_rtrg2230", -- Miller: the prisoner you extracted knew where the target is, I'm updating take a look
		"f1000_rtrg2240", -- Miller: contact is a no go for now, pull back and wait till things die down || enemy's looking for you wait until contact
		"f1000_rtrg2250", -- Miller: it's too dangerous to try and contact the target! wait for the enemy to stand down
		"f1000_rtrg2260", -- Miller: don't make contact with the target yet, wait till the area's clear of enemies || enemy too close, wait to contact target
		"f1000_rtrg2270", -- Miller: they've lightened their security, make contact with the target || enemy's away make contact with 
		"f1000_rtrg2280", -- Miller: they're standing down make contact with the target
		"f1000_rtrg2290", -- Miller: good the target's alone now, make contact with the target.
		"f1000_rtrg2300", -- Miller: so you've spotted the target.
		"f1000_rtrg2310", -- Miller: not good, the enemy's spotted target. get him out of there!
		"f1000_rtrg2320", -- Miller: boss you're just leaving the target? || your just leaving him there?
		"f1000_rtrg2330", -- Miller: boss they've discovered the target's escaped. if they find him they'll kill him you gotta get to him first
		"f1000_rtrg2340", -- Miller: the target's safety is your top priority, eliminate the threat.
		"f1000_rtrg2350", -- Miller: not good, the target is severely wounded. the fulton has a low success rate explanation
		"f1000_rtrg2360", -- Miller: is that the target? (frustrated)
		"f1000_rtrg2370", -- Miller: huh, that's the target, target extracted (mild surprise) I'll tell the client they've been "eliminated".
		"f1000_rtrg2380", -- Miller: what are you planning on doing boss? putting the target to sleep doen'st count as eliminating them, neither does knocking them out.
		"f1000_rtrg2390", -- Miller: target confirmed dead.
		"f1000_rtrg2400", -- Miller: hey, that was- target confirmed dead, impressive work boss 
		"f1000_rtrg2410", -- Miller: extracting the target. our contract was to kill the target but Ill go with your decision
		"f1000_rtrg2420", -- Miller: boss about the fulton extraction of that target- it was a failure, target's confirmed dead. there was nothing we could do.
		"f1000_rtrg2430", -- Miller: boss about the fulton extraction of that target, fulton extraction failed, that being said, the mission was to take out the target
		"f1000_rtrg2440", -- Miller: great if there's nothing in the way overhead you should be able to fulton him
		"f1000_rtrg2460", -- Miller: try making contact again
		"f1000_rtrg2470", -- Miller: what's wrong hurry and secure the target
		"f1000_rtrg2480", -- Miller: great you made it. put the target on the chopper
		"f1000_rtrg2490", -- Miller: put the target on board first || are you just gonna leave him there?
		"f1000_rtrg2500", -- Miller: target extraction confirmed, time to go
		"f1000_rtrg2520", -- Miller: target extracted, only one left
		"f1000_rtrg2530", -- Miller: target confirmed dead, your objectives complete, exfiltrate out of the hotzone by chopper or on land. dont hang around.
		"f1000_rtrg2550", -- Miller: boss, I gotta say it'd be a waste to kill him, but putting him to sleep doesn't count as eliminating him. neither does knocking him out.
		"f1000_rtrg2560", -- Miller: they're talking about something, the target? listen in and find out.
		"f1000_rtrg2570", -- Miller: we have a fix on targets location. we just have to figure out how to get close and pull him out.  check all around the target and  plan carefully before moving in
		"f1000_rtrg2580", -- Miller: great, the targets safe, put him on the chopper
		"f1000_rtrg2590", -- Miller: good we've narrowed down targets whereabouts. look another look at your idroid.
		"f1000_rtrg2600", -- Miller: ok we know where the target is. get over there, no time to waste
		"f1000_rtrg2610", -- Miller: target extracted, we'll let the client know he's been "dealt with". exfiltrate out of the hotzone by chopper or on land
		"f1000_esrg0730", -- Ocelot: a CFA merc
		"f1000_esrg0740", -- Ocelot: a rogue coyote merc
		"f1000_esrg0750", -- Miller: boss, that prisoner || another prisoner, looks like hes alive
		"f1000_esrg0760", -- Miller: a prisoner, he might have some information. if you extract him we'll see what he knows.
		"f1000_esrg0770", -- Miller: it's a prisoner, your gonna extract him? well find out if he know anything
		"f1000_esrg0780", -- Miller: a prisoner, you gonna help him?
		"f1000_esrg0790", -- Ocelot: a prisoner, you gonna help him?
		"f1000_esrg0800", -- Miller: think that prisoner will be useful?
		"f1000_esrg0810", -- Miller: a prisoner, that's not the target. don't extract him just because you feel sorry for him. we can't afford to take in people we can't use
		"f1000_esrg0820", -- Ocelot: so they posted snipers, one of them sees you he won't miss no matter how far away you are. stay alert
		"f1000_esrg0830", -- Ocelot: so they posted snipers, one of them sees you he won't miss. stay alert
		"f1000_esrg0840", -- Ocelot: not a civilian in sight. the soviets have taken complete control of the place
		"f1000_rtrg0850", -- Miller: english speaking soldier somewhere in region (russion)
		"f1000_esrg0860", -- Miller: any idea what theyre talking about? we need interpretter to translate
		"f1000_esrg0870", -- Ocelot: UNITA troops, but their gear is CFA
		"f1000_esrg0920", -- Ocelot: the CFA are highly trained
		"f1000_esrg0930", -- (empty)
		"f1000_esrg0940", -- Miller: thats a watchtower.
		"f1000_esrg0950", -- Miller: that searchlights manually operated.
		"f1000_esrg0960", -- Miller: that searchlight, stay out of the beam or the guard will spot you.
		"f1000_esrg0970", -- Miller: a surveliance camera, its feed is being monitored at their CP. take it out and guys will come running 
		"f1000_esrg0980", -- Miller: it's a surveliance camera, dont get spotted
		"f1000_esrg0990", -- Miller: an aa gun!
		"f1000_esrg1000", -- Miller: its a metal drum, they must use their color to tell them apart- that one being filled with gasoline
		"f1000_esrg1020", -- Miller: a truck, the back- IT'S EMPTY. HINT HINT, SNAKE THE BACK OF THAT TRUCK IS EMPTY, I WONDER IF YOU CAN TAKE ADVANTAGE OF THE FACT THAT THE BACK OF THAT TRUCK IS EMPTY. HM. ANYWAY IF YOU NEED ANY MORE ADVICE YOU CAN CALL ME BECAUSE MY ADVICE IS SO GODDAMNED USEFUL SOMETIMES
		"f1000_esrg1010", -- Miller: thats a military 4wheel drive.
		"f1000_esrg1040", -- Miller: without a recoiless rifle or some type of explosive ordanance, taking out tanks is no easy matter.
		"f1000_esrg1050", -- Miller: you can also call in support strike but they won't be easy to hit without immobilizing it first
		"f1000_esrg1060", -- Miller: its a guard dog, dont get too close, you wouldn't want it to start barking
		"f1000_esrg1070", -- Ocelot: a dumpster, looks big enough to hide somebody. you could stash a downed enemy in there or hide in it yourself, just don't stand near me
		"f1000_esrg1080", -- Ocelot: the power system looks big enough to run entire base
		"f1000_esrg1090", -- Ocelot: the power system looks big enough to run entire base 
		"f1000_esrg1100", -- Ocelot: a vehicle, you always were a natural behind the wheel
		"f1000_esrg1110", -- Ocelot: that's communications equipment used by the enemy outpost CP, must be how they keep in touch with HQ, if you destroy it you can -tip
		"f1000_esrg1120", -- Ocelot: that's a heavy machine gun, packs far more power than any rifle- you can use it yoursel or destroy it, either way best keep in mind that -tip
		"f1000_esrg1130", -- Ocelot: watch yourself that can send high angle fire at a distance, if you get the chance destroy it destroy it before it causes trouble
		"f1000_esrg1140", -- Miller: that's an anti air radar, not one of targets but destroying it will shut down the enemy's air survailance
		"f1000_esrg1150", -- Miller: an armored vehicle- you'll have a real problem if it spots you, be careful. remember that your top priority is targets safety
		"f1000_esrg1160", -- Ocelot: an enemy patrol chopper? they keep a tight watch in the air too. boss be careful when calling chopper, you don't want it in that thing's sight
		"f1000_esrg1170", -- Ocelot: destroying the transmitter will cut off the enemy's communications, then they can kiss their air support goodbye
		"f1000_esrg1180", -- Ocelot: anti air radar- neutralize that and our choppers can breath a lil easier
		"f1000_esrg1190", -- Ocelot: an armored vehicle- cant let it spot you, either tread carefully or neutralize it first
		"f1000_esrg1200", -- Miller: what are those guys talking about.
		"f1000_esrg1210", -- Miller: what are those guys talking about.
		"f1000_esrg1220", -- Miller: what are they talking about? if you're gonna get close, do it carefully
		"f1000_esrg1230", -- Miller: they're talking about something but they're too far away to hear. we really need to get a directional mic built into your binoculars. check your idroid -tip
		"f1000_esrg1240", -- Miller: boss, take a good look at the vi.
		"f1000_esrg1250", -- Miller: huh, is that it.
		"f1000_esrg1260", -- Ocelot: a guard post, keep your eyes open for enemies on watch
		"f1000_esrg1270", -- Miller: a guard, you could get around him, or wait for the shifts to change.
		"f1000_esrg1280", -- Ocelot: boss, you got a sniper rifle?
		"f1000_esrg1290", -- Ocelot: there's nothing wrong with doing the job from long range
		"f1000_esrg1300", -- Ocelot: if their lookouts are getting in the way, start by causing a diversion
		"f1000_esrg1310", -- Ocelot: best way to cause a diversion is to blow up an enemy vehicle or installation. if it goes well guard will go on alert and leave post
		"f1000_esrg1320", -- Ocelot: best weapon for destroying the targets will be explosives, things like grenades or c4.
		"f1000_esrg1330", -- Miller: by the way boss, I guess youve seen plenty of wild animals during mission. to tell you the truth, and environmental ngo has asked us to get animals -tip
		"f1000_esrg1340", -- Ocelot: the area around there belongs to the soviets now, local population probably packed up and left already
		"f1000_esrg1350", -- Ocelot: bitching and moaning about how the soviets used afghan government request for help as pretense for military intervention womp womp cry harder ocelot
		"f1000_esrg1360", -- Ocelot: soviets took over these villages to smoke out guerillas, but that's only creating more retaliation. retaliation breeds retaliate
		"f1000_esrg1370", -- Ocelot: lamaar khate palace means sunrise
		"f1000_esrg1380", -- Ocelot: the place was originally built by progressive royals as a seperate palace away from kabul, with its western architecture it was their -tip 
		"f1000_esrg1390", -- Ocelot: after all these years the ruins ends up in the hands of -SCOFF- soviet invaders
		"f1000_esrg1400", -- Ocelot: in any area with multiple levels, higher ground offers the advantage
		"f1000_esrg1410", -- Ocelot: a frontal assault is just asking for trouble, you'd be safer trying to find a way around
		"f1000_esrg1420", -- Ocelot: security tends to be more lax at night, not that it makes your job a picnic but still use the darkness to your advantage
		"f1000_esrg1430", -- Ocelot: wakh sind is a major outpost that links the region together, it's huge and it's position in the mountains makes it hard to attack.
		"f1000_esrg1440", -- Ocelot: houses in the village are packed together, built wherever the steep incline would support them. plenty of roofs and ease for cover, they'll never see you coming.
		"f1000_esrg1450", -- Ocelot: village name means cliff village in the dialect
		"f1000_esrg1460", -- Ocelot: some say village was originally built by alexander the great's army
		"f1000_esrg1470", -- Ocelot: that canopy is meant to camoflage it, take a good look to make sure it's empty
		"f1000_esrg1480", -- Ocelot: looks like the guard house, keeping watches in shifts means half the force is always off duty. it's deserted
		"f1000_esrg1490", -- Ocelot: looks like the guard house, keeping watches in shifts means half the force is always off duty. probably full of off-duty soldiers
		"f1000_esrg1500", -- Ocelot: that's a shed where they hang their crops to dry. it's a sturdy building, should be able to take your weight
		"f1000_esrg1510", -- (empty)
		"f1000_esrg1520", -- Ocelot: afghanistan is known for its grapes but the harvest is a long way off
		"f1000_esrg1530", -- Ocelot: a parabolic antenna, soviets must've added that themselves. meaning there's communications equipment inside? (frustrated)
		"f1000_esrg1540", -- Ocelot: an irrigation ditch. won't be long until the soviets fill it in. they've stepped up their scorched earth operation.
		"f1000_esrg1550", -- Ocelot: it's the soviet flag, hammer sickle, the workers and the peasants. hollow symbol in a place like this
		"f1000_esrg1560", -- Ocelot: that's a focal point of enemy defenses. I'd avoid a direct approach if I were you
		"f1000_esrg1570", -- Ocelot: shago kalai, it's in soviet hands now. you'll have to go into the village or take out target from a distance
		"f1000_esrg1580", -- (empty)
		"f1000_esrg1590", -- Miller: must be a temp hq for the security detail. they're probably giving the orders from there
		"f1000_esrg1600", -- Miller: must be a temp hq for the security detail. they're probably giving the orders from there
		"f1000_oprg0190", -- Miller: call the chopper from idroid, choose which lz is best. youll have to carry the target there.
		"f1000_oprg0200", -- Miller: you'll find the targets there leave no stone unturned the targets have to be somewhere
		"f1000_oprg0210", -- Miller: check the target's vi on your idroid || check the vi so you'll recognize target's face
		"f1000_oprg0220", -- Miller: I marked the target for you. extract him
		"f1000_oprg0230", -- Miller: our contract is to eliminate the target. how you do that is up to you
		"f1000_oprg0250", -- Miller: put the target on the chopper.
		"f1000_oprg0240", -- Miller: your objective is to eliminate the target, doesnt matter how
		"f1000_oprg0260", -- Miller: extract the target, I'm counting on you
		"f1000_oprg0270", -- Miller: we need more detailed intel on targets whereabouts, why don't you see what the enemy has to say? interrogate them
		"f1000_oprg0280", -- Ocelot: the target should be somewhere in that outpost, start by gathering intel, why not interrogate the enemy
		"f1000_oprg0290", -- Miller: can you tell where the target is? you can look for more intel or just search the area your call
		"f1000_oprg0300", -- Miller: why not interrogate the enemy? we might learn where the target is
		"f1000_oprg0310", -- Miller: about the target's location, you see any intel files that might help narrow it down?
		"f1000_oprg0320", -- Miller: have you found where the target is? if we extract a prisoner we might get the information from them
		"f1000_oprg0330", -- Miller: locate and extract the target, check your idroids map for the location
		"f1000_oprg0340", -- Miller: there might be clues to the target's location at that outpost, take a look around
		"f1000_oprg0350", -- Miller: got all the information you need? interrogating the enemy might provide some useful intel
		"f1000_oprg0360", -- Miller: first you have to identify the targets. recon the site with your with you binoculars. once you know where the targets are, take take them out to put their network -tip
		"f1000_oprg0370", -- Miller: destroy the targets. any method will do.
		"f1000_oprg0380", -- Ocelot: one of the other prisoners might know where they're holding the target
		"f1000_oprg0390", -- Miller: the security forces must know something about the targets, why not try getting them to talk?
		"f1000_oprg0400", -- Ocelot: try interrogating enemy soldiers, if they know the targets location, make em spill it 
		"f1000_oprg0420", -- Miller: the target should be at that outpost, check the vi on your idroid
		"f1000_oprg0430", -- Miller: eliminate the target, be careful not to be spotted by other soldiers
		"f1000_oprg0440", -- Miller: the enemy spotted our chopper, they're converging on the rv, hurry
		"f1000_oprg0450", -- Miller: now that you've got a fix on the prisoner, go ahead and extract him
		"f1000_oprg0460", -- Miller: use a sniper rifle when you need to take out an enemy from a distance, it's scope will help you aim with precision and you can change the zoom -tip
		"f1000_oprg0470", -- Miller: smoke grenades are perfect for obscuring -tip
		"f1000_oprg0480", -- Miller: stun grenades emit a powerful flash and bang -tip
		"f1000_oprg0490", -- Miller: c4 is a plastic exposive -tip
		"f1000_oprg0410", -- Ocelot: you'll have an easier time spotting the target from higher up, try searching with your binos
		"f1000_oprg0500", -- Miller: when you set those directional mines, be sure to remember which way they're facing
		"f1000_oprg0510", -- Miller: chaff grenades render electronic devices useless -tip
		"f1000_oprg0520", -- Miller: night vision goggles illuminate the area -tip
		"f1000_oprg0530", -- Miller: keep in mind that time doesn't stop when using idroid -tip
		"f1000_oprg0540", -- Miller: if you ready weapon your weapon while crawling, you can move left and right -tip
		"f1000_oprg0550", -- Miller: binoculars are equipped with a directional mic -tip
		"f1000_oprg0560", -- Miller: take a close look at the vi, the target should be somewhere in that area.
		"f1000_oprg0570", -- Miller: check the vi to see where the target is.
		"f1000_oprg0580", -- Miller: find the target.
		"f1000_oprg0590", -- Miller: your gonna need more information to pinpioint a location.
		"f1000_oprg0600", -- Miller: we now know the target's location, check it on the map.
		"f1000_oprg0610", -- Miller: your objective is to extract the target, check the target's location on your idroid.
		"f1000_oprg0620", -- Ocelot: you know where you're headed boss? place a marker -tip
		"f1000_oprg0630", -- Ocelot: check the location on your idroid
		"f1000_oprg0640", -- null
		"f1000_oprg0650", -- Ocelot: the guards have to change shifts at some point. no matter how tight the enemy's defenses are, gaps will appear during shift changes
		"f1000_oprg0660", -- Ocelot: when targeting enemies at a distance, keep the effective range -tip
		"f1000_oprg0690", -- Miller: you can give order to develop new weapons and items from your idroid. there's no substitute for having the right equipment.
		"f1000_oprg0700", -- Ocelot: reconassaince is best conducted from high vantage points, I've marked a good spot on your map take a look at your idroid
		"f1000_oprg0710", -- Ocelot: boss intel work is all about observation and gathering information, start by using your binoculars to get a grasp of the area -tip
		"f1000_oprg0720", -- Ocelot: if you're planning to infiltrate that outpost start by marking as many enemies as you can. once your inside they'll have eyes everywhere -tip
		"f1000_oprg0730", -- Ocelot: enemies will be looking and listening for hostiles, but the weather and time of day will affect how easily they id you -tip
		"f1000_oprg0740", -- Ocelot: sandstorms reduce visibility -tip
		"f1000_oprg0750", -- Miller: don't forget about night vision goggles, will give you ample visibility no matter how dark it gets
		"f1000_oprg0760", -- Miller: don't forget about night vision goggles, will give you ample visibility no matter how dark it gets if you want to developer them...
		"f1000_oprg0770", -- Ocelot: having trouble seeing in the dark? if you wanna wait til dawn you can always pass the time with a smoke
		"f1000_oprg0780", -- Miller: boss, it seems that the guy doesn't understand english.
		"f1000_oprg0790", -- Ocelot: afrikaans is the lingua franca for mercs in that area.
		"f1000_oprg0800", -- Miller: if you place someone with an interpretter skill in the support unit simultaneous interpretation -tip
		"f1000_oprg0810", -- Miller: if you want to interrogate enemy, you'll need someone with the interpretter skill first
		"f1000_oprg0820", -- Miller: if you neutralize without killing him, you can fulton extract him. once you've fulton extracted him we should be able to convince him to join diamond dogs
		"f1000_oprg0830", -- Miller: attach the fulton recovery device to him, the chopper will then pick him up
		"f1000_oprg0840", -- Miller: ugh, looks like that fall killed him
		"f1000_oprg0850", -- Miller: if he's on the brink of death, its hard to say he'll survive a fulton extraction
		"f1000_oprg0860", -- Miller: a fulton success rate depends on factors like the individuals health and the weather. if you have to extract someone who's on the verge of death -tip
		"f1000_oprg0870", -- Miller: that soldier you extracted, he was dead on arrival, what a waste
		"f1000_oprg0880", -- Miller: fulton extraction puts a huge strain on the body, too much for a child, carry to chopper -tip
		"f1000_oprg0890", -- Miller: we can't intercept enemy comms if they're too far away, on the other hand, being out of radio range mean youre relatively safe.
		"f1000_oprg0900", -- Ocelot: the principle of infiltration is hiding your presence, that includes not making any unnecessary noise. when you want to move quietly -tip
		"f1000_oprg0910", -- Ocelot: sight sound keep all your enemy senses in mind. when you're near an enemy stay low and move slowly
		"f1000_oprg0920", -- Miller: there's more than one way to eliminate the target. pick him off from distance, sneak up on him with your knife, or you could find a way to avoid killing him altogether
		"f1000_oprg0930", -- Ocelot: a perfect snipers nest should have high visibility and preferably dark such as inside a building -tip
		"f1000_oprg0940", -- Ocelot: when shooting from long range, remember it will take time for bullet to reach target. wait for the target to stand stand still or move parallel
		"f1000_oprg0950", -- Miller: that area is covered in mist year round, it'll provide good cover for you but also make it difficult to see the enemy coming. be careful boss || with terrain and plant life to your advantage, use relative to the enemy
		"f1000_oprg0960", -- null
		"f1000_oprg0970", -- null
		"f1000_oprg0980", -- Ocelot: head for the rv, the choppers waiting
		"f1000_rtrg2745", -- Ocelot: you can mark enemies in vehicles by zooming in with your binoculars or camera. once they're marked you can also see their positions on the map.
		"f1000_oprg0990", -- Miller: (beep beep) we know where to find target check your idroid
		"f1000_oprg1000", -- Miller: get em out of there!
		"f1000_oprg1010", -- Miller: get yourself out of the hotzone by chopper or by land it's your choice
		"f1000_esrg1870", -- Miller: a prisoner....
		"f1000_mprg0190", -- Miller: the target should be somewhere in that area
		"f1000_rtrg3050", -- Miller: nice find, analyzing the intel you picked up. we got a fix on the target, updated your map info, check idroid
		"f1000_rtrg3060", -- Miller: boss that prisoner we rescued provided intel, we got a fix on the target, I've updated your map info
		"f1000_rtrg3070", -- Miller: ok, subject is in. I need you to get back to the mission.
		"f1000_rtrg3080", -- Miller: alright that's the target, get em out of there
		"f1000_rtrg3090", -- Miller: picked up an intel file huh? unfortunately there's nothing new in it. boss get back to the mission
		"f1000_rtrg3100", -- Miller: BOSS, STOP
		"f1000_rtrg1615", -- Miller: WHAT ARE YOU THINKING?!
		"f1000_rtrg3110", -- Miller: target extraction confirmed, your objective's complete, exfiltrate out of the hotzone by chopper or on land
		"f1000_rtrg3120", -- Miller: that soldier you extracted, he was dead on arrival, what a waste
		"f1000_esrg0755", -- Miller: a prisoner, he might have some information
		"f1000_rtrg2175", -- Miller: thats the target, looks like we found him
		"f1000_mprg0095", -- Miller: the target is there.
		"f1000_rtrg2635", -- Miller: your objectives complete, exfiltrate out of the hotzone by chopper or on land
		"f1000_rtrg3130", -- Miller: thats it youve made it out of the hotzone no sign of the enemy, mission complete boss
		"f1000_rtrg3140", -- Miller: alright youre out of the hotzone, no enemy forces in pursuit, mission complete
		"f1000_rtrg1645", -- Miller: flawless work, you never cease to amaze boss
		"f1000_rtrg3150", -- Miller: what about the target?
		"f1000_rtrg3160", -- Miller: call the chopper from your idroid boss, then carry the target to it
		"f1000_rtrg3170", -- Miller: great ive updated the info on your idroid, take a look, I hope he's alright
		"f1000_esrg1880", -- Miller: another prisoner, looks like he's alive.
		"f1000_oprg1020", -- Miller: you have to extract the target. check his location on your idroid
		"f1000_oprg1030", -- Miller: you've completed your objective, now get out of the hotzone.
		"f1000_esrg1890", -- Miller: there's the target, eliminate it!
		"f1000_rtrg2425", -- Miller: boss that person you fulton extracted turned out to be the target, but it was a failure- target's confirmed dead. that said, the mission was to eliminate
		"f1000_rtrg1561", -- Miller: target extracted.
		"f1000_rtrg1562", -- Miller: alright, target extracted.
		"f1000_rtrg1563", -- Miller: target extracted, anyone else?
		"f1000_rtrg1564", -- Miller: good, that's the target extracted.
		"f1000_rtrg1565", -- Miller: target extracted, is that everyone?
		"f1000_rtrg1731", -- Miller: he's dead.
		"f1000_rtrg1732", -- Miller: (frustrated grunt) they got him
		"f1000_rtrg1733", -- Miller: another one dead.
		"f1000_rtrg1734", -- Miller: they killed a target.
		"f1000_rtrg1641", -- Miller: great || good work.
		"f1000_oprg1040", -- Miller: (beep beep) i sent the information to your map screen thats the target's predicted location, check it on your idroid. check all around the target and plan carefully before -tip
		"f1000_rtrg1375", -- Miller: good you've completed the objective, now get out of there 
		"f1000_rtrg2395", -- Miller: target confirmed dead, impressive work boss
		"f1000_rtrg2505", -- Miller: target extraction confirmed, you've completed your objective, now get out of the hotzone
		"f1000_rtrg3180", -- Miller: what's wrong boss, mission abort?
		"f1000_rtrg2095", -- Miller: he's coming too, huh?
		"f1000_oprg1050", -- Miller: you can check the target's vi on your idroid.
		"f1000_rtrg3190", -- Miller: you got an intel file unfortunately there's nothing new in it, you've completed your objective now get out of the hotzone.
		"f1000_rtrg3095", -- Miller: you got an intel file unfortunately there's nothing new in it.
		"f1000_rtrg1395", -- Miller: you've completed your objective, now get out of the hotzone.
		"f1000_esrg0000", -- (empty)
		"f1000_esrg0545", -- Miller: that's the target, get him out of there
		"f1000_mprg0075", -- Miller: that's the target's predicted field of movement. boss look for the target.
		"f1000_rtrg2171", -- Miller: that looks like the target || there, that's the target
		"f1000_oprg1060", -- Miller: good youve completed the objective now get out of there exfiltrate out of the hotzone by chopper or on land
		"f1000_rtrg1396", -- Miller: youve completed your objective, now get out of the hotzone
		"f1000_rtrg0116", -- Miller: WOAH- STOP STOP your mission is to EXTRACT the targets
		"f1000_mprg0200", -- Ocelot: the houses in the village are packed together, built whereever the steep incline would support them. plenty of roofs and eaves for cover. they'll never see you coming
		"f1000_oprg1070", -- Miller: (beep beep) what about the target? put the target on the chopper.
		"f1000_oprg1080", -- Miller: (beep beep) the target's safety is your top priority, eliminate the threat
		"f1000_oprg1090", -- Miller: (beep beep) good youve completed the objective now get out of there
		"f1000_rtrg3210", -- Miller: find the target and eliminate him
		"f1000_rtrg3220", -- Miller: target confirmed dead.
		"f1000_esrg1900", -- Miller: (beep beep) that's the target eliminate him however you want
		"f1000_oprg1100", -- Miller: (beep beep) eliminate the target how you do it is your call
		"f1000_rtrg3230", -- Miller: you'll destroy the target, that's not acceptable you'll need to fulton it
		"f1000_rtrg3240", -- Miller: target destroyed excellent work keep it up || target destroyed
		"f1000_rtrg2325", -- Miller: youre not seriously leaving him there?
		"f1000_rtrg3250", -- Miller: contact is a no-go for now, pull back and wait until things die down || the enemy's looking for you, you should wait before trying to make contact
		"f1000_oprg1110", -- Miller: what's wrong? hurry and secure the target
		"f1000_rtrg3260", -- Miller: great, hurry up and extract the target
		"f1000_rtrg3085", -- Miller: that's the target get him out of there
		"f1000_rtrg2125", -- Miller: take a good look at their faces to we can id the targets
		"f1000_rtrg2375", -- Miller: huh that's the target. you've completed your objective now get out of the hotzone
		"f1000_rtrg3270", -- Miller: a prisoner, you gonna help him?
		"f1000_mprg0065", -- Miller: that's the target's predicted field of movement
		"f1000_mprg0210", -- (empty)
		"f1000_esrg1910", -- (beep beep) those may be ruins, but they can still be used as an outpost watch for enemies from high up
		"f1000_esrg1920", -- (beep beep) climbing up there should give you a good view of the area
		"f1000_esrg1930", -- (beep beep) the front is heavily guarded, try to find an area where security is ligher, even if it means a detour
		"f1000_esrg1940", -- Miller: (beep beep) that looks like the target
		"f1000_oprg1120", -- Miller: (beep beep) the target is started to move you can check the predicted route on your idroid
		"f1000_oprg1130", -- Miller: (beep beep) boss the target is already reached the objective area you can check the targets location on your idroid
		"f1000_oprg1015", -- Miller: (beep beep) get yourself out of the hotzone by chopper or by land its your choice
		"f1000_rtrg3280", -- Miller: boss I have a report from the intel team, the targets are now on the move ive sent the predicted route on your idroid
		"f1000_rtrg3290", -- Miller: boss we have new targets check your idroid for the details
		"f1000_rtrg3300", -- Ocelot: boss need a little extra fire power? we've spotted a soviet transport truck, apparently something pretty powerful
		"f1000_rtrg3310", -- Miller: so there were enemy vehicles here too? boss eliminate it!
		"f1000_rtrg3320", -- Miller: so there were enemy vehicles here too?
		"f1000_rtrg3330", -- Miller: target eliminated, great now on to the next
		"f1000_rtrg3340", -- Miller: target elimination confirmed, got any more in you?
		"f1000_rtrg3350", -- Miller: target eliminated.
		"f1000_rtrg3360", -- Miller: good youve eliminated half the targets
		"f1000_rtrg3370", -- Miller: nice work boss the targets are almost history
		"f1000_rtrg3380", -- Miller: last one boss
		"f1000_rtrg3390", -- Miller: target extraction confirmed. that's cut down the enemy mechanized units force strength
		"f1000_rtrg3400", -- Miller: alright target extracted. sORrY rEDs, IT bELOnGs tO diAmONd dOGs NOw!
		"f1000_rtrg3410", -- Miller: fulton extraction of target failed, but it still counts as eliminated. keep going with the mission
		"f1000_rtrg3420", -- Miller: failed to extract that target you fultoned. shame it went to waste but it wont impact the mission. boss pay attention to success rate -tip
		"f1000_rtrg3430", -- Miller: a target has left the mission area. it's too late to eliminate that one, just focus on taking out the remaining targets
		"f1000_rtrg3440", -- Miller: a target has left the mission area, there's no way to eliminate it now, head for the remaining targets
		"f1000_rtrg3450", -- Miller: a target has left the mission area, there's no way to eliminate it now, head for the remaining targets
		"f1000_rtrg3460", -- Ocelot: boss we've spotted a 4wheel drive transporting a prisoner. it's not part of the mission but do you think you could bust him loose? just if you have the time
		"f1000_rtrg3470", -- Ocelot: looks like a prisoner escort. I guess this is no time to be worrying about it
		"f1000_rtrg3480", -- Miller: that's a target, eliminate it.
		"f1000_rtrg3490", -- Miller: that's a target, eliminate it any way you'd like
		"f1000_rtrg3500", -- Ocelot: that target- it's equipped with an lmrs
		"f1000_rtrg3510", -- Ocelot: that's a target, but it's heavily armed, be careful one hit from that will bury you
		"f1000_rtrg3520", -- Ocelot: look at that target, it's fitted with an lmrs. you take that out, there's a bonus in it for us
		"f1000_rtrg3530", -- Ocelot: a tank, that's a target too. just don't over-stretch yourself, tanks aren't just something you take on alone
		"f1000_rtrg3540", -- Ocelot: a soviet tank, that's a target too but can you really eliminate it?
		"f1000_mprg0220", -- Miller: the intel team has confirmed the presence of a enemy combat vehicle in this area. we don't know where exactly so watch out
		"f1000_mprg0230", -- Miller: an enemy combat vehicle has been identified around here, try to find it
		"f1000_mprg0240", -- Miller: that's the target's predicted route, you can either move ahead and cut it off or attack it from behind
		"f1000_mprg0250", -- Miller: that's the target's predicted route, eliminate the target before it leaves the mission area
		"f1000_mirg0010", -- Miller: soviet armored vehicle, highly mobile and it can pack a punch too. those are our targets, eliminate as many of them as you can
		"f1000_oprg1140", -- Ocelot: got enough ammo? if you run low steal some from the enemy. or call in a supply drop
		"f1000_oprg1150", -- Ocelot: boss to take out enemy vehicles you'll want to use explosive weaponry. missles grenades placed explosives
		"f1000_oprg1160", -- Miller: your objective's complete exfiltrate the mission area by chopper or on land
		"f1000_oprg1170", -- Miller: exfiltrate the mission area by chopper or by land
		"f1000_oprg1180", -- Ocelot: dont try to take down a gunship from the front, you wont win in a head to headshootout, try to get behind it
		"f1000_oprg1190", -- Ocelot: to take out a moving tank first blow its tracks, how bout planting mines in its path?
		"f1000_oprg1200", -- Ocelot: a tanks armor is tough, to eliminate it use missiles, grenades or placed explosives, something with a bang
		"f1000_rtrg3550", -- Miller: it's too dangerous to contact the target right now, wait till the coast is clear
		"f1000_esrg1950", -- Ocelot: (beep beep) hm looks like the skulls've done something to him. what's making him move like that?
		"f1000_rtrg3560", -- Miller: put the target on the chopper
		"f1000_rtrg3570", -- Ocelot: hey thats-
		"f1000_rtrg3580", -- Ocelot: what, when did- boss don't hang around the same spot forever
		"f1000_rtrg3590", -- Ocelot: nice || great work!
		"f1000_rtrg3600", -- Ocelot: impressive, boss! she never stood a chance
		"f1000_rtrg3610", -- Ocelot: calculate bullet drop -tip
		"f1000_rtrg3620", -- Ocelot: boss you need to go around the enemy's line of sight. get into position from behind or the side -tip
		"f1000_rtrg3630", -- Ocelot: be careful when you move, a sniper keep everything in mind, terrain weather, everything about his sniping position. 
		"f1000_esrg1960", -- Ocelot: that's the enemy sniper's turf. if you draw attention to yourself you will be spotted
		"f1000_esrg1970", -- Ocelot: (beep beep) an abandoned house, plenty of cover, 2 floors too. perfect for attacking and defending
		"f1000_esrg1980", -- Ocelot: (beep beep) a tower- high positions are ideal for sniping but the enemy has a clear shot at you too
		"f1000_esrg1990", -- Ocelot: (beep beep) a cave no escape route and no line of sight, not something I'd recommend as a snipe route
		"f1000_esrg2000", -- Ocelot: (beep beep) that forrest would provide plenty of cover from the enemy but you'd have trees blocking your line of sight too
		"f1000_esrg2010", -- Ocelot: (beep beep) some old ruins, looks like they could collapse any minute
		"f1000_esrg2020", -- Ocelot: (beep beep) that's one big gate, good view from up there but exposed
		"f1000_oprg1210", -- Ocelot: (beep beep) no sign of the enemy, but a persons movements always affects their environment- any light or sound?
		"f1000_oprg1220", -- Ocelot: (beep beep) sometimes the lenses on binoculars and scopes will reflect light, but the same goes for your's- avoid having them out for too long
		"f1000_oprg1230", -- Ocelot: (beep beep) is the enemy using a scope or maybe binoculars? if the lenses reflect light that'll make them easier to spot
		"f1000_oprg1240", -- Ocelot: (beep beep) the rule in a sniper dual is, whoever spots the other first wins. start by making sure you're somewhere -tip
		"f1000_oprg1250", -- Ocelot: (beep beep) if the enemy has a fix on you and you're pinned down try a distraction. make em worry about something else. do whatever you can to throw off their eyes and ears
		"f1000_oprg1260", -- Ocelot: (beep beep) gunfire will give away your position to the enemy. after firing immediately change your position
		"f1000_oprg1270", -- Miller: (beep beep) boss if we develop a child-sized fulton recovery device you'll be able to extract those kids. send the development order from your idroid
		"f1000_oprg1280", -- Miller: (beep beep) boss you absolutely cannot use lethal weapons against kids. if only we had a fulton device built for kids
		"f1000_oprg1290", -- Miller: (beep beep) you can neutralize the kids, but they have to wake up sometime. you could carry them to the chopper, but we want to keep this mission short and to the point
		"f1000_oprg1300", -- Miller: (beep beep) the amount of traquilizer in your tranq darts is adjusted depending on the target. dont worry about using it on those kids. they won't suffer any side effects
		"f1000_rtrg3640", -- Ocelot: your shot bounced off, at least it took that helmet with it.
		"f1000_rtrg3650", -- Ocelot: no good boss, attacking like that wont cut it. aim somewhere else or change to a different weapon
		"f1000_rtrg3660", -- Miller: boss the base cant support more staff- cant assign more personnel to any of the teams
		"f1000_rtrg3670", -- Miller: we'll have to build more platforms
		"f1000_rtrg3680", -- Miller: we'll have to build an FOB
		"f1000_rtrg3690", -- Miller: if we can't even fit them into the waiting room well just have to fire them but I'd rather you make that decision. if there are unnecessary staff -tip
		"f1000_rtrg3700", -- Miller: if there's staff you really don't want to lose, have them sign a direct contract. management of those staff will be entirely under your control
		"f1000_rtrg3710", -- Miller: boss about diamond dogs human resources, we're having trouble assigning staff whose skills would suit more than one team. I'd like you to judge where to assign them. I've left them in the waiting room so -tip
		"f1000_rtrg3720", -- Miller: Boss, we can't store anything else on the base.
		"f1000_rtrg3730", -- Miller: youll have to sell something off before fultoning that
		"f1000_rtrg3740", -- Ocelot: that guy with the green hat is speaking enlgihs
		"f1000_rtrg3750", -- Miller: is that him? look carefully at his face
		"f1000_rtrg3760", -- Miller: is that her? look carfully at her face
		"f1000_rtrg3770", -- Miller: I've taken the targets predicted FOM off your map, that data is no longer accurate
		"f1000_rtrg3780", -- Ocelot: that's an enemy gunship, a signle burst from its machine gun can cut a man in half. tread carefully boss
		"f1000_rtrg3790", -- Miller: boss I have a report from the intel team, the targets are now on the move. I've sent their predicted route on your idroid
		"f1000_rtrg3800", -- Miller: boss we have new targets, check your idroid for the details
		"f1000_rtrg3810", -- Ocelot: boss need extra firepower? soviet weapons transport truck -tip
		"f1000_rtrg3820", -- Miller: so there were enemy vehicles here too?
		"f1000_rtrg3830", -- Miller: target eliminated great now onto the next
		"f1000_rtrg3840", -- Miller: target elimination confirmed got any more in you?
		"f1000_rtrg3850", -- Miller: target eliminated, alright boss
		"f1000_rtrg3860", -- Miller: good you've eliminated half the targets
		"f1000_rtrg3870", -- Miller: nice work boss the targets are almost history
		"f1000_rtrg3880", -- Miller: just one target left, last one boss
		"f1000_rtrg3890", -- Miller: that's cut down the enemy mechanized units force strength
		"f1000_rtrg3900", -- Miller: sorry reds it belongs to diammond dogs now
		"f1000_rtrg3910", -- Miller: fulton extraction of target failed but it still counts as eliminated. keep going with the mission
		"f1000_rtrg3920", -- Miller: failed to extact that target you fulton, shame it went to waste but it wont impact the mission. pay attention to the succes rate -tip
		"f1000_rtrg3930", -- Miller: target left mission area too late to eliminate focus on taking out the remaining targets
		"f1000_rtrg3940", -- Miller: target has left mission area theres no way to eliminate it now head for remaining targets -repeat
		"f1000_rtrg3950", -- Ocelot: spotted a 4wheel drive carrying a prisoner, think you can cut him loose? just if you have the time -repeat
		"f1000_rtrg3960", -- Ocelot: looks like a prisoner esccort, no time to be worrying about it
		"f1000_rtrg3970", -- Miller: that's a target eliminate it any way you'd like.
		"f1000_rtrg3980", -- Ocelot: that's a target but it's heavily armed, be careful, one hit will bury you
		"f1000_rtrg3990", -- Ocelot: that target- it's equipped with an lmrs
		"f1000_rtrg4000", -- Ocelot: look at that target, it's fitted with an lmrs. you take that out there's a bonus in it for us
		"f1000_rtrg4010", -- Ocelot: a tank, that's a target too. just don't over-stretch yourself, tanks aren't something you just take on alone
		"f1000_rtrg4020", -- Ocelot: a soviet tank, that's a target too but can you really eliminate it?
		"f1000_rtrg4030", -- Miller: the sideops list is comprised of problems we need you to resolve. objectives to be completed, intel gained from prisoners and soldiers you've extracted. not missions per se but if you can take care of em when you're free id appreciate it
		"f1000_rtrg4040", -- Miller: boss, one of our staff has been captured by the enemy. he won't last long on his own- I've gathered the details to your sideops list, get our man out of there boss
		"f1000_rtrg4050", -- Miller: boss I've got some bad news, just confirmed that our man being held captive by the enemy is dead. I'll remove from your idroid
		"f1000_rtrg4060", -- Miller: boss about that development you ordered there's something i'd like you to take care of if you can I put the details on your sideops list
		"f1000_rtrg4080", -- Miller: that material- it could be just what we need to develop new weapons and equipment
		"f1000_rtrg4090", -- Miller: we can use compounds in plants to to make medicines or points to make weapons and equipment 
		"f1000_rtrg4100", -- Miller: one of the guys out on a mission at the time, he's fallen a long way but will he come back to us
		"f1000_rtrg4110", -- Miller: is that one of our men from 9 years ago? bring em home boss
		"f1000_rtrg0615", -- Miller: say boss have you seen any animals in the field? truth is an environmental ngo has asked us to remove wild animals -tip
		"f1000_rtrg0625", -- Miller: if you set up a capture cage it'll catch small to medium sized animals
		"f1000_rtrg0635", -- Ocelot: an alarm trigger- boss get away from that thing
		"f1000_rtrg0645", -- Miller: a nuclear weapon? we can extract it and use it as a deterrent, or dispose of it. what do you think boss?
		"f1000_rtrg0655", -- Miller: that container holds- a nuclear weapon? that kind of weapon would make pfs think twice about coming after us
		"f1000_rtrg0665", -- Ocelot: an african civit
		"f1000_rtrg0675", -- Ocelot: a marsh mongoose
		"f1000_esrg2030", -- Miller: shh, listen.
		"f1000_esrg2040", -- Ocelot: (beep beep) thats a gun emplacement -tip
		"f1000_esrg2050", -- Ocelot: (beep beep) that's a mortar -tip
		"f1000_esrg2060", -- Ocelot: (beep beep) what's a prisoner doing there? you gonna save him boss?
		"f1000_esrg2070", -- Ocelot: (beep beep) it's a sniper. goes without saying he'll try to spot you at long range and try to pick you off. stay out of his field of vision
		"f1000_esrg2080", -- Ocelot: (beep beep) it's a sniper. goes without saying she'll try to spot you at long range and try to pick you off. stay out of her field of vision
		"f1000_esrg2090", -- Ocelot: (beep beep) looks like that building is the control tower, it'll be the cfa's most important structure there.
		"f1000_esrg2100", -- Ocelot: (beep beep) that control tower is the perfect place to recon or position a sniper snipe, if youre gonna approach it, use maximum caution
		"f1000_esrg2110", -- Ocelot: (beep beep) runway has seen better days but it still looks usable. of course cfa fly choppers more than anything so they probably don't even -tip
		"f1000_esrg2120", -- Ocelot: (beep beep) a decoy, you're too smart for those tricks, right?
		"f1000_esrg2130", -- Ocelot: (beep beep) the enemy must've planted that mine, well spotted boss
		"f1000_esrg2140", -- Ocelot: (beep beep) infrared sensors watch you don't trip em
		"f1000_esrg2150", -- Miller: (beep beep) a surveliance camera,its feed is being monitored at their CP, take it out and guys will come running
		"f1000_esrg2160", -- Ocelot: (beep beep) a gun camera, if it spots you it'll give you a lead hello
		"f1000_esrg2170", -- Ocelot: (beep beep) an enemy UAV, gonna shoot it down before it sees you?
		"f1000_esrg2180", -- Ocelot: (beep beep) that container holds a nuclear weapon. with that kind of deterrent we can prevent pfs from coming after us.
		"f1000_esrg2190", -- Ocelot: (beep beep) if we cut the link between their CP and hq, we disrupt outpost communications and reinforcments. but soldiers will still be able to contact the CP.
		"f1000_esrg2200", -- Ocelot: (beep beep) eitherdestroy that or turn it off to shut off all the lights and survel cams. in the outpost. but of course the enemy will realize somethings -tip
		"f1000_esrg2210", -- Ocelot: portable toilet, if your gonna hide inside, watch the enemy doesnt use it. same for hiding downed enemies in it
		"f1000_rtrg5010", -- Ocelot: a golden crescent  -tip
		"f1000_rtrg5012", -- Ocelot: an african peach -tip
		"f1000_rtrg5013", -- Ocelot: a digitalis -tip
		"f1000_rtrg5016", -- Ocelot: a black carrot -tip
		"f1000_rtrg5014", -- Ocelot: a wormwood -tip
		"f1000_rtrg5015", -- Ocelot: a tarragon -tip
		"f1000_rtrg5011", -- Ocelot: a haoma/soma -tip
		"f1000_esrg2290", -- Ocelot: (beep beep) that's a rough diamond, as a tangible asset it'll increase our gmp
		"f1000_esrg2300", -- Ocelot: (beep beep) cfa hired by unita -tip 
		"f1000_esrg2310", -- Ocelot: (beep beep) rogue coyote lacks doctrine -tip
		"f1000_esrg2320", -- Ocelot: (beep beep) security firms like zrs will increase -tip
		"f1000_esrg2330", -- code talker: (beep beep) he has been made into a puppet by the skulls but only temp. once the skulls leave
		"f1000_esrg2340", -- Ocelot: (beep beep) that soldier has been turned into a puppet by the skulls but I don't see em anywhere
		"f1000_esrg2350", -- code talker: (beep beep)  parasites have affinity for particular constitutions perhaps that is why they did not leave
		"f1000_esrg2360", -- Ocelot: (beep beep)their gear is different from before maybe they're trying to adapt to your tactics
		"f1000_esrg2370", -- miller: (beep beep) eliminate the target before he escapes
		"f1000_esrg2380", -- Ocelot: (beep beep) those maybe ruins but they can still function as an outpost
		"f1000_esrg2390", -- Ocelot: (beep beep) climbing up there should give you a good view of the area
		"f1000_esrg2400", -- Ocelot: (beep beep) the front is heavily guarded find a detour
		"f1000_esrg2410", -- Ocelot: (beep beep) no doubt about it, XOF- cipher's covert strike force, now they're taking orders from skull face
		"f1000_esrg2420", -- Ocelot: (beep beep) the soldiers there are wearing helmets normal rounds won't penetrate them
		"f1000_esrg2430", -- Ocelot: (beep beep) up ahead is the headquarters of the soviet afghan invasion force, breaking into it would be like a declaration of war, stay away for now
		"f1000_rtrg4120", -- Ocelot: damn it they're still coming? but that looked like that worked, stay on the offensive
		"f1000_rtrg4130", -- Ocelot: where are they? use your ears try to sense their positions
		"f1000_rtrg4140", -- Ocelot: what are they up to? watch it boss!
		"f1000_rtrg4150", -- Ocelot: here they come!
		"f1000_oprg2000", -- Ocelot: (beep beep) you wont see 'em comming, listen for their footsteps, suprise em with a guided missile?
		"f1000_oprg2010", -- Ocelot: (beep beep) looks like they can put up some kind of defensive wall, you'll have to go around to attack or use explosive weapons like grenades
		"f1000_oprg2020", -- Ocelot: (beep beep) when they attack close up you may be able to counter with cqc, but it's a high risk strategy, there's no harm in playing it safe
		"f1000_oprg2030", -- Ocelot: (beep beep) don't let their quick movements lead you by the nose, fire when they stop
		"f1000_oprg2040", -- Ocelot: (beep beep) don't get to close to that gas it'll eliminate vehicles and walker gears 
		"f1000_oprg2050", -- Ocelot: (beep beep) eliminate the skulls boss, there's no choice but to fight it out
		"f1000_oprg2060", -- Ocelot: (beep beep) dont let em hit you or youre finished, make good use of cover
		"f1000_mprg0260", -- Miller: that's the predicted route the targets will take. where to ambush them is up to you
		"f1000_mprg0270", -- Miller: after assembling, the targets will advance on another outpost- you could take them out all at once but it's risky proposition
		"f1000_rtrg4155", -- Ocelot: boss, the person you're carrying is already dead
		"f1000_rtrg4160", -- Ocelot: no can do quiet's gone missing, check the predicted fom we marked on your map
		"f1000_rtrg4170", -- Ocelot: quiet's gone for good boss, just try to let it go
		"f1000_oprg1310", -- Ocelot: (beep beep) press up against walls, this is taking cover
		"f1000_oprg1320", -- Ocelot: (beep beep) hold ups tip [shows a yellow hint prompt]
		"f1000_oprg1330", -- Ocelot: (beep beep) prosetic arm to lure enemy
		"f1000_oprg1340", -- Ocelot: (beep beep) hiding on horseback tip
		"f1000_oprg1350", -- Miller: (beep beep) you can view target's predicted field of movement on your idroid 
		"f1000_oprg1360", -- Miller: (beep beep) we've already figured out the target's current position
		"f1000_oprg1370", -- Ocelot: (beep beep) got enough ammo? if you run low steal some or call supply drop
		"f1000_oprg1380", -- Ocelot: (beep beep) boss to take out vehicles you'll want to use explosive weaponry
		"f1000_oprg1390", -- Ocelot: (beep beep) don't take down a gunship from the front you wont win in a headtohead shootout
		"f1000_oprg1400", -- Ocelot: (beep beep) to take out a moving tank by blowing its tracks
		"f1000_oprg1410", -- Ocelot: (beep beep) tank armor is tough use missiles grenades
		"f1000_oprg1420", -- Ocelot: (beep beep) bionic arm developer submitted new feature- active sonar
		"f1000_oprg1430", -- Ocelot: (beep beep) Hey boss, how about using a missle launcher?
		"f1000_oprg1440", -- Ocelot: (beep beep) I know you're an expert in solo infiltrations but now you have buddies
		"f1000_oprg1450", -- Ocelot: (beep beep) the role of your buddies is to support
		"f1000_oprg1460", -- Ocelot: (beep beep) dhorse can move fast on bad terrain [yellow tip]
		"f1000_oprg1470", -- Ocelot: (beep beep) d walker is your own personal walker gear 
		"f1000_oprg1480", -- Ocelot: (beep beep) battle gear is developed to take on bipedal hostile weapon systems, alter its maneaverability by changing
		"f1000_oprg1490", -- Miller: (beep beep) the target is started to move, you can check the predicted route on your idroid
		"f1000_oprg1500", -- Ocelot: (beep beep) guards have to change shift sometime. you can always wait for that moment.
		"f1000_oprg1510", -- Miller: (beep beep) boss the target has already reached the obejcteve area
		"f1000_oprg1520", -- Ocelot: (beep beep) chopper has a wide view and once it spots you it's difficult to lose. if your going to approach it -tip
		"f1000_oprg1530", -- Ocelot: (beep beep) destroy chopper's tail rotor to bring it down
		"f1000_oprg1540", -- Ocelot: (beep beep) that armor is equipped with an lmrs, can lay down fire over wide area so watch out
		"f1000_oprg1550", -- Ocelot: (beep beep) a wheeled tank, wheeleed tanks are faster than tracked tanks, watch you don't get flanked
		"f1000_oprg1560", -- Ocelot: (beep beep) soviet main battle tank armor is outdated
		"f1000_oprg1570", -- Ocelot: (beep beep) third generation main battle tank with composite armor
		"f1000_oprg1580", -- Ocelot: (beep beep) looks like it's equipped with a gattling gun. too dangerous to approach from the front, take out from behind
		"f1000_oprg1590", -- Ocelot: (beep beep) is that walker gear equipped with guided missiles? it'll track you down if you don't evade them well
		"f1000_rtrg4180", -- Miller: Destroy that thing!
		"f1000_rtrg4190", -- Miller: destroy them all!
		"f1000_rtrg4200", -- Miller: eliminate that man
		"f1000_rtrg4210", -- Miller: eliminate that thing
		"f1000_rtrg4220", -- Miller: eliminate them!
		"f1000_rtrg4230", -- Miller: you need to help him!
		"f1000_rtrg4240", -- Miller: you need to help her!
		"f1000_rtrg4250", -- Miller: you need to help them!
		"f1000_rtrg4260", -- Miller: get him out of there
		"f1000_rtrg4270", -- Miller: get her out of there
		"f1000_rtrg4280", -- Miller: get them out of there
		"f1000_rtrg4290", -- Miller: youre just gonna leave him there?
		"f1000_rtrg4300", -- Miller: youre just gonna leave her there?
		"f1000_rtrg4310", -- Miller: youre just gonna leave them there?
		"f1000_rtrg4320", -- Miller: you gotta deal with it somehow
		"f1000_rtrg4330", -- Miller: you can't do that right now
		"f1000_rtrg4340", -- Miller: sorry boss we can't right now
		"f1000_rtrg4350", -- Miller: that location won't work, choose somewhere else
		"f1000_rtrg4360", -- Miller: boss hold it, that's quiet, don't say I didn't warn you. tchh roger that sending her now
		"f1000_rtrg4370", -- Ocelot: (beep beep) Pashto-english interpretter somewhere in that area
		"f1000_rtrg4380", -- Ocelot: (beep beep) afrikaans interpreter somehwere
		"f1000_rtrg4390", -- Ocelot: (beep beep) kikongo interpreter somewhere
		"f1000_oprg2070", -- Ocelot: (beep beep) pashto interprester somehwere
		"f1000_oprg2080", -- Ocelot: (beep beep) afrikaans interpreter somwehere
		"f1000_oprg2090", -- Ocelot: (beep beep) kikongoenglish interpreter somewhere
		"f1000_rtrg1635", -- Miller: cooperative interpretter, afrikaans 
		"f1000_rtrg1625", -- Miller: interpreter is cooperative, put in support unit
		"f1000_rtrg4400", -- Ocelot: no can do quiet's gone missing check fom
		"f1000_rtrg4410", -- Ocelot: quiet's gone for good let it go
		"f1000_rtrg4420", -- Miller: boss we can't extract them, we don't know who or what they are we'd be putting mother base at risk
		"f1000_rtrg4430", -- Miller: they're talking about something but they're too far away to hear. we really need a directional mic on your binoculars. check your idroid to see -tip
		"f1000_rtrg4440", -- Ocelot: quiet's still in sick bay after that salt water did a number on her skin, pick a different buddy
		"f1000_rtrg4450", -- Ocelot: looks like the enemy's lost sight of you, will try to hunt you down
		"f1000_rtrg4460", -- Ocelot: the enemy's given up search for you but not giving the all clear just yet, stay alert
		"f1000_rtrg4470", -- Miller: crack would make a good foothold, you can use crack climbing to up
		"f1000_rtrg4480", -- Ocelot: if you need to pass the time smoke that cigar of yours
		"f1000_rtrg4490", -- Miller: out of ammo? let the support unit help out. transmit a request 
		"f1000_rtrg4500", -- Ocelot: dumpster tip
		"f1000_rtrg4510", -- Ocelot: portable toilet tip
		"f1000_rtrg4520", -- Ocelot: afrikaans is lingua franca for mercs
		"f1000_rtrg4530", -- Ocelot: either destroy that or shut off the lights and cameras
		"f1000_rtrg4540", -- Ocelot: you've captured an enemy vehicle, use idroid to drop in
		"f1000_rtrg4550", -- Ocelot: active sonar tip [yellow tip]
		"f1000_rtrg4560", -- Ocelot: I know your an expert but buddies will fight alongside you
		"f1000_rtrg4570", -- Ocelot: role of buddies is to support
		"f1000_rtrg4580", -- Ocelot: like your horse you can give commands to ddog as well, he can follow you around etc
		"f1000_rtrg4590", -- Ocelot: quiet scout/snipe tip [yellow tip]
		"f1000_oprg1600", -- Miller: All radio calls and on-screen messages are recorded on your idroid. if you want to view the records, open your idroid and select logs. [yellow tip appears]
		"f1000_oprg1610", -- Miller: the role of the support chopper is to extract you and the targets out of the area of operations. it'll respond to situations with support fire -tip [yellow tip appears]
		"f1000_esrg2440", -- Miller: that's an anti air radar. it isn't one of the targets but destroying it will shut down some the enemy air survealance. It might make more landing zones available
		"f1000_oprg1620", -- Ocelot: (beep beep) we can use compounds from plants to develop new medicines or poisons, even weapons and items
		"f1000_oprg1630", -- Miller: destroying vehicles will slow the enemy down, but you can also steal them for yourself
		"f1000_oprg1640", -- Ocelot: destroying the power system will shut down the electrical grid will give you a leg up in the dark
		"f1000_oprg1650", -- Ocelot: disrupt comms between enemy outposts by destroying comms equipment
		"f1000_rtrg4600", -- Miller: It's a survellance camera, don't get spotted
		"f1000_rtrg4610", -- Ocelot: gun camera, lead hello
		"f1000_rtrg4620", -- Ocelot: enemy uav
		"f1000_esrg2450", -- Ocelot: (beep beep) an alarm trigger, boss get away from that thing
		"f1000_rtrg4630", -- Ocelot: the pipes huh? they're strong enough could make for a nice shortcut
		"f1000_oprg1660", -- null
		"f1000_oprg1670", -- null
		"f1000_rtrg0611", -- Miller: the security forces must know something try interrogating -tip
		"f1000_esrg0850", -- Ocelot: a soviet soldier of the 40th army
		"f1000_rtrg3545", -- Ocelot:  soviet tank + miller if you could steal that nothing could stop you, but make the wrong move and it'll chew you up
		"f1000_esrg1055", -- Ocelot:  soviet tank + miller if you could steal that nothing could stop you, but make the wrong move and it'll chew you up 
		"f1000_mprg0235", -- Ocelot:  soviet tank + miller if you could steal that nothing could stop you, but make the wrong move and it'll chew you up 
		"f1000_mirg0020", -- Ocelot:  soviet tank + miller if you could steal that nothing could stop you, but make the wrong move and it'll chew you up
		"f1000_esrg1165", -- Miller: that's a target, eliminate it
		"f1000_rtrg1671", -- Miller: six minutes remaining
		"f1000_rtrg1672", -- Miller: 5 minutes remaining
		"f1000_rtrg1673", -- Miller: 4 minutes remaining
		"f1000_rtrg1674", -- Miller: 3 minutes remaining
		"f1000_rtrg1675", -- Miller: only 2 minutes remaining
		"f1000_rtrg1676", -- Miller: one minute remaining, what's wrong with you move!
		"f1000_rtrg1677", -- Miller: no, you're not gonna make it!
		"f1000_rtrg1678", -- Miller: you're out of time! snake!
		"f1000_rtrg0745", -- Ocelot: tread carefully, boss
		"f1000_rtrg0815", -- Miller: boss get out of there!
		"f1000_rtrg1985", -- Miller: it's coming after ours' take it out
		"f1000_rtrg1647", -- Ocelot: great job
		"f1000_rtrg1665", -- Miller: what's the big hurry, that's not like you. take your time
		"f1000_rtrg2450", -- Miller: boss if we develop a child sized fulton recover device we can extract kids
		"f1000_rtrg5020", -- Ocelot: boss get down, the enemy sniper, stay low and crawl along the ground
		"f1000_rtrg5021", -- Ocelot: boss get down, that's an enemy gunship, stay low and crawl along the ground
		"f1000_rtrg0081", -- Miller: open your eyes he's on our side
		"f1000_rtrg5030", -- Miller: looks like the tape broke, it won't play anymore
		"f1000_esrg2460", -- Ocelot: showers- that's luxury stuff for the rank and file
		"f1000_rtrg5040", -- Miller: that wild dog pup, he's a tough little guy, no time to be playing with animals, what are you gonna do
		"f1000_rtrg5050", -- Miller: roger that, we'll pick him up
		"f1000_rtrg5060", -- Miller: boss stop!
		"f1000_rtrg5070", -- Miller: What are you thinking?? || d-don't even! that's not funny!
		"f1000_rtrg5080", -- Miller: not good, there's a risk the fulton extraction will be spotted by nearby enemies, secure are beforehand or move
		"f1000_rtrg5090", -- Miller: urgh, now that's some lateral thinking
		"f1000_rtrg0401", -- Ocelot: That prisoner you extracted gave us some information.
		"f1000_rtrg0411", -- Miller: we got a lead on some work from that soldier you extracted, added the details to your sideops list. if you're interested take a look
		"f1000_rtrg0531", -- Miller: boss we need a cargo capable fulton device to extract containers, use your idroid to order development
		"f1000_rtrg4101", -- Miller: one of the guys out on a mission at the time, he's fallen a long way from the glory days will he come back to us
		"f1000_rtrg4111", -- Miller: I remember him, he was offbase during the attack from 9 years ago, bring him home boss
		"f1000_rtrg9011", -- Miller: mission complete. boss.
		"f1000_rtrg3781", -- Ocelot: that's an enemy gunship. don't try to take it down from the front, won't win head to head shootout
		"f1000_rtrg5100", -- Ocelot: boss that man you picked up from bwalla ya masa is a top notch gunsmith, plenty of work for him but he's just the apprentice
		"f1000_rtrg5110", -- Ocelot: picked up from base camp is not the legendary gunsmith either
		"f1000_rtrg5120", -- Miller:as requested an analyzer function added to binoculars
		"f1000_rtrg5130", -- Miller: not good- don't let your buddy die snake, I'm pulled them out of there!
		"f1000_rtrg5140", -- Ocelot: great job, alright we'll bring em out.
		"f1000_rtrg4345", -- Miller: you can't do that right now || the guards are on edge.
		
		-- game over messages, they don't have the radio sound filter though.
		"f8000_gmov0010", -- Ocelot: hey quit kidding around, snake? snaaaaaaaaaaaake || Miller: snake talk to me, snake snake!
		"f8000_gmov0123", -- Miller: why did you kill her boss? mission failed
		"f8000_gmov0020", -- Ocelot: abandoning the mission? maybe not the big boss we hoped for after all || Miller: boss why did you abandon the mission?
		"f8000_gmov0030", -- Miller: you're really aborting the mission, huh? head back in as soon as your prepared || Miller: mission aborted!
		"f8000_gmov0040", -- Miller: the chopper went down, we've got no other means of extraction, mission failed
		"f8000_gmov0050", -- Miller: what the hell were you thinking?! mission failed, all that work for nothing || Miller:  boss have you lost your mind?!?
		"f8000_gmov2500", -- Ocelot: boss have you lost your mind? maybe not the big boss we hoped for after all
		"f8000_gmov0060", -- Miller: boss what happened boss boss || Miller: snake snaaake
		"f8000_gmov0115", -- Miller: the target's dead mission failed
		"f8000_gmov0220", -- Miller: boss they're just kids what did you do? the mission is a failure
		"f8000_gmov0130", -- Miller: target confirmed dead, he didn't survive the shock of the fulton extraction, mission failed
		"f8000_gmov0110", -- Miller: boss the target's dead mission failed
		"f8000_gmov0125", -- Miller: what the hell were you thinking? mission failed || Miller: I thought we could count on you boss mission failed
		"f8000_gmov0230", -- Miller: boss you killed a child I'm aborting this mission
		"f8000_gmov0140", -- Miller: boss the target's dead mission failed 
		"f8000_gmov0120", -- Miller: boss have you lost your mind?!?
		"f8000_gmov0150", -- Miller: why did you kill her boss? mission failed
		"f8000_gmov9090", -- Miller: dammit, the missions a failure || Miller: mission failed boss
		"f8000_gmov0100", -- Ocelot: hey quit kidding around, snake? snaaaaaaaaaaaake || boss come in, boss booooossss
		"f8000_gmov0090", -- Ocelot: I've seen enough mission aborted, once more from the top
		"f8000_gmov0070", -- Miller: I thought we could count on you boss mission failed
		"f8000_gmov0080", -- Miller: we lost the targets, the kids are all dead mission failed
		"f8000_gmov0240", -- Miller: Boss the target's been destroyed mission failed
		
		 -- f2000 is common, but mostly story radio calls (new job offers, eli shinanigans at mother base, wolbachia outbreaks). also some repeats. Not a lot of good generic radios
		"f2000_oprg0010",
		"f2000_oprg0105",
		"f2000_rtrg0010",
		"f2000_oprg0020",
		"f2000_oprg0030",
		"f2000_oprg0040",
		"f2000_oprg0055",
		"f2000_oprg0065",
		"f2000_oprg0075",
		"f2000_rtrg1135", -- Miller: good news boss, another survivor from 9 years ago has joined diamond dogs, I've added him to the staff list, you can check it on your idroid.
		"f2000_rtrg8270",
		"f2000_oprg0115",
		"f2000_oprg0125",
		"f2000_oprg0130",
		"f2000_rtrg1170", -- Miller: boss we've got some new job offers come in selected ones I want you to handle and added to idroid
		"f2000_rtrg8310",
		"f2000_oprg0140",
		"f2000_rtrg1180",
		"f2000_rtrg8320", -- Miller: new job offers added to missions
		"f2000_oprg0155",
		"f2000_oprg0220",
		"f2000_rtrg8330", 
		"f2000_oprg0165",
		"f2000_rtrg1240",
		"f2000_rtrg8340",
		"f2000_rtrg1320",
		"f2000_oprg0175",
		"f2000_rtrg1250",
		"f2000_rtrg8350",
		"f2000_oprg0185",
		"f2000_oprg0190",
		"f2000_oprg0200",
		"f2000_rtrg1280",
		"f2000_rtrg8380",
		"f2000_rtrg0025",
		"f2000_rtrg0035",
		"f2000_rtrg1300",
		"f2000_rtrg8400",
		"f2000_oprg0210",
		"f2000_rtrg1310",
		"f2000_rtrg0040",
		"f2000_rtrg0050",
		"f2000_rtrg0060",
		"f2000_rtrg0070",
		"f2000_rtrg0080",
		"f2000_rtrg0090",
		"f2000_rtrg1330",
		"f2000_rtrg1335",
		"f2000_rtrg9010",
		"f2000_rtrg1340",
		"f2000_rtrg9020",
		"f2000_rtrg1345",
		"f2000_rtrg9030",
		"f2000_rtrg1350",
		"f2000_rtrg9040",
		"f2000_oprg0225",
		"f2000_rtrg9050", -- Miller: what's the matter boss?
		"f2000_rtrg9060",
		"f2000_rtrg9070",
		"f2000_rtrg9080",
		"f2000_rtrg9090",
		"f2000_rtrg9100",
		"f2000_rtrg9110",
		"f2000_rtrg9120",
		"f2000_rtrg9130",
		"f2000_rtrg9140",
		"f2000_rtrg9150",
		"f2000_rtrg9160",
		"f2000_rtrg9170",
		"f2000_rtrg9180",
		"f2000_rtrg9190",
		"f2000_rtrg9200",
		"f2000_rtrg9210",
		"f2000_rtrg9220",
		"f2000_rtrg9230",
		"f2000_rtrg9240",
		"f2000_rtrg9250",
		"f2000_rtrg9260",
		"f2000_rtrg1360", -- Miller: if you want to be sure your extraction target makes it safely carry them to the support chopper instead
		"f2000_rtrg1370",
		"f2000_rtrg1375",
		"f2000_rtrg1380",
		"f2000_rtrg1390",
		"f2000_rtrg1400",
		"f2000_rtrg1410",
		"f2000_rtrg1420",
		"f2000_rtrg1430",
		"f2000_rtrg1435",
		"f2000_rtrg1440",
		"f2000_rtrg1445",
		"f2000_rtrg1450",
		"f2000_rtrg1455",
		"f2000_rtrg1460",
		"f2000_rtrg1465",
		"f2000_rtrg1466",
		"f2000_rtrg1470",
		"f2000_rtrg1480",
		"f2000_rtrg1490",
		"f2000_rtrg1500",
		"f2000_rtrg1510",
		"f2000_rtrg1515",
		"f2000_rtrg1520",
		"f2000_rtrg1525",
		"f2000_rtrg1530",
		"f2000_rtrg1540",
		"f2000_rtrg1545",
		"f2000_rtrg1550",
		"f2000_rtrg1560", -- Miller: the escaped kids should be around here
		"f2000_rtrg1000",
		"f2000_rtrg1030",
		"f2000_rtrg1010",
		"f2000_rtrg1040",
		"f2000_rtrg1050",
		"f2000_rtrg1060",
		"f2000_rtrg1070",
		"f2000_rtrg1080",
		"f2000_rtrg1090", -- Miller: no new contracts, if you've got the time take on sideops 
		"f2000_rtrg1790",
		"f2000_rtrg1800",-- grunts
		"f2000_rtrg1810",-- grunts
		"f2000_rtrg1820",-- grunts
		"f2000_rtrg1830", -- Ocelot: something wrong?
		"f2000_rtrg1840", -- Ocelot: you're pretty good
		"f2000_rtrg1850", -- Miller: you need to carry injured kids to the chopper
		"f2000_rtrg1910", -- Miller: the sideop objective is around there
		"f2000_rtrg2000",
		"f2000_rtrg2010",
		"f2000_rtrg2020",
		"f2000_rtrg2030",
		"f2000_rtrg2040",
		"f2000_esrg0010", -- Ocelot: moon facts
		"f2000_esrg0020", -- Ocelot: full moon facts
		"f2000_esrg0030", -- Ocelot: southern cross facts
		"f2000_esrg0040", -- Ocelot: big dipper facts
		"f2000_esrg0050", -- Ocelot: don't look at the sun
		"f2000_oprg1000",
		"f2000_oprg1010",
		"f2000_oprg0230",
		"f2000_oprg0240",
		"f2000_oprg0250",
		"f2000_oprg0260",
		"f2000_oprg0270",
		"f2000_oprg0280",
		"f2000_oprg0290",
		"f2000_oprg0300",
		"f2000_oprg0310",
		"f2000_rtrg8000",
		"f2000_rtrg8010",
		"f2000_rtrg8020",
		"f2000_rtrg8030",
		"f2000_rtrg8040",
		"f2000_rtrg8050",
		"f2000_rtrg8060",
		"f2000_rtrg8065",
		"f2000_rtrg8070",
		"f2000_rtrg8080",
		"f2000_rtrg8090",
		"f2000_rtrg8100",
		"f2000_rtrg8110",
		"f2000_rtrg8120",
		"f2000_rtrg8130",
		"f2000_rtrg8140",
		"f2000_rtrg8150",
		"f2000_rtrg8160",
		"f2000_rtrg8170",
		"f2000_rtrg8180",
		"f2000_rtrg8190",
		"f2000_rtrg8200",
		"f2000_rtrg8210",
		"f2000_rtrg8220",
		"f2000_rtrg8230",
		"f2000_rtrg8240",
		"f2000_rtrg8250",
		"f2000_rtrg8260",
		"f2000_rtrg8280",
		"f2000_rtrg8290",
		"f2000_rtrg8360",
		"f2000_rtrg8370",
		"f2000_rtrg8390",
		"f2000_rtrg8115",
		"f2000_rtrg1645",
		"f2000_rtrg0100",
		"f2000_rtrg0110",
		"f2000_oprg1020",
		"f2000_oprg1030",
		"f2000_rtrg1517",
		"f2000_rtrg0120",
		"f2000_rtrg0130",
		"f2000_rtrg8175",
		"f2000_rtrg1561",
		"f2000_rtrg8185",
		"f2000_rtrg8420",
		"f2000_rtrg8440",
		"f2000_rtrg8450",
		"f2000_rtrg3010",
		"f2000_esrg0060",
		"f2000_esrg0070",
		"f2000_oprg1040",
		"f2000_rtrg3005",
		"f2000_rtrg1346",
		"f2000_rtrg1347",
		"f2000_rtrg8421",
		"f2000_rtrg8261",
		"f2000_rtrg8391",
		"f2000_rtrg8900",
		"f2000_rtrg8451",
		"f2000_rtrg8452",
		"f2000_rtrg8453",
		"f2000_rtrg8454",
		"f2000_rtrg8901",
		"f2000_rtrg1459",
		"f2000_rtrg7338",
		"f2000_rtrg7330",
		"f2000_rtrg7332",
		"f2000_rtrg7335",
		"f2000_rtrg7120",
		"f2000_rtrg7325",
		"f2000_rtrg7350",
		"f2000_rtrg3020",
		"f2000_rtrg2050",
		"f2000_rtrg2060",
		"f2000_oprg0500",
		
		 -- f5000 not common, plays nothing while I was sitting around in africa
		"f5000_rtrg0010",
		"f5000_rtrg0090",
		"3897664643",
		"f5000_rtrg0020",
		"f5000_rtrg0030",
		"f5000_rtrg0040",
		"f5000_rtrg0050",
		"f5000_rtrg0060",
		"f5000_rtrg0070",
		"f5000_rtrg0080",
		"f5000_rtrg0100",
		"553129981",
		"f5000_rtrg0110",
		"778035125",
		"f5000_rtrg0120",
		"3576884196",
		"f5000_rtrg0130",
		"f5000_rtrg0140",
		"f5000_rtrg0150",
		"f5000_rtrg0160",
		"f5000_rtrg0170",
		"f5000_rtrg0180",
		
		 -- f6000 not common, plays nothing while I was sitting around in africa
		"f6000_rtrg0010",
		"444392453",
		"f6000_rtrg0090",
		"f6000_rtrg0020",
		"1569463150",
		"f6000_rtrg0030",
		"f6000_rtrg0040",
		"f6000_rtrg0050",
		"f6000_rtrg0060",
		"f6000_rtrg0070",
		"f6000_rtrg0080",
		"f6000_rtrg0100",
		"f6000_rtrg0110",
		"f6000_rtrg0120",
		"f6000_rtrg0130",
		"f6000_rtrg0140",
		"f6000_rtrg0150",
		"f6000_rtrg0160",
		"f6000_rtrg0300",
		"f6000_rtrg0170",
		"f6000_rtrg0310",
		"f6000_rtrg0340",
		"f6000_rtrg0180",
		"f6000_rtrg2270",
		"144669544",
		"f6000_rtrg0190",
		"2776701659",
		"f6000_rtrg0330",
		"f6000_rtrg0200",
		"f6000_rtrg0220",
		"f6000_rtrg0265",
		"874391636",
		"f6000_rtrg0230",
		"f6000_rtrg0240",
		"f6000_rtrg0250",
		"2410714673",
		"f6000_rtrg0335",
		"f6000_rtrg2010",
		"f6000_rtrg0338",
		"f6000_rtrg2020",
		"f6000_rtrg2030",
		"f6000_rtrg0332",
		"f6000_rtrg2040",
		"f6000_rtrg2050",
		"f6000_rtrg2060",
		"2435388296",
		"222165713",
		"4286635303",
		"2209282343",
		"3009777565",
		"f6000_rtrg2120",
		"f6000_rtrg2130",
		"f6000_rtrg2140",
		"f6000_rtrg2150",
		"f6000_rtrg2160",
		"2564356727",
		"3541159385",
		"2536812849",
		"3674690994",
		"3820866740",
		"668820784",
		"2382831883",
		"f6000_rtrg0165",
		"f6000_rtrg0350",
		"f6000_rtrg0360",
		"f6000_rtrg0370",
		"f6000_rtrg0380",
		"1613147985",
		"f6000_rtrg0400",
		"f6000_rtrg0325",
		"f6000_rtrg0500",
		"45619711",
		"f6000_rtrg0511",
		"1546264699",
		"3419812327",
		"4115122968",
		"1190416135",
		"4168223123",
		"1304297919"
	}, 
```
