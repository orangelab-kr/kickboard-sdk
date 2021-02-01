import MT1, { OriginalPacketMT1, PacketInfo } from './info';
import MT2, { OriginalPacketMT2, PacketStatus } from './status';
import MT4, { OriginalPacketMT4, PacketConfig } from './config';
import MT5, { OriginalPacketMT5, PacketBattery } from './battery';

export * from './battery';
export { default as MT5, OriginalPacketMT5, PacketBattery } from './battery';
export * from './config';
export { default as MT4 } from './config';
export * from './info';
export { default as MT1 } from './info';
export * from './status';
export { default as MT2 } from './status';

export type OriginalPacket =
  | OriginalPacketMT1
  | OriginalPacketMT2
  | OriginalPacketMT4
  | OriginalPacketMT5;
export type Packet = PacketInfo | PacketStatus | PacketConfig | PacketBattery;

export default function (original: OriginalPacket): Packet | undefined {
  if (original.mt === 1) return MT1(original);
  else if (original.mt === 2) return MT2(original);
  else if (original.mt === 4) return MT4(original);
  else if (original.mt === 5) return MT5(original);
}
