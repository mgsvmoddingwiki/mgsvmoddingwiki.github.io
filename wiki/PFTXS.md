---
title: PFTXS
permalink: /PFTXS/
---

## **PFTXS (Packed Fox Textures)**

.PFTXS files are just archives of .FTEXs files associated with a
matching name .fpk archive to enable faster loading of textures.

I.E reinforce_veh_west_tnk_a.fpk and its
associated reinforce_veh_west_tnk_a.pftxs for a tank.

Interesting things to note about this file is that the FOX engine will
first search the PFTXS for any texture files referenced by models in the
FPK, and then start searching the rest of the MGSV .dat files if it
cannot find textures inside the PFTXS.

At time of writing, Snakebite 0.9.16 still cannot pack and unpack
individually changed texture files inside of PFTXS files, and will
instead overwrite the .pftxs file in its entirety. This means if many of
the same files couple of edited texture files have to be put into
different PFTXS files, it can be economical (or necessary, see below) to
delete them from the PTXS and place them as loose textures in the
"Assets/" folder hierarchy.

This reduces the file size and need to send several 20MB+ PFTXS files
with mods to users, but at the cost of slightly slower load times for
the textures.

N.B One thing to watch out for is the file size of PFTXS must be 30MB or
under. Otherwise the FOX engine will start hanging when it tries to load
textures from the PFTXS files.