/** Battery Status */
export interface BatteryStatusCommand {
    cmd: 'getmt5packet';
}
export declare function BatteryStatus(): BatteryStatusCommand;
/** Battery Lock Command */
export interface BatteryLockCommand {
    cmd: 'batlock';
}
export declare function BatteryLock(): BatteryLockCommand;
/** Battery Unlock Command */
export interface BatteryUnlockCommand {
    cmd: 'batunlock';
}
export declare function BatteryUnlock(): BatteryUnlockCommand;
