export interface RGBValue {
  r: number;
  g: number;
  b: number;
}
export interface State {
  switch1: boolean;
  switch2: boolean;
  lightSensor: number;
  rgb: RGBValue;
}
export const wsUrl = 'ws://192.168.4.1/ws';
const baseUrl = 'http://192.168.4.1';
export const Client = {
  getState: (): Promise<State> =>
    fetch(`${baseUrl}/state`).then(async (r) => await r.json()),
  setRgb: (r: number, g: number, b: number): Promise<void> =>
    fetch(`${baseUrl}/rgb`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ r, g, b }),
    }).then(),
  toggleSwitch: (switchNum: 1 | 2): Promise<boolean> =>
    fetch(`${baseUrl}/switch${switchNum}`, {
      method: 'POST',
    }).then(async (r) => await r.json()),
};
