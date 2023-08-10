import { Quality } from "@ci/data-types";
import { Time } from "./time.interface";

export interface ItemProcessingRefinement {
    from: Quality,
    to: Quality,
    day: number,
    time: Time
}
