/** Alarm Off Command */
export type AlarmMode = 0 | 1 | 2 | 3;
export interface AlarmOnCommand {
  cmd: 'alarmon';
  value: string;
}

export function AlarmOn(mode: AlarmMode, seconds = 0): AlarmOnCommand {
  return { cmd: 'alarmon', value: `${mode},${seconds}` };
}

/** Alarm On Command */
export interface AlarmOffCommand {
  cmd: 'alarmoff';
}

export function AlarmOff(): AlarmOffCommand {
  return { cmd: 'alarmoff' };
}
