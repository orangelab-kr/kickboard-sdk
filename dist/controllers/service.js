"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KickboardService = void 0;
const __1 = require("..");
const events_1 = require("events");
const amqplib_1 = __importDefault(require("amqplib"));
class KickboardService extends events_1.EventEmitter {
    exchange = 'mqtt';
    amqp;
    channel;
    hostname;
    username;
    password;
    vhost;
    constructor(props) {
        super();
        this.hostname = props.hostname;
        this.username = props.username;
        this.password = props.password;
        this.vhost = props.vhost;
    }
    /** RabbitMQ 연결 후 이벤트를 등록합니다. */
    async connect() {
        const { hostname, username, password, vhost } = this;
        this.amqp = await amqplib_1.default.connect({ hostname, username, password, vhost });
        this.channel = await this.amqp.createChannel();
    }
    /** RabbitMQ 분산화 처리를 위한 용도로 사용됩니다. */
    async setSubscribe(queue, maxQueue = 0) {
        if (!this.amqp || !this.channel)
            return;
        await this.channel.prefetch(maxQueue);
        await this.channel.assertQueue(queue, {});
        await this.channel.bindQueue(queue, this.exchange, 'data.*.scootor.*');
        this.channel.consume(queue, this.onUpdateQueue.bind(this));
    }
    /** RabbitMQ 이벤트 리스너입니다. */
    onUpdateQueue(res) {
        if (!res)
            return;
        const kickboardId = this.getKickboardId(res);
        const packet = this.getPacket(res);
        if (kickboardId && packet) {
            const eventName = packet.type;
            const done = this.getDoneFunction(res);
            const kickboard = this.getKickboard(kickboardId);
            const timestamp = res.properties.headers['timestamp_in_ms'];
            const createdAt = new Date(timestamp || Date.now());
            this.emit(eventName, kickboard, packet, createdAt, done);
        }
    }
    /** RabbitMQ ACK 신호를 발생합니다. */
    getDoneFunction(res) {
        return () => {
            if (this.channel)
                this.channel.ack(res);
        };
    }
    /** 메세지를 통한 스쿠터 ID를 가져옵니다. */
    getKickboardId(res) {
        return res.fields.routingKey.split('.')[3];
    }
    /** 킥보드 ID 를 사용하여 객체를 생성합니다. */
    getKickboard(kickboardId) {
        return new __1.KickboardClient(this, kickboardId);
    }
    /** 메세지를 통한 패킷을 가져옵니다. */
    getPacket(res) {
        try {
            const content = res.content.toString();
            const packet = (0, __1.convertPacket)(JSON.parse(content));
            return packet;
        }
        catch (err) {
            this.getDoneFunction(res)();
        }
    }
}
exports.KickboardService = KickboardService;
