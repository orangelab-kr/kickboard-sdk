"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const alarm_1 = require("../commands/alarm");
const battery_1 = require("../commands/battery");
const bluetooth_1 = require("../commands/bluetooth");
const buzzer_1 = require("../commands/buzzer");
const config_1 = require("../commands/config");
const kickboard_1 = require("../commands/kickboard");
const light_1 = require("../commands/light");
class KickboardClient {
    constructor(service, kickboardId) {
        this.service = service;
        this.kickboardId = kickboardId;
        this.queuePrefix = 'events';
        this.exchange = 'mqtt';
    }
    /** 킥보드를 시작합니다. */
    async start() {
        const match = (packet) => packet.vehicle?.isEnabled === true;
        return await this.waitForResponse(kickboard_1.KickboardStart(), 2, match);
    }
    /** 킥보드를 종료합니다. */
    async stop() {
        const match = (packet) => packet.vehicle?.isEnabled === false;
        return await this.waitForResponse(kickboard_1.KickboardStop(), 2, match);
    }
    /** 킥보드를 잠금합니다. */
    lock() {
        this.sendMessage(kickboard_1.KickboardLock());
    }
    /** 킥보드를 잠금 해제합니다. */
    unlock() {
        this.sendMessage(kickboard_1.KickboardUnlock());
    }
    /** 배터리 잠금합니다. */
    batteryLock() {
        this.sendMessage(battery_1.BatteryLock());
    }
    /** 배터리 잠금을 해제합니다. */
    batteryUnlock() {
        this.sendMessage(battery_1.BatteryUnlock());
    }
    /** 부저를 킵니다. */
    async buzzerOn(mode, seconds = 0) {
        const match = (packet) => packet.status?.isBuzzerOn === true;
        await this.waitForResponse(buzzer_1.BuzzerOn(mode, seconds), 2, match);
    }
    /** 부저를 끕니다. */
    async buzzerOff() {
        const match = (packet) => packet.status?.isBuzzerOn === false;
        await this.waitForResponse(buzzer_1.BuzzerOff(), 2, match);
    }
    /** 블루투스를 킵니다. */
    bluetoothOn() {
        this.sendMessage(bluetooth_1.BluetoothOn());
    }
    /** 블루투스를 끕니다. */
    bluetoothOff() {
        this.sendMessage(bluetooth_1.BluetoothOff());
    }
    /** 불을 킵니다. */
    async lightOn(mode, seconds = 0) {
        const match = (packet) => packet.status?.isLightsOn === true;
        await this.waitForResponse(light_1.LightOn(mode, seconds), 2, match);
    }
    /** 불을 끕니다. */
    async lightOff() {
        const match = (packet) => packet.status?.isLightsOn === false;
        await this.waitForResponse(light_1.LightOff(), 2, match);
    }
    /** 하드웨어, 소프트웨어 정보를 가져옵니다. */
    async getConfigMT1() {
        return await this.waitForResponse(config_1.ConfigMT1(), 1);
    }
    /** GPS 정보, 속도와 같은 현재 상태를 불러옵니다. */
    async getConfigMT2() {
        return await this.waitForResponse(config_1.ConfigMT4(), 2);
    }
    /** MQTT 와 GPRS 크레덴셜 및 기타 정보를 불러옵니다. */
    async getConfigMT4() {
        return await this.waitForResponse(config_1.ConfigMT4(), 4);
    }
    /** 배터리 정보와 상태를 가져옵니다. */
    async getConfigMT5() {
        return await this.waitForResponse(config_1.ConfigMT5(), 5);
    }
    /** 알람 모드를 켭니다. */
    alarmOn(mode, seconds = 0) {
        this.sendMessage(alarm_1.AlarmOn(mode, seconds));
    }
    /** 알람 모드를 끕니다. */
    alarmOff() {
        this.sendMessage(alarm_1.AlarmOff());
    }
    /** GPRS APAD를 수정합니다. */
    async setGprsApad(apad) {
        return await this.waitForResponse(config_1.ConfigSet('apad', apad), 4);
    }
    /** GPRS USERNAME를 수정합니다. */
    async setGrpsUsername(username) {
        return (await this.waitForResponse(config_1.ConfigSet('auser', username), 4));
    }
    /** GPRS PASSWORD를 수정합니다. */
    async setGrpsPassword(password) {
        return (await this.waitForResponse(config_1.ConfigSet('apass', password), 4));
    }
    /** MQTT Address 수정합니다. */
    async setMQTTAddress(address) {
        return await this.waitForResponse(config_1.ConfigSet('ip', address), 4);
    }
    /** MQTT Port 수정합니다. */
    async setMQTTPort(port) {
        return (await this.waitForResponse(config_1.ConfigSet('port', `${port}`), 4));
    }
    /** Report Interval Ping을 수정합니다. */
    async setReportIntervalPing(seconds) {
        return (await this.waitForResponse(config_1.ConfigSet('ping', `${seconds}`), 4));
    }
    /** Report Interval Trip을 수정합니다. */
    async setReportIntervalTrip(seconds) {
        return (await this.waitForResponse(config_1.ConfigSet('tripint', `${seconds}`), 4));
    }
    /** Report Interval Static을 수정합니다. */
    async setReportIntervalStatic(seconds) {
        return (await this.waitForResponse(config_1.ConfigSet('statint', `${seconds}`), 4));
    }
    /** MQTT Client ID를 수정합니다. */
    async setMQTTClientId(clientId) {
        return (await this.waitForResponse(config_1.ConfigSet('mqid', clientId), 4));
    }
    /** MQTT Username을 수정합니다. */
    async setMQTTUsername(username) {
        return (await this.waitForResponse(config_1.ConfigSet('mquser', username), 4));
    }
    /** MQTT Password을 수정합니다. */
    async setMQTTPassword(password) {
        return (await this.waitForResponse(config_1.ConfigSet('mqpass', password), 4));
    }
    /** 속도를 수정합니다. */
    async setSpeedLimit(speed) {
        return (await this.waitForResponse(config_1.ConfigSet('speedlim', `${speed}`), 4));
    }
    /** 충격 기준치를 수정합니다. */
    async setImpact(impact) {
        return (await this.waitForResponse(config_1.ConfigSet('impact', `${impact}`), 4));
    }
    /** 블루투스 인증 키를 변경합니다. */
    async setBluetoothKey(key) {
        return await this.waitForResponse(config_1.ConfigSet('blekey', key), 4);
    }
    /** 네트워크 모드를 변경합니다. */
    async setNetworkMode(mode) {
        return (await this.waitForResponse(config_1.ConfigSet('netconfig', `${mode}`), 4));
    }
    /** 구독을 생성합니다. 바로 듣기가 활성화되지 않습니다. */
    async createSubscribe() {
        const id = this.generateQueueId();
        const handler = new events_1.EventEmitter();
        handler.id = id;
        return handler;
    }
    /** 생성한 구독에 듣기를 활성화합니다. */
    async startSubscribe(subscribe) {
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
            const eventName = `mt${packet.type}`;
            subscribe.emit(eventName, packet);
            subscribe.emit('all', packet);
        };
        await channel.consume(subscribe.id, onMessage, options);
    }
    /** 구독을 취소합니다. 듣기가 비활성화됩니다. */
    async stopSubscribe(subscribe) {
        const { channel } = this.service;
        if (!channel)
            throw Error('Cannot find channel from Kickboard Service.');
        await channel.deleteQueue(subscribe.id);
    }
    async waitForResponse(command, type, match, seconds = 3) {
        const response = this.waitForResponseWithoutTimeout(command, type, match);
        const timeout = new Promise((resolve) => setTimeout(resolve, seconds * 1000));
        const race = await Promise.race([response, timeout]);
        if (!race) {
            throw Error(`Kickboard has no response (timeout: ${seconds}s)`);
        }
        return race;
    }
    /** todo: 코드가 비효율적, 소스 최적화 필요 */
    async waitForResponseWithoutTimeout(command, type, match) {
        const { channel } = this.service;
        if (!channel)
            throw Error('Cannot find channel from Kickboard Service.');
        const subscribe = await this.createSubscribe();
        return new Promise(async (resolve) => {
            const eventName = `mt${type}`;
            subscribe.on(eventName, async (packet) => {
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
