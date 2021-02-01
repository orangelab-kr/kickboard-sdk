/** 킥보드 일정 간격으로 발송되는 프로토콜 인터페이스입니다. */
import { Moment } from 'moment';
export declare class PacketStatusGps {
    timestamp: Moment;
    latitude: number;
    longitude: number;
    satelliteUsedCount: number;
    isValid: boolean;
    speed: number;
}
export declare class PacketStatusNetwork {
    isRoaming: boolean;
    signalStrength: number;
    mcc: number;
    mnc: number;
}
export declare class PacketStatusTrip {
    time: number;
    distance: number;
}
export declare enum PacketStatusReportReason {
    UNAUTHORIZED_MOVEMENT = 0,
    PERIODIC_PAYLOAD_SENT = 1,
    TRIP_TIME_OUT = 2,
    BUZZER_ON_KICKSTAND_MOVED = 3,
    BATTERY_FULLY_CHARGED = 4,
    BATTERY_EVENT = 5,
    CONTROLLER_EVENT = 6,
    TRIP_START = 7,
    TRIP_STOP = 8
}
export declare class PacketStatusPowerDetails {
    battery: number;
    isCharging: boolean;
}
export declare class PacketStatusPower {
    scooter: PacketStatusPowerDetails;
    iot: PacketStatusPowerDetails;
    batteryCycle: number;
    speedLimit: number;
}
export declare class PacketStatus {
    type: 'status';
    timestamp: Moment;
    messageNumber: number;
    gps: PacketStatusGps;
    network: PacketStatusNetwork;
    trip: PacketStatusTrip;
    power: PacketStatusPower;
    isEnabled: boolean;
    isLightsOn: boolean;
    isBuzzerOn: boolean;
    isControllerChecked: boolean;
    isIotChecked: boolean;
    isBatteryChecked: boolean;
    isFailDown: boolean;
    isEBSBrakeOn: boolean;
    isKickstandOn: boolean;
    isLineLocked: boolean;
    isBatteryLocked: boolean;
    reportReason: PacketStatusReportReason[];
    speed: number;
}
export interface OriginalPacketMT2 {
    mt: 2 /** 메세지 타입 */;
    rtc: string /** 현재 시각 */;
    mn: number /** 메세지 넘버 */;
    gtc: number /** GPS 시간 */;
    la: number /** 위도 */;
    lo: number /** 경도 */;
    su: number /** 위성 사용 횟수 */;
    va: number /** GPS 연결 여부 */;
    gs: number /** GPS 속도 */;
    rm: number /** 로밍 여부 */;
    ss: number /** 신호 강도 */;
    mcc: number /** MCC 번호 */;
    mnc: number /** MNC 번호 */;
    tt: number /** 이용 횟수 */;
    td: number /** 주행 거리 */;
    io: number /** I/O  */;
    ws: number /** 바퀴 속도 */;
    rf: number /** 보고 사유 */;
    hs: number /** 하드웨어 상태 코드 */;
    sf: number /** 이용 여부 */;
    ib: number /** IOT 배터리 */;
    sb: number /** 킥보드 배터리 */;
    pw: number /** 킥보드 상태 */;
    cy: number /** 배터리 사이클 */;
    sl: number /** 시속 제한 */;
}
export default function (original: OriginalPacketMT2): PacketStatus;
