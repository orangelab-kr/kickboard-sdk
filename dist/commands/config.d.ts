import { OriginalPacketMT4Convert } from '../packets';
/** Config Get Command */
export interface ConfigGetCommand {
    cmd: 'getconfig';
}
export declare function ConfigGet(): ConfigGetCommand;
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
