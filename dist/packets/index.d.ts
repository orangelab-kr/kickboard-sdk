import { OriginalPacketMT1, OriginalPacketMT2, OriginalPacketMT4, OriginalPacketMT5, PacketBattery, PacketConfig, PacketInfo, PacketStatus } from '.';
export * from './battery';
export * from './config';
export * from './info';
export * from './status';
export declare type OriginalPacket = OriginalPacketMT1 | OriginalPacketMT2 | OriginalPacketMT4 | OriginalPacketMT5;
export declare type Packet = PacketInfo | PacketStatus | PacketConfig | PacketBattery;
export declare function convertPacket(original: OriginalPacket): Packet | undefined;
