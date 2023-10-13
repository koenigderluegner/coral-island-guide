import { Season, Time } from "@ci/data-types";

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
