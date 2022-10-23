export function getRandomInt(min = 0, max = 30): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomIntWithoutCurrent(current: number, min = 0, max = 30): number {
  let randomInt = getRandomInt(min, max);

  while (randomInt === current) {
    randomInt = getRandomInt(min, max);
  }

  return randomInt;
}

export function shuffle<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [array[i], array[j]] = [array[j], array[i]];
  }
}
