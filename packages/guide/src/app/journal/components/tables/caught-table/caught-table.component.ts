import { Component, ViewEncapsulation } from '@angular/core';
import { Critter, Fish } from '@ci/data-types';

import { addSpacesToPascalCase, getTruthyValues } from '@ci/util';
import { critterSizeMap, rarityMap } from '../../../../../../../util/src/lib/maps/sort-helper.map';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";

@Component({
    selector: 'app-caught-table',
    templateUrl: './caught-table.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CaughtTableComponent extends BaseTableComponent<(Critter | Fish)> {

    getTruthyValues = getTruthyValues;
    addSpacesToPascalCase = addSpacesToPascalCase;
    protected readonly BASE_DISPLAY_COLUMNS = [
        'icon',
        'key',
        'rarity',
        'weather',
        'season',
        'time',
        'location',
    ];


    private static _isFishArray(array: (Critter | Fish)[] | undefined): array is Fish[] {
        return !!array?.[0] && 'fishName' in array[0];
    }


    dateRangesToString(dateRanges: Fish['dateRangeList']): string[] {
        return dateRanges.map(range => {
            return `From ${(range.startsFrom.season)} ${range.startsFrom.day} to ${(range.lastsTill.season)} ${range.lastsTill.day}`;
        });
    }

    override sortingDataAccessor = (critter: CaughtTableComponent['dataSource'][0], property: string) => {

        switch (property) {
            case 'rarity': {
                return rarityMap.get(critter[property]) ?? 0;
            }
            case 'key': {
                return critter[property];
            }
            case 'time': {

                const allTrue = getTruthyValues(critter.spawnTime);

                if (allTrue === 'Any') return 1;

                return critter.spawnTime.morning
                    ? 10
                    : critter.spawnTime.afternoon
                        ? 20
                        : critter.spawnTime.evening
                            ? 30
                            : critter.spawnTime.night
                                ? 40
                                : 0;

            }
            case 'weather': {

                const allTrue = getTruthyValues(critter.spawnWeather);

                if (allTrue === 'Any') return 1;

                return critter.spawnWeather.sunny
                    ? 10
                    : critter.spawnWeather.rain
                        ? 20
                        : critter.spawnWeather.snow
                            ? 30
                            : critter.spawnWeather.blizzard
                                ? 40
                                : critter.spawnWeather.windy
                                    ? 50
                                    : critter.spawnWeather.storm
                                        ? 60
                                        : 0;

            }

        }

        if (this._isFish(critter)) {
            switch (property) {
                case 'fishSize': {
                    return critterSizeMap.get(critter['fishSize']) ?? 0;
                }

                default: {


                }
            }
        }
        return 0;

    };

    override setupDataSource(dataSource: (Critter | Fish)[]) {
        super.setupDataSource(dataSource);
        if (CaughtTableComponent._isFishArray(this.dataSource)) {
            this.displayedColumns.splice(3, 0, 'fishSize');
            this.displayHeaderColumns.splice(2, 0, 'fishSize');
        }


    }

    private _isFish(array: (Critter | Fish) | undefined): array is Fish {
        return !!array && 'fishName' in array;
    }
}
