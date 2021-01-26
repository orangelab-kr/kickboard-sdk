import { OriginalPacketMT1, PacketMT1 } from './mt1';
import { OriginalPacketMT2, PacketMT2 } from './mt2';
import { OriginalPacketMT4, PacketMT4 } from './mt4';
import { OriginalPacketMT5, PacketMT5 } from './mt5';
export declare type OriginalPacket = OriginalPacketMT1 | OriginalPacketMT2 | OriginalPacketMT4 | OriginalPacketMT5;
export declare type Packet = PacketMT1 | PacketMT2 | PacketMT4 | PacketMT5;
export default function (original: OriginalPacket): Packet | undefined;
