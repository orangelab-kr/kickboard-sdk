/** Buzzer On */
export declare type BuzzerMode = 0 | 1 | 2 | 3;
export interface BuzzerOnCommand {
    cmd: 'buzon';
    value: string;
}
export declare function BuzzerOn(mode: BuzzerMode, seconds?: number): BuzzerOnCommand;
/** Buzzer Off */
export interface BuzzerOffCommand {
    cmd: 'buzoff';
}
export declare function BuzzerOff(): BuzzerOffCommand;
