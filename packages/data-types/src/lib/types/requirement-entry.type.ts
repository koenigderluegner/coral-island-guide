import { Requirement } from "@ci/data-types";

export type RequirementEntry = {
    key: string,
    type: string,
    requirements: Requirement[]
};
