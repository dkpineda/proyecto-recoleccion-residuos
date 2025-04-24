import log from "loglevel";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const ArrayWithFallbackSchema = <T extends z.ZodTypeAny>(schema: T) => {
  return z
    .array(
      z.preprocess((val) => {
        const result = schema.safeParse(val);
        if (!result.success) {
          log.error(`Schema validation error:`, result.error);
          return null;
        }
        return val;
      }, schema.nullable()),
    )
    .transform((items) => items.filter((item): item is z.infer<T> => item !== null));
};
