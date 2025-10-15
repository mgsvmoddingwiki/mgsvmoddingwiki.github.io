---
title: Emblem
permalink: /Emblem/
tags: [EXE, Lua]
---

Player emblem is a texture that is displayed on different player-owned entities such as camouflage, Motherbase, containers, vehicles, mission prep screen etc.

![Custom emblem on player right shouder, Motherbase exterior, flag and helicopter](/assets/Emblem/heli_motherbase.jpg){:.thumb .center}

It is composed of two shape textures (back/front) and two word textures. Player can unlock different shapes and words by
playing the game. Shapes and words are tied to specific missions and free-roam outposts; you can check them in `./00.dat/Assets/tpp/script/lib/TppEmblem.lua`.
They are saved in `vars.emblemFlag` lua variable. Textures can be found in `master\texture0.dat\Assets\tpp\ui\texture\Emblem\`.

On FOBs emblem assignment is inconsistent.

If defender is a supporter of attacked FOB and has a different emblem, it will be replaced with FOB emblem from attackers point of view. 

Defender cannot see attackers emblem, default "DD" emblem is used instead (depends on master server response).

![Default emblem, editor](/assets/Emblem/default_emblem.jpg){:.thumb .center}

### Texture composition

All emblems (player and FOB opponent) are created dynamically by `tpp::ui::emblem::impl::EmblemEditorSystemImpl` class.
First, `tpp::ui::emblem::impl::EmblemEditorSystemImpl::CreateEmblemParameters` is called with variables from save file (local) or
master server response (FOB).

Save file variables:

| name | value | example |
| --- | --- | --- |
| emblemTextureTag | strcode32 hash | base5,fd776fc4 |
| emblemColorL | RGBA value | 0x00b4b4b4 |
| emblemColorH |  RGBA value | 0x00b4b4b4 |
| emblemX | signed byte | -90 |
| emblemY | signed byte | -80 |
| emblemScale | signed byte | 5 |
| emblemRotate | signed byte | 10 |

Each variable is a 4-value array indexed from 0 to 3, example: `vars.emblemY[0]`.

After successfully creating parameters, they are fed to `tpp::ui::emblem::impl::EmblemEditorSystemImpl::CreateEmblem`, which
makes **2** named textures: regular and small one (with what dimensions?). Small texture gets `_S` suffix.

To create the texture, words and shapes are blend together by an instance of `fox::gr::TextureBlender` (created during object initialization, `tpp::ui::emblem::impl::EmblemEditorSystemImpl::CreateBlender`).
Emblem can be recreated anywhere except during online session after both players are connected and in the mission - game will crash in `tpp::gk::'anonymous_namespace'::EmblemManagerImplJob::UpdateRendering (0x14055ac0c)`.

Player emblem is created on game start from lua in `0/00.dat/Assets/tpp/pack/mission2/init/init_fpkd/Assets/tpp/level/mission2/init/init_sequence.lua`:

```lua
TppUiCommand.CreateEmblem("MyEmblem")
```

On FOBs another pair of textures is made: `OpponentEmblem` and `OpponentEmblem_S`. These names are hardcoded in the exe and not referenced in lua; 
for attacker they are created on FOB selection list after selecting the attack target.
