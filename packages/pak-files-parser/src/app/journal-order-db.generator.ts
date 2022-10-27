import { readAsset } from '../util/functions';
import { JournalOrder } from '../../../data-types/src/lib/interfaces/journal-order.interface';
import { RawJournalOrder } from '../interfaces/raw-journal-order.interface';
import { JournalOrders } from '../types/journal-orders.type';

export class JournalOrderDbGenerator {

    recipesDB: JournalOrders[];

    constructor(journalPath: string) {

        // ProjectCoral Content Project Coral Data Journal
        this.recipesDB = readAsset<JournalOrders[]>(`Journal/${journalPath}`);

    }

    generate(): Map<string, JournalOrder> {
        const map: Map<string, JournalOrder> = new Map<string, JournalOrder>();

        Object.keys(this.recipesDB[0]?.Rows).forEach(itemKey => {

            const dbItem: RawJournalOrder = this.recipesDB[0]?.Rows[itemKey];

            const craftingRecipe: JournalOrder = {
                key: dbItem.itemData.itemID,
                order: dbItem.listOrder
            };

            map.set(itemKey, craftingRecipe);


        });

        return map;
    }
}