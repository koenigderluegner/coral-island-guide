import {
    CustomEntry,
    EnumString,
    Item,
    MinimalItem,
    MinimalNPC,
    MinimalTagBasedItem,
    NPC,
    Quality
} from "@ci/data-types";

export function getEnumValue<T extends string, D = T extends `${T}::${infer U}` ? U : T extends EnumString<infer R> ? R : T extends string ? T : never>(EnumString: T): D {

    let strings = EnumString.split('::')

    return (strings[1] ?? strings[0]) as D;
}


export function allTrue(obj: Record<string, boolean>): boolean {
    const keys: string[] = Object.keys(obj);
    const trueValues = keys.map(key => obj[key]).filter(b => b);

    return trueValues.length === keys.length;
}


export function getTruthyValues(obj: Record<string, boolean>, anyText = 'Any'): string {
    return allTrue(obj)
        ? anyText
        : Object.keys(obj)
            .filter((key) => obj[key])
            .map(capitalizeFirstLetter)
            .map(addSpacesToPascalCase)
            .join(', ');
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function addSpacesToPascalCase(pascalCase: string | undefined): string {
    return (pascalCase ?? '').replaceAll(/([A-Z])/g, ' $1').trim();
}


export function removeQualityFlag(itemKey: string): string {
    if (itemKey.endsWith('-a') || itemKey.endsWith('-b') || itemKey.endsWith('-c') || itemKey.endsWith('-d')) {
        return itemKey.slice(0, -2);
    }
    return itemKey;
}

export function getQuality(itemKey: string): Quality {
    if (itemKey.endsWith('-a') || itemKey.endsWith('-2')) return Quality.BRONZE;
    if (itemKey.endsWith('-b') || itemKey.endsWith('-3')) return Quality.SILVER;
    if (itemKey.endsWith('-c') || itemKey.endsWith('-4')) return Quality.GOLD;
    if (itemKey.endsWith('-d') || itemKey.endsWith('-5')) return Quality.OSMIUM;

    return Quality.BASE;
}

export function nonNullable<T>(value: T): value is NonNullable<T> {
    return value !== null && value !== undefined;
}

export function entityKey(entity: Item | MinimalItem | MinimalTagBasedItem | CustomEntry | NPC | MinimalNPC): string {
    return 'id' in entity
        ? entity.id
        : entity.key
}

export function omitFields<T extends Object, K extends Array<keyof T>>(
    record: T, ...props: K): Omit<T, K[number]> {
    const newRecord: Omit<T, K[number]> = Object.assign({}, record);
    for (let prop of props) {
        delete (newRecord as any)[prop];
    }
    return newRecord;
}

export function flatObjectMap<T>(objectMap: { [key: string]: T }[]): (T & { mapKey: string })[] {

    return objectMap.map(entry => {
        const mapKey = Object.keys(entry)[0];

        return {...entry[mapKey], mapKey};
    });


}
