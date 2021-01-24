/** Light Off Command */
export type LightMode = 0 | 1 | 2 | 3;
export interface LightOnCommand {
  cmd: 'lighton';
  value: string;
}

export function LightOn(mode: LightMode, seconds = 0): LightOnCommand {
  return { cmd: 'lighton', value: `${mode},${seconds}` };
}

/** Light On Command */
export interface LightOffCommand {
  cmd: 'lightoff';
}

export function LightOff(): LightOffCommand {
  return { cmd: 'lightoff' };
}
