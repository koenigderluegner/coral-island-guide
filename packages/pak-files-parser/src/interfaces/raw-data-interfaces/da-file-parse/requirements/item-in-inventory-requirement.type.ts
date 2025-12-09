import { RawRequirementWithMeta } from './raw-requirement-with-meta';

export type RawItemInInventoryRequirement = RawRequirementWithMeta<
    'ItemInInventory',
    {
        inventoryItem: {
            data: {
                RowName: string;
            };
            itemID: string;
        };
        expectedAmount?: number;
        qualityRequirement?: {
            rules: string;
        };
    }
>;
