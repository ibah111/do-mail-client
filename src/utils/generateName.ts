export function generateName(...args: (string | undefined)[]) {
  const result: string[] = [];
  for (const value of args) if (value) result.push(value);
  return result.join(' ');
}
