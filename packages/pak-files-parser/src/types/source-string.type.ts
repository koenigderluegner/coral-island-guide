export type SourceString = {
    Namespace: string,
    Key: string,
    SourceString: string;
    LocalizedString: string
} | {
    TableId: string,
    Key: string
} | {
    "CultureInvariantString": null
}
