export default function formatSeconds(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) % 60;
  seconds %= 60;

  return [hours, minutes, seconds]
    .map(value => value.toString().padStart(2, '0'))
    .join(':');
}
