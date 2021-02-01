/// <reference types="node" />
import { Packet } from '../packets';
import { EventEmitter } from 'events';
import { KickboardClient } from '.';
import amqplib from 'amqplib';
export default class KickboardService extends EventEmitter {
    amqp?: amqplib.Connection;
    channel?: amqplib.Channel;
    private hostname;
    private username;
    private password;
    private vhost;
    constructor(props: {
        hostname: string;
        username: string;
        password: string;
        vhost: string;
    });
    /** RabbitMQ 연결 후 이벤트를 등록합니다. */
    connect(): Promise<void>;
    /** RabbitMQ 분산화 처리를 위한 용도로 사용됩니다. */
    setSubscribe(queue: string): Promise<void>;
    /** RabbitMQ 이벤트 리스너입니다. */
    private onUpdateQueue;
    /** RabbitMQ ACK 신호를 발생합니다. */
    private getDoneFunction;
    /** 메세지를 통한 스쿠터 ID를 가져옵니다. */
    getKickboardId(res: amqplib.ConsumeMessage): string | undefined;
    /** 킥보드 ID 를 사용하여 객체를 생성합니다. */
    getKickboard(kickboardId: string): KickboardClient;
    /** 메세지를 통한 패킷을 가져옵니다. */
    getPacket(res: amqplib.ConsumeMessage): Packet | undefined;
}
