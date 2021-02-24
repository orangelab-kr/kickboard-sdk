import amqplib from 'amqplib';
import { EventEmitter } from 'events';
import { KickboardClient } from '.';
import packets, { Packet } from '../packets';

export default class KickboardService extends EventEmitter {
  public readonly exchange = 'mqtt';
  public amqp?: amqplib.Connection;
  public channel?: amqplib.Channel;
  private hostname: string;
  private username: string;
  private password: string;
  private vhost: string;

  public constructor(props: {
    hostname: string;
    username: string;
    password: string;
    vhost: string;
  }) {
    super();

    this.hostname = props.hostname;
    this.username = props.username;
    this.password = props.password;
    this.vhost = props.vhost;
  }

  /** RabbitMQ 연결 후 이벤트를 등록합니다. */
  public async connect(): Promise<void> {
    const { hostname, username, password, vhost } = this;
    this.amqp = await amqplib.connect({ hostname, username, password, vhost });
    this.channel = await this.amqp.createChannel();
  }

  /** RabbitMQ 분산화 처리를 위한 용도로 사용됩니다. */
  public async setSubscribe(queue: string): Promise<void> {
    if (!this.amqp || !this.channel) return;
    await this.channel.assertQueue(queue);
    await this.channel.bindQueue(queue, this.exchange, 'data.*.scootor.*');
    this.channel.consume(queue, this.onUpdateQueue.bind(this));
  }

  /** RabbitMQ 이벤트 리스너입니다. */
  private onUpdateQueue(res: amqplib.ConsumeMessage | null): void {
    if (!res) return;

    const kickboardId = this.getKickboardId(res);
    const packet = this.getPacket(res);
    if (kickboardId && packet) {
      const eventName = packet.type;
      const done = this.getDoneFunction(res);
      const kickboard = this.getKickboard(kickboardId);
      this.emit(eventName, kickboard, packet, done);
    }
  }

  /** RabbitMQ ACK 신호를 발생합니다. */
  private getDoneFunction(res: amqplib.ConsumeMessage): () => void {
    return () => {
      if (this.channel) this.channel.ack(res);
    };
  }

  /** 메세지를 통한 스쿠터 ID를 가져옵니다. */
  public getKickboardId(res: amqplib.ConsumeMessage): string | undefined {
    return res.fields.routingKey.split('.')[3];
  }

  /** 킥보드 ID 를 사용하여 객체를 생성합니다. */
  public getKickboard(kickboardId: string): KickboardClient {
    return new KickboardClient(this, kickboardId);
  }

  /** 메세지를 통한 패킷을 가져옵니다. */
  public getPacket(res: amqplib.ConsumeMessage): Packet | undefined {
    const content = res.content.toString();
    const packet = packets(JSON.parse(content));
    return packet;
  }
}
