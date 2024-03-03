export type ChangeObjectStateEffect = {
    type: 'ChangeObjectState',
    meta: {
        id: string;
        state: string
        customName?: string
    }
}
