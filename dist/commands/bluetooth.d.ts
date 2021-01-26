/** Bluetooth Off Command */
export interface BluetoothOnCommand {
    cmd: 'bleon';
}
export declare function BluetoothOn(): BluetoothOnCommand;
/** Bluetooth On Command */
export interface BluetoothOffCommand {
    cmd: 'bleoff';
}
export declare function BluetoothOff(): BluetoothOffCommand;
