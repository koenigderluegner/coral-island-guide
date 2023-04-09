import { Component, ComponentRef, EnvironmentInjector, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Placeable, PlannerLayer } from '../../classes/planner-layer.class';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { GridPlaceable } from '../../interfaces/grid-placeable.interface';
import { PlaceableItemsMap } from "../../registered-planner-items";
import { DatabaseService } from "../../../shared/services/database.service";
import { PlannerService } from "../../services/planner.service";


@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {

    cellSize = 28;
    selectedItem: (GridPlaceable<any> & { key: string }) | null = null;
    selectedItemSize: number[] = [];
    protected version = 1;
    protected layers: PlannerLayer[] = [];
    protected yDummyArray: number[] = [0];
    protected xDummyArray: number[] = [0];

    constructor(
        private injector: EnvironmentInjector,
        private _db: DatabaseService,
        private readonly plannerService: PlannerService
    ) {
        this.cellSize = this.plannerService.cellSize;
        this.addLayer();
        this.addLayer();
        this.addLayer();


        plannerService.getSelectedItemKey().subscribe({next: itemKey => this.setSelectedItem(itemKey)})

    }

    _width = 1;

    get width(): number {
        return this._width;
    }

    @Input() set width(width: any) {
        this._width = coerceNumberProperty(width, 1);
    }

    _height = 1;

    get height(): number {
        return this._height;
    }

    @Input() set height(height: any) {
        this._height = coerceNumberProperty(height, 1);
    }

    addLayer(): void {
        this.layers.push(new PlannerLayer(this._width, this._height));
    }

    getLayerAt(index: number): PlannerLayer | null {
        return this.layers[index] ?? null;
    }

    canPlace(layer: number, x: number, y: number): boolean {
        if (layer < 0 || layer >= this.layers.length
            || x < 0 || x >= this._width
            || y < 0 || y >= this._height) return false;

        return !this.layers[layer].at(x, y);


    }

    ngOnInit(): void {
        this.xDummyArray = Array(this._width).fill(0);
        this.yDummyArray = Array(this._height).fill(0);


    }

    hover($event: Event, x: number, y: number) {

        const {top, left, height, width} = this.getPosition($event.target as HTMLTableCellElement | null);

        const wrapper = document.getElementById('plannerSelected');
        const horizontalLines = document.getElementById('horizontal-grid-lines');
        const verticalLines = document.getElementById('vertical-grid-lines');


        if (!wrapper) return;
        wrapper.style.top = top + 'px';
        wrapper.style.left = left + 'px';
        wrapper.style.height = (this.selectedItem?.height ?? 1) * height - 1 + 'px';
        wrapper.style.width = (this.selectedItem?.width ?? 1) * width - 1 + 'px';

        if (horizontalLines) {
            horizontalLines.style.top = top + 'px';
            horizontalLines.style.height = height + 1 + 'px';
        }

        if (verticalLines) {
            verticalLines.style.left = left + 'px';
            verticalLines.style.width = width + 1 + 'px';
        }

        if (this.selectedItem) {
            for (let xi = x; xi < x + this.selectedItem?.width; xi++) {
                for (let yi = y; yi < y + this.selectedItem?.height; yi++) {
                    const selectedItemGridItem = document.querySelector(`[data-x="${xi - x}"][data-y="${yi - y}"]`) as HTMLDivElement;
                    if (!this.canPlace(this.selectedItem.layer, xi, yi)) {
                        selectedItemGridItem.style.background = 'rgb(255 0 0 / .4)';
                    } else {
                        selectedItemGridItem.style.background = 'transparent';
                    }
                }

            }
        }


    }

    create($event: Event, x: number, y: number): void {

        const {top, left} = this.getPosition($event.target as HTMLTableCellElement | null);


        let sprinkler1 = this.selectedItem;
        if (!sprinkler1) return;
        const component = this.plannerService.createComponent(sprinkler1);
        this.placeComponent(top, left, component)
        if (this.selectedItem) {
            const layer = this.layers[this.selectedItem.layer];
            layer.addPlaceable({x, y, item: this.selectedItem});
        }
    }


    getPosition(cell: HTMLTableCellElement | null): { top: number, left: number, bottom: number, right: number, width: number, height: number } {

        const plannerWrapper = document.getElementById('plannerWrapper');

        let boundingClientRect = cell?.getBoundingClientRect();
        let wrapperBoundingClientRect = plannerWrapper?.getBoundingClientRect();

        if (!boundingClientRect || !wrapperBoundingClientRect) return {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: 0,
            height: 0
        };

        let top = boundingClientRect.top - wrapperBoundingClientRect.top;
        let left = boundingClientRect.left - wrapperBoundingClientRect.left;

        return {
            top,
            left,
            bottom: top + boundingClientRect.height,
            right: left + boundingClientRect.width,
            width: boundingClientRect.width,
            height: boundingClientRect.height
        };
    }

    save(): void {
        console.log(JSON.stringify(this.layers));
    }

    load(data: string): void {

        const loadedData: ReturnType<PlannerLayer['toJSON']>[] = JSON.parse(data);

        loadedData.forEach((layerData, index) => {
            const layer = this.getLayerAt(index)
            if (!layer) this.addLayer();

            layerData.forEach(dataEntry => {
                const cellElement: HTMLTableCellElement | null = document.querySelector(`.layers [data-layer-table="${index}"] [data-table-row="${dataEntry.y}"]  [data-table-col="${dataEntry.x}"] `);

                const gridPlaceable = PlaceableItemsMap.get(dataEntry.key);
                if (gridPlaceable && cellElement) {
                    const {top, left} = this.getPosition(cellElement)
                    this.placeComponent(top, left, this.plannerService.createComponent(gridPlaceable))
                    const placeable: Placeable = {
                        x: dataEntry.x,
                        y: dataEntry.y,
                        item: {...gridPlaceable, key: dataEntry.key}
                    }
                    layer?.addPlaceable(placeable);
                }

            })
        })
        console.log(loadedData);
    }


    private placeComponent(top: number, left: number, component: ComponentRef<any>) {
        let nativeElement = component.location.nativeElement;

        nativeElement.style.top = top + 'px';
        nativeElement.style.left = left + 'px';

        nativeElement.classList.add('placed-grid-item');
        this.plannerService.attachComponent('.layers', component);
    }

    private setSelectedItem(key: string) {

        const value = PlaceableItemsMap.get(key);
        if (!value) return;
        this.selectedItem = {...value, key};

        const componentRef = this.plannerService.createComponent(value);
        let nativeElement = componentRef.location.nativeElement;
        nativeElement.addEventListener('click', () =>
            this.setSelectedItem(key));

        let elementById = document.getElementById('plannerSelected');
        let selectedItemContainer = document.getElementById('selectedItem');

        if (!elementById || !selectedItemContainer) return;

        selectedItemContainer.innerHTML = '';
        elementById.style.width = value.width * this.cellSize + 'px';
        elementById.style.height = value.width * this.cellSize + 'px';
        this.plannerService.attachComponent('#selectedItem', componentRef);
        this.selectedItemSize = Array(this.selectedItem.width * this.selectedItem.height).fill(0);


    }

}
