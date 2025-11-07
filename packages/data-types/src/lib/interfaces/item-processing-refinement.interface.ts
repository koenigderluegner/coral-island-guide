import { Quality } from '../enums/quality.enum';
import { Time } from "./time.interface";

export interface ItemProcessingRefinement {
    from: Quality,
    to: Quality,
    day: number,
    time: Time
}
