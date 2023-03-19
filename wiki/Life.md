---
title: Life
permalink: /Life/
tags: [Lua, Player]
---

Player max life can be set in script via
Player.ChangeLifeMaxValue(value)

Default player life is defined as 6000 in
\*player(s)\_game\_obj.fox2/TppPlayer2Parameter/lifeMax

however this is only the value during the early game (as shown by
vars.playerLifeMax)

after mission 2 (first mother base visit) it bumps up to 6600
(6000\*1.1?)

With medical hand grade 2 or higher (as snake or avatar), or with a DD
soldier with the Tough guy skill this increases to 7801, which is a bit
over 6000\*1.3 - 1.300166666666667

65535 is max of an unsigned 16 bit integer so the overflow to 0 makes
sense.

Scaling is 1.1 for ALL NORMAL soldiers (and scaling does exist)

Scaling is 1.300166666666667 for "Tough Guys" (it's actually the same as
Snake's)

In free roam/missions, ALL NORMAL soldiers gain 1.1 first

but "Tough Guys" (and Snake) then gain 1.300166666666667 on base 6000.

Scaling downscale with damage/flies(time=stinky) will only drop by MAX
x0.1 in 5 steps of x0.02 each

So ALL NORMAL soldiers downscale to 1.0

"Tough Guys" (and Snake) downscale to 1.2

Downscale applies to all areas

"Tough Guys" (and Snake) on MB gain 1.200166666666667 scale for some
reason (even with scaling downscale NOT applied) while NORMAL soldiers
do not gain a boost at all (it remains 1.0)

I think the shower increases the scale itself so on MB "Tough Guys" (and
Snake) get 1.2 max so it can become 1.3 after shower

while NORMAL soldiers get 1.0 so it can become 1.1 after shower

Once scaling decreases for one soldier, it remains decreased for <u>ALL</u>
soldiers, meaning changing to any other character does not reset it and
one does need to visit the shower on MB

