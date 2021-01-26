/** Alarm Off Command */
export declare type AlarmMode = 0 | 1 | 2 | 3;
export interface AlarmOnCommand {
    cmd: 'alarmon';
    value: string;
}
export declare function AlarmOn(mode: AlarmMode, seconds?: number): AlarmOnCommand;
/** Alarm On Command */
export interface AlarmOffCommand {
    cmd: 'alarmoff';
}
export declare function AlarmOff(): AlarmOffCommand;
