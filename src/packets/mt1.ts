/** 킥보드 연결시 사용되는 인터페이스입니다. */

import {
  IsInt,
  IsMACAddress,
  IsObject,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class PacketMT1Version {
  @IsInt()
  @Min(0)
  @Max(65535)
  hardware?: number;

  @IsInt()
  @Min(0)
  @Max(65535)
  software?: number;
}

export class PacketMT1 {
  @IsInt()
  type?: 1;

  @IsString()
  iccId?: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  productId?: number;

  @IsMACAddress()
  macAddress?: string;

  @IsObject()
  iotVersion?: PacketMT1Version;

  @IsObject()
  ecuVersion?: PacketMT1Version;
}

export interface OriginalPacketMT1 {
  mt: 1 /** 메세지 타입 */;
  id: string /** 심카드 ID */;
  iot_hw: number /** IOT 하드웨어 버전 */;
  iot_sw: number /** IOT 소프트웨어 버전 */;
  ecu_hw: number /** ECU 하드웨어 버전 */;
  ecu_sw: number /** ECU 소프트웨어 버전 */;
  product: number /** 제품 ID */;
  mac: string /** 맥어드레스 */;
}

export default function (original: OriginalPacketMT1): PacketMT1 {
  return {
    type: 1,
    iccId: original.id,
    productId: original.product,
    macAddress: original.mac,
    iotVersion: {
      software: original.iot_sw,
      hardware: original.iot_hw,
    },
    ecuVersion: {
      software: original.ecu_sw,
      hardware: original.ecu_hw,
    },
  };
}
