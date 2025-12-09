import { RequirementMetaForType, RequirementsWithMeta, RequirementWithMeta } from "@ci/data-types";
import { convertRequirementWithoutMeta, RawRequirementWithoutMeta } from "./raw-requirement-without-meta";

export type RawRequirementWithMeta<T extends string, R extends object> = RawRequirementWithoutMeta<T> & {
    Properties: R
}

export function convertRequirementWithMeta<T extends RequirementsWithMeta['type'], D extends object>(rawRequirement: RawRequirementWithMeta<T, D>, transform: (properties: NoInfer<D>) => RequirementMetaForType<NoInfer<T>>): Extract<RequirementsWithMeta, { type: T }>;
export function convertRequirementWithMeta<T extends RequirementsWithMeta['type'], D extends object>(rawRequirement: RawRequirementWithMeta<T, D>): Extract<RequirementsWithMeta, { type: T }>;
export function convertRequirementWithMeta<T extends RequirementsWithMeta['type'], D extends object>(rawRequirement: RawRequirementWithMeta<T, D>, transform?: (properties: NoInfer<D>) => RequirementMetaForType<NoInfer<T>>): RequirementWithMeta<T, D | RequirementMetaForType<NoInfer<T>>> {
    return {
        ...convertRequirementWithoutMeta(rawRequirement),
        meta: transform ? transform(rawRequirement.Properties) : rawRequirement.Properties
    };
}
