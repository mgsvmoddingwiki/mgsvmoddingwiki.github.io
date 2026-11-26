---
title: UI
permalink: /V_Framework/UI/
tags: [Lua, Reference, Guides, Infinite Heaven, UI, V Framework]
redirect_from:
    - /V_Framework_UI/
---

`V_UixUtility` builds your own UI windows from `.uilb` layouts and
changes the game's own UI (HUD, menus, iDroid). A window holds layouts
(`.uilb`), a layout holds models (`.uif`), and a model holds nodes
(text, mesh, line, common) and animations (`.uia`).

## Quick start

1. Pick a vanilla `.uilb`, or [ship your
   own](#shipping-your-own-ui-files).
2. In `OnMissionCanStart`: `CreateTextUnit` (for text), then
   `CreateWindow`.
3. Each `Update`: `FindWindow` (`nil` until the window exists), then
   `PostShowAndStartMessage` once per new window handle.
4. Get what you need with `GetLayout`, `GetModel` and `GetModelNode*`,
   and change it with the setters.

`V_HudClock.lua`: the in-game time on the HUD, built on the vanilla
`UI_sys_pus_key_help` layout, so no pack needed.

```lua
local this = {}

local POSITION_X = 33   -- screen is about -64..64 across
local POSITION_Y = 33   -- and -36..36 up

local OUR_WINDOW = "V_HudClock"   -- any names
local OUR_LAYOUT = "VHudClock"

local shownWindow = nil
local textUnit = nil

this.active = 1
this.execCheckTable = {inGame = true, inSafeSpace = false}
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

  V_UixUtility.CreateWindow{name = OUR_WINDOW, layouts = {
    {path = "/Assets/tpp/ui/LayoutAsset/sys_pause/UI_sys_pus_key_help.uilb", id = OUR_LAYOUT},
  }}
end

function this.Update(currentChecks, currentTime, execChecks, execState)
  local window = V_UixUtility.FindWindow(OUR_WINDOW)
  if window == nil then
    return
  end
  if window ~= shownWindow then
    V_UixUtility.PostShowAndStartMessage(window)
    shownWindow = window
  end

  local layout = V_UixUtility.GetLayout(window, OUR_LAYOUT)
  local box = V_UixUtility.GetModel(layout, "UI_sys_pus_key_help")
  local boxText = V_UixUtility.GetModelNodeText(box, 0x4D1F8C4B)
  local boxButtonPicture = V_UixUtility.GetModelNodeMesh(box, 0xD0511523)

  if V_UixUtility.IsGamePauseMenu() or V_UixUtility.IsInDemo() or TppUiCommand.IsMbDvcTerminalOpened() then
    V_UixUtility.SetVisible(layout, false)
    return
  end

  local time = string.sub(TppClock.GetTime("string"), 1, 5)   -- "21:40"
  V_UixUtility.SetVisible(layout, true)
  V_UixUtility.SetVisible(boxButtonPicture, false)
  V_UixUtility.SetTranslation(box, POSITION_X, POSITION_Y, 0)
  V_UixUtility.SetTextForModelNodeText(boxText, textUnit, time, true)
end

return this
```

---

## Good to know

  - **Handles.** `FindWindow`, `CreateTextUnit` and the `Get*` lookups
    return a number handle, or `nil` if not found. Same object, same
    handle, so re-fetching every update is fine.
  - **Dead handles.** Handles die with their window (mission end or
    restart): make the window again each mission. A dead handle does
    nothing; a wrong handle kind also logs a warning.
  - **Timing.** Setters, `Post*`, `Send*`, `AddChildWindow` and
    `DestroyWindow` apply on the window's next UI update; getters answer
    at once.
  - **Defaults.** A missing or non-number value takes its default,
    mostly `0`: `SetTranslation(h, 5)` zeroes y and z, `SetColorRGB(h)`
    is white, `SetVisible(h)` hides, `SetAnimationSpeed(a)` freezes. A
    missing or `nil` boolean takes its default, mostly `false`; the
    number `0` counts as true.
  - **Names.** A string, a hash number or a `"0x..."` string. Vanilla UI
    names are hashes such as `0x4D1F8C4B`; `GetWindows` `id` numbers
    work as names.
  - **Text units.** Make once with `CreateTextUnit` and reuse. Plain
    text needs 1 unit, tagged text more.
  - **Text tags.** `<I=C=colour|text>` colours text; `<I=G=name>` shows
    a button icon, or one from [`SetTextIcon`](#text). `SetupTextUnits`,
    `CreateBoxText` and `CreateScrollBoxText` refuse a broken tag or a
    plain stretch over 4095 bytes, with a log warning.
    `SetTextForModelNodeText` and `SetScrollTextForModelNodeText` do not
    check.
  - **Log warnings.** Per-frame warnings (e.g. wrong handle kind) are
    logged once per distinct text, marked "(shown once)".
  - **Moving.** HUD units are relative to the parent: about -64 to 64
    across, -36 to 36 up on 16:9. Vanilla `.uilb` models often sit away
    from 0,0, so move the model with `SetTranslation`, not the layout.
  - **Game windows.** `FindWindow` misses some vanilla windows;
    `GetWindows` lists them all. Many vanilla layouts start hidden: use
    `SetVisible`.
  - **Pad lock.** While a [`SetDisablePad`](#input) lock is held, your
    button, mouse and wheel reads still work; stick and `IsKeyboard...`
    reads don't. Always `ResetDisablePad` with the same `id`; max 4
    locks at once.
  - **FOB.** Every function does nothing in FOB or on an unsupported
    game version; most return nothing. `GetWindows`, `GetMarkers` and
    `GetEnemyRoutePoints` then return an empty table (also when there is
    nothing to read), so `ipairs` needs no `or {}`.

---

## Function reference

Most functions mirror the game's UI functions (same names, same argument
order). *V_FrameWork addition*: not in the game. *Game name*: the game's
name for a renamed function. *V_FrameWork name*: a game function with no
Lua name of its own. Argument names give the handle kind (`window`,
`layout`, `model`, `anim`, `textUnit`, `pool`, `textNode`, `mesh`,
`lineNode`); `node` is any node, `target` any node, layout or model.

### Windows

| Function | Description |
|---|---|
| `CreateWindow{...}` | Makes your window from `.uilb` layouts or a `.uigb` graph. Not drawn until shown. |
| `DestroyWindow(window)` | Removes a `CreateWindow` window; any other is ignored with a log warning. |
| `FindWindow(name)` | Returns the window, or `nil`. |
| `GetWindows()` | Lists every live window, vanilla too, with layouts and models. *V_FrameWork addition.* |
| `GetChildWindowInterface(window, name)` | Returns the named child window, or `nil`. |
| `AddChildWindow(parent, child)` | Your window follows the parent and gets its messages. |
| `PostShowAndStartMessage(window)` | Shows and starts the window. Once per new window. |
| `PostHideAndStopMessage(window)` | Hides and stops it. |
| `PostWakeLayoutMessage(window)` | Wakes its layouts. |
| `PostSleepLayoutMessage(window)` | Sleeps its layouts: hidden, not updated. |
| `SendVisibleWindowMessage(window, visible)` | Shows or hides without starting or stopping. |
| `SetWindowPage(name, page)` | Gives a `CreateWindow` window menu-style page steps; `nil` removes them. *V_FrameWork addition.* |

| Parameter | Required | Purpose |
|---|---|---|
| `CreateWindow` `name` | Yes | Reusing a name replaces that window; vanilla window names are refused. |
| `CreateWindow` `layouts` | Yes, unless `graph` | Any number of `{path, id, drawPriority, fontType}` entries. |
| `layouts` entry `path` | Yes | `.uilb` in a loaded pack. All of a window's layouts must be in the first one's pack. |
| `layouts` entry `id` | Yes | Name for `GetLayout`. An entry without `path` or `id` is skipped with a log warning. |
| `layouts` entry `drawPriority` | No (`"__HUD"`) | Draw-priority name, e.g. `"TELOP_TEXT"`. |
| `layouts` entry `fontType` | No (`0`) | Integer. |
| `CreateWindow` `graph` | No | `.uigb` path; `layouts` is then ignored. |
| `CreateWindow` `group` | No (`0`) | Update group, `0` or `1`; anything else makes no window. |
| `CreateWindow` `pauseMask` | No (`2`) | Pause states that freeze the window. |
| `CreateWindow` `priority` | No (`0`) | Draw order between windows, `0` to `65535`. |
| `AddChildWindow` `child` | Yes | A `CreateWindow` window, not the parent, with no parent yet. |
| `SendVisibleWindowMessage` `visible` | No (`false`) | `true` shows. |
| `SetWindowPage` `name` | Yes | The `CreateWindow` name. Call before `CreateWindow` to get `OnSetup`. |
| `SetWindowPage` `page` | Yes | Table of optional `OnSetup`, `OnInit`, `OnStart`, `OnUpdate`, `OnStop`, `OnFinalize`, `OnBack`. |

`GetWindows()` entries: `window`, `id`, `group`, `parent` (child windows
only), `layouts`. `layouts` is flat: `layout`, `id`, `depth` (`0` =
root), `parentId`, `models` (list of `model`, `id`).

Page functions get the window handle (`OnFinalize` gets `nil`), in
order, a moment after the engine runs the step.

  - `OnSetup`, `OnInit`: made, then initialised.
  - `OnStart`, `OnStop`: `PostShowAndStartMessage`,
    `PostHideAndStopMessage`.
  - `OnUpdate`: each frame while shown and not paused.
  - `OnFinalize`: destroyed.
  - `OnBack`: [iDroid](#idroid-menu-and-pages) pages only. Return `true`
    to keep Back; otherwise Back closes the page.

```lua
V_UixUtility.SetWindowPage("MyPage", {
  OnStart = function(window)
    V_UixUtility.StartAnimation(V_UixUtility.GetAnimation(V_UixUtility.GetLayout(window, "Base_Layout"), "in"))
  end,
})
```

### iDroid menu and pages

All of these are *V_FrameWork additions*.

| Function | Description |
|---|---|
| `AddIDroidMenuItem{...}` | Adds a button at the end of an iDroid list and returns its `id`. The same `name` again updates the item, so it is safe every mission start. |
| `RemoveIDroidMenuItem(id)` | Removes the item and its children. |
| `OpenIDroidPage(windowName)` | Shows a `CreateWindow` window in the iDroid. Call from `IDroidMenuItemSelected`. |
| `CloseIDroidPage(windowName)` | Hides the page; the menu returns at the same list and cursor. No name: only brings the menu back. |
| `IsIDroidPageOpen(windowName)` | Whether that page is open. |

| Parameter | Required | Purpose |
|---|---|---|
| `AddIDroidMenuItem` `parent` | Yes | A vanilla `TppTerminal.MBDVCMENU` group name string (e.g. `"MBM"`, `"MBM_CUSTOM"`, `"MSN_DROP"`), or your group item's `id`. |
| `AddIDroidMenuItem` `name` | Yes | Unique; used by the `TppUiCommand` calls below. |
| `AddIDroidMenuItem` `label` | Yes, unless `labelLang` | Button text. |
| `AddIDroidMenuItem` `description` | No | Text under the button. |
| `AddIDroidMenuItem` `group` | No (`false`) | `true` opens the item's children instead of sending a press. |
| `AddIDroidMenuItem` `labelLang`, `descriptionLang` | No | Lang keys, used when the game knows them. |
| `AddIDroidMenuItem` `icon` | No | A `TppTerminal.MBDVCMENU` entry name or ID (its vanilla icon), or an `.ftex` path. Default: the group's icon; first level, Customize. |
| `AddIDroidMenuItem` `iconU`, `iconV` | No (`0`) | Own texture: cell top-left, `0` to below `1`. |

Entry names with an icon: `MBM_REWORD`, `MBM_CUSTOM`, `MBM_DEVELOP`,
`MBM_RESOURCE`, `MBM_STAFF`, `MBM_BASE_EXPANTION`, `MBM_BASE_SECURITY`,
`MBM_PFRATING`, `MBM_DB`, `MSN_DROP`, `MSN_BUDDY`, `MSN_ATTACK`,
`MSN_HELI`, `MSN_MISSIONLIST`, `MSN_SIDEOPSLIST`, `MSN_LOCATION`,
`MSN_FOB`, `MSN_LOG`, `MSN_RETURNMB`.

Own icon texture: 512x256, 4 by 2 cells of 128 px (`iconU` steps `0.25`,
`iconV` `0.5`), glyphs on black (black is transparent),
[FtexTool](/FtexTool) `-t m`.

A press sends
[`IDroidMenuItemSelected`](/V_Framework/Lua_API#ui-messages) (`itemId`)
and hides the top menu; Back closes an open page (see
[`OnBack`](#windows)). 3 menu levels; a group needs a free level below
it. Items show in the field and on the ACC, hidden in FOB.

Vanilla calls by `name`: `TppUiCommand.SetMbTopMenuItemVisible`,
`SetMbTopMenuItemActive`, `IsMbTopMenuItemVisible`,
`IsMbTopMenuItemActive`, `SetMbTopMenuItemTutorialNotice`.

Page layouts need a high `drawPriority`: `"HELP_TIPS"` (147) shows;
`"DEV_COND_POPUP"` (98) is hidden.

```lua
local id = V_UixUtility.AddIDroidMenuItem{parent = "MBM_CUSTOM", name = "my_item", label = "MY ITEM"}

-- in your module's Messages() table
UI = {
  { msg = "IDroidMenuItemSelected", func = function(itemId)
      if itemId == id then
        V_UixUtility.OpenIDroidPage("MyPage")
      end
    end },
},
```

### Lists

All of these are *V_FrameWork additions*.

| Function | Description |
|---|---|
| `SetupPrefabList{...}` | Shows a native iDroid-style list (game cursor, scrolling, scrollbar) and returns its `list` handle. |
| `SetPrefabListRows(list, rows)` | New row text; the cursor stays, clamped. |
| `GetPrefabListCursor(list)` | Returns `row, top`, both 1-based, or `nil` when the list is gone. |
| `ClosePrefabList(list)` | Hides the list. `SetupPrefabList` again reopens it. |

| Parameter | Required | Purpose |
|---|---|---|
| `SetupPrefabList` `window` | Yes | Handle or name of the page holding the list prefab. |
| `SetupPrefabList` `list` | Yes | The list child window's name. |
| `SetupPrefabList` `visible` | Yes | Row nodes (`UI_Prefab_record_N`) in the list layout, 1-32. |
| `SetupPrefabList` `rows` | Yes | A string per row, or up to 4 strings (one per text node). Cut at 255 bytes. |
| `SetupPrefabList` `rowModel`, `rowText` | Yes | Row prefab model and text node names, in column order. |
| `SetupPrefabList` `count` | No (`#rows`) | Row count. |
| `SetupPrefabList` `cursor`, `top` | No | 1-based. |
| `SetupPrefabList` `title`, `titleModel`, `titleText` | No | Header text (up to 2 strings), header model and text node names. |
| `SetupPrefabList` `flags` | No (`0x413`) | The Missions list's flags. |

Decide and cancel: `IsTriggerReceived(GetTriggerPool(window), ...)` with
`0xc340b1c864d4` (decide) or `0xfc664c0c2666` (cancel); then
`GetPrefabListCursor`.

### Triggers

| Function | Description |
|---|---|
| `SendTrigger(window, trigger, param)` | Fires a trigger into the window's UI graph. |
| `SendTriggerToParent(window, trigger, param)` | Same, to the parent window. |
| `GetTriggerPool(window)` | Returns the window's trigger pool. |
| `IsTriggerReceived(pool, trigger)` | Returns whether it arrived, and its param. |

| Parameter | Required | Purpose |
|---|---|---|
| `SendTrigger` `trigger` | Yes | Name or hash. |
| `SendTrigger` `param` | No (`0`) | A number or name. |

Vanilla `UiDaemon.SendTrigger(windowName, triggerName)` takes a window
name.

### Window inheritance

| Function | Description |
|---|---|
| `EnableAllInheritance`, `EnableScaleInheritance`, `EnableRotationInheritance`, `EnableTranslationInheritance`, `EnableColorRGBInheritance`, `EnableColorAlphaInheritance` `(window)` | The window follows that part of its parent. |
| `DisableAllInheritance`, `DisableScaleInheritance`, `DisableRotationInheritance`, `DisableTranslationInheritance`, `DisableColorRGBInheritance`, `DisableColorAlphaInheritance` `(window)` | The window ignores that part of its parent. |

### Finding layouts, models, nodes and animations

| Function | Description |
|---|---|
| `GetLayout(windowOrLayout, name)` | Returns a window's layout or a nested layout. Own window: the `CreateWindow` `id`. |
| `IsHaveLayout(layout, name)` | Whether that nested layout exists. |
| `GetModel(layout, name)` | Returns a model, e.g. `"UI_sys_pus_key_help"`. |
| `GetAnimation(layoutOrModel, name)` | Returns an animation. |
| `IsHaveModelNodeCommon(model, name)` | Whether that common node exists. |
| `GetModelNodeCommon(model, name)` | Returns a common node. |
| `GetModelNodeText(model, name)` | Returns a text node. |
| `GetModelNodeMesh(model, name)` | Returns a mesh node. |
| `GetModelNodeLine(model, name)` | Returns a line node. |
| `GetOrthogonalProjectionScaleFromModelComponentCamera(model)` | Returns the model camera's projection scale. |
| `GetPrefabLayout(prefabType, window)` | Returns a game prefab's layout (list, tab, popup...) in that window. `prefabType` `0` to `19`. |
| `GetPrefabLayoutFromParent(prefabType, parentWindow, childWindowName)` | Same, in a named child window. |

### Show, colour and move

| Function | Description |
|---|---|
| `SetVisible(target, visible)`, `IsVisible(target)` | Shows or hides the target and its children; reads it. |
| `SetAlpha(target, alpha)`, `GetAlpha(target)` | Fades the target and its children; reads it. |
| `SetColorRGB(target, r, g, b)` | Tints the target. |
| `SetColorRGBA(target, r, g, b, a)` | Tints and fades in one call. *V_FrameWork name.* |
| `SetColorGroup(target, name)` | A colour from the UI colour table. |
| `GetColorGroup(name)`, `GetPaletteColor(name)` | Return `r, g, b, a` of a colour-table or palette colour. |
| `SetTranslation(target, x, y, z)`, `GetTranslation(target)` | Moves the target; reads `x, y, z`. |
| `SetTranslationX`, `SetTranslationY`, `SetTranslationZ` `(target, value)` | One axis. |
| `SetRotation(target, x, y, z)`, `GetRotation(target)` | Rotation in radians. |
| `SetRotationDegree(target, x, y, z)`, `GetRotationDegree(target)` | Rotation in degrees. |
| `SetRotationDegreeX`, `SetRotationDegreeY`, `SetRotationDegreeZ` `(target, degrees)` | One axis, in degrees. |
| `SetQuaternion(target, x, y, z, w)` | Rotation as a quaternion. |
| `SetScale(target, s)`, `SetScale(target, x, y, z)`, `GetScale(target)` | Even or per-axis scale; reads `x, y, z`. |

| Parameter | Required | Purpose |
|---|---|---|
| `SetVisible` `visible` | No (`false`) | `true` shows. |
| `SetAlpha` `alpha` | No (`1`) | `0` to `1`. |
| `SetColorRGB` `r`, `g`, `b` | No (`1`) | `0` to `1` each. |
| `SetColorRGBA` `r`, `g`, `b`, `a` | No (`1`) | `0` to `1` each. |
| `SetTranslation` `x`, `y`, `z` | No (`0`) | Position. |
| `SetQuaternion` `x`, `y`, `z` | No (`0`) | Vector part. |
| `SetQuaternion` `w` | No (`1`) | Scalar part. |
| `SetScale` `s` | No (`1`) | `SetScale(target)` resets. |
| `SetScale` `y` | No (same as `x`) | Per-axis form only. |
| `SetScale` `z` | No (`1`) | Per-axis form only. |

### Linking

| Function | Description |
|---|---|
| `ConnectComponent(child, parent, node)` | Hangs a layout or model under a node of another; it then moves, scales and hides with it. |
| `DisconnectComponent(child)` | Undoes it. |
| `GetTraversalTranslation(layoutOrModel, node)` | Returns the node's final `x, y, z` after its parents. |
| `GetTraversalScale(layoutOrModel, node)` | Same, for scale. |

| Parameter | Required | Purpose |
|---|---|---|
| `ConnectComponent` `child`, `parent` | Yes | Layouts or models in windows of the same update group. |
| `ConnectComponent` `node` | Yes | A node of `parent`: handle or name. |

`ConnectComponent` refuses, with a log warning, connects that would
crash: to itself, a window's root layout, or a parent that hangs under
the child.

### Text

| Function | Description |
|---|---|
| `CreateTextUnit(count)` | Makes a text unit. `nil` if `count` is `0` or less. |
| `DeleteTextUnit(textUnit)` | Frees it; the handle dies at once. |
| `SetTextForModelNodeText(textNode, textUnit, text, useLanguageFont)` | Shows plain text. |
| `SetScrollTextForModelNodeText(textNode, textUnit, text, useLanguageFont)` | Same, scrolling. |
| `SetAutoScrollTextForModelNodeText(textNode, textUnit, text, languageFont, loop)` | Text wider than the node is clipped and scrolls; text that fits stays put. *V_FrameWork name.* |
| `UpdateAutoScrollText(textNode, loop)` | Re-checks after the node's width changed. *V_FrameWork name.* |
| `SetupTextUnits(textNode, textUnit, count, text, wrap, languageFont)` | Fills the units from tagged text without showing it. Queued; returns nothing. |
| `SetTextUnitsForModelNodeText(textNode, textUnit, count)` | Shows units filled by `SetupTextUnits`. |
| `CreateBoxText(textNode, textUnit, count, text, wrap, languageFont)` | Fills and shows tagged box text. |
| `CreateScrollBoxText(textNode, textUnit, count, text)` | Same, scrolling. |
| `GetLangText(langId)` | Returns the game's text; an unknown ID gives empty text, not `nil`. |
| `GetWeaponItemNameLangId(equipId, flag)` | Returns a weapon item name's lang ID, for `GetLangText`. |
| `StartTextScroll(textNode)`, `StopTextScroll(textNode)` | Starts or stops scrolling. |
| `GetTextTotalHeightInTextNode(textNode)`, `GetTextMaxWidthInTextNode(textNode)` | Laid-out text height; widest line. |
| `GetTextNodeWidth`, `GetTextNodeHeight` `(textNode)`, `SetTextNodeWidth`, `SetTextNodeHeight` `(textNode, value)` | The node's box size. |
| `SetFontGroup(textNode, styleName)` | Font style (which normally sets the size) from the UI font palette, e.g. `"hud-def-M"`, `"cmn-sys-sys-S"`; current-language entry first, then language-less. Call before writing text. |
| `SetFontSize(textNode, width, height)` | Font size, on a node with its own font settings in the UI file. |
| `SetTextAlign(textNode, value)` | `0` left, `1` centre, `2` right. |
| `SetVerticalAlign(textNode, value)` | `0` top, `1` middle, `2` bottom. |
| `GetLineWidth`, `GetLineHeight` `(textNode, line)`, `SetLineWidth`, `SetLineHeight` `(textNode, line, value)` | One line's width or height. |
| `SetTextIcon{...}` | Makes `<I=G=name>` draw an icon in any UI text (lang files, `CreateBoxText`, ...). Returns `true` when accepted; later problems are logged. *V_FrameWork addition.* |

| Parameter | Required | Purpose |
|---|---|---|
| `CreateTextUnit` `count` | No (`1`) | Units to make. |
| `GetWeaponItemNameLangId` `flag` | No (`false`) | Passed through; effect not confirmed. |
| `SetTextForModelNodeText`, `SetScrollTextForModelNodeText` `useLanguageFont`, `SetAutoScrollTextForModelNodeText` `languageFont` | No (`false`) | `true` uses the current language's font. |
| `SetAutoScrollTextForModelNodeText`, `UpdateAutoScrollText` `loop` | No (`true`) | `false` keeps clipped text still. |
| `SetupTextUnits`, `CreateBoxText`, `CreateScrollBoxText` `count` | No (all units) | Units to use; `0` or less, or more than made, uses all. |
| `SetupTextUnits`, `CreateBoxText` `wrap` | No (`false`) | `true` wraps at the node's width. |
| `SetupTextUnits`, `CreateBoxText` `languageFont` | No (`false`) | Only affects Russian. |
| `SetTextUnitsForModelNodeText` `count` | No (all units) | Units to show. |
| `SetFontSize` `width` | Yes | Font width. |
| `SetFontSize` `height` | No (same as `width`) | Font height. |
| line functions `line` | No (`0`) | Line index. |
| `SetTextIcon` `name` | Yes | 1 to 63 printable characters, no `<`, `>` or `&`, not starting with `R=`. Vanilla names (`RELOAD`, `CALL`, `PAD_LEFT`, ...) are refused. |
| `SetTextIcon` `action` | Yes, in the action form | A `UiDaemon.SetButtonMap` action: its pad button or keyboard key. An unmapped action waits until mapped. |
| `SetTextIcon` `pad` | Yes, in the button form | `fox.PAD_` number, `0` to `15`: controller picture. |
| `SetTextIcon` `key` | Yes, in the button form | `fox.KEY_` code: keyboard picture. |
| `SetTextIcon` `texture` | Yes, in the picture form | `.ftex` path or `"0x..."` path ID. Loads on first use; retried every few seconds until its pack loads. |
| `SetTextIcon` `u`, `v` | Yes, in the picture form | Top-left, `0` to `1`. |
| `SetTextIcon` `width`, `height` | Yes, in the picture form | Size, `0` to `1`. |
| `SetTextIcon` `size` | No (`1`) | Picture form only: `1` is one text line. |

`SetTextIcon` takes exactly one form. Every `UiDaemon.SetButtonMap`
action also gets an icon under its own name, e.g.
`<I=G=UI_LASER_SWITCH>`. No per-key tags such as `KEY_Z`: use the button
form.

```lua
V_UixUtility.SetTextIcon{ name = "LASER_KEY", pad = fox.PAD_L, key = fox.KEY_Z }
-- then, in any UI text: "Press <I=G=LASER_KEY>"
```

> Resize text with `SetFontSize`: one-number `SetScale` (e.g.
> `SetScale(textNode, 1.1)`) makes it disappear.
{:.important}

### Textures, shaders, meshes and lines

These take a mesh node unless noted.

| Function | Description |
|---|---|
| `SetTextureName(mesh, path, slot, level)` | Puts a texture from a loaded pack on the mesh. |
| `SetTextureNameByPathCode(mesh, pathCode, slot, level)` | Same, by hashed path. *V_FrameWork name.* |
| `IsTextureLoaded(mesh, slot, level)` | Whether the slot's texture has loaded. |
| `SetLoadingTexture(mesh, pathId, level)` | Placeholder shown while loading. |
| `IsDispLoadingTexture(mesh, slot)` | Whether the placeholder still shows. |
| `GetIconFtexPath(equipId, variant)` | Returns an equipment icon's path ID. |
| `CreatePrefetchTexture(pathId, level)` | Preloads a texture; no node needed. |
| `RemovePrefetchTexture(pathId)` | Drops that prefetch. |
| `IsReadyPrefetchTexture(pathId, level)` | Whether it is ready. |
| `SetShaderParameter(mesh, name, x, y, z, w)` | Sets any shader value. |
| `SetShaderTechnique(mesh, name)` | Switches the shader technique. |
| `SetShaderBaseTexUvShift`, `SetShaderMaskTexUvShift`, `SetShaderScreenTexUvShift` `(mesh, u, v)` | Scrolls the base, mask or screen texture. |
| `SetShaderBaseTexUvRepeat`, `SetShaderMaskTexUvRepeat`, `SetShaderScreenTexUvRepeat` `(mesh, u, v)` | Tiles or crops it. |
| `SetUvShift(mesh, cell, gridSize)` | Shows one icon-sheet cell on the mask texture. Shift only, not repeat. |
| `SetUvShiftBase(mesh, cell, gridSize)` | Same, base texture. |
| `SetVertexTranslate(mesh, control, x, y, z, keepX, keepY, keepZ)` | Moves one control's vertices, e.g. a bar's end to fill it. |
| `SetMeshDistanceBetweenNodes(layout, meshName, paramName, translateScale, paramScale, fromNode, toNode, mask)` | Stretches a mesh of the layout's main model between two nodes (a line or bar). *V_FrameWork name.* |
| `SetLineDraw(lineNode, indices, vertices)` | Draws one or more lines, in the node's colour and clipping. |
| `ResetLineDraw(lineNode)` | Clears them. |

| Parameter | Required | Purpose |
|---|---|---|
| `SetTextureName` `slot` | Yes | `"Base_Texture"`, or `"Mask_Texture"` for posters. |
| `SetTextureName` `level` | No | Level variant. |
| `SetTextureNameByPathCode` `pathCode` | Yes | A `"0x..."` string (too big for a Lua number). |
| `SetTextureNameByPathCode` `level` | No (`2`) | Level variant. |
| `GetIconFtexPath` `variant` | No (`0`) | Icon variant. |
| `pathId` | Yes | Asset path, number or `"0x..."` string, e.g. from `GetPathIdFromChar` or `GetIconFtexPath`. |
| `level` (other texture functions) | No (`0`) | Level variant. |
| `SetShaderParameter` `x`, `y`, `z`, `w` | No (`0`) | The value. |
| `...UvShift` `u`, `v` | No (`0`) | Scroll. |
| `...UvRepeat` `u`, `v` | No (`1`) | Tiling. |
| `SetUvShift`, `SetUvShiftBase` `cell` | Yes | From `0`, left to right then top to bottom. |
| `SetUvShift`, `SetUvShiftBase` `gridSize` | Yes | Cells per side; `0` does nothing. |
| `SetVertexTranslate` `control` | Yes | The control to move. |
| `SetVertexTranslate` `x`, `y`, `z` | No (`0`) | New position. |
| `SetVertexTranslate` `keepX`, `keepY`, `keepZ` | No (`0`) | `1` keeps the file's value on that axis. |
| `SetMeshDistanceBetweenNodes` `fromNode` | No (model origin) | First node. |
| `SetMeshDistanceBetweenNodes` `toNode` | No (model root) | Second node. |
| `SetMeshDistanceBetweenNodes` `mask` | No (`{1,0,1,0}`) | `1` keeps the mesh's own translate on that axis. |
| `SetLineDraw` `indices` | Yes | A list of vertex numbers (from `0`), or a list of lists, one line each; a segment per neighbouring pair. At least 2 per list, up to 65535 in all. An index past the last vertex logs a warning and draws nothing. |
| `SetLineDraw` `vertices` | Yes | Up to 4096 `{x, y, z, w}`; `z` defaults to `0`, `w` to `1`. |

{% comment %}Raw block to get around double curly brackets that Liquid otherwise errors on during building.{% endcomment %}
```lua
{% raw %}
V_UixUtility.SetLineDraw(line,
  {{0, 1, 2, 0}, {3, 4}},
  {{0, 0, 0, 1}, {2, 0, 0, 1}, {1, 2, 0, 1}, {-3, -3, 0, 1}, {3, -3, 0, 1}})
{% endraw %}
```

### Sub viewports

All of these are *V_FrameWork additions*. A sub viewport is a live
picture of the world on a UI mesh. All are deleted at mission end; make
them again in `OnMissionCanStart`.

| Function | Description |
|---|---|
| `CreateSubViewport(name, width, height)` | Makes one and returns `true`. An existing name keeps the old one at its first size. |
| `SetSubViewportCamera(name, eyeX, eyeY, eyeZ, targetX, targetY, targetZ, halfWidth, near, far)` | Orthographic camera from eye to target. Looking straight down, north is up. |
| `SetSubViewportDraw(name, on)` | On: redrawn every frame, costing like a second game view. Off: last picture kept, free. Starts off. |
| `SetSubViewportTexture(mesh, name, slot)` | Shows the picture on a mesh. Call again if the mesh is rebound. |
| `IsSubViewportReady(name)` | True once the picture exists. |
| `SetSubViewportExposure(name, exposure)` | Sets its exposure. |
| `GetMainViewportExposure()` | Returns the game view's exposure. |
| `DeleteSubViewport(name)` | Deletes it. |

| Parameter | Required | Purpose |
|---|---|---|
| `CreateSubViewport` `name` | Yes | Any name. |
| `CreateSubViewport` `width`, `height` | No (`512`) | `64` to `2048` px. |
| `SetSubViewportCamera` `eyeX`, `eyeY`, `eyeZ`, `targetX`, `targetY`, `targetZ` | Yes | Camera and target positions. |
| `SetSubViewportCamera` `halfWidth` | No (`100`) | Metres from centre to side edge. |
| `SetSubViewportCamera` `near` | No (`1`) | Near distance. |
| `SetSubViewportCamera` `far` | No (`2000`) | Far distance. |
| `SetSubViewportDraw` `on` | No (`true`) | `false` keeps the last picture. |
| `SetSubViewportTexture` `slot` | No (`"Base_Texture"`) | Texture slot. |

> To redraw a few times a second, turn `SetSubViewportDraw` on for 2
> frames, then off.
{:.tip}

### Animations

These take a handle from `GetAnimation`.

| Function | Description |
|---|---|
| `StartAnimation(anim)` | Plays it once. |
| `StartLoopAnimation(anim)` | Plays it looping. |
| `StartInstantAnimation(anim, toEnd)` | Jumps to the end or start state without playing. |
| `PauseAnimation(anim, paused)` | Pauses, or resumes where it stopped. |
| `ForceLoopAnimation(anim, loop)` | Forced looping on or off. *Game name:* `fox::ui::Animation::ForceLoop`. |
| `UnsetForceLoopAnimation(anim)` | Stops forcing the loop. *Game name:* `fox::ui::Animation::UnsetForceLoop`. |
| `SetAnimationStopTime(anim, seconds)` | Stop time. |
| `SetAnimationSpeed(anim, speed)` | Play speed. |
| `IsAnimationRunning(anim)` | Whether it is playing. |
| `IsAnimationPastTime(anim, seconds)` | Whether it is past that time. |
| `GetAnimationTimeLength(anim)` | Length in seconds. *Game name:* `fox::ui::Animation::GetTimeLength`. |

| Parameter | Required | Purpose |
|---|---|---|
| `StartInstantAnimation` `toEnd` | No (`false`) | `true` end state, `false` start state. |
| `PauseAnimation` `paused` | No (`true`) | `false` resumes (*V_FrameWork addition*). |
| `ForceLoopAnimation` `loop` | No (`false`) | `true` forces the loop. |
| `SetAnimationStopTime` `seconds` | No (`0`) | Seconds. |
| `SetAnimationSpeed` `speed` | No (`0`) | `1` normal; `0` freezes. |

### Draw order

| Function | Description |
|---|---|
| `SetModelNodePriority(node, priority)` | A node's draw order in its model, `0` to `255`. |
| `UpdateModelDrawOrder(model)` | Re-sorts the model; call after changing node priorities. |
| `GetDrawPriority(layout)`, `SetDrawPriority(layout, priority)` | A layout's draw order, `0` to `255`. |
| `GetDrawPriorityFromTable(name)` | Returns a named draw priority's number, e.g. `"__HUD"`, `"TELOP_TEXT"`. |

### Input

Each state check has a number form (`IsButtonPress(button)`) and a
`ByName` form (`IsButtonPressByName(name)`). The number form needs a
number, or returns nothing: a button name's hash from `GetButtonNumber`,
not a pad number (`IsButtonPress(12)` is always false). Key codes come
from `ButtonNameToKeyCode`. A name not in the button map (vanilla
actions plus `UiDaemon.SetButtonMap` ones) reads as not pressed
(`false`, or `0` for `GetButtonLongPressResultByName`); a keyboard-only
name reads its key only. Press: the frame it goes down; pressing: while
held; release: the frame it is let go. `IsButtonPressByName` and
`IsButtonPressingByName` with `"UI_DECIDE"` or `"UI_CANCEL"` also count
a mouse click.

| Function | Description |
|---|---|
| `GetButtonNumber(name, convert)` | Returns a button name's number. |
| `IsButtonPress`, `IsButtonPressing`, `IsButtonRelease` | Pad button state. |
| `IsButtonRepeat(button, first, interval)` | True on press, then repeating while held. |
| `IsButtonLongPress(button, seconds)` | True once held that long. |
| `GetActivePadNo()` | The pad number all pad reads use. |
| `CheckIllegalDirButtonInput()` | Picks the one D-pad direction that counts this frame (no diagonals or second press). Call once per frame in [`OnUpdate`](#windows) on pages outside the iDroid; the iDroid already calls it. |
| `IsDirButtonPress(button)`, `IsDirButtonLong(button)` | True on a D-pad step or hold repeat, only for the picked direction. `button` is a pad number, `12` to `15`, not a hash. |
| `GetEnableDirButton()` | The picked direction; `16` is none. |
| `GetButtonLongPressResultByName(name, seconds)` | `0` idle, `1` held long enough, `2` still holding, `3` let go too early. |
| `GetAnalogStickAxis(stick)` | The stick's `x, y`. |
| `IsUseKeyboard()` | True on keyboard and mouse. |
| `ButtonNameToKeyCode(name)` | Returns `status, keyCode`; status `20` means no key bound. |
| `IsKeyboardPress`, `IsKeyboardPressing`, `IsKeyboardRelease` | Key state; the number form takes a key code. |
| `GetMouseMoveXY()` | Mouse movement `x, y`. |
| `GetMouseWheel()` | Wheel amount. |
| `IsMouseButtonDown`, `IsMouseButtonPressing`, `IsMouseButtonUp` | Down this frame, held, up this frame. |
| `SetDisablePad(id)` | Game menus ignore pad, keyboard and mouse (mouse: *V_FrameWork addition*). |
| `ResetDisablePad(id)` | Releases that lock. |
| `IsDisablePad(id)` | Whether that lock is held. |

| Parameter | Required | Purpose |
|---|---|---|
| `GetButtonNumber` `convert` | No (`false`) | `false`: the name's hash. `true`: its bound pad button, or `20` if unmapped or no pad button. |
| `IsButtonRepeat` `first` | No (`0`) | Seconds before the first repeat. |
| `IsButtonRepeat` `interval` | No (`0`) | Seconds between repeats. |
| `IsButtonLongPress` `seconds` | No (`0`) | Hold time. |
| `GetAnalogStickAxis` `stick` | No (`0`) | `0` left, `1` right. |
| `SetDisablePad` `id` | Yes | Any name or number except `0`. |

```lua
if V_UixUtility.GetButtonNumber("UI_LASER_SWITCH", true) ~= 20 then
  -- the action has a pad button
end
```

### Button icons

| Function | Description |
|---|---|
| `GetPadButtonUvShift(type, number)` | Returns the pad button picture's `u, v` on the icon sheet, or `nil` if none. |
| `SetPadKeyboardIconTexture(mesh, buttonName, u, v)` | Key picture on keyboard, pad picture on a pad. |
| `RegistButtonMeshParam(mesh, buttonName, u, v, registId)` | Same, re-applied on every pad/keyboard switch. Up to 50 at once. |
| `EraseButtonMeshParam(mesh)` | Removes that mesh's registration. |
| `EraseButtonMeshParamFromRegistId(registId)` | Removes all with that `registId`. |
| `IsChangePadKeyboard()` | True on the frame of a pad/keyboard switch. |
| `SetPlatformButtonTexture(mesh)` | This platform's button icon sheet on the mesh. |
| `SetButtonIconTextureByName(mesh, buttonName)` | That button's picture; after `SetPlatformButtonTexture`. |

| Parameter | Required | Purpose |
|---|---|---|
| `GetPadButtonUvShift` `type` | No (`0`) | `0`: pad button number 0 to 15. |
| `GetPadButtonUvShift` `number` | Yes | Button number. |
| `SetPadKeyboardIconTexture` `u`, `v` | No (game picks) | Pad picture position on the sheet. |
| `RegistButtonMeshParam` `u`, `v` | Yes | Pad picture position on the sheet. |
| `RegistButtonMeshParam` `registId` | Yes | Any name or number. |

### Game state and sounds

| Function | Description |
|---|---|
| `IsGamePauseMenu()` | True in the pause menu. |
| `IsInDemo()` | True in a cutscene. |
| `GetFocalLengthZoomRatio()` | Camera zoom: `1` none, higher with binoculars, scopes or aiming. |
| `PauseDrawScene(pause)` | `true` stops drawing the 3D world (under a full-screen menu); stays paused across missions until `PauseDrawScene(false)`. |
| `StartSound(soundType)`, `StopSound(soundType)` | Built-in UI sound, `0` to `151`. |
| `GetSoundTypeId(eventName)` | An event name's sound type for `StartSound`, or `nil`. |
| `StartSoundEvent(event)` | Plays a sound event by name or ID. *Game name:* `fox::ui::SoundControl::Start`. |
| `StopSoundEvent(event, fadeSeconds)` | Stops it with a fade. *Game name:* `fox::ui::SoundControl::Stop`. |

| Parameter | Required | Purpose |
|---|---|---|
| `StopSoundEvent` `fadeSeconds` | No (`0`) | Fade-out length. |

### World and markers

All of these are *V_FrameWork additions*.

| Function | Description |
|---|---|
| `GetMarkers()` | Every marker that is on (player, buddy or mission script). Not Intel Scouting's predicted areas: see [`V_TppUiCommand.GetMapMarkerSlots`](/V_Framework/Lua_API#idroid-map). |
| `GetEnemyRoutePoints()` | Enemy routes on screen (`TppUiCommand.ShowEnemyRoutePoints`): `{ groupIndex, width, points }`, `points` a list of `{ x, z }`; up to 5 routes of 30 points. |
| `GetMarkerPosition(gameObjectId, layoutOrModel)` | Table of `enabled`, `x`, `y`, `z`, `screenX`, `screenY`, `onScreen`, or `nil` if no marker. |
| `GetNodeScreenPosition(node, layoutOrModel)` | `screenX, screenY, onScreen` of the drawn node. |

| Parameter | Required | Purpose |
|---|---|---|
| `layoutOrModel` | No | Screen position in that component's HUD units, ready for `SetTranslation`. Without it, `-1` to `1` (x right, y up). |

To keep a model over an object: each update, pass
`GetMarkerPosition(gameObjectId, model)`'s `screenX`, `screenY` to
`SetTranslation(model, ...)`.

`GetMarkers` entry fields:

| Field | Meaning |
|---|---|
| `gameObjectId`, `x`, `y`, `z` | Object and world position. |
| `dying` | Head marker shows the dying colour. |

Only when the HUD shows a marker this frame (missions can enable
map-only markers, so check `viewWorldIcon` and `viewMapIcon`):

| Field | Meaning |
|---|---|
| `markerFlag` | Marker flag; read bits with `bit.band`. |
| `markerType` | Low byte of `markerFlag`. |
| `important` | Mission target (yellow flashing circle). |
| `questImportant` | Side-op target (blue flashing circle). |
| `viewWorldIcon` | Head marker in the world. |
| `viewMapIcon` | On the iDroid map. |
| `viewWorldGoal` | Mission goal in the world. |
| `viewMapGoal` | Mission goal on the iDroid map. |
| `radiusLevel` | Area size `0` to `9`; `0` is none. |
| `radius` | Area radius in metres. |
| `mapX`, `mapY`, `mapZ` | Where the HUD and iDroid draw it; an area's centre is offset by the marker's vanilla `randomLevel`. |

### Math and utility

| Function | Description |
|---|---|
| `GetGameFrameRawDeltaTime()` | Last frame's time step, seconds. |
| `GetGameFrameElapsedTimeSinceStartup()` | Seconds since game start. |
| `RotQuatToEuler(x, y, z, w)` | Quaternion to Euler `x, y, z`. |
| `RotEulerToQuat(x, y, z)` | Euler to quaternion `x, y, z, w`. |
| `RotEularRadianToDegree(x, y, z)`, `RotEularDegreeToRadian(x, y, z)` | Radians to degrees and back ("Eular" is the game's spelling). |
| `GetPathIdFromChar(path)` | An asset path's path ID (`"0x..."` string). |

### Not documented yet

Exist with these arguments; effect not confirmed. All are queued and
return nothing.

| Function | Arguments |
|---|---|
| `SendConnectWindowMessage(window, model, node)` | Window, model, node. |
| `SetStatus(node, bits)`, `ResetStatus(node, bits)` | Text or line node, number. |
| `SetModelStencil(model, on)` | Model, boolean. |
| `SetModelNodeBillboard(node, on)` | Any node, boolean. |
| `DisableShaderReset(target)` | Mesh node, model or layout. |
| `CheckAndSetTextureName(mesh, path, slot, level)` | As `SetTextureName`. |
| `SetTextureLevel(mesh, slot, level)` | Mesh node, slot name, number (default `0`). |
| `RegisterLoadingMeshTexture(pathId)`, `UnregisterLoadingMeshTexture(pathId)` | Path ID. |
| `StartAnimationWithRatio(anim, ratio)`, `StartAnimationWithStartRatio(anim, ratio)` | Animation, number (default `0`). |
| `RecoverForAnimationWithRatio(anim)`, `PauseInitAnimation(anim)`, `PauseEndAnimation(anim)` | Animation. |

---

## Shipping your own UI files

`.uilb`, `.uif`, `.uia`, `.uigb` and textures go in the pack's `_fpk`.
The `_fpkd` needs a `.fox2` (e.g.
`Assets/tpp/ui/GraphAsset/entry_datas/MyMod.fox2`) listing each `.uilb`
and `.uigb` in `rawFiles`; `arraySize` is the file count:

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

Add the pack to its missions (Infinite Heaven `this.AddMissionPacks`),
or, for UI needed during loading screens, keep it loaded with
[`V_TppUiCommand.LoadResidentUiPack`](/V_Framework/Lua_API#resident-ui-packs).

---

## See also

  - [V Framework](/V_Framework)
  - [V Framework Lua API](/V_Framework/Lua_API)
