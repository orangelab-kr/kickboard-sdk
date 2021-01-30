/** 킥보드 설정 정보 요청시 가져오는 인터페이스입니다.. */

import { IsArray, IsInt, IsString } from 'class-validator';

export class PacketBattery {
  @IsInt()
  type!: 'battery';

  @IsString()
  batterySN!: string;

  @IsInt()
  totalTrip!: number;

  @IsInt()
  totalTime!: number;

  @IsInt()
  totalCapacity!: number;

  @IsString()
  cellType!: string;

  @IsArray()
  cells!: number[];
}

export interface OriginalPacketMT5 {
  mt: 5;
  batsn: string /** 배터리 시리얼 넘버 */;
  totrip: number /** 총 주행 거리 */;
  totime: number /** 총 주행 시간 */;
  tocap: number /** 총 용량 */;
  ctype: string /** 셀 타입 */;
  cell: number[] /** 셀 볼트수 */;
}

export default function (original: OriginalPacketMT5): PacketBattery {
  return {
    type: 'battery',
    batterySN: original.batsn,
    totalTrip: original.totrip,
    totalTime: original.totime,
    totalCapacity: original.tocap,
    cellType: original.ctype,
    cells: original.cell,
  };
}
