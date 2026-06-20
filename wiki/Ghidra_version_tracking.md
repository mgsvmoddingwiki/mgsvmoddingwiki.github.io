---
title: Ghidra version tracking
permalink: /Ghidra_version_tracking/
featured: true
tags: [EXE, Guides]
---

Game updated, need to transfer symbols from old exe to new one.

### Steps

1. Add as much memory as you can to `support/launch.sh` script (38G out of 48 available for me): `VMARGS_FROM_LAUNCH_SH+=("-Xmx38G")`
2. Launch Ghidra
3. Launch Version Tracking from gui, select old exe as source, new as destination
4. Click on magic wand button which will run all correlators and apply matches.
5. After the process finishes, Ghidra will start to sort matches. Interrupt the process, some matches are already there.

### Optional steps for more matches

Use this PyGhidra script _after_ automatic matching, adapt as needed:

{% include spoiler-start %}

```python
import pyghidra
import jpype

USERNAME="unknown321"
GHIDRA_DIR="/opt/ghidra_12.0_PUBLIC/"
PROJECT_DIR="/media/dev/tpp-ghidra"
PROJECT_NAME="mgsvtpp"
TRACKING_SESSION_NAME="/153 - 154" # yes, with slash

similarityScoreThreshold = 0.8
confidenceScoreThreshold = 1

pyghidra.start(verbose=True, install_dir=GHIDRA_DIR)

# those imports are available only after starting

from ghidra.framework.client import HeadlessClientAuthenticator
from ghidra.feature import vt
from ghidra import util

HeadlessClientAuthenticator.installHeadlessClientAuthenticator(USERNAME, None, True)

project = pyghidra.open_project(name=PROJECT_NAME, path=PROJECT_DIR)

# ghidra asks for password here

f = project.getProjectData().getFile(TRACKING_SESSION_NAME)
monitor = util.task.ConsoleTaskMonitor()
consumer = jpype.JObject()
f.getDomainObject(consumer, False, True, monitor)

domainObject = f.getDomainObject(consumer, False, True, monitor)

manager = domainObject.getAssociationManager()
ass = manager.getAssociations()

# domainObject.startTransaction("newtransaction")

used = {}
i = 0
for entry in ass:
    i = i + 1
    matches = domainObject.getMatches(entry)

    symbol = domainObject.getSourceProgram().getSymbolTable().getPrimarySymbol(matches[0].sourceAddress)
    if not symbol:
        continue

    if symbol.getName().startswith("FUN_") or symbol.getName().startswith("thunk_"):
        continue

    print(i, len(matches),
        symbol.object,
        matches[0].similarityScore, matches[0].confidenceScore,
        matches[0].sourceAddress, "->", matches[0].destinationAddress,
        matches[0].getAssociation().getStatus()
        )

    if matches[0].sourceAddress in used:
        continue

    if matches[0].getAssociation().getStatus() != vt.api.main.VTAssociationStatus.AVAILABLE:
        continue

    if matches[0].similarityScore.getScore() < similarityScoreThreshold:
        continue

    if matches[0].confidenceScore.getScore() < confidenceScore:
        continue

    used[matches[0].sourceAddress] = symbol.object
    # entry.setAccepted()
```

{% include spoiler-end %}
