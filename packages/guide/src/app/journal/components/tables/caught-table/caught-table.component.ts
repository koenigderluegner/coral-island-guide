import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { Critter, Fish } from '@ci/data-types';

import { addSpacesToPascalCase, getTruthyValues } from '@ci/util';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { critterSizeMap, rarityMap } from '../../../../../../../util/src/lib/maps/sort-helper.map';

@Component({
    selector: 'app-caught-table',
    templateUrl: './caught-table.component.html',
    styleUrls: ['./caught-table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CaughtTableComponent<TFilter extends Array<string | number>> implements OnInit, OnChanges {

    matDataSource?: MatTableDataSource<CaughtTableComponent<TFilter>['dataSource'][0]>;

    @ViewChild(MatSort) sort?: MatSort;


    ngAfterViewInit() {
        if (this.matDataSource && this.sort) {
            this.matDataSource.sort = this.sort;
            this.matDataSource.sortingDataAccessor = this.sortingDataAccessor as MatTableDataSource<CaughtTableComponent<TFilter>['dataSource'][0]>['sortingDataAccessor'];
        }
    }

    protected readonly BASE_DISPLAY_COLUMNS = [
        'icon',
        'key',
        'rarity',
    ];
    displayedColumns: string[] = [];

    getTruthyValues = getTruthyValues;

    addSpacesToPascalCase = addSpacesToPascalCase;

    constructor() {
        this.sortingDataAccessor = this.sortingDataAccessor.bind(this);

    }

    ngOnChanges(changes: SimpleChanges): void {
        const currentValue: (Critter | Fish)[] | undefined = changes['dataSource'].currentValue;
        if (currentValue) {
            this.setupDataSource(currentValue);
        }
    }


    dateRangesToString(dateRanges: Fish['dateRangeList']): string[] {
        return dateRanges.map(range => {
            return `From ${(range.startsFrom.season)} ${range.startsFrom.day} to ${(range.lastsTill.season)} ${range.lastsTill.day}`;
        });
    }

    @Input() dataSource: (Critter | Fish)[] = [];

    ngOnInit(): void {
        this.setupDataSource(this.dataSource);
    }

    private static _isFishArray(array: (Critter | Fish)[] | undefined): array is Fish[] {
        return !!array?.[0] && 'fishName' in array[0];
    }

    private _isFish(array: (Critter | Fish) | undefined): array is Fish {
        return !!array && 'fishName' in array;
    }

    sortingDataAccessor(item: CaughtTableComponent<TFilter>['dataSource'][0], property: 'weather' | 'rarity' | 'fishSize' | 'season' | 'time' | 'key'): string | number {

        switch (property) {
            case 'rarity': {
                return rarityMap.get(item[property]) ?? 0;
            }
            case 'key': {
                return item[property];
            }

        }

        if (this._isFish(item)) {
            switch (property) {
                case 'fishSize': {
                    return critterSizeMap.get(item['fishSize']) ?? 0;
                }
                case 'time': {

                    const allTrue = getTruthyValues(item.spawnTime);

                    if (allTrue === 'Any') return 1;

                    return item.spawnTime.morning
                        ? 10
                        : item.spawnTime.afternoon
                            ? 20
                            : item.spawnTime.evening
                                ? 30
                                : item.spawnTime.night
                                    ? 40
                                    : 0;

                }
                case 'weather': {

                    const allTrue = getTruthyValues(item.spawnWeather);

                    if (allTrue === 'Any') return 1;

                    return item.spawnWeather.sunny
                        ? 10
                        : item.spawnWeather.rain
                            ? 20
                            : item.spawnWeather.snow
                                ? 30
                                : item.spawnWeather.blizzard
                                    ? 40
                                    : item.spawnWeather.windy
                                        ? 50
                                        : item.spawnWeather.storm
                                            ? 60
                                            : 0;

                }

                default: {


                }
            }
        }
        return 0;

    };

    private setupDataSource(dataSource: (Critter | Fish)[]) {
        this.matDataSource = new MatTableDataSource(dataSource);
        this.displayedColumns = [...this.BASE_DISPLAY_COLUMNS];

        if (CaughtTableComponent._isFishArray(this.dataSource)) {
            this.displayedColumns.push(...[
                'fishSize',
                'weather',
                'season',
                'time',
                'location',
            ]);
        }

    }
}
