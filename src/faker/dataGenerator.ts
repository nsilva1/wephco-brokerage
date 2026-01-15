

export type EntitySchema<T> = {
  [K in keyof T]: () => T[K];
};

/**
 * A truly generic generator
 * @param schema - An object where keys match your interface and values are faker functions
 * @param count - How many items to generate (optional)
 */
export function generateData<T>(schema: EntitySchema<T>): T;
export function generateData<T>(schema: EntitySchema<T>, count: number): T[];
export function generateData<T>(schema: EntitySchema<T>, count?: number): T | T[] {
  const generateSingle = (): T => {
    const result = {} as T;
    for (const key in schema) {
      result[key] = schema[key]();
    }
    return result;
  };

  if (count !== undefined) {
    return Array.from({ length: count }, generateSingle);
  }

  return generateSingle();
}