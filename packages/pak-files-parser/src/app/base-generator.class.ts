import { Datatable } from '../interfaces/datatable.interface';

export abstract class BaseGenerator<DT, R> {

    abstract datatable: Datatable<DT>[];

    abstract handleEntry(itemKey: string, dbItem: DT): R | undefined;

    generate(): Map<string, R> {
        const map: Map<string, R> = new Map<string, R>();

        Object.keys(this.datatable?.[0]?.Rows).forEach(itemKey => {
            const dbItem = this.getDBItem(itemKey);
            const entry: R | undefined = this.handleEntry(itemKey, dbItem);

            if (entry !== undefined)
                map.set(itemKey, entry);
        });

        return map;
    }


    getDBItem(itemKey: string): DT {
        return this.datatable?.[0]?.Rows[itemKey];
    }

}