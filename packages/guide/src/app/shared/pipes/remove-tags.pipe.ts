import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'removeTags',
})
export class RemoveTagsPipe implements PipeTransform {
    transform(value: string | null | undefined): string | null | undefined {
        if (!value) return value;
        return value.replace(/<[^>]+>/ig, '');
    }
}
