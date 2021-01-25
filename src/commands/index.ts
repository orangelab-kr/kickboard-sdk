import { AlarmOffCommand, AlarmOnCommand } from './alarm';
import { BatteryLockCommand, BatteryUnlockCommand } from './battery';
import { BluetoothOffCommand, BluetoothOnCommand } from './bluetooth';
import { BuzzerOffCommand, BuzzerOnCommand } from './buzzer';
import {
  ConfigMT1Command,
  ConfigMT2Command,
  ConfigMT4Command,
  ConfigMT5Command,
  ConfigRestoreCommand,
  ConfigSetCommand,
} from './config';
import {
  KickboardLockCommand,
  KickboardRebootCommand,
  KickboardStartCommand,
  KickboardStopCommand,
  KickboardUnlockCommand,
} from './kickboard';
import { LightOffCommand, LightOnCommand } from './light';

export type AlarmCommand = AlarmOnCommand | AlarmOffCommand;
export type BatteryCommand = BatteryLockCommand | BatteryUnlockCommand;
export type BluetoothCommand = BluetoothOnCommand | BluetoothOffCommand;
export type BuzzerCommand = BuzzerOnCommand | BuzzerOffCommand;
export type ConfigCommand =
  | ConfigMT1Command
  | ConfigMT2Command
  | ConfigMT4Command
  | ConfigMT5Command
  | ConfigRestoreCommand
  | ConfigSetCommand;
export type KickboardCommand =
  | KickboardStartCommand
  | KickboardStopCommand
  | KickboardLockCommand
  | KickboardUnlockCommand
  | KickboardRebootCommand;
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
