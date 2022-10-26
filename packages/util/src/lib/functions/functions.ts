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

    console.log(obj, allTrue(obj), Object.keys(obj)
        .filter((key) => obj[key]),);

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
