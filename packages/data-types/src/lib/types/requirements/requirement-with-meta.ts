import { RequirementWithoutMeta } from "./requirement-without-meta";

export type RequirementWithMeta<T extends string, R extends object> = RequirementWithoutMeta<T> & { meta: R };
