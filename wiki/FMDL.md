---
title: FMDL
permalink: /FMDL/
---

The .fmdl, or **F**ox **M**o**d**e**l**, is the format used by models in
Metal Gear Solid V: Ground Zeroes and Metal Gear Solid V: The Phantom
Pain. It is a Little-Endian format, meaning bytes are written in reverse
order of significance.

## Header

  - 0x0 - 0x3 (string): Signature. "FMDL".
  - 0x4 - 0x7 (float): Version number. (2.03 for GZ and 2.04 for TPP.)
  - 0x8 - 0xF (uint64): Blocks offset.
  - 0x10 - 0x17 (uint64): Section 0 blocks' binary flags.
  - 0x18 - 0x1F (uint64): Section 1 blocks' binary flags.
  - 0x20 - 0x23 (uint32): Number of blocks in section 0.
  - 0x24 - 0x27 (uint32): Number of blocks in section 1.
  - 0x28 - 0x2B (uint32): Section 0 offset.
  - 0x2C - 0x2F (uint32): Section 0 length.
  - 0x30 - 0x33 (uint32): Section 1 offset.
  - 0x34 - 0x37 (uint32): Section 1 length.
  - 0x38 - 0x3F: Padding.

## Section 0x0 Blocks

There are a total of 21 known block types in .fmdl files starting at the
offset listed at 0x28 - 0x2B. **Note**: Block 0xC is not present in The
Phantom Pain's models. Blocks 0x15 and 0x16 are not present in Ground
Zeroes' models. Blocks 0xF and 0x13 are not present in both The Phantom
Pain and Ground Zeroes' models.

Each block definition is 0x8 bytes and follows the following structure:

  - 0x0 - 0x1 (int16): Block id.
  - 0x2 - 0x3 (int16): Number of entries contained in block.
  - 0x4 - 0x7 (int32): Offset. (Note: To go to the block's data, you
    must add the section 0 offset to the offset listed here.)

Each id corresponds to the following blocks:

  - 0x0: Bone definitions.
  - 0x1: Mesh group definitions.
  - 0x2: Mesh group assignments.
  - 0x3: Mesh information.
  - 0x4: Material instance definitions.
  - 0x5: Bone group definitions.
  - 0x6: Texture definitions.
  - 0x7: Texture type/material parameter assignments.
  - 0x8: Material/material type assignments.
  - 0x9: Mesh format assignments.
  - 0xA: Mesh format definitions.
  - 0xB: Vertex format definitions.
  - 0xC: String definitions.
  - 0xD: Bounding box definitions.
  - 0xE: Buffer offsets.
  - 0x10: LOD Information.
  - 0x11: Face index definitions.
  - 0x12: Unknown.
  - 0x14: Unknown.
  - 0x15: Texture path hash definitions.
  - 0x16: String hash definitions.

### Block 0x0: Bone Definitions

This block is responsible for defining the bones and bone structure of
the model. Each entry is 0x30 bytes and follows this structure:

  - 0x0 - 0x1 (uint16): String id.
  - 0x2 - 0x3 (uint16): Parent id. (0xFFFF means root.)
  - 0x4 - 0x5 (uint16): Bounding box id.
  - 0x6 - 0x7 (uint16): Unknown.
  - 0x8 - 0xF: Padding.
  - 0x10 - 0x13 (binary32): Local position x.
  - 0x14 - 0x17 (binary32): Local position y.
  - 0x18 - 0x1B (binary32): Local position z.
  - 0x1C - 0x1F (binary32): Local position w.
  - 0x20 - 0x23 (binary32): World position x.
  - 0x24 - 0x27 (binary32): World position y.
  - 0x28 - 0x2B (binary32): World position z.
  - 0x2C - 0x2F (binary32): World position w.

### Block 0x1: Mesh Group Definitions

This block is responsible for creating the mesh groups the model objects
will be placed into. Each entry for the mesh group definitions block is
0x8 bytes. The entries follow this structure:

  - 0x0 - 0x1 (uint16): String id.
  - 0x2 - 0x3 (uint16): Invisibility flag. (0x0 means visible; 0x1 means
    invisible.)
  - 0x4 - 0x5 (uint16): Parent's id. (0xFFFF means root.)
  - 0x6 - 0x7 (uint16): Unknown. (Always 0xFFFF.)

### Block 0x2: Mesh Group Assignments

This block is responsible for placing the meshes that make up a model
inside the mesh groups defined in the mesh group definitions block. Each
entry is 0x20 bytes follows this pattern:

  - 0x0 - 0x3: Padding.

<!-- end list -->

  - 0x4 - 0x5 (uint16): Mesh group id. (I.e. if the id is 0x0, this
    means the objects are being placed into the first mesh group in the
    mesh group definition section. 0x1 would be the second mesh group
    and so on.)
  - 0x6 - 0x7 (uint16): Number of objects to be placed in the mesh
    group.
  - 0x8 - 0x9 (uint16): First object id.
  - 0xA - 0xB (uint16): Entry id. (First entry will be 0x1; second entry
    will be 0x2 and so on.)
  - 0xC - 0xF: Padding.
  - 0x10 - 0x11 (uint16): Unknown. (Note: Changing this doesn't seem to
    have an impact on the model.)
  - 0x12 - 0x1F: Padding.

### Block 0x3: Mesh Information

This section is responsible for defining the data for meshes which is
read from section 1. Each entry is 0x30 bytes and follows this
structure:

  - 0x0 (uint8): Alpha enum.
  - 0x1 (uint8): Shadow enum.
  - 0x2 - 0x3: Padding.
  - 0x4 - 0x5 (uint16): Material Instance id.
  - 0x6 - 0x7 (uint16): Bone group id.
  - 0x8 - 0x9 (uint16): Entry id.
  - 0xA - 0xB (uint16): Number of vertices.
  - 0xC - 0xF: Padding.
  - 0x10 - 0x13 (uint32): First face vertex id.
  - 0x14 - 0x17 (uint32): Number of face vertices.
  - 0x18 - 0x1F (uint64): First face index id.
  - 0x20 - 0x2F: Padding.

### Block 0x4: Material Instance Definitions

This block is responsible for defining textured material instances which
are applied to a model's meshes. Each entry is 0x10 bytes and follows
this pattern:

  - 0x0 - 0x1 (uint16): String id.
  - 0x2 - 0x3: Padding.
  - 0x4 - 0x5 (uint16): Material id.
  - 0x6 (int8): Number of textures.
  - 0x7 (int8): Number of parameters.
  - 0x8 - 0x9 (uint16): First texture id. (Note: this id is used with
    block 0x7.)
  - 0xA - 0xB (uint16): First parameter id. (Note: this id is used with
    block 0x7.)
  - 0xC - 0xF: Padding.

### Block 0x5: Bone Group Definitions

This block places the bones into groups which are referenced for things
like weighting vertices. Each entry is 0x44 bytes, but may not actually
use the entire available space. Entries follow this structure:

  - 0x0 - 0x1 (uint16): Unknown.
  - 0x2 - 0x3 (uint16): Number of entries.
  - 0x4 - 0x43 (uint16\[\]): Bone id.

### Block 0x6: Texture Definitions

In Ground Zeroes, this block is used to link texture names to their
paths. In The Phantom Pain, it is unknown what the string id is used
for, as The Phantom Pain uses hashed paths which include both the name
and path. In The Phantom Pain, the path id references the texture path
list rather than the string list. Each entry is 0x4 bytes and follows
this pattern:

  - 0x0 - 0x1 (uint16): String id.
  - 0x2 - 0x3 (uint16): Path id.

### Block 0x7: Texture Type/Material Parameter Assignments

This block assigns texture types to textures, and float values from
section 1's material parameters block to parameter types. Each entry is
0x4 bytes and follows this pattern:

  - 0x0 - 0x1 (uint16): String id. (Points to the type's name.)
  - 0x2 - 0x3 (uint16): Reference id. (For texture types, this will
    point to block 0x6. For parameter types, this will point to section
    1 block 0x1.)

### Block 0x8: Material/Material Type Assignments

This block defines which materials are used by a model, and which type
of material each is. Each entry is 0x4 bytes and follows this pattern:

  - 0x0 - 0x1 (uint16): String id.
  - 0x2 - 0x3 (uint16): Type id.

### Block 0x9: Mesh Format Assignments

This block sets up the mesh and vertex format for each mesh. Each entry
is 0x8 bytes and follows this pattern:

  - 0x0 (int8): Number of mesh format entries.
  - 0x1 (int8): Number of vertex format entries.
  - 0x2 - 0x3 (uint16): Unknown.
  - 0x4 - 0x5 (uint16): First mesh format id.
  - 0x6 - 0x7 (uint16): First vertex format id.

### Block 0xA: Mesh Format Definitions

This block sets up the format of the model's meshes. Each entry is 0x8
bytes and follows this pattern:

  - 0x0 (int8): Buffer offset id.
  - 0x1 (int8): Number of vertex format entries.
  - 0x2 (int8): Length.
  - 0x3 (int8): Type.
  - 0x4 - 0x7 (uint32): Offset.

### Block 0xB: Vertex Format Definitions

This block sets up the format for a model's vertices used in the
additional vertex data section. It utilizes a byte representing the
usage of an entry, and a byte representing the data type of the entry.
The byte values mean the following:

Usage:

  - 0x0: Position.
  - 0x1: Bone weights.
  - 0x2: Normals.
  - 0x3: Colour.
  - 0x7: Bone indices.
  - 0x8: Texture UV 0.
  - 0x9: Texture UV 1.
  - 0xA: Texture UV 2.
  - 0xB: Texture UV 3.
  - 0xC: Unknown weights 1.
  - 0xD: Unknown indices 1.
  - 0xE: Tangents.

Data Type:

  - 0x1: Binary32.
  - 0x4: Uint16.
  - 0x6: Binary16.
  - 0x7: Binary16.
  - 0x8: Int8 (normalized).
  - 0x9: Int8.

Each entry is 0x4 bytes and follows this pattern:

  - 0x0 (int8): Usage.
  - 0x1 (int8): Data type.
  - 0x2 - 0x3 (uint16): offset.

### Block 0xC: String Definitions

This block is used in Ground Zeroes to identify the locations and sizes
of strings in section 1's block 0x3. Each entry is 0x8 bytes and follows
this pattern:

  - 0x0 - 0x1 (uint16): Section 1 string block id.
  - 0x2 - 0x3 (uint16): Length.
  - 0x4 - 0x7 (uint32): Offset.

### Block 0xD: Bounding Box Definitions

This block sets up the bounding boxes used by a model. Each entry is
0x20 bytes and follows this pattern:

  - 0x0 - 0x3 (binary32): Max x.
  - 0x4 - 0x7 (binary32): Max y.
  - 0x8 - 0xB (binary32): Max z.
  - 0xC - 0xF (binary32): Max w.
  - 0x10 - 0x13 (binary32): Min x.
  - 0x14 - 0x17 (binary32): Min y.
  - 0x18 - 0x1B (binary32): Min z.
  - 0x1C - 0x1F (binary32): Min w.

### Block 0xE: Buffer Offset Definitions

This block lists offsets in section 1's block 0x2 that correspond to a
specific chunk of the model's vertex buffer. The first entry is for the
model's vertex position. The second entry is for the additional vertex
buffer. The last entry is for face data. The block follows this
structure:

  - 0x0 - 0x3 (uint32): Unknown. Appears to be a flag of some sort.
    Possibly for End-of-File.
  - 0x4 - 0x7 (uint32): Chunk's length.
  - 0x8 - 0xB (uint32): Chunk's offset.
  - 0xC - 0xF: Padding.

### Block 0x10: LOD Face Information

This block defines how many sets of LOD faces a model has. It also
contains floats with an unknown purpose. Each entry is 0x10 bytes.

  - 0x0 - 0x3 (uint32): Number of LODs.
  - 0x4 - 0x7 (binary32): Unknown.
  - 0x8 - 0xB (binary32): Unknown.
  - 0xC - 0xF (binary32): Unknown.

### Block 0x11: Face Index Definitions

This block details which vertices to use for each LOD for an object.
Each entry is 0x8 bytes.

  - 0x0 - 0x3 (uint32): First face vertex.
  - 0x4 - 0x7 (uint32): Number of face vertices.

### Block 0x12: Unknown

It is unknown what this block's purpose is. It always contains a single
0x8 byte entry with all 8 bytes having a value of 0x0.

  - 0x0 - 0x7 (uint64): Unknown.

### Block 0x14: Unknown

It is unknown what this blocks purpose is. It appears to have a
relationship with the LOD faces as nulling one of its float values
results in the model displaying the lowest LOD face set in-game. This
block always contains a single 0x80 byte entry.

  - 0x0 - 0x3: Padding.
  - 0x4 - 0x7 (binary32): Unknown. (Note: Nulling this byte causes the
    model to display the lowest set of LOD faces.)
  - 0x8 - 0xB (binary32): Unknown.
  - 0xC - 0xF (binary32): Unknown.
  - 0x10 - 0x13 (binary32): Unknown. (Note: Always a whole number?)
  - 0x14 - 0x1B: Padding.
  - 0x1C - 0x1F (uint32): Unknown.
  - 0x20 - 0x23 (uint32): Unknown.
  - 0x24 - 0x79: Padding.

### Block 0x15: Texture Path Hash Definitions

This block is just a list of hashed texture paths used by the model.
Each entry is 0x8 bytes. To find the hashed name, you need to subtract
0x1568000000000000 from the listed value. I.e. if a listed hash's value
is 0x156A45F7164A964B, subtract 0x1568000000000000 to get
0x245F7164A964B. This means the texture's hashed name would be
245F7164A964B.ftex.

### Block 0x16: String Hash Definitions

This block is very similar to the texture path hash definitions section.
It contains hashed strings used for things such as the names of the mesh
groups used by the model. The legacy hashing algorithm (the algorithm
used to calculate filename hashes in Ground Zeroes) is used to calculate
these hashes. Each entry is 0x8 bytes.

## Section 0x1 Blocks

Section 0x1 is the section in .fmdl files that holds mesh related data.
It contains significantly fewer blocks than section 0x0; however, due to
the amount of data it contains, it is larger. Block 0x1 is not present
in any known models. Block 0x3 is only present in Ground Zeroes' models.

Each block definition in section 0x1 is 0xB bytes and follows the
following structure:

  - 0x0 - 0x3 (uint32): Block id.
  - 0x4 - 0x7 (uint32): Offset.
  - 0x8 - 0xA (uint32): Length.

Each id corresponds to the following block:

  - 0x0: Material Parameters.
  - 0x2: Vertex Buffer.
  - 0x3: Strings.

### Block 0x0: Material Parameters

The material parameters block contains the numerical parameters used by
the model's material instances. Each parameter is made of a size 4 array
of float values (making each entry 0x10 bytes).

  - 0x0 - 0xF (binary32\[4\]): Float values.

### Block 0x2: Vertex Buffer

The vertex buffer block contains data relevant to the model's vertices.
It is broken up into three chunks: the position chunk, the additional
vertex data chunk, and the face chunk.

#### Position Chunk

The position chunk contains the positions of vertices used by each
object. Each vertex is 0xB bytes and is written in this structure:

  - 0x0 - 0x3 (binary32): X position.
  - 0x4 - 0x7 (binary32): Y position.
  - 0x8 - 0xA (binary32): Z position.

Every object will have its vertex data aligned by 0x10. This means that
if an object's vertex data does not end at a 0x10th position, it will
have padding at the end of its vertex data to align it to the 0x10th
position.

#### Additional Vertex Data Chunk

The additional vertex data chunk contains the normal, UV and
bone-weighting information of each vertex. It is divided into "chunks"
for each object, with twelve bytes for padding preceding the end of each
object, except for the last which has 4 bytes of padding after it. (may
need confirmation) The bone weights are each stored in one byte and then
divided by 255 to get the final weight. Each bone weight has a
corresponding bone group bone id, which links that bone weight to a bone
listed in it's bone group in section 0x5. What data is contained in this
chunk is based off of the mesh format assignment section and can vary
heavily. The following is a list of all known possible variables in the
order they may appear:

  - (Binary16): Normal x.
  - (Binary16): Normal y.
  - (Binary16): Normal z.
  - (Binary16): Normal w.
  - (Binary16): Tangent x.
  - (Binary16): Tangent y.
  - (Binary16): Tangent z.
  - (Binary16): Tangent w.
  - (Int8): Colour r.
  - (Int8): Colour g.
  - (Int8): Colour b.
  - (Int8): Colour a.
  - (Int8): Bone weight 0.
  - (Int8): Bone weight 1.
  - (Int8): Bone weight 2.
  - (Int8): Bone weight 3.
  - (Int8): Bone id 0.
  - (Int8): Bone id 1.
  - (Int8): Bone id 2.
  - (Int8): Bone id 3.
  - (Binary16): Texture U 0.
  - (Binary16): Texture V 0.
  - (Binary16): Texture U 1.
  - (Binary16): Texture V 1.
  - (Binary16): Texture U 2.
  - (Binary16): Texture V 2.
  - (Binary16): Texture U 3.
  - (Binary16): Texture V 3.
  - (Int8): Unknown weight 0.
  - (Int8): Unknown weight 1.
  - (Int8): Unknown weight 2
  - (Int8): Unknown weight 3.
  - (Uint16): Unknown index 0.
  - (Uint16): Unknown index 1.
  - (Uint16): Unknown index 2.
  - (Uint16): Unknown index 3.

#### Face Chunk

The face chunk contains the ids of vertices used by its respective
object. Each entry is 0x6 bytes and follows this pattern:

  - 0x0 - 0x1 (uint16): Vertex 1 id.
  - 0x2 - 0x3 (uint16): Vertex 2 id.
  - 0x4 - 0x5 (uint16): Vertex 3 id.

### Block 0x3: Strings

The strings block contains the actual string data that is referenced by
section 0's block 0xC.[Category:File
Formats](/Category:File_Formats "wikilink")
[Category:Models](/Category:Models "wikilink")