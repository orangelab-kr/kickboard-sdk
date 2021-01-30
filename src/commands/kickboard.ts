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

/** Config MT1 Command */
export interface KickboardInfoCommand {
  cmd: 'getmt1packet';
}

export function KickboardInfo(): KickboardInfoCommand {
  return { cmd: 'getmt1packet' };
}

/** Config MT2 Command */
export interface KickboardStatusCommand {
  cmd: 'getmt2packet';
}

export function KickboardStatus(): KickboardStatusCommand {
  return { cmd: 'getmt2packet' };
}
