import { GridPlaceable } from '../interfaces/grid-placeable.interface';

export type Placeable = { x: number, y: number; item: (GridPlaceable<any> & { key: string }) };

export class PlannerLayer {
    protected width: number;
    protected height: number;
    placeables: Placeable[] = [];


    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    addPlaceable(item: Placeable): void {
        this.placeables.push(item);
    }

    at(x: number, y: number): Placeable | null {
        return this.placeables.find(placeable => {
            let leftBound = placeable.x;
            let rightBound = (leftBound + placeable.item.width) - 1;
            let topBound = placeable.y;
            let bottomBound = (topBound + placeable.item.height) - 1;
            return (x >= leftBound && (x <= rightBound)) && (y >= topBound && y <= bottomBound)
        }) ?? null;

    }


    toJSON(): { key: string, x: number, y: number }[] {
        return this.placeables.map(placeable => {
            return {x: placeable.x, y: placeable.y, key: placeable.item.key}
        })
    }

}
