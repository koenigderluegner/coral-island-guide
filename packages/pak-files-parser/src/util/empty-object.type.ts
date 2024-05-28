const emptySymbol = Symbol('EmptyObject type')
export type EmptyObject = { [emptySymbol]?: never }
