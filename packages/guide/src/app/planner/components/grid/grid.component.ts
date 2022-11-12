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
import { ItemIconComponent } from '../../../shared/components/item-icon/item-icon.component';
import { ComponentType } from '@angular/cdk/overlay';

interface placeable<T> {
    component: ComponentType<T>,
    width: number,
    height: number,
    inputs: Map<string, unknown>;
}

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {

    cellSize = 36;
    protected version = 1;
    private selectedItem: placeable<any> | null = null;

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

    placeableItems: Map<string, placeable<any>> = new Map<string, placeable<any>>();

    constructor(
        private appRef: ApplicationRef,
        private injector: EnvironmentInjector
    ) {
        this.addLayer();

        this.placeableItems.set('spinkler1', {
            component: ItemIconComponent,
            width: 1,
            height: 1,
            inputs: new Map<string, unknown>([
                ['itemName', 'Items_Sprinkler.png']
            ])
        });
        this.placeableItems.set('yogurtmachine', {
            component: ItemIconComponent,
            width: 2,
            height: 2,
            inputs: new Map<string, unknown>([
                ['itemName', 'Yogurt_Machine.png']
            ])
        });


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

        return true;
    }

    ngOnInit(): void {
        this.xDummyArray = Array(this._width).fill(0);
        this.yDummyArray = Array(this._height).fill(0);


        for (let key of this.placeableItems.keys()) {
            const value = this.placeableItems.get(key);
            if (!value) continue;

            const dialogRef = this.createComponent(value);
            let nativeElement = dialogRef.location.nativeElement;
            nativeElement.addEventListener('click', () =>
                this.setSelectedItem(key));

            this.attachComponent('#grid-selectable-options', dialogRef);


        }


    }

    hover($event: Event) {

        const {top, left, height, width} = this.getPosition($event);

        const wrapper = document.getElementById('plannerSelected');
        const horizontalLines = document.getElementById('horizontal-grid-lines');
        const verticalLines = document.getElementById('vertical-grid-lines');


        if (!wrapper) return;
        wrapper.style.top = top + 'px';
        wrapper.style.left = left + 'px';

        if (horizontalLines) {
            horizontalLines.style.top = top + 'px';
            horizontalLines.style.height = height + 'px';
        }

        if (verticalLines) {
            verticalLines.style.left = left + 'px';
            verticalLines.style.width = width + 'px';
        }


    }

    create($event: Event, x?: number, y?: number): void {

        const {top, left} = this.getPosition($event);


        let sprinkler1 = this.selectedItem;
        if (!sprinkler1) return;
        const dialogRef = this.createComponent(sprinkler1);
        let nativeElement = dialogRef.location.nativeElement;
        if (x !== undefined && y !== undefined) {
            nativeElement.style.top = top + 'px';
            nativeElement.style.left = left + 'px';
        }
        nativeElement.classList.add('placed-grid-item');
        this.attachComponent('.layers', dialogRef);
    }

    private setSelectedItem(key: string) {

        const value = this.placeableItems.get(key);
        if (!value) return;
        this.selectedItem = value;

        const componentRef = this.createComponent(value);
        let nativeElement = componentRef.location.nativeElement;
        nativeElement.addEventListener('click', () =>
            this.setSelectedItem(key));

        let elementById = document.getElementById('plannerSelected');

        if (!elementById) return;

        elementById.innerHTML = '';
        elementById.style.width = value.width * this.cellSize + 'px';
        elementById.style.height = value.width * this.cellSize + 'px';
        this.attachComponent('#plannerSelected', componentRef);


    }

    createComponent<T>(value: placeable<T>): ComponentRef<T> {
        const componentRef = createComponent(value.component, {
            environmentInjector: this.injector
        });


        for (let inputName of value.inputs.keys()) {
            componentRef.setInput(inputName, value.inputs.get(inputName));
        }
        let nativeElement = componentRef.location.nativeElement;
        nativeElement.style.width = value.width * this.cellSize + 'px';
        nativeElement.style.height = value.height * this.cellSize + 'px';


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
