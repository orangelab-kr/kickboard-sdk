import { OriginalPacketMT4Convert } from '../packets/mt4';

/** Config MT4 Command */
export interface ConfigMT4Command {
  cmd: 'getconfig';
}

export function ConfigMT4(): ConfigMT4Command {
  return { cmd: 'getconfig' };
}

/** Config MT1 Command */
export interface ConfigMT1Command {
  cmd: 'getmt1packet';
}

export function ConfigMT1(): ConfigMT1Command {
  return { cmd: 'getmt1packet' };
}

/** Config MT2 Command */
export interface ConfigMT2Command {
  cmd: 'getmt2packet';
}

export function ConfigMT2(): ConfigMT2Command {
  return { cmd: 'getmt2packet' };
}

/** Config MT5 Command */
export interface ConfigMT5Command {
  cmd: 'getmt5packet';
}

export function ConfigMT5(): ConfigMT5Command {
  return { cmd: 'getmt5packet' };
}

/** Config Restore Command */
export interface ConfigRestoreCommand {
  cmd: 'restore';
}

export function ConfigRestore(): ConfigRestoreCommand {
  return { cmd: 'restore' };
}

/** Config Restore Command */
export interface ConfigSetCommand {
  cmd: 'param';
  value: string;
}

export function ConfigSet(
  key: keyof OriginalPacketMT4Convert,
  value: string
): ConfigSetCommand {
  return { cmd: 'param', value: `${key},${value}` };
}
