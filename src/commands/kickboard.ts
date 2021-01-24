/** Start Command */
export interface KickboardStartCommand {
  cmd: 'start';
}

export function KickboardStart(): KickboardStartCommand {
  return { cmd: 'start' };
}

/** Stop Command */
export interface KickboardStopCommand {
  cmd: 'stop';
}

export function KickboardStop(): KickboardStopCommand {
  return { cmd: 'stop' };
}

/** Lock Command */
export interface KickboardLockCommand {
  cmd: 'lock';
}

export function KickboardLock(): KickboardLockCommand {
  return { cmd: 'lock' };
}

/** Unlock Command */
export interface KickboardUnlockCommand {
  cmd: 'unlock';
}

export function KickboardUnlock(): KickboardUnlockCommand {
  return { cmd: 'unlock' };
}

/** Reboot Command */
export interface KickboardRebootCommand {
  cmd: 'restart';
}

export function KickboardReboot(): KickboardRebootCommand {
  return { cmd: 'restart' };
}
