---
title: Attaching graphics debuggers
permalink: /Attaching_graphics_debuggers/
tags: [EXE, Guides, Rendering]
---

By default, TPP checks the loaded d3d11.dll before and after it creates necessary D3D11 interfaces to confirm d3d11.dll hasn't been hooked. This is likely meant as a countermeasure against cheating in MGO but a side effect is that tools like graphics debuggers (RenderDoc) and mod packages (ReShade) generally do not work. The fix is to simply ignore the result of `fox::gr::dg::CheckModuleHook` by patching a conditional jump to simply always jump to the `true` case.

Offsets:

|Version|File (Japanese)|Memory (Japanese)|File (English)|Memory (English)|Original JZ|Replace JMP|
| - | - | - | - | - | - | - |
|1.0.15.3|`0x2B96CB`|`0x1402ba1c0`|`0x2B9C2B`|`0x1402bb242`|`75 2D`|`EB 2D`|
|1.0.15.4|`0x2B963B`|`0x1402ba130`|`0x2B90AB`|`0x1402b9a10`|`75 2D`|`EB 2D`|

Using a hex editor, navigate to `mgsvtpp.exe+0x(file offset)` or `0x14(memory offset)`:
![Before](/assets/Attaching_graphics_debuggers/BeforeCheckModuleHookFix.png)

and set the following six bytes (`0F 84 1F 04 00 00`, (JZ LAB_1402bb667), or Original JZ) to `48 E9 00 00 00 00` (JMP LAB_1402bb248), or Replace JMP:

![After](/assets/Attaching_graphics_debuggers/AfterCheckModuleHookFix.png)
