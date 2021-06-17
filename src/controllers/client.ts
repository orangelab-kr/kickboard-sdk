import { ConsumeMessage } from 'amqplib';
import { EventEmitter } from 'events';
import {
  AlarmMode,
  AlarmOff,
  AlarmOn,
  BatteryLock,
  BatteryStatus,
  BatteryUnlock,
  BluetoothOff,
  BluetoothOn,
  BuzzerMode,
  BuzzerOff,
  BuzzerOn,
  Command,
  ConfigGet,
  ConfigSet,
  KickboardInfo,
  KickboardLock,
  KickboardReboot,
  KickboardService,
  KickboardStart,
  KickboardStatus,
  KickboardStop,
  KickboardUnlock,
  LightMode,
  LightOff,
  LightOn,
  Packet,
  PacketBattery,
  PacketConfig,
  PacketInfo,
  PacketStatus,
} from '..';

export class KickboardClient {
  private queuePrefix = 'events';

  constructor(private service: KickboardService, public kickboardId: string) {}

  /** 킥보드를 시작합니다. */
  public async start(): Promise<PacketStatus> {
    const match = (packet: PacketStatus) => packet.isEnabled === true;
    return <PacketStatus>(
      await this.waitForResponse(KickboardStart(), 'status', match)
    );
  }

  /** 킥보드를 종료합니다. */
  public async stop(): Promise<PacketStatus> {
    const match = (packet: PacketStatus) => packet.isEnabled === false;
    return <PacketStatus>(
      await this.waitForResponse(KickboardStop(), 'status', match)
    );
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
    const match = (packet: PacketStatus) => packet.isBuzzerOn === true;
    await this.waitForResponse(BuzzerOn(mode, seconds), 'status', match);
  }

  /** 부저를 끕니다. */
  public async buzzerOff(): Promise<void> {
    const match = (packet: PacketStatus) => packet.isBuzzerOn === false;
    await this.waitForResponse(BuzzerOff(), 'status', match);
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
    this.sendMessage(LightOn(mode, seconds));
  }

  /** 불을 끕니다. */
  public async lightOff(): Promise<void> {
    this.sendMessage(LightOff());
  }

  /** 하드웨어, 소프트웨어 정보를 가져옵니다. */
  public async getInfo(): Promise<PacketInfo> {
    return <PacketInfo>await this.waitForResponse(KickboardInfo(), 'info');
  }

  /** GPS 정보, 속도와 같은 현재 상태를 불러옵니다. */
  public async getStatus(): Promise<PacketStatus> {
    return <PacketStatus>(
      await this.waitForResponse(KickboardStatus(), 'status')
    );
  }

  /** MQTT 와 GPRS 크레덴셜 및 기타 정보를 불러옵니다. */
  public async getConfig(): Promise<PacketConfig> {
    return <PacketConfig>await this.waitForResponse(ConfigGet(), 'config');
  }

  /** 배터리 정보와 상태를 가져옵니다. */
  public async getBattery(): Promise<PacketBattery> {
    return <PacketBattery>(
      await this.waitForResponse(BatteryStatus(), 'battery')
    );
  }

  /** 알람 모드를 켭니다. */
  public alarmOn(mode: AlarmMode, seconds = 0): void {
    this.sendMessage(AlarmOn(mode, seconds));
  }

  /** 알람 모드를 끕니다. */
  public alarmOff(): void {
    this.sendMessage(AlarmOff());
  }

  /** GPRS APAD를 수정합니다. */
  public async setGprsApad(apad: string): Promise<PacketConfig> {
    return <PacketConfig>(
      await this.waitForResponse(ConfigSet('apad', apad), 'config')
    );
  }

  /** GPRS USERNAME를 수정합니다. */
  public async setGrpsUsername(username: string): Promise<PacketConfig> {
    return <PacketConfig>(
      await this.waitForResponse(ConfigSet('auser', username), 'config')
    );
  }

  /** GPRS PASSWORD를 수정합니다. */
  public async setGrpsPassword(password: string): Promise<PacketConfig> {
    return <PacketConfig>(
      await this.waitForResponse(ConfigSet('apass', password), 'config')
    );
  }

  /** MQTT Address 수정합니다. */
  public async setMQTTAddress(address: string): Promise<PacketConfig> {
    return <PacketConfig>(
      await this.waitForResponse(ConfigSet('ip', address), 'config')
    );
  }

  /** MQTT Port 수정합니다. */
  public async setMQTTPort(port: number): Promise<PacketConfig> {
    return <PacketConfig>(
      await this.waitForResponse(ConfigSet('port', `${port}`), 'config')
    );
  }

  /** Report Interval Ping을 수정합니다. */
  public async setReportIntervalPing(seconds: number): Promise<PacketConfig> {
    return <PacketConfig>(
      await this.waitForResponse(ConfigSet('ping', `${seconds}`), 'config')
    );
  }

  /** Report Interval Trip을 수정합니다. */
  public async setReportIntervalTrip(seconds: number): Promise<PacketConfig> {
    return <PacketConfig>(
      await this.waitForResponse(ConfigSet('tripint', `${seconds}`), 'config')
    );
  }

  /** Report Interval Static을 수정합니다. */
  public async setReportIntervalStatic(seconds: number): Promise<PacketConfig> {
    return <PacketConfig>(
      await this.waitForResponse(ConfigSet('statint', `${seconds}`), 'config')
    );
  }

  /** MQTT Client ID를 수정합니다. */
  public async setMQTTClientId(clientId: string): Promise<PacketConfig> {
    return <PacketConfig>(
      await this.waitForResponse(ConfigSet('mqid', clientId), 'config')
    );
  }

  /** MQTT Username을 수정합니다. */
  public async setMQTTUsername(username: string): Promise<PacketConfig> {
    return <PacketConfig>(
      await this.waitForResponse(ConfigSet('mquser', username), 'config')
    );
  }

  /** MQTT Password을 수정합니다. */
  public async setMQTTPassword(password: string): Promise<PacketConfig> {
    return <PacketConfig>(
      await this.waitForResponse(ConfigSet('mqpass', password), 'config')
    );
  }

  /** 속도를 수정합니다. */
  public async setSpeedLimit(speed: number): Promise<PacketConfig> {
    return <PacketConfig>(
      await this.waitForResponse(ConfigSet('speedlim', `${speed}`), 'config')
    );
  }

  /** 충격 기준치를 수정합니다. */
  public async setImpact(impact: number): Promise<PacketConfig> {
    return <PacketConfig>(
      await this.waitForResponse(ConfigSet('impact', `${impact}`), 'config')
    );
  }

  /** 블루투스 인증 키를 변경합니다. */
  public async setBluetoothKey(key: string): Promise<PacketConfig> {
    return <PacketConfig>(
      await this.waitForResponse(ConfigSet('blekey', key), 'config')
    );
  }

  /** 네트워크 모드를 변경합니다. */
  public async setNetworkMode(mode: 0 | 1 | 2 | 3 | 4): Promise<PacketConfig> {
    return <PacketConfig>(
      await this.waitForResponse(ConfigSet('netconfig', `${mode}`), 'config')
    );
  }

  /** 킥보드를 재부팅합니다. */
  public reboot(): void {
    this.sendMessage(KickboardReboot());
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
    subscribe: EventEmitter & { id: string },
    timeout?: number
  ): Promise<void> {
    const { channel } = this.service;
    if (!channel) throw Error('Cannot find channel from Kickboard Service.');
    await channel.assertQueue(subscribe.id, {
      autoDelete: true,
    });

    const options = { noAck: true };
    const pattern = this.getKickboardPattern();
    await channel.bindQueue(subscribe.id, this.service.exchange, pattern);
    const onMessage = async (res: ConsumeMessage | null) => {
      if (!res) return;
      const packet = this.service.getPacket(res);
      if (!packet) return;

      const eventName = packet.type;
      subscribe.emit(eventName, packet);
      subscribe.emit('all', packet);
    };

    if (timeout) setTimeout(() => this.stopSubscribe(subscribe), timeout);
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

  private async waitForResponse(
    command: Command,
    type: 'info' | 'status' | 'config' | 'battery',
    match?: (packet: any) => boolean,
    seconds = 8
  ): Promise<Packet> {
    const ms = seconds * 1000;
    const response = this.waitForResponseWithoutTimeout(
      command,
      type,
      match,
      ms
    );

    const timeout = new Promise((resolve) => setTimeout(resolve, ms));
    const race = <Packet>await Promise.race([response, timeout]);
    if (!race) {
      throw Error(
        `${this.kickboardId} 킥보드에 응답이 없습니다. (최대: ${seconds}초)`
      );
    }

    return race;
  }

  /** todo: 코드가 비효율적, 소스 최적화 필요 */
  private async waitForResponseWithoutTimeout(
    command: Command,
    type: 'info' | 'status' | 'config' | 'battery',
    match?: (packet: any) => boolean,
    timeout?: number
  ): Promise<Packet> {
    const { channel } = this.service;
    if (!channel) throw Error('Cannot find channel from Kickboard Service.');

    const subscribe = await this.createSubscribe();
    return new Promise(async (resolve) => {
      const eventName = type;
      subscribe.on(eventName, async (packet: Packet) => {
        if (match ? match(packet) : true) {
          resolve(packet);
          await this.stopSubscribe(subscribe);
        }
      });

      await this.startSubscribe(subscribe, timeout);
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
    channel.publish(this.service.exchange, this.kickboardId, buffer);
  }
}
