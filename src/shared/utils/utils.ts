export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function randomYear(): Date {
  let end = new Date();
  let start = new Date();
  start.setFullYear(end.getFullYear() - 5);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}
