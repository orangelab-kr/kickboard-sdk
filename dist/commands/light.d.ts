/** Light Off Command */
export declare type LightMode = 0 | 1 | 2 | 3;
export interface LightOnCommand {
    cmd: 'lighton';
    value: string;
}
export declare function LightOn(mode: LightMode, seconds?: number): LightOnCommand;
/** Light On Command */
export interface LightOffCommand {
    cmd: 'lightoff';
}
export declare function LightOff(): LightOffCommand;
