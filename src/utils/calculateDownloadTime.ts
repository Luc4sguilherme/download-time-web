import formatSeconds from './formatSeconds';
import { convert, convertSpeed, Unit, UnitSpeed } from './unitConverter';

export default function calculateDownloadTime(
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
