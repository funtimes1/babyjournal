import { z } from 'zod';

export function validateFormSchema<T extends z.ZodEffects<any> | z.ZodObject<any>>(schema: T) {
  return (values: z.infer<T>) => {
    const data = schema.safeParse(values);
    if (data.success) {
      return {};
    } else {
      const errors = data.error.formErrors.fieldErrors;
      return errors;
    }
  };
}

export function validateFormFieldSchema<T extends z.ZodObject<any>, F extends keyof z.infer<T>>(
  schema: T,
  fieldName: F,
) {
  return (value: z.infer<T>[F]) => {
    const data = schema.shape[fieldName].safeParse(value);
    if (data.success) {
      return undefined;
    } else {
      const [error] = data.error.issues;
      return error.message as string | undefined;
    }
  };
}
