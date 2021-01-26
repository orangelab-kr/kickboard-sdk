/** 킥보드 연결시 사용되는 인터페이스입니다. */
export declare class PacketMT1Version {
    hardware?: number;
    software?: number;
}
export declare class PacketMT1 {
    type?: 1;
    iccId?: string;
    productId?: number;
    macAddress?: string;
    iotVersion?: PacketMT1Version;
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
export default function (original: OriginalPacketMT1): PacketMT1;
