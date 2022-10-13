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

export function stringAvatar(name: string) {
  return {
    children: `${name?.split(" ")[0][0]}`,
  };
}

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function minutosParaHoras(minutos: number): string {
  const horas = Math.floor(minutos / 60);
  const min = minutos % 60;
  const textoHoras = `00${horas}`.slice(-2);
  const textoMinutos = `00${min}`.slice(-2);

  return `${textoHoras}h e ${textoMinutos}min`;
}
