import { GeneratorList } from "./generator-list.type";

export type GeneratorResult<T extends Readonly<GeneratorList>, K extends keyof T> = ReturnType<T[K]['generate']> extends Map<any, infer R> ? R[] : never;

export type MappedGeneratorResults<G extends Readonly<GeneratorList>> = { [key in keyof G]: GeneratorResult<G, key> }

export function generate<T extends Readonly<GeneratorList>, K extends keyof T>(g: T, k: K): GeneratorResult<T, K> {
    return [...g[k].generate().values()] as GeneratorResult<T, K>
}
