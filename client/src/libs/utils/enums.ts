export function toEnumValue<T extends Record<string, unknown>>(enumType: T, value: string): T[keyof T] | undefined {
  const enumValues = Object.values(enumType);
  if (enumValues.includes(value)) {
    return value as T[keyof T];
  }
  return undefined;
}
