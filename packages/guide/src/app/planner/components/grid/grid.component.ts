import {
    ApplicationRef,
    Component,
    ComponentRef,
    createComponent,
    EnvironmentInjector,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { PlannerLayer } from '../../classes/planner-layer.class';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { GridPlaceable } from '../../interfaces/grid-placeable.interface';
import { PlaceableItemsMap } from "../../registered-planner-items";


@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {

    cellSize = 22;
    protected version = 1;
    selectedItem: (GridPlaceable<any> & { key: string }) | null = null;
    selectedItemSize: number[] = [];

    @Input() set width(width: any) {
        this._width = coerceNumberProperty(width, 1);
    }

    get width(): number {
        return this._width;
    }

    @Input() set height(height: any) {
        this._height = coerceNumberProperty(height, 1);
    }

    get height(): number {
        return this._height;
    }

    _width = 1;
    _height = 1;
    protected layers: PlannerLayer[] = [];
    protected yDummyArray: number[] = [0];
    protected xDummyArray: number[] = [0];



    constructor(
        private appRef: ApplicationRef,
        private injector: EnvironmentInjector
    ) {
        this.addLayer();
        this.addLayer();
        this.addLayer();

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


        for (let key of PlaceableItemsMap.keys()) {
            const value = PlaceableItemsMap.get(key);
            if (!value) continue;

            const dialogRef = this.createComponent(value);
            let nativeElement = dialogRef.location.nativeElement;
            nativeElement.addEventListener('click', () =>
                this.setSelectedItem(key));

            this.attachComponent('#grid-selectable-options', dialogRef);
        }

    }

    hover($event: Event, x: number, y: number) {

        const {top, left, height, width} = this.getPosition($event);

        const wrapper = document.getElementById('plannerSelected');
        const horizontalLines = document.getElementById('horizontal-grid-lines');
        const verticalLines = document.getElementById('vertical-grid-lines');


        if (!wrapper) return;
        wrapper.style.top = top - 1 + 'px';
        wrapper.style.left = left - 1 + 'px';
        wrapper.style.height = (this.selectedItem?.height ?? 1) * height - 1 + 'px';
        wrapper.style.width = (this.selectedItem?.width ?? 1) * width - 1 + 'px';

        if (horizontalLines) {
            horizontalLines.style.top = top - 1 + 'px';
            horizontalLines.style.height = height + 1 + 'px';
        }

        if (verticalLines) {
            verticalLines.style.left = left - 1 + 'px';
            verticalLines.style.width = width + 1 + 'px';
        }

        if (this.selectedItem) {
            for (let xi = x; xi < x + this.selectedItem?.width; xi++) {
                for (let yi = y; yi < y + this.selectedItem?.height; yi++) {
                    const seelctedItemGridItem = document.querySelector(`[data-x="${xi - x}"][data-y="${yi - y}"]`) as HTMLDivElement;
                    if (!this.canPlace(this.selectedItem.layer, xi, yi)) {
                        seelctedItemGridItem.style.background = '#f00';
                    } else {
                        seelctedItemGridItem.style.background = '#0f0';
                    }
                }

            }
        }


    }

    create($event: Event, x: number, y: number): void {

        const {top, left} = this.getPosition($event);


        let sprinkler1 = this.selectedItem;
        if (!sprinkler1) return;
        const dialogRef = this.createComponent(sprinkler1);
        let nativeElement = dialogRef.location.nativeElement;
        if (x !== undefined && y !== undefined) {
            nativeElement.style.top = top - 1 + 'px';
            nativeElement.style.left = left - 1 + 'px';
        }
        nativeElement.classList.add('placed-grid-item');
        this.attachComponent('.layers', dialogRef);
        if (this.selectedItem) {
            const layer = this.layers[this.selectedItem.layer];

            layer.addPlaceable({x, y, item: this.selectedItem});
        }
    }

    private setSelectedItem(key: string) {

        const value = PlaceableItemsMap.get(key);
        if (!value) return;
        this.selectedItem = {...value, key};

        const componentRef = this.createComponent(value);
        let nativeElement = componentRef.location.nativeElement;
        nativeElement.addEventListener('click', () =>
            this.setSelectedItem(key));

        let elementById = document.getElementById('plannerSelected');
        let selectedItemContainer = document.getElementById('selectedItem');

        if (!elementById || !selectedItemContainer) return;

        selectedItemContainer.innerHTML = '';
        elementById.style.width = value.width * this.cellSize + 'px';
        elementById.style.height = value.width * this.cellSize + 'px';
        this.attachComponent('#selectedItem', componentRef);
        this.selectedItemSize = Array(this.selectedItem.width * this.selectedItem.height).fill(0);


    }

    createComponent<T>(value: GridPlaceable<T>): ComponentRef<T> {
        const componentRef = createComponent(value.component, {
            environmentInjector: this.injector
        });


        for (let inputName of value.inputs.keys()) {
            componentRef.setInput(inputName, value.inputs.get(inputName));
        }
        let nativeElement = componentRef.location.nativeElement;
        nativeElement.style.width = value.width * this.cellSize + 1 + 'px';
        nativeElement.style.height = value.height * this.cellSize + 1 + 'px';


        return componentRef;

    }

    attachComponent(query: string, component: ComponentRef<any>): void {
        document.querySelector(query)?.appendChild(component.location.nativeElement);
        this.appRef.attachView(component.hostView);
    }

    getPosition($event: Event): { top: number, left: number, bottom: number, right: number, width: number, height: number } {

        const cell: HTMLTableCellElement | null = $event.target as HTMLTableCellElement | null;
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

}
