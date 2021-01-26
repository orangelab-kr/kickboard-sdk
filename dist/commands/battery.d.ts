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
