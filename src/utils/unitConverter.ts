const units = {
  B: 0,
  KB: 1,
  MB: 2,
  GB: 3,
  TB: 4,
};

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
