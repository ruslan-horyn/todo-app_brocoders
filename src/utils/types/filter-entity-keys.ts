export type FilterEntityKeys<T extends Record<string, unknown>> = {
  [P in keyof T as T[P] extends () => any ? never : P]: T[P];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};
