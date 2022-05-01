import formatSeconds from './formatSeconds';

const units = {
  B: 0,
  KB: 1,
  MB: 2,
  GB: 3,
  TB: 4,
};

export const internetTypes = [
  { type: 'Modem', speed: '28.8 kb/s' },
  { type: 'Modem', speed: '56.6 kb/s' },
  { type: 'ADSL', speed: '256 kb/s' },
  { type: 'ADSL', speed: '512 kb/s' },
  { type: 'ADSL', speed: '1 Mb/s' },
  { type: 'ADSL', speed: '2 Mb/s' },
  { type: 'ADSL', speed: '8 Mb/s' },
  { type: 'ADSL', speed: '24 Mb/s' },
  { type: 'LAN', speed: '10 Mb/s' },
  { type: 'LAN', speed: '100 Mb/s' },
  { type: 'Turbo 3G', speed: '7.2 Mb/s' },
  { type: '4G', speed: '80 Mb/s' },
  { type: '5G', speed: '1 Gb/s' },
];

export type Unit = 'B' | 'KB' | 'MB' | 'GB' | 'TB';
export type UnitSpeed = 'b/s' | 'kb/s' | 'Mb/s' | 'Gb/s' | 'Tb/s';

export function convert(value: number, fromUnit: Unit, toUnit: Unit) {
  return {
    value:
      (value * 1024 ** units[String(fromUnit).toUpperCase() as Unit]) /
      1024 ** units[String(toUnit).toUpperCase() as Unit],
    unit: toUnit,
  };
}

export function convertSpeed(
  value: number,
  fromUnit: UnitSpeed,
  toUnit: UnitSpeed,
) {
  const result = convert(
    value,
    String(fromUnit).replace('/s', '') as Unit,
    String(toUnit).replace('/s', '') as Unit,
  );

  return {
    value: result.value,
    unit: result.unit.concat('/s'),
  };
}

export function calculate(
  fileSize: { value: number; unit: Unit },
  downloadSpeed: { value: number; unit: UnitSpeed },
) {
  const { value: fileSizeValue, unit: fileSizeUnit } = fileSize;
  const { value: downloadSpeedValue, unit: downloadSpeedUnit } = downloadSpeed;

  const { value: fileSizeBytes } = convert(fileSizeValue, fileSizeUnit, 'B');
  const { value: downloadSpeedBits } = convertSpeed(
    downloadSpeedValue,
    downloadSpeedUnit,
    'b/s',
  );
  const downloadSpeedBytes = downloadSpeedBits / 8;

  const time = Math.trunc(fileSizeBytes / downloadSpeedBytes);

  return formatSeconds(time);
}
