import React from 'react';

interface SwitchProps {
  label?: string;
  active: boolean;
  onChange: (value: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({
  active,
  label = '',
  onChange,
}) => {
  return (
    <div className={'flex flex-col items-center'}>
      <div className={'header'}>{label}</div>
      <div
        onPointerDown={() => onChange(!active)}
        className={`w-24 cursor-pointer transition-all h-48 shadow-md hover:shadow-lg box-content select-none rounded-lg border-2 ${active ? 'border-green-400' : 'border-neutral-400'}`}
      >
        <div
          className={`size-24 text-sm font-bold transition-[margin]  text-white ${active ? 'mt-0 bg-green-400' : 'mt-24 bg-neutral-400'} box-border border-4 border-white shadow-xs  rounded-lg center`}
        >
          {active ? 'on' : 'off'}
        </div>
      </div>
    </div>
  );
};
