import { Season } from './season.type';
import { Time } from '../interfaces/time.interface';

export type CalendarBirthday = {
    eventType: 'birthday',
    npcKey: string;
    day: number;
    season: Season
}

export type CalendarFestival = {
    eventType: 'festival';
    festivalId: string;
    day: number;
    season: Season,
    eventTimeRange: {
        fromTime: Time,
        toTime: Time,
    }
}

export type CalendarEvent = CalendarFestival | CalendarBirthday
