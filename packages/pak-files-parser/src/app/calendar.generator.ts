import { CalendarBirthday, CalendarEvent, CalendarFestival, Season, SpecificDate } from "@ci/data-types";
import { readAsset } from "../util/functions";
import { RawCalendarConfig } from "../interfaces/raw-data-interfaces/raw-calendar-config.interface";
import { getEnumValue } from "@ci/util";


export class CalendarGenerator {

    private calendarConfig: RawCalendarConfig;


    constructor() {
        this.calendarConfig = readAsset<RawCalendarConfig[]>('ProjectCoral/Content/ProjectCoral/Data/Calendar/TownCalendarConfig.json')[0]

    }

    generate(): Map<string, CalendarEvent[]> {
        const map: Map<string, CalendarEvent[]> = new Map<string, CalendarEvent[]>();

        const events: CalendarEvent[] = [];

        Object.keys(this.calendarConfig.Properties).forEach(key => {

            const keyValuePair = this.calendarConfig.Properties[key]

            keyValuePair.map.forEach(mapEntry => {

                const date: SpecificDate = mapEntry.Key

                mapEntry.Value.entries.forEach(valueEntry => {
                    switch (getEnumValue(valueEntry.eventType).toLowerCase()) {
                        case 'birthday':
                            const birthday = {
                                eventType: "birthday",
                                day: date.day,
                                season: getEnumValue(date.season) as Season,
                                npcKey: valueEntry.relatedNPCs[0].toLowerCase()
                            } satisfies CalendarBirthday;

                            events.push(birthday)
                            break;
                        case 'festival':
                            const festival = {
                                eventType: "festival",
                                day: date.day,
                                season: getEnumValue(date.season) as Season,
                                eventTimeRange: valueEntry.eventTimeRange,
                                festivalId: valueEntry.eventId
                            } satisfies CalendarFestival

                            events.push(festival)
                            break;
                    }
                })


            })


        })

        map.set('unused', events);

        return map;
    }
}
