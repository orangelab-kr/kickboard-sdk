import { OriginalPacketMT4Convert } from '../packets/config';

/** Config Get Command */
export interface ConfigGetCommand {
  cmd: 'getconfig';
}

export function ConfigGet(): ConfigGetCommand {
  return { cmd: 'getconfig' };
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
