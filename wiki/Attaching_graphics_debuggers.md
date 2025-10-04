---
title: Attaching graphics debuggers
permalink: /Attaching_graphics_debuggers/
tags: [EXE, Guides, Rendering]
---

By default, TPP checks the loaded d3d11.dll before and after it creates necessary D3D11 interfaces to confirm d3d11.dll hasn't been hooked. This is likely meant as a countermeasure against cheating in MGO but a side effect is that tools like graphics debuggers (RenderDoc) and mod packages (ReShade) generally do not work. The fix is to simply ignore the result of `fox::gr::dg::CheckModuleHook` by patching a conditional jump to simply always jump to the `true` case.

Using a hex editor, navigate to `mgsvtpp.exe+0x2ba642` (file offset) or `0x1402bb242` (memory offset):
![Before](/assets/Attaching_graphics_debuggers/BeforeCheckModuleHookFix.png)

and set the following six bytes (`0F 84 1F 04 00 00`, (JZ LAB_1402bb667)) to `48 E9 00 00 00 00` (JMP LAB_1402bb248):

![After](/assets/Attaching_graphics_debuggers/AfterCheckModuleHookFix.png)
