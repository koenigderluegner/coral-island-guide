import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'townrank',
    standalone: false
})
export class TownrankPipe implements PipeTransform {
    transform(value: number,): string {
        return ['F', 'E', 'D', 'C', 'B', 'A', 'S', 'SS'][value] ?? 'unknown';
    }
}
