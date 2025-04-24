/*
The original code is from https://effect-ts.github.io/effect/effect/Predicate.ts.html
*/

export const isNotNullable = <A>(input: A): input is NonNullable<A> =>
  input !== null && input !== undefined;
