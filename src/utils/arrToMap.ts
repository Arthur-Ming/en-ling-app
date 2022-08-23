interface P {
  id: string;
}

export default function arrToMap<T extends P>(arr: T[]): { [key: string]: T } {
  return arr.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
}
