import { OriginalPacketMT5, PacketBattery } from './battery';
import { OriginalPacketMT4, PacketConfig } from './config';
import { OriginalPacketMT1, PacketInfo } from './info';
import { OriginalPacketMT2, PacketStatus } from './status';
export declare type OriginalPacket = OriginalPacketMT1 | OriginalPacketMT2 | OriginalPacketMT4 | OriginalPacketMT5;
export declare type Packet = PacketInfo | PacketStatus | PacketConfig | PacketBattery;
export default function (original: OriginalPacket): Packet | undefined;
