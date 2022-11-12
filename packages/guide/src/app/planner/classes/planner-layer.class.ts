import { GridPlaceable } from '../interfaces/grid-placeable.interface';

export class PlannerLayer {
    protected width: number;
    protected height: number;
    placeables: { x: number, y: number; item: (GridPlaceable<any> & { key: string }) }[] = [];


    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    addPlaceable(key: string, item: { x: number, y: number; item: (GridPlaceable<any> & { key: string }) }): void {
        this.placeables.push(item);
    }

}