---
title: FSM
permalink: /FSM/
tags: [File Formats, Cutscenes]
---

The .fsm format, or **F**ox **S**ystem **M**ovie, is the format used for
Metal Gear Solid V: Ground Zeroes and Metal Gear Solid V: The Phantom
Pain's in-game rendered cutscenes. The .fsm files are made up of two
different kinds of data chunks. DEMO chunks, which are likely animation
data, and SND chunks, which are Wwise audio files that have been split
into multiple pieces. The .fsm format is Little-Endian, meaning bytes
are written in reverse order of significance.

## FSM Header

The .fsm format's header is always the same; but there are cases where a
.fsm file may not have a header at all.

  - 0x0 - 0x3 (string): Signature. Always "SYS ".
  - 0x4 - 0x7 (int): Unknown. Always 0x10.
  - 0x8 - 0xF: Padding.

## First SND Header

The first SND header differs from all of the other chunk headers, which
all follow the same format. The first SND header follows this pattern:

  - 0x0 - 0x3 (string): Signature. Always "SND ".
  - 0x4 - 0x7 (int): Chunk length.
  - 0x8 - 0xF (double): Time for chunk to start playing.
  - 0x10 - 0x13 (int): Complete Wwise file's length.
  - 0x14 - 0x1F: Unknown.

## Chunk Header

All other chunks follow the exact same pattern.

  - 0x0 - 0x3 (string): Signature. Always either "SND " or "DEMO"
  - 0x4 - 0x7 (int): Chunk length.

<!-- end list -->

  - 0x8 - 0xF (double): Time for chunk to start playing. For END, it's
    the length of the whole demo.

## DEMO Chunk

DEMO chunks use three (or more) different types. 0 can contain motion
data and events, 1 is usually used for the first DEMO chunk of GZ .fsm
files (with TPP having one unused .fsm that uses it as well) and seem to
function like the .sand files in TPP, and 2 are motionless and event
only DEMO chunks.

### Demo Data Section

  - 0x0 - 0x3 (int) - DEMO Chunk Type, so far only 0, 1 and 2 have been
    identified.

#### The following are only applied in the 0 chunk type:

  - 0x0 - 0x3 (int) - Unknown, but the Root Vector is completely omitted
    if this value isn't 0x0A.
  - 0x4 - 0x7 (int) - Unknown
  - 0x8 - 0xB (int) - Unknown
  - 0xC - 0xF (int) - Motion segment count.

#### The following are only applied in the 0 and 2 chunk types:

  - 0x0 - 0x3 (int) - Size of the DEMO chunk starting from the DEMO
    Chunk Type value, so 0x10 of the file, without the DEMO chunk
    header.
  - 0x4 - 0x7 (int) - Offset to the Event section. If this value is
    empty or bigger than the chunk size (referring to the next DEMO
    chunk in the .fsm?), the file will not have events.

### Motion Section

This section only exists in 0 type DEMO chunk types.

#### Segment Offsets

  - 0x0 - 0x3 (int) - An offset to the segment start from the Segment
    Motion Data section. These are counted by the Motion Segment Count
    from the Demo Data section.

#### Root Vector

This is the root Vector3 of the DEMO chunk, using decimal-less
coordinates. This only exists if the Demo Data section's 0 DEMO chunk
type 0's first unknown isn't 0x0A.

  - 0x0 - 0x3 (float) - X translation
  - 0x4 - 0x7 (float) - Y translation
  - 0x8 - 0xC (float) - Z translation

#### Motion Segment Type Indices

The use of these is not exactly known, but they might relate to the
sizes or data types of the Motion Data section.

  - 0x0 - 0x1 (short) - A short of usually small size, if not just
    empty, per Motion Segment Count from the Demo Data section.

#### Motion Data Section

This is just a big list of shorts that most likely keep the motion data
compressed to shorts. They don't seem like half floats.

  - 0x0 - 0x1 (short) - A short of wildly differing sizes. These shorts
    continue either til the Event Section starts, or if the Event
    Section doesn't exist, til the end of the file. Sometimes there's
    extra empty space before the Event Section starts, never longer than
    0xF, so it's possible something in the file measures the Segments of
    the Motion Data here, possibly the Motion Segment Type indices.

### Event Section

Events contain data on certain kinds of operations in the DEMO chunk
aside from just motion. Examples include managing lights, effects
(creating them with parameters, but still having to use a motion section
object as a root), messages interceptable by Lua, mesh visibility on
objects, etc. What all of them are exactly isn't known yet, but a
general way of parsing them without reading much into their contents
seems to be consistent. The Event Section is only present if the DEMO
Chunk Type is 2, or if the DEMO Chunk Type is 1 and the Offset to Event
Section is bigger than 0 and less than the DEMO chunk size in the Demo
Data Section. If the DEMO Chunk Type is 2, it will start at 0x2C, which
will also offset the "start at the next line" padding size of the events
themselves, starting it at the 0xC of the current line.

#### Event Offsets

  - 0x0 - 0x3 (int) - A StrCode32 hash of "Normal"
  - 0x4 - 0x5 (short) - Event count
  - 0x6 - 0x7 (short) - Usually empty, but there could possibly be cases
    where it could be another count
  - 0x8 - 0xC (int) - Offset to event start, starting from the Demo Data
    Section. Repeated by the Event Count

The events themselves start at the start of the next 0x10-long line, but
if the DEMO chunk type in the Demo Data Section is 2, you'll have to
start parsing events 4 bytes before the start of the next line, since
the Event Offsets start 4 bytes before the start of the next line too,
so at 0xC of the current line.

#### Event Data

Events include the event type name hash and the event's parameters.
Their function is not yet known, but this should parse them. Very
similar data is stored in some .evf DataSets.

  - 0x0 - 0x3 (int) - Event type hash. 595181585 is common, and it's a
    StrCode32 hash of "ExecCommand"
  - 0x4 - (byte enum) - Time Section count
  - 0x5 - (byte enum) - Param Int count
  - 0x6 - (byte enum) - Param Float count
  - 0x7 - (byte enum) - Param String Hash count

##### Time Section

  - 0x0 - 0x3 - (int) The frame when the event starts
  - 0x4 - 0x7 - (int) The frame when the event ends (could be split into
    two shorts, as some FF FF + some hex entries exist)

##### Param Int

  - 0x0 - 0x3 - (int) Some parameter

##### Param Float

  - 0x0 - 0x3 - (float) Some parameter

##### Param String

  - 0x0 - 0x3 - (uint) Param String hash. These could vary a lot, and it
    still has to be identified what they are
  - 0x4 - 0x7 - (int) Unknown

The event should end after filling in the rest of the 0xF line with
padding.

## Additional Notes

  - The first SND chunk is always 0x200020 bytes. All following SND
    chunks are 0x200010 bytes.