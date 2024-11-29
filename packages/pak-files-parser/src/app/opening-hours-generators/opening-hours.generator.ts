import { readAsset } from "../../util/functions";
import { RawOpeningHours } from "../../interfaces/raw-data-interfaces/raw-opening-hours.interface";
import { OpeningHours, Time } from "@ci/data-types";
import { getEnumValue } from "@ci/util";

export class OpeningHoursGenerator {
    private openingHoursRaw: RawOpeningHours;

    constructor(path: string) {

        this.openingHoursRaw = readAsset<RawOpeningHours[]>(path)[0];

    }

    generate(): OpeningHours {

        const coreOpeningHoursConfig = this.openingHoursRaw.Properties.coreOpeningHoursConfig;
        const coreOpeningDays = coreOpeningHoursConfig?.coreOpeningDays.map(getEnumValue)

        const isCoreEveryDay = coreOpeningDays?.length === 7;
        const isCoreOnlyWeekdays = coreOpeningDays?.length === 5
            && !coreOpeningDays.includes('Saturday')
            && !coreOpeningDays.includes('Sunday');

        const dayOfTheWeekSpecificOpeningHours: Record<string, {
            "from": Time,
            "to": Time
        }> = {};

        if (coreOpeningHoursConfig?.dayOfTheWeekSpecificOpeningHours) {
            coreOpeningHoursConfig.dayOfTheWeekSpecificOpeningHours.forEach(dayOfTheWeekConfig => {
                const dayOfWeek = getEnumValue(dayOfTheWeekConfig.Key);


                dayOfTheWeekSpecificOpeningHours[dayOfWeek] = {
                    from: {
                        hours: dayOfTheWeekConfig.Value.fromTime.hours,
                        minutes: dayOfTheWeekConfig.Value.fromTime.minutes ?? 0,
                    },
                    to: {
                        hours: dayOfTheWeekConfig.Value.toTime.hours,
                        minutes: dayOfTheWeekConfig.Value.toTime.minutes ?? 0,
                    }
                }


            })
        }

        const coreOpeningHours: Partial<Pick<OpeningHours, 'coreOpeningHours'>> = {};
        if (coreOpeningHoursConfig) {
            coreOpeningHours.coreOpeningHours = {
                from: {
                    hours: coreOpeningHoursConfig.coreOpeningHours.fromTime.hours,
                    minutes: coreOpeningHoursConfig.coreOpeningHours.fromTime.minutes ?? 0,
                },
                to: {
                    hours: coreOpeningHoursConfig.coreOpeningHours.toTime.hours,
                    minutes: coreOpeningHoursConfig.coreOpeningHours.toTime.minutes ?? 0,
                }
            }
        }

        const openingHours: OpeningHours = {
            isCoreEveryDay,
            isCoreOnlyWeekdays,
            coreOpeningDays: coreOpeningDays ?? [],
            ...coreOpeningHours
        };

        if (Object.keys(dayOfTheWeekSpecificOpeningHours).length) {
            openingHours.dayOfTheWeekSpecificOpeningHours = dayOfTheWeekSpecificOpeningHours;
        }
        return openingHours


    }


}
