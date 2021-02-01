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

export class PacketStatusGps {
  @IsNotEmpty()
  timestamp!: Moment;

  @IsInt()
  @Min(-90)
  @Max(90)
  latitude!: number;

  @IsInt()
  @Min(-180)
  @Max(180)
  longitude!: number;

  @IsInt()
  @Min(0)
  @Max(255)
  satelliteUsedCount!: number;

  @IsBoolean()
  isValid!: boolean;

  @IsInt()
  @Min(0)
  @Max(255)
  speed!: number;
}

export class PacketStatusNetwork {
  @IsBoolean()
  isRoaming!: boolean;

  @IsInt()
  @Min(0)
  @Max(99)
  signalStrength!: number;

  @IsInt()
  mcc!: number;

  @IsInt()
  mnc!: number;
}

export class PacketStatusTrip {
  @IsInt()
  time!: number;

  @IsInt()
  distance!: number;
}

export enum PacketStatusReportReason {
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

export class PacketStatusPowerDetails {
  @IsInt()
  @Min(0)
  @Max(100)
  battery!: number;

  @IsBoolean()
  isCharging!: boolean;
}

export class PacketStatusPower {
  @IsObject()
  scooter!: PacketStatusPowerDetails;

  @IsObject()
  iot!: PacketStatusPowerDetails;

  @IsInt()
  batteryCycle!: number;

  @IsInt()
  speedLimit!: number;
}

export class PacketStatus {
  @IsInt()
  type!: 'status';

  @IsNotEmpty()
  timestamp!: Moment;

  @IsInt()
  @Min(0)
  @Max(255)
  messageNumber!: number;

  @IsObject()
  gps!: PacketStatusGps;

  @IsObject()
  network!: PacketStatusNetwork;

  @IsObject()
  trip!: PacketStatusTrip;

  @IsObject()
  power!: PacketStatusPower;

  @IsBoolean()
  isEnabled!: boolean;

  @IsBoolean()
  isLightsOn!: boolean;

  @IsBoolean()
  isBuzzerOn!: boolean;

  @IsBoolean()
  isControllerChecked!: boolean;

  @IsBoolean()
  isIotChecked!: boolean;

  @IsBoolean()
  isBatteryChecked!: boolean;

  @IsBoolean()
  isFailDown!: boolean;

  @IsBoolean()
  isEBSBrakeOn!: boolean;

  @IsBoolean()
  isKickstandOn!: boolean;

  @IsBoolean()
  isLineLocked!: boolean;

  @IsBoolean()
  isBatteryLocked!: boolean;

  @IsArray()
  reportReason!: PacketStatusReportReason[];

  @IsInt()
  @Min(0)
  @Max(255)
  speed!: number;
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

function getReportReason(rf: number): PacketStatusReportReason[] {
  const reasons: PacketStatusReportReason[] = [];
  const status = [...rf.toString(2)].reverse().join('').padEnd(9, '0');

  if (status[0] === '1')
    reasons.push(PacketStatusReportReason.UNAUTHORIZED_MOVEMENT);
  if (status[1] === '1')
    reasons.push(PacketStatusReportReason.PERIODIC_PAYLOAD_SENT);
  if (status[2] === '1') reasons.push(PacketStatusReportReason.TRIP_TIME_OUT);
  if (status[3] === '1')
    reasons.push(PacketStatusReportReason.BUZZER_ON_KICKSTAND_MOVED);
  if (status[4] === '1')
    reasons.push(PacketStatusReportReason.BATTERY_FULLY_CHARGED);
  if (status[5] === '1') reasons.push(PacketStatusReportReason.BATTERY_EVENT);
  if (status[6] === '1')
    reasons.push(PacketStatusReportReason.CONTROLLER_EVENT);
  if (status[7] === '1') reasons.push(PacketStatusReportReason.TRIP_START);
  if (status[8] === '1') reasons.push(PacketStatusReportReason.TRIP_STOP);

  return reasons;
}

function getStatus(
  io: number,
  ws: number
): {
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
  speed: number;
} {
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

export default function (original: OriginalPacketMT2): PacketStatus {
  const charging = getChargingStatus(original.pw);
  return {
    type: 'status',
    timestamp: moment(original.rtc),
    messageNumber: original.mn,
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
    isEnabled: original.sf === 1,
    ...getStatus(original.io, original.ws),
    reportReason: getReportReason(original.rf),
  };
}
