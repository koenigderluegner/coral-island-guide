import { SpecificDate } from '../../interfaces/specific-date.interface';

export type DateSeasonRangeRequirement = {
    type: 'DateSeasonRange',
    meta: {
        from: SpecificDate,
        to: SpecificDate
        inverted?: boolean
    }
}
