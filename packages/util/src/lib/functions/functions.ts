import { Quality } from "@ci/data-types";

export function getEnumValue(EnumString: string): string {
    let strings = EnumString.split('::');

    return strings[1] ?? EnumString[0];
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

export function addSpacesToPascalCase(pascalCase: string): string {
    return pascalCase.replaceAll(/([A-Z])/g, ' $1').trim();
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
