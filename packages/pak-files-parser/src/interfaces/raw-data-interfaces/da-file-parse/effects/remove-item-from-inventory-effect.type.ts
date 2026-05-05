import { RawEffectWithMeta } from './raw-effect-with-meta';

export type RawRemoteItemFromInventoryEffect = RawEffectWithMeta<
    'RemoveItemFromInventory',
    RemoveItem | RemoveCategory | RemoveTags
>;

type RemoveItem = {
    itemId: {
        data: {
            RowName: string;
        };
        itemID: string;
    };
    quantity: number;
};

type RemoveCategory = {
    removeByCategory: true;
    itemCategory: {
        data: {
            RowName: string;
        };
    };
    quantity: number;
};

type RemoveTags = {
    "removeByTag": true,
    "itemTags": [
        "item.flower"
    ],
    quantity: number;
};
