export interface Item {
    id: string;
    displayName: string;
    price: number;
    sellPrice: number;
    sellAt: string[];
    stackable: boolean
    inventoryCategory: string;
    displayKey: string;
    description: string;
    qualities: {
        bronze?: QualityPrices;
        silver?: QualityPrices;
        gold?: QualityPrices;
        osmium?: QualityPrices;
        [key: string]: QualityPrices | undefined;
    },
    tags?: string[];
    iconMeta?: {
        "ObjectName": string;
        "ObjectPath": string;
    };
}

interface QualityPrices {
    price: number;
    sellPrice: number;
}