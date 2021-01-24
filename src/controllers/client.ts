import { ConsumeMessage } from 'amqplib';
import { EventEmitter } from 'events';
import Command from '../commands';
import { BatteryLock, BatteryUnlock } from '../commands/battery';
import { BluetoothOff, BluetoothOn } from '../commands/bluetooth';
import { BuzzerMode, BuzzerOff, BuzzerOn } from '../commands/buzzer';
import { ConfigMT1, ConfigMT4, ConfigMT5 } from '../commands/config';
import {
  KickboardLock,
  KickboardStart,
  KickboardStop,
  KickboardUnlock,
} from '../commands/kickboard';
import { LightMode, LightOff, LightOn } from '../commands/light';
import { Packet } from '../packets';
import { PacketMT1 } from '../packets/mt1';
import { PacketMT2 } from '../packets/mt2';
import { PacketMT4 } from '../packets/mt4';
import { PacketMT5 } from '../packets/mt5';
import KickboardService from './service';

export default class KickboardClient {
  private queuePrefix = 'events';
  public readonly exchange = 'mqtt';

  constructor(private service: KickboardService, public kickboardId: string) {}

  /** 킥보드를 시작합니다. */
  public async start(): Promise<PacketMT2> {
    const match = (packet: PacketMT2) => packet.vehicle?.isEnabled === true;
    return <PacketMT2>await this.waitForResponse(KickboardStart(), 2, match);
  }

  /** 킥보드를 종료합니다. */
  public async stop(): Promise<PacketMT2> {
    const match = (packet: PacketMT2) => packet.vehicle?.isEnabled === false;
    return <PacketMT2>await this.waitForResponse(KickboardStop(), 2, match);
  }

  /** 킥보드를 잠금합니다. */
  public lock(): void {
    this.sendMessage(KickboardLock());
  }

  /** 킥보드를 잠금 해제합니다. */
  public unlock(): void {
    this.sendMessage(KickboardUnlock());
  }

  /** 배터리 잠금합니다. */
  public batteryLock(): void {
    this.sendMessage(BatteryLock());
  }

  /** 배터리 잠금을 해제합니다. */
  public batteryUnlock(): void {
    this.sendMessage(BatteryUnlock());
  }

  /** 부저를 킵니다. */
  public async buzzerOn(mode: BuzzerMode, seconds = 0): Promise<void> {
    const match = (packet: PacketMT2) => packet.status?.isBuzzerOn === true;
    await this.waitForResponse(BuzzerOn(mode, seconds), 2, match);
  }

  /** 부저를 끕니다. */
  public async buzzerOff(): Promise<void> {
    const match = (packet: PacketMT2) => packet.status?.isBuzzerOn === false;
    await this.waitForResponse(BuzzerOff(), 2, match);
  }

  /** 블루투스를 킵니다. */
  public bluetoothOn(): void {
    this.sendMessage(BluetoothOn());
  }

  /** 블루투스를 끕니다. */
  public bluetoothOff(): void {
    this.sendMessage(BluetoothOff());
  }

  /** 불을 킵니다. */
  public async lightOn(mode: LightMode, seconds = 0): Promise<void> {
    const match = (packet: PacketMT2) => packet.status?.isLightsOn === true;
    await this.waitForResponse(LightOn(mode, seconds), 2, match);
  }

  /** 불을 끕니다. */
  public async lightOff(): Promise<void> {
    const match = (packet: PacketMT2) => packet.status?.isLightsOn === false;
    await this.waitForResponse(LightOff(), 2, match);
  }

  /** 하드웨어, 소프트웨어 정보를 가져옵니다. */
  public async getConfigM1(): Promise<PacketMT1> {
    return <PacketMT1>await this.waitForResponse(ConfigMT1(), 1);
  }

  /** GPS 정보, 속도와 같은 현재 상태를 불러옵니다. */
  public async getConfigM2(): Promise<PacketMT2> {
    return <PacketMT2>await this.waitForResponse(ConfigMT4(), 2);
  }

  /** MQTT 와 GPRS 크레덴셜 및 기타 정보를 불러옵니다. */
  public async getConfigM4(): Promise<PacketMT4> {
    return <PacketMT4>await this.waitForResponse(ConfigMT4(), 4);
  }

  /** 배터리 정보와 상태를 가져옵니다. */
  public async getConfigM5(): Promise<PacketMT5> {
    return <PacketMT5>await this.waitForResponse(ConfigMT5(), 5);
  }

  /** 구독을 생성합니다. 바로 듣기가 활성화되지 않습니다. */
  public async createSubscribe(): Promise<EventEmitter & { id: string }> {
    const id = this.generateQueueId();
    const handler: any = new EventEmitter();
    handler.id = id;

    return handler;
  }

  /** 생성한 구독에 듣기를 활성화합니다. */
  public async startSubscribe(
    subscribe: EventEmitter & { id: string }
  ): Promise<void> {
    const { channel } = this.service;
    if (!channel) throw Error('Cannot find channel from Kickboard Service.');
    await channel.assertQueue(subscribe.id, {
      autoDelete: true,
    });

    const options = { noAck: true };
    const pattern = this.getKickboardPattern();
    await channel.bindQueue(subscribe.id, this.exchange, pattern);
    const onMessage = async (res: ConsumeMessage | null) => {
      if (!res) return;
      const packet = this.service.getPacket(res);
      if (!packet) return;

      const eventName = `mt${packet.type}`;
      subscribe.emit(eventName, packet);
      subscribe.emit('all', packet);
    };

    await channel.consume(subscribe.id, onMessage, options);
  }

  /** 구독을 취소합니다. 듣기가 비활성화됩니다. */
  public async stopSubscribe(
    subscribe: EventEmitter & { id: string }
  ): Promise<void> {
    const { channel } = this.service;
    if (!channel) throw Error('Cannot find channel from Kickboard Service.');

    await channel.deleteQueue(subscribe.id);
  }

  /** todo: 코드가 비효율적, 소스 최적화 필요 */
  private async waitForResponse(
    command: Command,
    type: 1 | 2 | 4 | 5,
    match?: (packet: any) => boolean
  ): Promise<Packet> {
    const { channel } = this.service;
    if (!channel) throw Error('Cannot find channel from Kickboard Service.');

    const subscribe = await this.createSubscribe();
    return new Promise(async (resolve) => {
      const eventName = `mt${type}`;
      subscribe.on(eventName, async (packet: Packet) => {
        if (match ? match(packet) : true) {
          resolve(packet);
          await this.stopSubscribe(subscribe);
        }
      });

      await this.startSubscribe(subscribe);
      this.sendMessage(command);
    });
  }

  /** 랜덤 큐ID 를 생성합니다. */
  private generateQueueId(): string {
    return `${this.queuePrefix}-${this.kickboardId}-${Date.now()}`;
  }

  /** 킥보드 신호 패턴을 가져옵니다. */
  private getKickboardPattern() {
    return `data.*.scootor.${this.kickboardId}`;
  }

  /** 명령어를 전송합니다. */
  private sendMessage(command: Command) {
    const { channel } = this.service;
    if (!channel) return;

    const stringify = JSON.stringify(command);
    const buffer = Buffer.from(stringify);
    channel.publish(this.exchange, this.kickboardId, buffer);
  }
}
