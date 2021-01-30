import mt5, { OriginalPacketMT5, PacketBattery } from './battery';
import mt4, { OriginalPacketMT4, PacketConfig } from './config';
import mt1, { OriginalPacketMT1, PacketInfo } from './info';
import mt2, { OriginalPacketMT2, PacketStatus } from './status';

export type OriginalPacket =
  | OriginalPacketMT1
  | OriginalPacketMT2
  | OriginalPacketMT4
  | OriginalPacketMT5;
export type Packet = PacketInfo | PacketStatus | PacketConfig | PacketBattery;

export default function (original: OriginalPacket): Packet | undefined {
  if (original.mt === 1) return mt1(original);
  else if (original.mt === 2) return mt2(original);
  else if (original.mt === 4) return mt4(original);
  else if (original.mt === 5) return mt5(original);
}
