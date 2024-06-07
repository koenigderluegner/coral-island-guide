export type GeneratorList = Readonly<Record<string, { generate: () => Map<string, any> }>>;
