export * from './alarm';
export * from './battery';
export * from './bluetooth';
export * from './buzzer';
export * from './config';
export * from './kickboard';
export * from './light';

import {
  AlarmOffCommand,
  AlarmOnCommand,
  BatteryLockCommand,
  BatteryStatusCommand,
  BatteryUnlockCommand,
  BluetoothOffCommand,
  BluetoothOnCommand,
  BuzzerOffCommand,
  BuzzerOnCommand,
  ConfigGetCommand,
  ConfigRestoreCommand,
  ConfigSetCommand,
  KickboardInfoCommand,
  KickboardLockCommand,
  KickboardRebootCommand,
  KickboardStartCommand,
  KickboardStatusCommand,
  KickboardStopCommand,
  KickboardUnlockCommand,
  LightOffCommand,
  LightOnCommand,
} from '.';

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

export type Command =
  | AlarmCommand
  | BatteryCommand
  | BluetoothCommand
  | BuzzerCommand
  | ConfigCommand
  | KickboardCommand
  | LightCommand;
