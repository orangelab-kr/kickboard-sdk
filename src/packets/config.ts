/** 킥보드 설정 정보 요청시 가져오는 인터페이스입니다.. */

import {
  IsArray,
  IsIn,
  IsInt,
  IsObject,
  IsPort,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class PacketConfigGprs {
  @IsString()
  apad!: string;

  @IsString()
  username!: string;

  @IsString()
  password!: string;
}

export class PacketConfigMqtt {
  @IsString()
  ipAddress!: string;

  @IsPort()
  port!: number;

  @IsString()
  clientId!: string;

  @IsString()
  username!: string;

  @IsString()
  password!: string;
}

export class PacketConfigReportInterval {
  @IsInt()
  ping!: number;

  @IsInt()
  trip!: number;

  @IsInt()
  static!: number;
}

export class PacketConfig {
  @IsInt()
  type!: 'config';

  @IsObject()
  gprs!: PacketConfigGprs;

  @IsObject()
  mqtt!: PacketConfigMqtt;

  @IsObject()
  reportInterval!: PacketConfigReportInterval;

  @IsArray()
  networks!: string[];

  @IsInt()
  impact!: number;

  @IsString()
  bluetoothKey!: string;

  @IsInt()
  @Min(8)
  @Max(50)
  speedLimit!: number;

  @IsString()
  @IsIn(['auto', 'gsm', 'wcdma', 'lte', 'td-scdma'])
  networkMode!: 'auto' | 'gsm' | 'wcdma' | 'lte' | 'td-scdma';
}

export interface OriginalPacketMT4 {
  mt: 4 /** 메세지 타입 */;
  pa: { name: keyof OriginalPacketMT4Convert; value: string }[];
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

function getNetworkMode(
  netconfig?: string
): 'auto' | 'gsm' | 'wcdma' | 'lte' | 'td-scdma' {
  if (netconfig === '0') return 'auto';
  else if (netconfig === '1') return 'gsm';
  else if (netconfig === '2') return 'wcdma';
  else if (netconfig === '3') return 'lte';
  else if (netconfig === '4') return 'td-scdma';
  return 'auto';
}

function getObjectFromArray(
  original: OriginalPacketMT4
): OriginalPacketMT4Convert {
  const packet: any = {};
  original.pa.forEach(({ name, value }) => (packet[name] = value));
  return packet;
}

function getNetworks(convert: OriginalPacketMT4Convert): string[] {
  const networks = [];
  if (convert.network) {
    networks.push(convert.network);
  }

  if (convert.network2) {
    networks.push(convert.network2);
  }

  if (convert.network3) {
    networks.push(convert.network3);
  }

  return networks;
}

export default function (original: OriginalPacketMT4): PacketConfig {
  const convert = getObjectFromArray(original);
  return {
    type: 'config',
    gprs: {
      apad: convert.apad,
      username: convert.auser,
      password: convert.apass,
    },
    mqtt: {
      ipAddress: convert.ip,
      port: Number(convert.port),
      clientId: convert.mqid,
      username: convert.mquser,
      password: convert.mqpass,
    },
    reportInterval: {
      ping: Number(convert.ping),
      trip: Number(convert.tripint),
      static: Number(convert.statint),
    },
    networks: getNetworks(convert),
    impact: Number(convert.impact),
    bluetoothKey: convert.blekey,
    speedLimit: Number(convert.speedlim),
    networkMode: getNetworkMode(convert.netconfig),
  };
}
