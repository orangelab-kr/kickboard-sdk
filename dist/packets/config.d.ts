/** 킥보드 설정 정보 요청시 가져오는 인터페이스입니다.. */
export declare class PacketConfigGprs {
    apad: string;
    username: string;
    password: string;
}
export declare class PacketConfigMqtt {
    ipAddress: string;
    port: number;
    clientId: string;
    username: string;
    password: string;
}
export declare class PacketConfigReportInterval {
    ping: number;
    trip: number;
    static: number;
}
export declare class PacketConfig {
    type: 'config';
    gprs: PacketConfigGprs;
    mqtt: PacketConfigMqtt;
    reportInterval: PacketConfigReportInterval;
    networks: string[];
    impact: number;
    bluetoothKey: string;
    speedLimit: number;
    networkMode: 'auto' | 'gsm' | 'wcdma' | 'lte' | 'td-scdma';
}
export interface OriginalPacketMT4 {
    mt: 4 /** 메세지 타입 */;
    pa: {
        name: keyof OriginalPacketMT4Convert;
        value: string;
    }[];
}
export interface OriginalPacketMT4Convert {
    apad: string /** GPRS Apad */;
    auser: string /** GPRS 사용자 */;
    apass: string /** GPRS 비밀번호 */;
    ip: string /** MQTT 아이피 */;
    port: string /** MQTT 포트 */;
    ping: string /** 미사용시: MT2 보고 주기 */;
    tripint: string /** 사용시: MT2 보고 주기*/;
    statint: string /** 고정 MT2 보고 주기*/;
    mqid: string /** MQTT 클라이언트ID */;
    mquser: string /** MQTT 사용자 */;
    mqpass: string /** MQTT 비밀번호 */;
    speedlim: string /** 속도 제한 */;
    network: string /** 네트워크1 */;
    network2: string /** 네트워크2 */;
    network3: string /** 네트워크3 */;
    pdop: string /** 알 수 없음 */;
    impact: string /** 충격 감도 */;
    blekey: string /** 블루투스 KEY */;
    netconfig: string /** 네트워크 설정 */;
}
export default function (original: OriginalPacketMT4): PacketConfig;
