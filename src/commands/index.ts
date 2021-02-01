export * from './alarm';
export * from './battery';
export * from './bluetooth';
export * from './buzzer';
export * from './config';
export * from './kickboard';
export * from './light';

import { AlarmOffCommand, AlarmOnCommand } from './alarm';
import {
  BatteryLockCommand,
  BatteryStatusCommand,
  BatteryUnlockCommand,
} from './battery';
import { BluetoothOffCommand, BluetoothOnCommand } from './bluetooth';
import { BuzzerOffCommand, BuzzerOnCommand } from './buzzer';
import {
  ConfigGetCommand,
  ConfigRestoreCommand,
  ConfigSetCommand,
} from './config';
import {
  KickboardInfoCommand,
  KickboardLockCommand,
  KickboardRebootCommand,
  KickboardStartCommand,
  KickboardStatusCommand,
  KickboardStopCommand,
  KickboardUnlockCommand,
} from './kickboard';
import { LightOffCommand, LightOnCommand } from './light';

export type AlarmCommand = AlarmOnCommand | AlarmOffCommand;
export type BatteryCommand =
  | BatteryStatusCommand
  | BatteryLockCommand
  | BatteryUnlockCommand;
export type BluetoothCommand = BluetoothOnCommand | BluetoothOffCommand;
export type BuzzerCommand = BuzzerOnCommand | BuzzerOffCommand;
export type ConfigCommand =
  | ConfigGetCommand
  | ConfigRestoreCommand
  | ConfigSetCommand;
export type KickboardCommand =
  | KickboardStartCommand
  | KickboardStopCommand
  | KickboardLockCommand
  | KickboardUnlockCommand
  | KickboardRebootCommand
  | KickboardInfoCommand
  | KickboardStatusCommand;
export type LightCommand = LightOnCommand | LightOffCommand;

type Command =
  | AlarmCommand
  | BatteryCommand
  | BluetoothCommand
  | BuzzerCommand
  | ConfigCommand
  | KickboardCommand
  | LightCommand;

export default Command;
