export type ObjectStateRequirement = {
    type: 'ObjectState',
    meta: {
        id: string;
        state: string
        customName?: string
    }
}
