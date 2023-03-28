import { Quality } from "@ci/data-types";

export interface ItemProcessingRefinement {
    from: Quality,
    to: Quality,
    day: number,
    time: {
        hours: number;
        minutes: number
    }
}
