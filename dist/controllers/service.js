"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packets_1 = __importDefault(require("../packets"));
const events_1 = require("events");
const _1 = require(".");
const amqplib_1 = __importDefault(require("amqplib"));
class KickboardService extends events_1.EventEmitter {
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
    async setSubscribe(queue) {
        if (!this.amqp || !this.channel)
            return;
        await this.channel.assertQueue(queue);
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
            this.emit(eventName, kickboard, packet, done);
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
        return new _1.KickboardClient(this, kickboardId);
    }
    /** 메세지를 통한 패킷을 가져옵니다. */
    getPacket(res) {
        const content = res.content.toString();
        const packet = packets_1.default(JSON.parse(content));
        return packet;
    }
}
exports.default = KickboardService;
