/** Start Command */
export interface KickboardStartCommand {
    cmd: 'start';
}
export declare function KickboardStart(): KickboardStartCommand;
/** Stop Command */
export interface KickboardStopCommand {
    cmd: 'stop';
}
export declare function KickboardStop(): KickboardStopCommand;
/** Lock Command */
export interface KickboardLockCommand {
    cmd: 'lock';
}
export declare function KickboardLock(): KickboardLockCommand;
/** Unlock Command */
export interface KickboardUnlockCommand {
    cmd: 'unlock';
}
export declare function KickboardUnlock(): KickboardUnlockCommand;
/** Reboot Command */
export interface KickboardRebootCommand {
    cmd: 'restart';
}
export declare function KickboardReboot(): KickboardRebootCommand;