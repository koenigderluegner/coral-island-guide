import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ingameTime',

})
export class IngameTimePipe implements PipeTransform {
    transform(value: { hours: number, minutes: number }): string {
        return `${value.hours.toString().padStart(2, '0')}:${value.minutes.toString().padStart(2, '0')}`;
    }
}
