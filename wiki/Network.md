---
title: Network
permalink: /Network/
tags: [EXE]
---

This page covers general network notes for multiplayer in TPP (FOB). Terms:

  - `host` - attacker player, the one who invades FOB
  - `client` - defender, joins host session to eliminate host

Exe information:
  - version `1.0.15.3`
  - md5sum `7cc5f282b068f741adda2bb1076fb721`
  - Steam depot [287701](https://steamdb.info/depot/287701), manifest `2518831260221836800`

### Network session

All network communications are performed in a context of network session represented by `fox::nt::impl::SessionImpl2` class.

#### Host session

Host starts his session at LZ selection step (`Drop at this position`).

![Host session](/assets/Network/host_start_session.jpg){:.thumb .center}

Stacktrace:

```text
mgsvtpp.0000000143E55BA0 = fox::nt::impl::SessionImpl2::SessionImpl2
mgsvtpp.0000000143E5BC2C = fox::nt::Session::Create2
mgsvtpp.00000001459F3EBB = tpp::net::FobTarget::CreateHostSession
mgsvtpp.00000001416994CC = tpp::ui::menu::mbm::impl::FobMission2CallbackImpl::Update
```

#### Client session

Client starts his session after accepting deployment to FOB.

![Client session](/assets/Network/client_start_session.jpg){:.thumb .center}

Stacktrace:

```text
mgsvtpp.0000000143E55BA0 = fox::nt::impl::SessionImpl2::SessionImpl2
mgsvtpp.0000000143E5BC2C = fox::nt::Session::Create2
mgsvtpp.00000001459F39BF = tpp::net::FobTarget::CreateClientSession
mgsvtpp.0000000141697B79 = tpp::ui::menu::mbm::impl::FobMission2CallbackImpl::Update
```

---

### Preparing connection

Preparation stage consists of:
  - creating network socket
  - starting session
  - adding network members
  - sending initial message
  - notifying all session observers

It is covered by `fox::nt::impl::SessionImpl2::PrepareP2pConnection`.

#### Network socket

Game uses [SteamNetworking API](https://partner.steamgames.com/doc/api/ISteamNetworking); Steam is referred to as `FirstPartyP2pConnectionManager` in code. All P2P data is send via UDP socket `fox::nio::impl::SteamUdpSocketImpl`, which appears to implement some unmentioned socket interface with most methods stubbed. Sockets are created in `fox::nt::FirstPartyP2pConnectionManager::Impl::StartHostSession` and `fox::nt::FirstPartyP2pConnectionManager::Impl::StartClientSession`.

#### Session observers

Session observers are objects are notified of some events. They are registered by calling `fox::nt::impl::NetworkSystemImpl::AddSessionObserver`. An example of such call can be found at `0x146845b7e`, `tpp::gm::impl::ScriptDeclVarsImpl::ScriptDeclVarsImpl`, which serves as one of the session observers. They are created independently from online components; ScriptDeclVarsImpl one is added on every mission start.

Observers are notified in different places, such as `fox::nt::Session::NotifyObservers` and `fox::nt::impl::SessionImpl2::PrepareP2pConnection`. Notification is performed by calling observer's `OnSessionNotify` method.

#### Establishing connection

Incoming connection is processed (host) by `fox::nio::impl::SteamUdpSocketImpl::OnP2pSessionRequest`, SteamAPI callback [P2PSessionRequest_t](https://partner.steamgames.com/doc/api/ISteamNetworking#P2PSessionRequest_t). Connection request will be processed only if `TppNetworkUtil.SessionEnableAccept(true)` was called from lua beforehand (`fox::nt::impl::SessionImpl2::EnableAccept` under the hood). In game terms that means that host player must be already on FOB after using wormhole from helicopter.

Request contains steamID of the user who wants to start a P2P session with us; IP addresses are not known at that point. After accepting, Steam creates a connection between clients, traversing NATs when possible. At this stage you can inspect traffic in Wireshark using `classicstun` as a filter.

#### Initial message

Host sends inital message with value of `0x8b2228b2` (hashed string). This message is also sent in `Update` client/host loops, it's significance is unknown.

---

### Update loop

After establishing the connection game starts to periodically update network session by calling `fox::nt::Member::SendUpdate` (UDP packets, every 2 seconds).

At this point host player is already in the game and client is on sortie prep screen. No important data (player info, enemy status etc.) has been transferred yet.

After client player commences mission (triggering mission loading), session updates with state `4` for both players, triggering `tpp::gm::impl::ScriptDeclVarsImpl::OnSessionNotify` svars synchronization code. It is not clear where and when exactly it executes in relation to other mission loading code. Approximately at this point synchronizers also start working.

#### Synchronizers

Synchronizers are objects responsible for synchronizing various game states. They communicate using GameSockets (unlike SppSocket).

There are *at least* 12 implementations:

```c++
tpp::gm::cbox::impl::SynchronizerImpl
tpp::gm::corpse::impl::SynchronizerImpl
tpp::gm::example::impl::SynchronizerImpl
tpp::gm::gimmick::impl::ContainerSynchronizerImpl
tpp::gm::hostage::impl::Hostage2SynchronizerImpl
tpp::gm::impl::LadderSynchronizerImpl
tpp::gm::player::impl::SynchronizerImpl
tpp::gm::securitycamera::impl::SynchronizerImpl
tpp::gm::soldier::impl::Soldier2SynchronizerImpl
tpp::gm::uav::impl::SynchronizerImpl
tpp::gm::vehicle::impl::SynchronizerImpl
tpp::gm::walkergear::impl::SynchronizerImpl
```

There is also `tpp::gm::impl::ScriptDeclVarsImpl`, which is similar to synchronizers, but doesn't belong to them.

Initialization on mission start, stacktrace:

```text
mgsvtpp.00000001412A6C50 = tpp::gm::player::impl::SynchronizerImpl::Initialize
mgsvtpp.0000000146C6A6D6 = fox::CreateQuark
mgsvtpp.00000001409BCDD9 = tpp::gm::player::impl::Player2GameObjectImpl::AllocResourcesImpl
mgsvtpp.0000000146256915 = tpp::gm::player::impl::Player2GameObjectImpl::AllocResources
mgsvtpp.0000000146C93054 = fox::gm::impl::GameObjectImpl::Allocate
mgsvtpp.0000000146CC34C5 = fox::gm::impl::`anonymous_namespace'::GameObjectTypeCollector::AddObjectImpl
mgsvtpp.0000000146C93E79 = fox::gm::impl::CreateGameObjectImpl
mgsvtpp.0000000146C93977 = fox::gm::CreateGameObject
mgsvtpp.0000000146CC0E66 = fox::gm::impl::GameObjectDataBody::SetUpGameObject
mgsvtpp.0000000146CC0315 = fox::gamecore::GameObjectDataBody::Initialize
mgsvtpp.000000014327085D = fox::DataBody::ExecInitalize
mgsvtpp.000000014006E65E = fox::Block::Process
mgsvtpp.000000014314B095 = fox::impl::BlockHelperTask::Do
mgsvtpp.00000001400340AF = fox::TaskQueue::ExecuteTask
```

In that function 8 instances of Synchronizer are created by calling `fox::gm::impl::'anonymous_namespace'::SynchronizationSystemImpl::CreateSynchronizer`.

Ghidra code:

```c
  local_60 = 0x30;
  local_68 = 3;
  local_5c = 0x90;
  local_58 = (uint *)CONCAT44(local_58._4_4_,1);
  local_78[0] = 10;
  local_64 = uVar2;
                    /* fox::gm::impl::`anonymous_namespace'::SynchronizationSystemImpl::CreateSynchronizer                        */
  uVar7 = (**(code **)(*plVar5 + 8))(plVar5,local_78);
  *(undefined8 *)(param_1 + 0x68) = uVar7;
  cVar18 = (char)uVar3;
  if ((cVar18 != '\0') && (uVar12 = uVar15, uVar3 = uVar15, uVar2 != 0)) {
    do {
      fVar19 = EQUIP_STATE_INTERVAL;
      if (uVar12 == uVar3) {
        fVar19 = SEC_PER_FRAME * 36000.0;
      }
                    /* fox::gm::impl::`anonymous_namespace'::SynchronizerImpl::SetInterval */
      (**(code **)(**(longlong **)(param_1 + 0x68) + 0x28))
                (*(longlong **)(param_1 + 0x68),uVar3,uVar12 & 0xff,fVar19);
      uVar12 = uVar12 + 1;
    } while ((uVar12
  }
```

Under the hood a GameSocketImpl is created, with id 0x30 (56) and count of 140 (0x90) (more on that later). Update interval is `EQUIP_STATE_INTERVAL` (equal to `SEC_PER_FRAME, 0.016683333`) (or `SEC_PER_FRAME * 36000 = 0.016683333 * 36000 = 600.6`).

#### GameSocket

GameSocket (`fox::nt::impl::GameSocketImpl`) is an abstraction used to mark all data sent from it with its id; mark is used to route received data into corresponding socket on the other side. GameSockets are created at various loading stages and not limited to synchronizers. All of them are initialized with unique ids and a count of.. something, probably peers? Count differs from one socket to another, from 1 to 140. Synchronizer-related GameSockets are active only after client starts the mission and cannot send/receive data before that for unknown reason.

Creating ScriptDeclVarsImpl socket, GVars (runs only on game start):

```text
mgsvtpp.0000000143EA7840 = fox::nt::impl::GameSocketImpl::GameSocketImpl
mgsvtpp.0000000143EADA00 = fox::nt::impl::NetworkSystemImpl::CreateGameSocket
mgsvtpp.0000000140AE0DA0 = tpp::gm::impl::ScriptDeclVarsImpl::Create
mgsvtpp.0000000146847731 = tpp::gm::impl::DeclareGVars
```

ScriptDeclVarsImpl socket, SVars (on mission load):

```text
mgsvtpp.0000000143EA7840 = fox::nt::impl::GameSocketImpl::GameSocketImpl
mgsvtpp.0000000143EADA00 = fox::nt::impl::NetworkSystemImpl::CreateGameSocket
mgsvtpp.0000000140AE0DA0 = tpp::gm::impl::ScriptDeclVarsImpl::Create
mgsvtpp.0000000146847D88 = tpp::gm::impl::DeclareSVars
mgsvtpp.000000014C1EF524 = luaD_precall
mgsvtpp.0000000141A2693B = lua::luaV_execute
mgsvtpp.000000014C1EF7BE = lua::luaD_rawrunprotected
mgsvtpp.000000014C1F0E72 = lua::lua_resume
mgsvtpp.0000000140A1CD08 = tpp::gm::impl::`anonymous_namespace'::SimpleMissionBlockController::InitializeForCreatingDataBodyInBlock
mgsvtpp.000000014006E39C = fox::Block::Process
```

Sockets (Game or Spp) are not required for transmitting data; you can use SteamUdpSocketImpl directly.

---

### Sending data

#### GameSocketImpl

```text
tpp::gm::impl::ScriptDeclVarsImpl::OnSessionNotify
    fox::BitStreamWriter::PrimitiveWrite_                 // --> writes svars into a buffer
fox::nt::impl::GameSocketImpl::RequestToSendToMember      // with buffer as a parameter
    fox::nt::impl::GameSocketImpl::Peer::RequestToSend
        fox::nt::impl::GameSocketBufferImpl::Alloc
        fox::nt::impl::TransceiverManagerImpl::Peer::AddToSendQueue

// after some time data is retrieved from SendQueue

fox::nt::impl::TransceiverManagerImpl::Peer::Send (0x143e7c130, with a loop)
fox::nio::impl::MpMuxImpl::GetTotalPayloadSize
fox::nt::impl::TransceiverManagerImpl::Peer::SendImpl
    fox::nt::impl::GameSocketImpl::Peer::IsSendPacketEmpty
    fox::nio::Buffer::Buffer(0x400)
    fox::nt::impl::GameSocketImpl::Peer::CreateSendPacket
    fox::nio::impl::MpSocketImpl::Send
        fox::nio::impl::MpMuxImpl::Send
            fox::nio::MpMessage::Create
            fox::nio::MpMessage::Serializer::Serialize
            fox::nio::MpMessageContainer::AddMessage
```

Game also tries to add another message into `MpMessageContainer` before sending it if there is enough space.

#### SppSocketImpl

```text
mgsvtpp.000000014D36E92E = fox::nt::Daemon::UpdateLast
mgsvtpp.0000000143E729D4 = fox::nt::TotalController::Send
mgsvtpp.0000000143E73CBA = fox::nt::PeerController::Send
mgsvtpp.0000000143E6F99A = fox::nt::Member::SendUpdate
mgsvtpp.0000000141A5A75B = fox::nio::impl::MpMuxImpl::SendUpdate
mgsvtpp.000000014C397E48 = fox::nio::impl::SppSocketImpl::Send
mgsvtpp.0000000141A57FBA = fox::nio::impl::SppSocketImpl::SendImpl
mgsvtpp.000000014C4044F0 = fox::nio::impl::SteamUdpSocketImpl::Send
```

---

### Receiving data

`fox::nt::impl::TransceiverManagerImpl::UpdateToRecv` handles incoming messages. Buffer is read by `fox::nio::impl::MpSocketImpl::Recv`.

Incoming data is processed differently based on first byte (questionable?):
  - 0: `fox::nt::impl::TransceiverImpl::HandleMessage`
  - everything else: `fox::nt::impl::GameSocketImpl::HandleMessage`

All data is prefixed by some sort of header. An example for socket id 90: `18 28 3A 00 00 00 00 00 E9 B5 00`.


Socket id is saved in `B5` byte by `fox::nt::impl::GameSocketImpl::Peer::CreateSendPacket`. `fox::BitStreamReader::PrimitiveWrite_` is responsible for encoding it, encoding is also dependent on current buffer position. Usually id can be recovered by shifting it to the right: `0xB5 >> 0x1`.

`E9` is added by `fox::nio::MpMessage::Serializer::Serialize`.

It is not known where `18 28 3A` comes from. That value doesn't change between game restarts and after sending more messages over that socket.

---

### Packet dropping

Game keeps track of dropped packets and [RTT](https://en.wikipedia.org/wiki/Round-trip_delay) (ping), entering `limit state` if these values are over predefined limits. Monitoring is performed by `tpp::net::impl::BandWidthManagerImpl` (created during in `CreateHost/ClientSession`). It is not clear what `limit state` does.

---

### Limitations

There is a hard limit of about 1024 bytes in `fox::nio::impl::MpMuxImpl::Send`. If you attempt to send more data than that, message will be truncated to that limit (or won't be sent at all?).
Increasing various buffers to get over that limit (MessageContainer, Serializer etc.) eventually causes a crash caused by calling `memcpy` at `0x141a5a0e9`.

SteamAPI docs:

> data is all sent via UDP, and thus send sizes are limited to 1200 bytes;
> after this, many routers will start dropping packets.
