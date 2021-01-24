/** 킥보드 일정 간격으로 발송되는 프로토콜 인터페이스입니다. */

import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsObject,
  Max,
  Min,
} from 'class-validator';
import moment, { Moment } from 'moment';

export class PacketMT2Gps {
  @IsNotEmpty()
  timestamp?: Moment;

  @IsInt()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @IsInt()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @IsInt()
  @Min(0)
  @Max(255)
  satelliteUsedCount?: number;

  @IsBoolean()
  isValid?: boolean;

  @IsInt()
  @Min(0)
  @Max(255)
  speed?: number;
}

export class PacketMT2Network {
  @IsBoolean()
  isRoaming?: boolean;

  @IsInt()
  @Min(0)
  @Max(99)
  signalStrength?: number;

  @IsInt()
  mcc?: number;

  @IsInt()
  mnc?: number;
}

export class PacketMT2Trip {
  @IsInt()
  time?: number;

  @IsInt()
  distance?: number;
}

export class PacketMT2Status {
  @IsBoolean()
  isLightsOn?: boolean;

  @IsBoolean()
  isBuzzerOn?: boolean;

  @IsBoolean()
  isControllerChecked?: boolean;

  @IsBoolean()
  isIotChecked?: boolean;

  @IsBoolean()
  isBatteryChecked?: boolean;

  @IsBoolean()
  isFailDown?: boolean;

  @IsBoolean()
  isEBSBrakeOn?: boolean;

  @IsBoolean()
  isKickstandOn?: boolean;

  @IsBoolean()
  isLineLocked?: boolean;

  @IsBoolean()
  isBatteryLocked?: boolean;

  @IsInt()
  @Min(0)
  @Max(255)
  speed?: number;
}

export enum PacketMT2ReportReason {
  UNAUTHORIZED_MOVEMENT,
  PERIODIC_PAYLOAD_SENT,
  TRIP_TIME_OUT,
  BUZZER_ON_KICKSTAND_MOVED,
  BATTERY_FULLY_CHARGED,
  BATTERY_EVENT,
  CONTROLLER_EVENT,
  TRIP_START,
  TRIP_STOP,
}

export class PacketMT2Vehicle {
  @IsBoolean()
  isEnabled?: boolean;

  @IsArray()
  reportReason?: PacketMT2ReportReason[];
}

export class PacketMT2PowerDetails {
  @IsInt()
  @Min(0)
  @Max(100)
  battery?: number;

  @IsBoolean()
  isCharging?: boolean;
}

export class PacketMT2Power {
  @IsObject()
  scooter?: PacketMT2PowerDetails;

  @IsObject()
  iot?: PacketMT2PowerDetails;

  @IsInt()
  batteryCycle?: number;

  @IsInt()
  speedLimit?: number;
}

export class PacketMT2 {
  @IsInt()
  type?: 2;

  @IsNotEmpty()
  timestamp?: Moment;

  @IsInt()
  @Min(0)
  @Max(255)
  messageNumber?: number;

  @IsObject()
  gps?: PacketMT2Gps;

  @IsObject()
  network?: PacketMT2Network;

  @IsObject()
  trip?: PacketMT2Trip;

  @IsObject()
  vehicle?: PacketMT2Vehicle;

  @IsObject()
  power?: PacketMT2Power;

  @IsObject()
  status?: PacketMT2Status;
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

function getChargingStatus(pw: number): { scooter: boolean; iot: boolean } {
  const status = [...pw.toString(2)].reverse().join('').padEnd(2, '0');

  return {
    scooter: status[0] === '1',
    iot: status[1] === '1',
  };
}

function getReportReason(rf: number): PacketMT2ReportReason[] {
  const reasons: PacketMT2ReportReason[] = [];
  const status = [...rf.toString(2)].reverse().join('').padEnd(9, '0');

  if (status[0] === '1')
    reasons.push(PacketMT2ReportReason.UNAUTHORIZED_MOVEMENT);
  if (status[1] === '1')
    reasons.push(PacketMT2ReportReason.PERIODIC_PAYLOAD_SENT);
  if (status[2] === '1') reasons.push(PacketMT2ReportReason.TRIP_TIME_OUT);
  if (status[3] === '1')
    reasons.push(PacketMT2ReportReason.BUZZER_ON_KICKSTAND_MOVED);
  if (status[4] === '1')
    reasons.push(PacketMT2ReportReason.BATTERY_FULLY_CHARGED);
  if (status[5] === '1') reasons.push(PacketMT2ReportReason.BATTERY_EVENT);
  if (status[6] === '1') reasons.push(PacketMT2ReportReason.CONTROLLER_EVENT);
  if (status[7] === '1') reasons.push(PacketMT2ReportReason.TRIP_START);
  if (status[8] === '1') reasons.push(PacketMT2ReportReason.TRIP_STOP);

  return reasons;
}

function getStatus(io: number, ws: number): PacketMT2Status {
  const status = [...io.toString(2)].reverse().join('').padEnd(10, '0');

  return {
    isLightsOn: status[0] === '1',
    isBuzzerOn: status[1] === '1',
    isControllerChecked: status[2] === '1',
    isIotChecked: status[3] === '1',
    isBatteryChecked: status[4] === '1',
    isFailDown: status[5] === '1',
    isEBSBrakeOn: status[6] === '1',
    isKickstandOn: status[7] === '0',
    isLineLocked: status[8] === '0',
    isBatteryLocked: status[9] === '0',
    speed: ws,
  };
}

export default function (original: OriginalPacketMT2): PacketMT2 {
  const charging = getChargingStatus(original.pw);
  return {
    type: 2,
    timestamp: moment(original.rtc),
    messageNumber: original.mn,
    status: getStatus(original.io, original.ws),
    gps: {
      timestamp: moment(original.gtc),
      latitude: original.la,
      longitude: original.lo,
      satelliteUsedCount: original.su,
      isValid: original.va === 1,
      speed: original.gs,
    },
    network: {
      isRoaming: original.rm === 1,
      signalStrength: original.ss,
      mcc: original.mcc,
      mnc: original.mnc,
    },
    trip: {
      time: original.tt,
      distance: original.td,
    },
    vehicle: {
      isEnabled: original.sf === 1,
      reportReason: getReportReason(original.rf),
    },
    power: {
      batteryCycle: original.cy,
      speedLimit: original.sl,
      scooter: {
        battery: original.sb,
        isCharging: charging.scooter,
      },
      iot: {
        battery: original.ib,
        isCharging: charging.iot,
      },
    },
  };
}
