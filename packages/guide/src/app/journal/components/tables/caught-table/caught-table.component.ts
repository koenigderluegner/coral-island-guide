import { Component, ViewEncapsulation } from '@angular/core';
import { Critter, Fish, FishSpawnSettings } from '@ci/data-types';

import { addSpacesToPascalCase, critterSizeMap, getTruthyValues, rarityMap } from '@ci/util';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { ResponsiveTableComponent } from "../../../../shared/components/responsive-table/responsive-table.component";
import { MatTableModule } from "@angular/material/table";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { ItemIconComponent } from "../../../../shared/components/item-icon/item-icon.component";
import { IsFishPipe } from "../../../../shared/pipes/is-fish.pipe";
import { AddSpacesToPascalCasePipe } from "../../../../shared/pipes/add-spaces-to-pascal-case.pipe";

@Component({
    selector: 'app-caught-table',
    templateUrl: './caught-table.component.html',
    encapsulation: ViewEncapsulation.None,

    imports: [
        ResponsiveTableComponent,
        MatSort,
        ItemIconComponent,
        IsFishPipe,
        AddSpacesToPascalCasePipe,
        MatSortHeader,
        MatTableModule
    ]
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


    dateRangesToString(dateRanges: FishSpawnSettings['dateRangeList']): string[] {
        return dateRanges.map(range => {
            return `From ${(range.startsFrom.season)} ${range.startsFrom.day} to ${(range.lastsTill.season)} ${range.lastsTill.day}`;
        });
    }

    override sortingDataAccessor = (critter: ReturnType<CaughtTableComponent['dataSource']>[0], property: string) => {

        switch (property) {
            case 'rarity': {
                return rarityMap.get(critter[property]) ?? 0;
            }
            case 'key': {
                return critter[property];
            }
            case 'time': {

                const spawnTime = this._isFish(critter) ? critter.spawnSettings[0].spawnTime : critter.spawnTime;
                const allTrue = getTruthyValues(spawnTime);

                if (allTrue === 'Any') return 1;

                return spawnTime.morning
                    ? 10
                    : spawnTime.afternoon
                        ? 20
                        : spawnTime.evening
                            ? 30
                            : spawnTime.night
                                ? 40
                                : 0;

            }
            case 'weather': {

                const spawnWeather = this._isFish(critter) ? critter.spawnSettings[0].spawnWeather : critter.spawnWeather;
                const allTrue = getTruthyValues(spawnWeather);

                if (allTrue === 'Any') return 1;

                return spawnWeather.sunny
                    ? 10
                    : spawnWeather.rain
                        ? 20
                        : spawnWeather.snow
                            ? 30
                            : spawnWeather.blizzard
                                ? 40
                                : spawnWeather.windy
                                    ? 50
                                    : spawnWeather.storm
                                        ? 60
                                        : 0;

            }

        }

        if (this._isFish(critter)) {
            switch (property) {
                case 'fishSize': {
                    return critterSizeMap.get(critter['fishSize']) ?? 0;
                }
                case 'pattern':
                case 'difficulty': {
                    return critter[property];
                }
            }
        }
        return 0;

    };

    override setupDataSource(dataSource: (Critter | Fish)[]) {
        let data = dataSource;
        if (CaughtTableComponent._isFishArray(dataSource)) {
            data = dataSource.map(f => f.spawnSettings.map(s => ({...f, spawnSettings: [s]}))).flat()
        }

        super.setupDataSource(data);
        if (CaughtTableComponent._isFishArray(this._dataSource())) {
            this.displayedColumns.splice(3, 0, 'fishSize');
            this.displayHeaderColumns.splice(2, 0, 'fishSize');

            this.displayedColumns.splice(4, 0, 'pattern');
            this.displayHeaderColumns.splice(3, 0, 'pattern');

            this.displayedColumns.splice(5, 0, 'difficulty');
            this.displayHeaderColumns.splice(4, 0, 'difficulty');
        }


    }

    private _isFish(array: (Critter | Fish) | undefined): array is Fish {
        return !!array && 'fishName' in array;
    }
}
