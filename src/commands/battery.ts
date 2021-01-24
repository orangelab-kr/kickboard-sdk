/** Battery Lock Command */
export interface BatteryLockCommand {
  cmd: 'batlock';
}

export function BatteryLock(): BatteryLockCommand {
  return { cmd: 'batlock' };
}

/** Battery Unlock Command */
export interface BatteryUnlockCommand {
  cmd: 'batunlock';
}

export function BatteryUnlock(): BatteryUnlockCommand {
  return { cmd: 'batunlock' };
}
