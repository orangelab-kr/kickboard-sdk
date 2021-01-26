import { OriginalPacketMT4Convert } from '../packets/mt4';
/** Config MT4 Command */
export interface ConfigMT4Command {
    cmd: 'getconfig';
}
export declare function ConfigMT4(): ConfigMT4Command;
/** Config MT1 Command */
export interface ConfigMT1Command {
    cmd: 'getmt1packet';
}
export declare function ConfigMT1(): ConfigMT1Command;
/** Config MT2 Command */
export interface ConfigMT2Command {
    cmd: 'getmt2packet';
}
export declare function ConfigMT2(): ConfigMT2Command;
/** Config MT5 Command */
export interface ConfigMT5Command {
    cmd: 'getmt5packet';
}
export declare function ConfigMT5(): ConfigMT5Command;
/** Config Restore Command */
export interface ConfigRestoreCommand {
    cmd: 'restore';
}
export declare function ConfigRestore(): ConfigRestoreCommand;
/** Config Restore Command */
export interface ConfigSetCommand {
    cmd: 'param';
    value: string;
}
export declare function ConfigSet(key: keyof OriginalPacketMT4Convert, value: string): ConfigSetCommand;
