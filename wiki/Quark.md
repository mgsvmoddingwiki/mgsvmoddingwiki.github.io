---
title: Quark system
permalink: /QuarkSystem/
tags: [EXE]
---

Quark system is an implementation of [Dependency injection](https://en.wikipedia.org/wiki/Dependency_injection).
At the start of game quark system table (DI container) is populated with 
Quark instances, which are references to all classes in the game (see `tpp::gm::QuarkInitialize`, 1505 entries total).
These instances are reused later like this (pseudocode):


```
// tpp::gk::GimmickUtility::EnableDynamicCoverPoint

auto container = fox::GetQuarkSystemTable();
container["GimmickUtilty"]->SetSomeFlag(param_1, param_2 + 1.5, param_3);
```

Decompiled form:

```
pQVar1 = fox::GetQuarkSystemTable();
(**(code **)(**(longlong **)(*(longlong *)(pQVar1 + 0x98) + 0x1b8) + 0x30))
            (*(longlong **)(*(longlong *)(pQVar1 + 0x98) + 0x1b8),param_1,param_2 + 1.5,param_3);
```

QuarkSystem table is a hash table, all elements have fixed positions and consistent across exe versions.
0x98 is a bucket, 0x1b8 is an offset in that bucket, 0x30 is an offset for `SetSomeFlag` function in `GimmickUtilty` vtable. 
Keys are strings encoded with StrCode64 (see [Hash Wrangling](/Hash_Wrangling/)). Bucket, table offsets and container keys are not documented.

#### Resources

  - List of quark hashes with some of them resolved: [quark_hashes.txt](/assets/QuarkSystem/quark_hashes.txt).
