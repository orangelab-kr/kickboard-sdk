import mt1, { OriginalPacketMT1, PacketMT1 } from './mt1';
import mt2, { OriginalPacketMT2, PacketMT2 } from './mt2';
import mt4, { OriginalPacketMT4, PacketMT4 } from './mt4';
import mt5, { OriginalPacketMT5, PacketMT5 } from './mt5';

export type OriginalPacket =
  | OriginalPacketMT1
  | OriginalPacketMT2
  | OriginalPacketMT4
  | OriginalPacketMT5;
export type Packet = PacketMT1 | PacketMT2 | PacketMT4 | PacketMT5;

export default function (original: OriginalPacket): Packet | undefined {
  if (original.mt === 1) return mt1(original);
  else if (original.mt === 2) return mt2(original);
  else if (original.mt === 4) return mt4(original);
  else if (original.mt === 5) return mt5(original);
}
