---
title: V Framework UI
permalink: /V_Framework_UI/
tags: [Lua, Reference, Guides, Infinite Heaven, UI, V Framework]
---

`V_UixUtility` builds your own UI windows from `.uilb` layouts and changes the game's own UI (HUD, menus, iDroid). A window holds layouts (`.uilb`), a layout holds models (`.uif`), and a model holds nodes (text, mesh, line, common) and animations (`.uia`).

## Quick start

1. Pick a `.uilb` from the game's UI, or [ship your own](#shipping-your-own-ui-files).
2. In `OnMissionCanStart`, make a text unit with `CreateTextUnit` if you show text, then call `CreateWindow`.
3. Each `Update`, get the window with `FindWindow`. It returns `nil` until the window exists.
4. Call `PostShowAndStartMessage` once for every window handle you have not shown yet.
5. Get the layout, model and nodes you need with `GetLayout`, `GetModel` and `GetModelNode*`.
6. Change them with `SetVisible`, `SetTranslation`, `SetTextForModelNodeText` and the other setters.

`V_HudClock.lua` shows the in-game time in a small box on the HUD. It is built from the game's own `UI_sys_pus_key_help` layout, so it needs no pack of its own.

```lua
local this = {}


-- Settings --------------------------------------------------------------------

local POSITION_X = 33   -- the screen goes from about -64 (left) to 64 (right)
local POSITION_Y = 33   -- and from about -36 (bottom) to 36 (top)


-- Our own names: made up here, any text works ------------------------------------

local OUR_WINDOW = "V_HudClock"
local OUR_LAYOUT = "VHudClock"


-- What this mod remembers -----------------------------------------------------

local shownWindow = nil   -- our window, once we have told the game to show it
local textUnit = nil      -- the game's text holder for the time


-- Infinite Heaven -------------------------------------------------------------

this.active = 1
this.execCheckTable = {inGame = true, inSafeSpace = false}   -- this.Update runs in missions, not in the helicopter
this.execState = {nextUpdate = 0}

function this.OnMissionCanStart()
  if vars.missionCode < 5 then
    return
  end
  if TppMission.IsFOBMission(vars.missionCode) or TppMission.IsHelicopterSpace(vars.missionCode) then 
    return 
  end

  if textUnit == nil then
    textUnit = V_UixUtility.CreateTextUnit(1)
  end

  V_UixUtility.CreateWindow{name = OUR_WINDOW, layouts = {   -- a small text box from the game's own UI
    {path = "/Assets/tpp/ui/LayoutAsset/sys_pause/UI_sys_pus_key_help.uilb", id = OUR_LAYOUT},
  }}
end

function this.Update(currentChecks, currentTime, execChecks, execState)
  local window = V_UixUtility.FindWindow(OUR_WINDOW)
  if window == nil then
    return
  end
  if window ~= shownWindow then   -- a new window is not drawn until it is shown and started
    V_UixUtility.PostShowAndStartMessage(window)
    shownWindow = window
  end

  local layout = V_UixUtility.GetLayout(window, OUR_LAYOUT)
  local box = V_UixUtility.GetModel(layout, "UI_sys_pus_key_help")
  local boxText = V_UixUtility.GetModelNodeText(box, 0x4D1F8C4B)            -- the box's text
  local boxButtonPicture = V_UixUtility.GetModelNodeMesh(box, 0xD0511523)   -- the box's button picture, not used here

  if V_UixUtility.IsGamePauseMenu() or V_UixUtility.IsInDemo() or TppUiCommand.IsMbDvcTerminalOpened() then
    V_UixUtility.SetVisible(layout, false)   -- hidden in the pause menu, in cutscenes and while the iDroid is open
    return
  end

  local time = string.sub(TppClock.GetTime("string"), 1, 5)   -- "21:40:13" becomes "21:40"
  V_UixUtility.SetVisible(layout, true)
  V_UixUtility.SetVisible(boxButtonPicture, false)
  V_UixUtility.SetTranslation(box, POSITION_X, POSITION_Y, 0)
  V_UixUtility.SetTextForModelNodeText(boxText, textUnit, time, true)
end

return this
```

## Good to know

- **Handles.** `Find*`, `Get*` and `CreateTextUnit` return a number handle, or `nil` when the object is not found. The same object always gives the same handle, so fetching it again every update is fine.
- **Dead handles.** A handle stops working when its window goes (mission end or restart), so make the window again each mission. A call with a dead handle does nothing, and one with the wrong kind of handle also writes a warning to the log.
- **When things happen.** Setters, the `Post*` and `Send*` window functions, `AddChildWindow` and `DestroyWindow` apply on the window's next UI update; getters answer right away.
- **Defaults.** A missing or non-number value becomes the default, mostly `0`: `SetTranslation(h, 5)` zeroes y and z, `SetColorRGB(h)` is white, `SetVisible(h)` hides, `SetAnimationSpeed(a)` freezes. For booleans, missing, `nil` and `false` are false, and the number `0` counts as true.
- **Names and hashes.** Wherever a name is asked, pass a string, a number (the hash) or a `"0x..."` string. Vanilla UI names are hashes such as `0x4D1F8C4B`, and the `id` numbers from `GetWindows` can be passed back as names.
- **Text units.** A text node shows text through a text unit: make it once with `CreateTextUnit` and reuse it. Plain text needs 1 unit, tagged text needs more. One text unit handle holds at most 256 units.
- **Text tags.** `<I=C=colour|text>` colours text and `<I=G=button icon>` shows a button icon. `SetupTextUnits`, `CreateBoxText` and `CreateScrollBoxText` refuse text with a broken tag, or a plain stretch over 4095 bytes, with a log warning. `SetTextForModelNodeText` and `SetScrollTextForModelNodeText` pass the text to the game unchecked.
- **Log warnings.** A warning your Lua could cause every frame, such as a wrong handle kind, is written to the log once per distinct text and marked "(shown once)".
- **Moving.** HUD units are relative to the parent: about -64 to 64 across and -36 to 36 up on 16:9. A vanilla `.uilb` often puts its model away from 0,0 inside its layout, so to place something on screen, move the model with `SetTranslation`, not the layout.
- **Game windows.** `FindWindow` does not see some of the game's own windows; `GetWindows` lists them all. Many vanilla layouts start hidden: show them with `SetVisible`.
- **Pad lock.** While `SetDisablePad(id)` is held, the game's menus ignore the pad, keyboard and mouse. Your own button, mouse and wheel reads keep working; the stick and `IsKeyboard...` reads don't. Always call `ResetDisablePad` with the same `id`; the game keeps at most 4 locks at once.
- **FOB.** Every function does nothing and returns nothing in FOB, and on a game version V_FrameWork does not support.
- **Game versions.** These return nothing on game versions that do not have them yet: `IsGamePauseMenu`, `IsInDemo`, `GetFocalLengthZoomRatio`, `GetIconFtexPath`, `GetWeaponItemNameLangId`, `StopSound`, `GetSoundTypeId`, `PostTriggerMessage`, `AddChildWindow`, `PauseDrawScene`, `GetMarkers`, `GetMarkerPosition`, `GetNodeScreenPosition`, `GetEnemyRoutePoints`, `ForceLoopAnimation`, `UnsetForceLoopAnimation`, `PauseAnimation(anim, false)` and every function under Button icons.

## Function reference

Most functions mirror the game's own UI functions, with the same names and argument order. Functions marked *V_FrameWork addition* are not in the game. A few call a game function under another name; the game's name is given after *Game name*. Argument names tell the handle kind: `window`, `layout`, `model`, `anim`, `textUnit`, `pool`, and the node kinds `textNode`, `mesh` and `lineNode`. `node` is any node and `target` is any node, layout or model.

### Windows

| Function | What it does |
|---|---|
| `CreateWindow{...}` | Makes your own window from `.uilb` layouts or a `.uigb` graph. It is not drawn until you show it. |
| `DestroyWindow(window)` | Removes a window made with `CreateWindow`. Any other window is ignored with a log warning. |
| `FindWindow(name)` | Returns the window handle, or `nil` if there is none yet. |
| `GetWindows()` | Lists every live window, the game's own too, with its layouts and models. *V_FrameWork addition.* |
| `GetChildWindowInterface(window, name)` | Returns the child window of that name, or `nil`. |
| `AddChildWindow(parent, child)` | Makes one of your windows follow a parent window and get its messages. |
| `PostShowAndStartMessage(window)` | Shows the window and starts it. Call it once per new window. |
| `PostHideAndStopMessage(window)` | Hides the window and stops it. |
| `PostWakeLayoutMessage(window)` | Wakes the window's layouts. |
| `PostSleepLayoutMessage(window)` | Puts the window's layouts to sleep: hidden and not updated. |
| `SendVisibleWindowMessage(window, visible)` | Shows or hides the window without starting or stopping it. |

| Param | Required | Default | Meaning |
|---|---|---|---|
| `CreateWindow` `name` | Yes | – | Your window's name. Reusing a name replaces that window; a vanilla window's name is refused. |
| `CreateWindow` `layouts` | Yes, unless `graph` | – | List of up to 255 entries `{path, id, drawPriority, fontType}`. |
| `layouts` entry `path` | Yes | – | The `.uilb`, in a loaded pack (vanilla or your own). Every layout of one window must come from the pack that holds the first one. |
| `layouts` entry `id` | Yes | – | The layout's name for `GetLayout`. An entry without `path` or `id` is skipped with a log warning. |
| `layouts` entry `drawPriority` | No | `"__HUD"` | A UI draw-priority name such as `"TELOP_TEXT"`. |
| `layouts` entry `fontType` | No | `0` | Font type, an integer. |
| `CreateWindow` `graph` | No | none | A `.uigb` path. The window takes its layouts from it and `layouts` is ignored. |
| `CreateWindow` `group` | No | `0` | Update group, `0` or `1`; anything else makes no window. `ConnectComponent` needs both sides in the same group. |
| `CreateWindow` `pauseMask` | No | `2` | The pause states that freeze the window. |
| `CreateWindow` `priority` | No | `0` | Draw order against other windows, `0` to `65535`. |
| `AddChildWindow` `child` | Yes | – | A window from `CreateWindow`, not the parent and without a parent yet. |
| `SendVisibleWindowMessage` `visible` | No | `false` | `true` shows the window. |

`GetWindows()` returns a list. Each entry has `window`, `id`, `group`, `parent` (child windows only) and `layouts`. `layouts` is a flat list of entries with `layout`, `id`, `depth` (`0` is the window's root layout), `parentId` and `models`; `models` is a list of `model` and `id`.

### Triggers

| Function | What it does |
|---|---|
| `SendTrigger(window, trigger, param)` | Fires a trigger into the window's UI graph. |
| `SendTriggerToParent(window, trigger, param)` | Same, sent to the window's parent window. |
| `PostTriggerMessage(window, trigger)` | Same as `SendTrigger`, for the window and every window below it. |
| `GetTriggerPool(window)` | Returns the window's trigger pool handle, for `IsTriggerReceived`. |
| `IsTriggerReceived(pool, trigger)` | Returns whether that trigger has arrived, and its param. |

| Param | Required | Default | Meaning |
|---|---|---|---|
| `SendTrigger` `trigger` | Yes | – | The trigger's name or hash. |
| `SendTrigger` `param` | No | `0` | A number or name sent along with the trigger. |

### Window inheritance

| Function | What it does |
|---|---|
| `EnableAllInheritance`, `EnableScaleInheritance`, `EnableRotationInheritance`, `EnableTranslationInheritance`, `EnableColorRGBInheritance`, `EnableColorAlphaInheritance` `(window)` | The window follows that part of its parent. |
| `DisableAllInheritance`, `DisableScaleInheritance`, `DisableRotationInheritance`, `DisableTranslationInheritance`, `DisableColorRGBInheritance`, `DisableColorAlphaInheritance` `(window)` | The window ignores that part of its parent. |

### Finding layouts, models, nodes and animations

| Function | What it does |
|---|---|
| `GetLayout(windowOrLayout, name)` | Returns a layout of a window, or a nested layout of a layout. For your own window the name is the `id` from `CreateWindow`. |
| `IsHaveLayout(layout, name)` | Tells whether the layout has a nested layout of that name. |
| `GetModel(layout, name)` | Returns a model of the layout, e.g. `"UI_sys_pus_key_help"`. |
| `GetAnimation(layoutOrModel, name)` | Returns an animation. |
| `IsHaveModelNodeCommon(model, name)` | Tells whether the model has a common node of that name. |
| `GetModelNodeCommon(model, name)` | Returns a common node. |
| `GetModelNodeText(model, name)` | Returns a text node. |
| `GetModelNodeMesh(model, name)` | Returns a mesh node. |
| `GetModelNodeLine(model, name)` | Returns a line node. |
| `GetOrthogonalProjectionScaleFromModelComponentCamera(model)` | Returns the projection scale of the model's camera. |

### Show, colour and move

| Function | What it does |
|---|---|
| `SetVisible(target, visible)` | Shows or hides the target and everything under it. |
| `IsVisible(target)` | Tells whether the target is shown. |
| `SetAlpha(target, alpha)` | Fades the target and everything under it. |
| `GetAlpha(target)` | Returns its alpha. |
| `SetColorRGB(target, r, g, b)` | Tints the target. |
| `SetColorGroup(target, name)` | Gives the target a colour from the UI colour table. |
| `GetColorGroup(name)` | Returns `r, g, b, a` of that colour. |
| `SetTranslation(target, x, y, z)` | Moves the target. |
| `SetTranslationX`, `SetTranslationY`, `SetTranslationZ` `(target, value)` | Sets one axis. |
| `GetTranslation(target)` | Returns `x, y, z`. |
| `SetRotation(target, x, y, z)` | Turns the target, in radians per axis. |
| `GetRotation(target)` | Returns `x, y, z` in radians. |
| `SetRotationDegree(target, x, y, z)` | Same as `SetRotation`, in degrees. |
| `GetRotationDegree(target)` | Returns `x, y, z` in degrees. |
| `SetRotationDegreeX`, `SetRotationDegreeY`, `SetRotationDegreeZ` `(target, degrees)` | Turns one axis, in degrees. |
| `SetQuaternion(target, x, y, z, w)` | Turns the target with a quaternion. |
| `SetScale(target, s)` | Resizes the target evenly. |
| `SetScale(target, x, y, z)` | Resizes the target per axis. |
| `GetScale(target)` | Returns `x, y, z`. |

| Param | Required | Default | Meaning |
|---|---|---|---|
| `SetVisible` `visible` | No | `false` | `true` shows the target. |
| `SetAlpha` `alpha` | No | `1` | Opacity, `0` to `1`. |
| `SetColorRGB` `r`, `g`, `b` | No | `1` | `0` to `1` each; a missing channel is full. |
| `SetTranslation` `x`, `y`, `z` | No | `0` | A missing value puts that axis at `0`. |
| `SetQuaternion` `x`, `y`, `z` | No | `0` | The quaternion's vector part. |
| `SetQuaternion` `w` | No | `1` | The quaternion's scalar part. |
| `SetScale` `s` | No | `1` | `SetScale(target)` alone resets the scale. |
| `SetScale` `y` | No | same as `x` | Only in the per-axis form. |
| `SetScale` `z` | No | `1` | Only in the per-axis form. |

### Linking

| Function | What it does |
|---|---|
| `ConnectComponent(child, parent, node)` | Hangs a layout or model under a node of another layout or model; it then moves, scales and hides with it. |
| `DisconnectComponent(child)` | Undoes the link. |
| `GetTraversalTranslation(layoutOrModel, node)` | Returns `x, y, z`: where the node ends up after everything above it is applied. |
| `GetTraversalScale(layoutOrModel, node)` | Same, for the scale. |

| Param | Required | Default | Meaning |
|---|---|---|---|
| `ConnectComponent` `child`, `parent` | Yes | – | Layouts or models, in windows of the same update group. |
| `ConnectComponent` `node` | Yes | – | The node of `parent` to hang under: a node handle or a node name. |

`ConnectComponent` refuses, with a log warning, a connect the game would crash on: a component to itself, a window's root layout (its window draws it already), or a parent that hangs under the child.

To keep a layout over a game object, call `GetMarkerPosition(gameObjectId, layoutOrModel)` each update and `SetTranslation` the result.

### Text

| Function | What it does |
|---|---|
| `CreateTextUnit(count)` | Makes the text holder a text node needs. Returns `nil` if `count` is `0` or less; more than `256` makes 256. |
| `DeleteTextUnit(textUnit)` | Frees it. The handle stops working at once. |
| `SetTextForModelNodeText(textNode, textUnit, text, useLanguageFont)` | Shows plain text in a text node. |
| `SetScrollTextForModelNodeText(textNode, textUnit, text, useLanguageFont)` | Same, as scrolling text. |
| `SetupTextUnits(textNode, textUnit, count, text, flagA, flagB)` | Fills the units from tagged text without showing it. Queued like the setters; returns nothing. |
| `SetTextUnitsForModelNodeText(textNode, textUnit, count)` | Shows the units you filled with `SetupTextUnits`. |
| `CreateBoxText(textNode, textUnit, count, text, flagA, flagB)` | Fills and shows tagged text as box text. |
| `CreateScrollBoxText(textNode, textUnit, count, text)` | Same, as scrolling box text. |
| `GetLangText(langId)` | Returns the game's text for a lang id. An unknown id gives the game's empty text, not `nil`. |
| `StartTextScroll(textNode)`, `StopTextScroll(textNode)` | Starts or stops the scrolling. |
| `GetTextTotalHeightInTextNode(textNode)` | Returns the height of the text laid out in the node. |
| `GetTextMaxWidthInTextNode(textNode)` | Returns the widest width of that text. |
| `GetTextNodeWidth(textNode)`, `GetTextNodeHeight(textNode)` | Returns the node's box size. |
| `SetTextNodeWidth(textNode, value)`, `SetTextNodeHeight(textNode, value)` | Sets the node's box size. |
| `SetFontGroup(textNode, font)` | Switches to a font of the UI font palette, e.g. `"hud-def-M"`. |
| `SetFontSize(textNode, width, height)` | Sets the font size. |
| `SetTextAlign(textNode, value)` | `0` left, `1` centre, `2` right. |
| `SetVerticalAlign(textNode, value)` | `0` top, `1` middle, `2` bottom. |
| `GetLineWidth(textNode, line)`, `GetLineHeight(textNode, line)` | Returns the width or height of one line. |
| `SetLineWidth(textNode, line, value)`, `SetLineHeight(textNode, line, value)` | Sets the width or height of one line. |

| Param | Required | Default | Meaning |
|---|---|---|---|
| `CreateTextUnit` `count` | No | `1` | How many units to make. |
| `SetTextForModelNodeText` `useLanguageFont` | No | `false` | `true` uses the game's font for the current language. Also on the scroll version. |
| `SetupTextUnits`, `CreateBoxText`, `CreateScrollBoxText` `count` | No | all units | How many units to use. `0` or less, or more than `CreateTextUnit` made, uses all of them. |
| `SetupTextUnits`, `CreateBoxText` `flagA`, `flagB` | No | `false` | Passed to the game as they are; what they change is not confirmed yet. |
| `SetTextUnitsForModelNodeText` `count` | No | all units | How many units to show. |
| `SetFontSize` `width` | Yes | – | Font width. |
| `SetFontSize` `height` | No | same as `width` | Font height. |
| `GetLineWidth` and the other line functions `line` | No | `0` | Which line of the text. |

### Textures, shaders, meshes and lines

These take a mesh node unless noted.

| Function | What it does |
|---|---|
| `SetTextureName(mesh, path, slot, level)` | Puts a texture on a mesh node. The texture must be in a loaded pack. |
| `IsTextureLoaded(mesh, slot, level)` | Tells whether the slot's texture has loaded. |
| `SetLoadingTexture(mesh, pathId, level)` | Sets the placeholder shown while the real texture loads. |
| `IsDispLoadingTexture(mesh, slot)` | Tells whether the slot still shows the placeholder. |
| `CreatePrefetchTexture(pathId, level)` | Starts loading a texture ahead of use. No node needed. |
| `RemovePrefetchTexture(pathId)` | Drops that prefetch. |
| `IsReadyPrefetchTexture(pathId, level)` | Tells whether the prefetched texture is ready. |
| `SetShaderParameter(mesh, name, x, y, z, w)` | Sets any shader value of a mesh node. |
| `SetShaderTechnique(mesh, name)` | Switches the mesh's shader technique. |
| `SetShaderBaseTexUvShift`, `SetShaderMaskTexUvShift`, `SetShaderScreenTexUvShift` `(mesh, u, v)` | Scrolls the base, mask or screen texture. |
| `SetShaderBaseTexUvRepeat`, `SetShaderMaskTexUvRepeat`, `SetShaderScreenTexUvRepeat` `(mesh, u, v)` | Tiles or crops the base, mask or screen texture. |
| `SetUvShift(mesh, cell, gridSize)` | Shows one cell of an icon sheet on the mask texture. |
| `SetUvShiftBase(mesh, cell, gridSize)` | Same, on the base texture. |
| `SetVertexTranslate(mesh, control, x, y, z, keepX, keepY, keepZ)` | Moves the vertices of one control, e.g. the end of a bar to fill it. |
| `SetLineDraw(lineNode, indices, vertices)` | Draws lines on a line node. |
| `ResetLineDraw(lineNode)` | Clears the lines. |

| Param | Required | Default | Meaning |
|---|---|---|---|
| `SetTextureName` `slot` | Yes | – | The texture slot: `"Base_Texture"`, or `"Mask_Texture"` for posters. |
| `SetTextureName` `level` | No | none | The texture's level variant. |
| `pathId` | Yes | – | An asset path, a number or a `"0x..."` string; `GetPathIdFromChar` and `GetIconFtexPath` return one. |
| `level` (the other texture functions) | No | `0` | The texture's level variant. |
| `SetShaderParameter` `x`, `y`, `z`, `w` | No | `0` | The shader value. |
| `...UvShift` `u`, `v` | No | `0` | How far to scroll. |
| `...UvRepeat` `u`, `v` | No | `1` | How often to tile. |
| `SetUvShift`, `SetUvShiftBase` `cell` | Yes | – | The cell, counted left to right then top to bottom, from `0`. |
| `SetUvShift`, `SetUvShiftBase` `gridSize` | Yes | – | Cells per side. `0` does nothing. Only the shift is set; the repeat is left as it is. |
| `SetVertexTranslate` `control` | Yes | – | Which control of the mesh node to move. |
| `SetVertexTranslate` `x`, `y`, `z` | No | `0` | The new vertex position. |
| `SetVertexTranslate` `keepX`, `keepY`, `keepZ` | No | `0` | `1` leaves that axis as the file has it; `0` moves it. |
| `SetLineDraw` `indices` | Yes | – | Vertex numbers from `0`, one line per neighbouring pair; at least 2, up to 65535. |
| `SetLineDraw` `vertices` | Yes | – | Up to 4096 entries like `{x, y, z, w}`; `z` defaults to `0`, `w` to `1`. An out-of-range index logs a warning and draws nothing. |

### Animations

These take a handle from `GetAnimation`.

| Function | What it does |
|---|---|
| `StartAnimation(anim)` | Plays it once. |
| `StartLoopAnimation(anim)` | Plays it looping. |
| `StartInstantAnimation(anim, toEnd)` | Jumps straight to the end state or the start state, without playing. |
| `PauseAnimation(anim, paused)` | Pauses it, or resumes it where it stopped. |
| `ForceLoopAnimation(anim, loop)` | Forces it to loop. *Game name:* `fox::ui::Animation::ForceLoop`. |
| `UnsetForceLoopAnimation(anim)` | Stops forcing the loop. *Game name:* `fox::ui::Animation::UnsetForceLoop`. |
| `SetAnimationStopTime(anim, seconds)` | Sets the time it stops at. |
| `SetAnimationSpeed(anim, speed)` | Sets the play speed. |
| `IsAnimationRunning(anim)` | Tells whether it is playing. |
| `IsAnimationPastTime(anim, seconds)` | Tells whether it has run past that time. |
| `GetAnimationTimeLength(anim)` | Returns its length in seconds. *Game name:* `fox::ui::Animation::GetTimeLength`. |

| Param | Required | Default | Meaning |
|---|---|---|---|
| `StartInstantAnimation` `toEnd` | No | `false` | `true` jumps to the end state, `false` to the start state. |
| `PauseAnimation` `paused` | No | `true` | `false` resumes. *V_FrameWork addition.* |
| `ForceLoopAnimation` `loop` | No | `false` | `true` forces the loop. |
| `SetAnimationStopTime` `seconds` | No | `0` | The stop time in seconds. |
| `SetAnimationSpeed` `speed` | Yes | `0` | `1` is normal speed; `0` freezes it. |

### Draw order

| Function | What it does |
|---|---|
| `SetModelNodePriority(node, priority)` | Sets a node's draw order inside its model, `0` to `255`. |
| `UpdateModelDrawOrder(model)` | Re-sorts the model's draw order; call it after changing node priorities. |
| `GetDrawPriority(layout)` | Returns a layout's draw order. |
| `SetDrawPriority(layout, priority)` | Sets a layout's draw order, `0` to `255`. |
| `GetDrawPriorityFromTable(name)` | Returns the number of a named draw priority such as `"__HUD"` or `"TELOP_TEXT"`. |

### Input

Each state check has a number form (`IsButtonPress(button)`) and a `ByName` form (`IsButtonPressByName(name)`). A number form needs a number, or it returns nothing. Get button numbers from `GetButtonNumber` and key codes from `ButtonNameToKeyCode`. Press is true on the frame the button goes down, pressing while it is held, release on the frame it is let go. `IsButtonPressByName` with `"UI_DECIDE"` or `"UI_CANCEL"` also counts a mouse click, like the game's menus.

| Function | What it does |
|---|---|
| `GetButtonNumber(name, convert)` | Returns the number of a button name. |
| `IsButtonPress`, `IsButtonPressing`, `IsButtonRelease` | Pad button state. |
| `IsButtonRepeat(button, first, interval)` | True on press, then repeating while held. |
| `IsButtonLongPress(button, seconds)` | True once held for that long. |
| `GetButtonLongPressResultByName(name, seconds)` | Returns `0` idle, `1` held long enough, `2` still holding, `3` let go too early. |
| `GetAnalogStickAxis(stick)` | Returns the stick's `x, y`. |
| `IsUseKeyboard()` | True when the player is on keyboard and mouse instead of a pad. |
| `ButtonNameToKeyCode(name)` | Returns `status, keyCode`. Status `20` means no key is bound to that name. |
| `IsKeyboardPress`, `IsKeyboardPressing`, `IsKeyboardRelease` | Keyboard key state; the number form takes a key code. |
| `GetMouseMoveXY()` | Returns the mouse movement `x, y`. |
| `GetMouseWheel()` | Returns the wheel amount. |
| `IsMouseButtonDown`, `IsMouseButtonPressing`, `IsMouseButtonUp` | Mouse button down this frame, held, up this frame. |
| `SetDisablePad(id)` | Makes the game's menus ignore the pad, keyboard and mouse. The mouse part is a *V_FrameWork addition.* |
| `ResetDisablePad(id)` | Releases that lock. |
| `IsDisablePad(id)` | Tells whether that lock is held. |

| Param | Required | Default | Meaning |
|---|---|---|---|
| `GetButtonNumber` `convert` | No | `false` | `true` maps the name to the pad button it is bound to. |
| `IsButtonRepeat` `first` | No | `0` | Seconds before the first repeat. |
| `IsButtonRepeat` `interval` | No | `0` | Seconds between repeats. |
| `IsButtonLongPress` `seconds` | No | `0` | How long to hold. |
| `GetAnalogStickAxis` `stick` | No | `0` | `0` left stick, `1` right stick. |
| `SetDisablePad` `id` | Yes | – | Any name or number you choose, except `0`. |

### Button icons

| Function | What it does |
|---|---|
| `GetPadButtonUvShift(type, number)` | Returns `u, v`: where a pad button's picture sits on the button icon sheet, or `nil` when the game has no picture for that pair. |
| `SetPadKeyboardIconTexture(mesh, buttonName, u, v)` | Shows the key picture when the player is on keyboard, the pad picture on a pad. |
| `RegistButtonMeshParam(mesh, buttonName, u, v, registId)` | Shows the picture now and again whenever the player switches between pad and keyboard. Up to 50 at once. |
| `EraseButtonMeshParam(mesh)` | Removes that mesh's registration. |
| `EraseButtonMeshParamFromRegistId(registId)` | Removes every registration with that `registId`. |
| `IsChangePadKeyboard()` | True on the frame the player switches between pad and keyboard. |
| `SetPlatformButtonTexture(mesh)` | Puts this platform's button icon sheet on the mesh. |
| `SetButtonIconTextureByName(mesh, buttonName)` | Picks that button's picture; use it after `SetPlatformButtonTexture`. |

| Param | Required | Default | Meaning |
|---|---|---|---|
| `GetPadButtonUvShift` `type` | No | `0` | `0` means a pad button number from 0 to 15. |
| `GetPadButtonUvShift` `number` | Yes | – | The button number. |
| `SetPadKeyboardIconTexture` `u`, `v` | No | game picks | The pad picture's position on the sheet. |
| `RegistButtonMeshParam` `u`, `v` | Yes | – | The pad picture's position on the sheet. |
| `RegistButtonMeshParam` `registId` | Yes | – | Any name or number you choose. |

### Game state and sounds

| Function | What it does |
|---|---|
| `IsGamePauseMenu()` | True in the game's pause menu. |
| `IsInDemo()` | True during a cutscene. |
| `GetFocalLengthZoomRatio()` | Returns the camera zoom: `1` is no zoom, higher with binoculars, scopes or aiming. |
| `PauseDrawScene(pause)` | `true` stops drawing the 3D world under a full-screen menu, `false` brings it back. It stays paused through mission changes until you call `PauseDrawScene(false)`. |
| `GetIconFtexPath(equipId, variant)` | Returns an equipment icon's path id. |
| `GetWeaponItemNameLangId(equipId, flag)` | Returns the lang id of a weapon item's name; pass it to `GetLangText`. |
| `StartSound(soundType)` | Plays a built-in UI sound, `0` to `151`. |
| `StopSound(soundType)` | Stops it. |
| `GetSoundTypeId(eventName)` | Returns the sound type of an event name for `StartSound`, or `nil`. |
| `StartSoundEvent(event)` | Plays a sound event by name or id. *Game name:* `fox::ui::SoundControl::Start`. |
| `StopSoundEvent(event, fadeSeconds)` | Stops it with a fade. *Game name:* `fox::ui::SoundControl::Stop`. |

| Param | Required | Default | Meaning |
|---|---|---|---|
| `GetIconFtexPath` `variant` | No | `0` | The icon variant. |
| `GetWeaponItemNameLangId` `flag` | No | `false` | Passed to the game as it is; what it changes is not confirmed yet. |
| `StopSoundEvent` `fadeSeconds` | No | `0` | Length of the fade-out. |

### World and markers

All of these are *V_FrameWork additions*.

| Function | What it does |
|---|---|
| `GetMarkers()` | Lists every marker that is on: marked by the player or a buddy, or enabled by a mission script. |
| `GetEnemyRoutePoints()` | Enemy routes on screen now (`TppUiCommand.ShowEnemyRoutePoints`): `{ groupIndex, width, points }`, `points` an `x, z` list; up to 5 routes of 30 points. |
| `GetMarkerPosition(gameObjectId, layoutOrModel)` | Returns `enabled, x, y, z, screenX, screenY, onScreen` as a table, or `nil` if the object has no marker. |
| `GetNodeScreenPosition(node, layoutOrModel)` | Returns `screenX, screenY, onScreen`: where the node is drawn after everything above it is applied. |

| Param | Required | Default | Meaning |
|---|---|---|---|
| `layoutOrModel` | No | none | Gives the screen position in that component's HUD units, ready for `SetTranslation`. Without it, `screenX` and `screenY` run from `-1` to `1` (x right, y up). |

Every `GetMarkers` entry has these fields:

| Field | Meaning |
|---|---|
| `gameObjectId`, `x`, `y`, `z` | The game object and its world position. |
| `dying` | `true` when the head marker shows the dying colour. |

The fields below are only there when the HUD shows a marker for the object this frame. A mission can enable map-only markers, so check `viewWorldIcon` and `viewMapIcon`.

| Field | Meaning |
|---|---|
| `markerFlag` | The marker flag; read its bits with `bit.band`. |
| `markerType` | The low byte of `markerFlag`. |
| `important` | A mission target (yellow flashing circle). |
| `questImportant` | A side-op target (blue flashing circle). |
| `viewWorldIcon` | Shown in the world as a head marker. |
| `viewMapIcon` | Shown on the iDroid map. |
| `viewWorldGoal` | Shown in the world as a mission goal. |
| `viewMapGoal` | Shown on the iDroid map as a mission goal. |
| `radiusLevel` | Area size `0` to `9`; `0` is no area. |
| `radius` | Area radius in metres. |
| `mapX`, `mapY`, `mapZ` | Where the HUD and iDroid draw it; for an area, its centre, moved off the target by the marker's vanilla `randomLevel` setting. |

### Math and utility

| Function | What it does |
|---|---|
| `GetGameFrameRawDeltaTime()` | Returns the last frame's time step in seconds. |
| `GetGameFrameElapsedTimeSinceStartup()` | Returns the seconds since the game started. |
| `RotQuatToEuler(x, y, z, w)` | Returns the Euler angles `x, y, z` of a quaternion. |
| `RotEulerToQuat(x, y, z)` | Returns the quaternion `x, y, z, w` of Euler angles. |
| `RotEularRadianToDegree(x, y, z)`, `RotEularDegreeToRadian(x, y, z)` | Converts Euler angles between radians and degrees. The game spells it "Eular", and so do these names. |
| `GetPathIdFromChar(path)` | Returns the path id (a `"0x..."` string) of an asset path. |
| `GetPaletteColor(name)` | Returns `r, g, b, a` of a UI palette colour. |

### Not documented yet

These exist with the arguments below, but what they do is not confirmed yet. All of them are queued like the setters and return nothing.

| Function | Arguments |
|---|---|
| `SendConnectWindowMessage(window, model, node)` | A window, a model handle and a node handle. |
| `SetStatus(node, bits)`, `ResetStatus(node, bits)` | A text node or a line node, and a number. |
| `SetModelStencil(model, on)` | A model and a boolean. |
| `SetModelNodeBillboard(node, on)` | Any node and a boolean. |
| `DisableShaderReset(target)` | A mesh node, a model or a layout. |
| `CheckAndSetTextureName(mesh, path, slot, level)` | Same arguments as `SetTextureName`. |
| `SetTextureLevel(mesh, slot, level)` | A mesh node, a texture slot name and a number (default `0`). |
| `RegisterLoadingMeshTexture(pathId)`, `UnregisterLoadingMeshTexture(pathId)` | A path id, as for `CreatePrefetchTexture`. |
| `StartAnimationWithRatio(anim, ratio)`, `StartAnimationWithStartRatio(anim, ratio)` | An animation and a number (default `0`). |
| `RecoverForAnimationWithRatio(anim)`, `PauseInitAnimation(anim)`, `PauseEndAnimation(anim)` | An animation. |

## Shipping your own UI files

Your `.uilb`, `.uif`, `.uia`, `.uigb` and textures go in a pack's `_fpk` folder. The `_fpkd` folder needs a `.fox2` (e.g. `Assets/tpp/ui/GraphAsset/entry_datas/MyMod.fox2`) that lists each `.uilb` and `.uigb` in `rawFiles`; `arraySize` is the number of files:

```xml
<?xml version="1.0" encoding="utf-8"?>
<fox formatVersion="2" fileVersion="0" originalVersion="Tue Oct 06 06:35:20 UTC+03:00 2026">
  <classes>
    <class name="Entity" super="" version="2" />
    <class name="Data" super="Entity" version="2" />
    <class name="DataSet" super="" version="0" />
    <class name="UiGraphEntry" super="" version="1" />
  </classes>
  <entities>
    <entity class="DataSet" classVersion="0" addr="0x05887780" unknown1="232" unknown2="651">
      <staticProperties>
        <property name="name" type="String" container="StaticArray" arraySize="1">
          <value></value>
        </property>
        <property name="dataSet" type="EntityHandle" container="StaticArray" arraySize="1">
          <value>0x00000000</value>
        </property>
        <property name="dataList" type="EntityPtr" container="StringMap" arraySize="1">
          <value key="UiGraphEntry0000">0x058877F0</value>
        </property>
      </staticProperties>
      <dynamicProperties />
    </entity>
    <entity class="UiGraphEntry" classVersion="1" addr="0x058877F0" unknown1="96" unknown2="5302">
      <staticProperties>
        <property name="name" type="String" container="StaticArray" arraySize="1">
          <value>UiGraphEntry0000</value>
        </property>
        <property name="dataSet" type="EntityHandle" container="StaticArray" arraySize="1">
          <value>0x05887780</value>
        </property>
        <property name="files" type="FilePtr" container="DynamicArray" />
        <property name="rawFiles" type="FilePtr" container="DynamicArray" arraySize="1">
          <value>/Assets/tpp/ui/LayoutAsset/my_mod/UI_my_bar.uilb</value>
        </property>
      </staticProperties>
      <dynamicProperties />
    </entity>
  </entities>
</fox>
```

Add the pack to the missions it is used in (Infinite Heaven `this.AddMissionPacks`). For UI that must also exist during loading screens, keep the pack loaded for the whole game with [`V_TppUiCommand.LoadResidentUiPack`](/V_Framework_Lua_API#resident-ui-packs) instead.

## See also

  - [V Framework](/V_Framework)
  - [V Framework Lua API](/V_Framework_Lua_API)