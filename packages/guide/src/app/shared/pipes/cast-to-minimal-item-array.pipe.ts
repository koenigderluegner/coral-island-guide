import { Pipe, PipeTransform } from '@angular/core';
import { MinimalItem } from "@ci/data-types";

@Pipe({
    name: 'castToMinimalItemArray',
    standalone: false
})
export class CastToMinimalItemArrayPipe implements PipeTransform {

    transform(value: unknown): MinimalItem[] {
        return value as MinimalItem[];
    }

}
