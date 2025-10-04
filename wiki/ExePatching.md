---
title: EXE Patching
permalink: /EXE_Patching/
tags: [EXE, Guides]
---

Implementing significant changes in `mgsvtpp.exe` requires significant research and careful assembler work in Ghidra but some features can be targeted with simple hex edits of the exe binary.  

## d3d11.dll Integrity Check
By default, TPP checks the loaded d3d11.dll before and after it creates necessary D3D11 interfaces to confirm d3d11.dll hasn't been hooked. This is likely meant as a countermeasure against cheating in MGO but a side effect is that tools like graphics debuggers and mod packages like ReShade generally do not work. The fix is to simply ignore the result of `fox::gr::dg::CheckModuleHook` by patching a conditional jump to simply always jump to the `true` case.

Using a hex editor, navigate to `mgsvtpp.exe+0x2ba642`:
![](/assets/ExePatching/BeforeCheckModuleHookFix.png)

and set the following six bytes to `48 E9 00 00 00 00`

![](/assets/ExePatching/AfterCheckModuleHookFix.png)