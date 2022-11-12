import { ComponentType } from '@angular/cdk/overlay';

export interface GridPlaceable<T> {
    component: ComponentType<T>,
    width: number,
    height: number,
    layer: number,
    inputs: Map<string, unknown>;
}