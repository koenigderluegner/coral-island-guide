import { Datatable } from '../interfaces/datatable.interface';
import { DaFilesParser, EffectMap, RequirementMap } from "./da-files-parser";
import { Effect, RequirementEntry } from "@ci/data-types";
import { isEffectMap, isRequirementMap } from "../util/functions";
import { nonNullable } from "@ci/util";

export type GeneratorOptions = { daFiles?: string[] }


export abstract class BaseGenerator<DT, R> {

    abstract datatable: Datatable<DT>[];
    options?: GeneratorOptions
    effectMaps: EffectMap[] = [];
    requirementMaps: RequirementMap[] = [];

    abstract handleEntry(itemKey: string, dbItem: DT): R | undefined;

    generate(options?: GeneratorOptions): Map<string, R> {
        this.options = options;

        if (options && options.daFiles) {
            this.getEffectsAndRequirements(options.daFiles)
        }


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

    getEffects(itemKey: string): Effect[] {
        return this.effectMaps.map(map => map.get(itemKey)).filter(nonNullable).map(e => e.effects).flat()
    }

    getRequirements(itemKey: string): RequirementEntry | undefined {
        return this.requirementMaps.map(map => map.get(itemKey)).filter(nonNullable)[0]
    }

    private getEffectsAndRequirements(daFiles: string[]) {
        const parser = new DaFilesParser();

        daFiles.forEach(filePath => {

            const map = parser.parse(filePath);

            if (isEffectMap(map))
                this.effectMaps.push(map)

            if (isRequirementMap(map))
                this.requirementMaps.push(map)

        })
    }
}
