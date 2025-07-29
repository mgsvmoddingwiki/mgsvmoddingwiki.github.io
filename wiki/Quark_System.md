---
title: Quark System
permalink: /Quark_System/
tags: [EXE]
redirect_from:
  - /QuarkSystem/
---

Quark system is a global table allowing game subsystems to communicate with each other
without having them as hardcoded dependencies (see [Dependency injection](https://en.wikipedia.org/wiki/Dependency_injection)).
At the start of game quark system table is populated with Quark instances,
which are references to all classes in the game.
Initialization happens in `tpp::gm::QuarkInitialize` (1505 entries total) and `tpp::gm::GameCoreModule::Init`.
QuarkSystemTable is a struct, all elements have fixed positions and consistent across exe versions.

Pseudocode:

```c++
struct QuarkSystemTable {
    GimmickUtility gmUtil = nullptr;
    TppSoldier2 tppSolly = nullptr;
    TppPlayer2 tppPlayer = nullptr;
    ...
}

auto hash = StrCode64("TppSoldier2");
auto creator = QuarkCreatorCollector::GetCreator(hash);
auto quark = creator();
auto collector = QuarkCollector::GetInstanceForCreatorId(hash);
collector->AddQuark(quark);
quark->initialize();
return {&quark, hash};
```

StrCode64 is a hashing function (see [Hash Wrangling](/Hash_Wrangling/)).

Quark instances are reused later like this (pseudocode):

```c++
// tpp::gk::GimmickUtility::EnableDynamicCoverPoint

auto container = fox::GetQuarkSystemTable();
container.GimmickUtilty->SetSomeFlag(param_1, param_2 + 1.5, param_3);
```

Decompiled form (Ghidra):

```c++
pQVar1 = fox::GetQuarkSystemTable();
(**(code **)(**(longlong **)(*(longlong *)(pQVar1 + 0x98) + 0x1b8) + 0x30))
            (*(longlong **)(*(longlong *)(pQVar1 + 0x98) + 0x1b8),param_1,param_2 + 1.5,param_3);
```

0x98 is a QuarkSystemTable struct offset, 0x1b8 is a base class vtable offset for GimmickUtility implementation,
0x30 is an offset for `SetSomeFlag` function in `GimmickUtilty` vtable.
Struct offsets and creator keys are not documented.

#### Resources

  - List of quark hashes/keys (`quark_hashes.txt`): [mgsv-lookup-strings](https://github.com/kapuragu/mgsv-lookup-strings/tree/master/exe/).
