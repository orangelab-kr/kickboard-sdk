import { AlarmOffCommand, AlarmOnCommand } from './alarm';
import { BatteryLockCommand, BatteryStatusCommand, BatteryUnlockCommand } from './battery';
import { BluetoothOffCommand, BluetoothOnCommand } from './bluetooth';
import { BuzzerOffCommand, BuzzerOnCommand } from './buzzer';
import { ConfigGetCommand, ConfigRestoreCommand, ConfigSetCommand } from './config';
import { KickboardInfoCommand, KickboardLockCommand, KickboardRebootCommand, KickboardStartCommand, KickboardStatusCommand, KickboardStopCommand, KickboardUnlockCommand } from './kickboard';
import { LightOffCommand, LightOnCommand } from './light';
export declare type AlarmCommand = AlarmOnCommand | AlarmOffCommand;
export declare type BatteryCommand = BatteryStatusCommand | BatteryLockCommand | BatteryUnlockCommand;
export declare type BluetoothCommand = BluetoothOnCommand | BluetoothOffCommand;
export declare type BuzzerCommand = BuzzerOnCommand | BuzzerOffCommand;
export declare type ConfigCommand = ConfigGetCommand | ConfigRestoreCommand | ConfigSetCommand;
export declare type KickboardCommand = KickboardStartCommand | KickboardStopCommand | KickboardLockCommand | KickboardUnlockCommand | KickboardRebootCommand | KickboardInfoCommand | KickboardStatusCommand;
export declare type LightCommand = LightOnCommand | LightOffCommand;
declare type Command = AlarmCommand | BatteryCommand | BluetoothCommand | BuzzerCommand | ConfigCommand | KickboardCommand | LightCommand;
export default Command;
