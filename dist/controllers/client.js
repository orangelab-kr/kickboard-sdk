"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const commands_1 = require("../commands");
class KickboardClient {
    constructor(service, kickboardId) {
        this.service = service;
        this.kickboardId = kickboardId;
        this.queuePrefix = 'events';
        this.exchange = 'mqtt';
    }
    /** 킥보드를 시작합니다. */
    async start() {
        const match = (packet) => packet.vehicle.isEnabled === true;
        return (await this.waitForResponse(commands_1.KickboardStart(), 'status', match));
    }
    /** 킥보드를 종료합니다. */
    async stop() {
        const match = (packet) => packet.vehicle.isEnabled === false;
        return (await this.waitForResponse(commands_1.KickboardStop(), 'status', match));
    }
    /** 킥보드를 잠금합니다. */
    lock() {
        this.sendMessage(commands_1.KickboardLock());
    }
    /** 킥보드를 잠금 해제합니다. */
    unlock() {
        this.sendMessage(commands_1.KickboardUnlock());
    }
    /** 배터리 잠금합니다. */
    batteryLock() {
        this.sendMessage(commands_1.BatteryLock());
    }
    /** 배터리 잠금을 해제합니다. */
    batteryUnlock() {
        this.sendMessage(commands_1.BatteryUnlock());
    }
    /** 부저를 킵니다. */
    async buzzerOn(mode, seconds = 0) {
        const match = (packet) => packet.isBuzzerOn === true;
        await this.waitForResponse(commands_1.BuzzerOn(mode, seconds), 'status', match);
    }
    /** 부저를 끕니다. */
    async buzzerOff() {
        const match = (packet) => packet.isBuzzerOn === false;
        await this.waitForResponse(commands_1.BuzzerOff(), 'status', match);
    }
    /** 블루투스를 킵니다. */
    bluetoothOn() {
        this.sendMessage(commands_1.BluetoothOn());
    }
    /** 블루투스를 끕니다. */
    bluetoothOff() {
        this.sendMessage(commands_1.BluetoothOff());
    }
    /** 불을 킵니다. */
    async lightOn(mode, seconds = 0) {
        const match = (packet) => packet.isLightsOn === true;
        await this.waitForResponse(commands_1.LightOn(mode, seconds), 'status', match);
    }
    /** 불을 끕니다. */
    async lightOff() {
        const match = (packet) => packet.isLightsOn === false;
        await this.waitForResponse(commands_1.LightOff(), 'status', match);
    }
    /** 하드웨어, 소프트웨어 정보를 가져옵니다. */
    async getInfo() {
        return await this.waitForResponse(commands_1.KickboardInfo(), 'info');
    }
    /** GPS 정보, 속도와 같은 현재 상태를 불러옵니다. */
    async getStatus() {
        return (await this.waitForResponse(commands_1.KickboardStatus(), 'status'));
    }
    /** MQTT 와 GPRS 크레덴셜 및 기타 정보를 불러옵니다. */
    async getConfig() {
        return await this.waitForResponse(commands_1.ConfigGet(), 'config');
    }
    /** 배터리 정보와 상태를 가져옵니다. */
    async getBattery() {
        return (await this.waitForResponse(commands_1.BatteryStatus(), 'battery'));
    }
    /** 알람 모드를 켭니다. */
    alarmOn(mode, seconds = 0) {
        this.sendMessage(commands_1.AlarmOn(mode, seconds));
    }
    /** 알람 모드를 끕니다. */
    alarmOff() {
        this.sendMessage(commands_1.AlarmOff());
    }
    /** GPRS APAD를 수정합니다. */
    async setGprsApad(apad) {
        return (await this.waitForResponse(commands_1.ConfigSet('apad', apad), 'config'));
    }
    /** GPRS USERNAME를 수정합니다. */
    async setGrpsUsername(username) {
        return (await this.waitForResponse(commands_1.ConfigSet('auser', username), 'config'));
    }
    /** GPRS PASSWORD를 수정합니다. */
    async setGrpsPassword(password) {
        return (await this.waitForResponse(commands_1.ConfigSet('apass', password), 'config'));
    }
    /** MQTT Address 수정합니다. */
    async setMQTTAddress(address) {
        return (await this.waitForResponse(commands_1.ConfigSet('ip', address), 'config'));
    }
    /** MQTT Port 수정합니다. */
    async setMQTTPort(port) {
        return (await this.waitForResponse(commands_1.ConfigSet('port', `${port}`), 'config'));
    }
    /** Report Interval Ping을 수정합니다. */
    async setReportIntervalPing(seconds) {
        return (await this.waitForResponse(commands_1.ConfigSet('ping', `${seconds}`), 'config'));
    }
    /** Report Interval Trip을 수정합니다. */
    async setReportIntervalTrip(seconds) {
        return (await this.waitForResponse(commands_1.ConfigSet('tripint', `${seconds}`), 'config'));
    }
    /** Report Interval Static을 수정합니다. */
    async setReportIntervalStatic(seconds) {
        return (await this.waitForResponse(commands_1.ConfigSet('statint', `${seconds}`), 'config'));
    }
    /** MQTT Client ID를 수정합니다. */
    async setMQTTClientId(clientId) {
        return (await this.waitForResponse(commands_1.ConfigSet('mqid', clientId), 'config'));
    }
    /** MQTT Username을 수정합니다. */
    async setMQTTUsername(username) {
        return (await this.waitForResponse(commands_1.ConfigSet('mquser', username), 'config'));
    }
    /** MQTT Password을 수정합니다. */
    async setMQTTPassword(password) {
        return (await this.waitForResponse(commands_1.ConfigSet('mqpass', password), 'config'));
    }
    /** 속도를 수정합니다. */
    async setSpeedLimit(speed) {
        return (await this.waitForResponse(commands_1.ConfigSet('speedlim', `${speed}`), 'config'));
    }
    /** 충격 기준치를 수정합니다. */
    async setImpact(impact) {
        return (await this.waitForResponse(commands_1.ConfigSet('impact', `${impact}`), 'config'));
    }
    /** 블루투스 인증 키를 변경합니다. */
    async setBluetoothKey(key) {
        return (await this.waitForResponse(commands_1.ConfigSet('blekey', key), 'config'));
    }
    /** 네트워크 모드를 변경합니다. */
    async setNetworkMode(mode) {
        return (await this.waitForResponse(commands_1.ConfigSet('netconfig', `${mode}`), 'config'));
    }
    /** 킥보드를 재부팅합니다. */
    reboot() {
        this.sendMessage(commands_1.KickboardReboot());
    }
    /** 구독을 생성합니다. 바로 듣기가 활성화되지 않습니다. */
    async createSubscribe() {
        const id = this.generateQueueId();
        const handler = new events_1.EventEmitter();
        handler.id = id;
        return handler;
    }
    /** 생성한 구독에 듣기를 활성화합니다. */
    async startSubscribe(subscribe, timeout) {
        const { channel } = this.service;
        if (!channel)
            throw Error('Cannot find channel from Kickboard Service.');
        await channel.assertQueue(subscribe.id, {
            autoDelete: true,
        });
        const options = { noAck: true };
        const pattern = this.getKickboardPattern();
        await channel.bindQueue(subscribe.id, this.exchange, pattern);
        const onMessage = async (res) => {
            if (!res)
                return;
            const packet = this.service.getPacket(res);
            if (!packet)
                return;
            const eventName = packet.type;
            subscribe.emit(eventName, packet);
            subscribe.emit('all', packet);
        };
        if (timeout)
            setTimeout(() => this.stopSubscribe(subscribe), timeout);
        await channel.consume(subscribe.id, onMessage, options);
    }
    /** 구독을 취소합니다. 듣기가 비활성화됩니다. */
    async stopSubscribe(subscribe) {
        const { channel } = this.service;
        if (!channel)
            throw Error('Cannot find channel from Kickboard Service.');
        await channel.deleteQueue(subscribe.id);
    }
    async waitForResponse(command, type, match, seconds = 10) {
        const ms = seconds * 1000;
        const response = this.waitForResponseWithoutTimeout(command, type, match, ms);
        const timeout = new Promise((resolve) => setTimeout(resolve, ms));
        const race = await Promise.race([response, timeout]);
        if (!race) {
            throw Error(`Kickboard has no response (timeout: ${seconds}s)`);
        }
        return race;
    }
    /** todo: 코드가 비효율적, 소스 최적화 필요 */
    async waitForResponseWithoutTimeout(command, type, match, timeout) {
        const { channel } = this.service;
        if (!channel)
            throw Error('Cannot find channel from Kickboard Service.');
        const subscribe = await this.createSubscribe();
        return new Promise(async (resolve) => {
            const eventName = type;
            subscribe.on(eventName, async (packet) => {
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
    generateQueueId() {
        return `${this.queuePrefix}-${this.kickboardId}-${Date.now()}`;
    }
    /** 킥보드 신호 패턴을 가져옵니다. */
    getKickboardPattern() {
        return `data.*.scootor.${this.kickboardId}`;
    }
    /** 명령어를 전송합니다. */
    sendMessage(command) {
        const { channel } = this.service;
        if (!channel)
            return;
        const stringify = JSON.stringify(command);
        const buffer = Buffer.from(stringify);
        channel.publish(this.exchange, this.kickboardId, buffer);
    }
}
exports.default = KickboardClient;
