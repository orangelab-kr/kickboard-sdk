/** 킥보드 연결시 사용되는 인터페이스입니다. */

import {
  IsInt,
  IsMACAddress,
  IsObject,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class PacketInfoVersion {
  @IsInt()
  @Min(0)
  @Max(65535)
  hardware!: number;

  @IsInt()
  @Min(0)
  @Max(65535)
  software!: number;
}

export class PacketInfo {
  @IsInt()
  type!: 'info';

  @IsString()
  iccId!: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  productId!: number;

  @IsMACAddress()
  macAddress!: string;

  @IsObject()
  iotVersion!: PacketInfoVersion;

  @IsObject()
  ecuVersion!: PacketInfoVersion;
}

export interface OriginalPacketMT1 {
  mt: 1 /** 메세지 타입 */;
  ic: string /** 심카드 ID */;
  iot_hw: number /** IOT 하드웨어 버전 */;
  iot_sw: number /** IOT 소프트웨어 버전 */;
  ecu_hw: number /** ECU 하드웨어 버전 */;
  ecu_sw: number /** ECU 소프트웨어 버전 */;
  product: number /** 제품 ID */;
  ble_mac: string /** 맥어드레스 */;
}

export default function (original: OriginalPacketMT1): PacketInfo {
  return {
    type: 'info',
    iccId: original.ic,
    productId: original.product,
    macAddress: original.ble_mac,
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
