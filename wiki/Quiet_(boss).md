---
title: Quiet (boss)
permalink: /Quiet_(boss)/
tags: [EXE]
---

Quiet (boss) is an enemy NPC present in mission #11, CLOAKED IN SILENCE (extreme version #40). Her AI is shared with
Sniper Skulls (missions #28 and #48, CODE TALKER).

She is represented by `tpp::gm::bossquiet` class in the exe.

---

### GameObject

GameObject id is `12800`. Skulls unit is `12800 ... 12803`. Commands: [link](/Commands).

Related entities:

  - [TppBossQuiet2LocatorParameter](/Entity_Reference/?/Tpp/GameCore/TppBossQuiet2LocatorParameter)
  - [TppBossQuiet2Parameter](/Entity_Reference/?/Tpp/GameCore/TppBossQuiet2Parameter)

---

### Life

Life and stamina values are hardcoded in `tpp::gm::bossquiet::impl::'anonymous_namespace'::LifeControllerImpl::Initialize`:

| Mission version | Life | Stamina |
| --- | --- | --- |
| Normal | 6400 | 3000 |
| Extreme | 9000 | 9000 |


On taking lethal damage health is set to 1, so she can be executed or extracted; same logic applies to Skulls unit.
Implementation: `tpp::gm::bossquiet::impl::'anonymous_namespace'::LifeControllerImpl::Initialize`.
Damage is handled by `tpp::gm::bossquiet::impl::'anonymous_namespace'::DamageHandlerImpl`.

---

### Game loop

All actions are processed in `tpp::gm::bossquiet::impl::ActionControllerImpl::Update`. Two primitives are used:
action tasks and commands (which can be converted to tasks).
Commands include firing the weapon, playing damaged animations, flashing scope.
Tasks are more complex and may involve commands: jump to location, equip the weapon and shoot player.
Commands can be overridden (how and when?).

---

### Recovery

Quiet can enter recovery phase, where she looks for closest recovery point (water source) and bathes in it.
Sniper Skulls don't do that (switch where?).
Implementation: `tpp::gm::bossquiet::impl::RecoveryAiImpl`.

---

### UI

Uses special health bar, described in `00.dat/Assets/tpp/pack/mission2/story/s10050/s10050_area_fpkd/Assets/tpp/ui/GraphAsset/entry_datas/boss_gauge_head.fox2`.
Activated as a sight marker (with binoculars or regular zoom), disappears along with player-set follow marker after enemy jumps or runs in invisible state.

---

### Misc

Quiet has special animation if attacked with water pistol; no damage is dealt (what about Skulls?).
Implementation: `tpp::gm::bossquiet::impl::DamageAiImpl::StepWaterGun`.
