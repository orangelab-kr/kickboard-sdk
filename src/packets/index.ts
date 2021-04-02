import {
  OriginalPacketMT1,
  OriginalPacketMT2,
  OriginalPacketMT4,
  OriginalPacketMT5,
  PacketBattery,
  PacketConfig,
  PacketInfo,
  PacketStatus,
  convertBatteryPacket,
  convertConfigPacket,
  convertInfoPacket,
  convertStatusPacket,
} from '.';

export * from './battery';
export * from './config';
export * from './info';
export * from './status';

export type OriginalPacket =
  | OriginalPacketMT1
  | OriginalPacketMT2
  | OriginalPacketMT4
  | OriginalPacketMT5;
export type Packet = PacketInfo | PacketStatus | PacketConfig | PacketBattery;

export function convertPacket(original: OriginalPacket): Packet | undefined {
  if (original.mt === 1) return convertInfoPacket(original);
  else if (original.mt === 2) return convertStatusPacket(original);
  else if (original.mt === 4) return convertConfigPacket(original);
  else if (original.mt === 5) return convertBatteryPacket(original);
}
