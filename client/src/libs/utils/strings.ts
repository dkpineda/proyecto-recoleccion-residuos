/*
The original code is from https://effect.website/docs/other/micro/effect-users
*/

export const toUpperCase = <S extends string>(self: S): Uppercase<S> =>
  self.toUpperCase() as Uppercase<S>;

export const capitalize = <T extends string>(self: T): Capitalize<T> => {
  if (self.length === 0) return self as Capitalize<T>;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return (toUpperCase(self[0]!) + self.slice(1)) as Capitalize<T>;
};
