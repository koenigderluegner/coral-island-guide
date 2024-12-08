import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'max',
    standalone: false
})
export class MaxPipe implements PipeTransform {

    transform(value: number[]): number {
        return Math.max(...value);
    }

}
