/// <reference types="node" />
import { EventEmitter } from 'events';
import { AlarmMode } from '../commands/alarm';
import { BuzzerMode } from '../commands/buzzer';
import { LightMode } from '../commands/light';
import { PacketBattery } from '../packets/battery';
import { PacketConfig } from '../packets/config';
import { PacketInfo } from '../packets/info';
import { PacketStatus } from '../packets/status';
import KickboardService from './service';
export default class KickboardClient {
    private service;
    kickboardId: string;
    private queuePrefix;
    readonly exchange = "mqtt";
    constructor(service: KickboardService, kickboardId: string);
    /** 킥보드를 시작합니다. */
    start(): Promise<PacketStatus>;
    /** 킥보드를 종료합니다. */
    stop(): Promise<PacketStatus>;
    /** 킥보드를 잠금합니다. */
    lock(): void;
    /** 킥보드를 잠금 해제합니다. */
    unlock(): void;
    /** 배터리 잠금합니다. */
    batteryLock(): void;
    /** 배터리 잠금을 해제합니다. */
    batteryUnlock(): void;
    /** 부저를 킵니다. */
    buzzerOn(mode: BuzzerMode, seconds?: number): Promise<void>;
    /** 부저를 끕니다. */
    buzzerOff(): Promise<void>;
    /** 블루투스를 킵니다. */
    bluetoothOn(): void;
    /** 블루투스를 끕니다. */
    bluetoothOff(): void;
    /** 불을 킵니다. */
    lightOn(mode: LightMode, seconds?: number): Promise<void>;
    /** 불을 끕니다. */
    lightOff(): Promise<void>;
    /** 하드웨어, 소프트웨어 정보를 가져옵니다. */
    getInfo(): Promise<PacketInfo>;
    /** GPS 정보, 속도와 같은 현재 상태를 불러옵니다. */
    getStatus(): Promise<PacketStatus>;
    /** MQTT 와 GPRS 크레덴셜 및 기타 정보를 불러옵니다. */
    getConfig(): Promise<PacketConfig>;
    /** 배터리 정보와 상태를 가져옵니다. */
    getBattery(): Promise<PacketBattery>;
    /** 알람 모드를 켭니다. */
    alarmOn(mode: AlarmMode, seconds?: number): void;
    /** 알람 모드를 끕니다. */
    alarmOff(): void;
    /** GPRS APAD를 수정합니다. */
    setGprsApad(apad: string): Promise<PacketConfig>;
    /** GPRS USERNAME를 수정합니다. */
    setGrpsUsername(username: string): Promise<PacketConfig>;
    /** GPRS PASSWORD를 수정합니다. */
    setGrpsPassword(password: string): Promise<PacketConfig>;
    /** MQTT Address 수정합니다. */
    setMQTTAddress(address: string): Promise<PacketConfig>;
    /** MQTT Port 수정합니다. */
    setMQTTPort(port: number): Promise<PacketConfig>;
    /** Report Interval Ping을 수정합니다. */
    setReportIntervalPing(seconds: number): Promise<PacketConfig>;
    /** Report Interval Trip을 수정합니다. */
    setReportIntervalTrip(seconds: number): Promise<PacketConfig>;
    /** Report Interval Static을 수정합니다. */
    setReportIntervalStatic(seconds: number): Promise<PacketConfig>;
    /** MQTT Client ID를 수정합니다. */
    setMQTTClientId(clientId: string): Promise<PacketConfig>;
    /** MQTT Username을 수정합니다. */
    setMQTTUsername(username: string): Promise<PacketConfig>;
    /** MQTT Password을 수정합니다. */
    setMQTTPassword(password: string): Promise<PacketConfig>;
    /** 속도를 수정합니다. */
    setSpeedLimit(speed: number): Promise<PacketConfig>;
    /** 충격 기준치를 수정합니다. */
    setImpact(impact: number): Promise<PacketConfig>;
    /** 블루투스 인증 키를 변경합니다. */
    setBluetoothKey(key: string): Promise<PacketConfig>;
    /** 네트워크 모드를 변경합니다. */
    setNetworkMode(mode: 0 | 1 | 2 | 3 | 4): Promise<PacketConfig>;
    /** 킥보드를 재부팅합니다. */
    reboot(): void;
    /** 구독을 생성합니다. 바로 듣기가 활성화되지 않습니다. */
    createSubscribe(): Promise<EventEmitter & {
        id: string;
    }>;
    /** 생성한 구독에 듣기를 활성화합니다. */
    startSubscribe(subscribe: EventEmitter & {
        id: string;
    }, timeout?: number): Promise<void>;
    /** 구독을 취소합니다. 듣기가 비활성화됩니다. */
    stopSubscribe(subscribe: EventEmitter & {
        id: string;
    }): Promise<void>;
    private waitForResponse;
    /** todo: 코드가 비효율적, 소스 최적화 필요 */
    private waitForResponseWithoutTimeout;
    /** 랜덤 큐ID 를 생성합니다. */
    private generateQueueId;
    /** 킥보드 신호 패턴을 가져옵니다. */
    private getKickboardPattern;
    /** 명령어를 전송합니다. */
    private sendMessage;
}
