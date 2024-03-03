import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'has',
})
export class HasPipe implements PipeTransform {
    transform<T extends object>(value: T, fieldName: string): value is T & { [key: string]: unknown } {
        return fieldName in value;
    }
}
