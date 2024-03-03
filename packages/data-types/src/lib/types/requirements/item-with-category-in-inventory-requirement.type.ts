export type ItemWithCategoryInInventoryRequirement = {
    type: 'ItemWithCategoryInInventory',
    meta: {
        categoryName: string;
        amount: number
    }
}
