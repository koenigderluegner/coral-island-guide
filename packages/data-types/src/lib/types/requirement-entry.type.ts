import { Requirement } from './requirements/requirement.type';

export type RequirementEntry = {
    key: string,
    type: string,
    requirements: Requirement[]
};
