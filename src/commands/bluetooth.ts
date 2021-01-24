/** Bluetooth Off Command */
export interface BluetoothOnCommand {
  cmd: 'bleon';
}

export function BluetoothOn(): BluetoothOnCommand {
  return { cmd: 'bleon' };
}

/** Bluetooth On Command */
export interface BluetoothOffCommand {
  cmd: 'bleoff';
}

export function BluetoothOff(): BluetoothOffCommand {
  return { cmd: 'bleoff' };
}
