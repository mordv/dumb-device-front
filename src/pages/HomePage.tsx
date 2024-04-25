import React, { useEffect, useState } from 'react';
import { Switch } from '../components/library/Switch';
import { ColorPicker, Spin } from 'antd';
import useWebSocket from 'react-use-websocket';
import { Client, State, wsUrl } from '../client';

const toHex = (r: number, g: number, b: number) =>
  `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

export const HomePage: React.FC = () => {
  const [active, setActive] = useState(false);
  const [switch1On, setSwitch1On] = useState(false);
  const [switch2On, setSwitch2On] = useState(false);
  const [lightSensor, setLightSensor] = useState('-');
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    Client.getState().then((s) => {
      setSwitch1On(s.switch1);
      setSwitch2On(s.switch2);
      setLightSensor(s.lightSensor.toString());
      setActive(true);
    });
  }, []);

  useWebSocket(wsUrl, {
    onMessage: (e) => {
      const {
        lightSensor,
        switch2,
        switch1,
        rgb: { r, g, b },
      } = JSON.parse(e.data) as State;
      setSwitch1On(switch1);
      setSwitch2On(switch2);
      setLightSensor(lightSensor.toString());
      setColor(toHex(r, g, b));
    },
  });

  return (
    <div className={`relative ${active ? '' : 'pointer-events-none '}`}>
      {!active && (
        <Spin
          className={'absolute top-[calc(50%-16px)] left-[calc(50%-16px)]'}
          size={'large'}
        />
      )}
      <div
        className={`flex flex-col space-y-4 ${active ? '' : 'pointer-events-none opacity-20'}`}
      >
        <div className={'flex flex-col items-center space-y-2 font-bold'}>
          <div className={'header'}>Освещение</div>
          <div
            className={'shadow-md size-20 overflow-x-hidden rounded-lg center'}
          >
            {lightSensor}
          </div>
        </div>
        <div className={'flex flex-col items-center font-bold'}>
          <div className={'header'}>Лента</div>
          <ColorPicker
            placement={'bottom'}
            size={'large'}
            value={color}
            disabledAlpha={true}
            onChange={(color) => {
              const { r, g, b } = color.toRgb();
              Client.setRgb(r, g, b).then(() => {
                setColor(toHex(r, g, b));
              });
            }}
            className={'shadow-md outline-none!'}
          />
        </div>
        <div className={'flex space-x-8'}>
          <Switch
            active={switch1On}
            onChange={() => {
              Client.toggleSwitch(1).then((r) => setSwitch1On(r));
            }}
            label={'Реле 1'}
          />
          <Switch
            active={switch2On}
            onChange={() => {
              Client.toggleSwitch(2).then((r) => setSwitch2On(r));
            }}
            label={'Реле 2'}
          />
        </div>
      </div>
    </div>
  );
};
