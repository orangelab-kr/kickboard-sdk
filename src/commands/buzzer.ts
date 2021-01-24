/** Buzzer On */
export type BuzzerMode = 0 | 1 | 2 | 3;
export interface BuzzerOnCommand {
  cmd: 'buzon';
  value: string;
}

export function BuzzerOn(mode: BuzzerMode, seconds = 0): BuzzerOnCommand {
  return { cmd: 'buzon', value: `${mode},${seconds}` };
}

/** Buzzer Off */
export interface BuzzerOffCommand {
  cmd: 'buzoff';
}

export function BuzzerOff(): BuzzerOffCommand {
  return { cmd: 'buzoff' };
}
