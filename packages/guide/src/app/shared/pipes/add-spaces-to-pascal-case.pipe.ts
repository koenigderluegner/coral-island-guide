import { Pipe, PipeTransform } from '@angular/core';
import { addSpacesToPascalCase } from "@ci/util";

@Pipe({
    name: 'addSpacesToPascalCase',
    standalone: true
})
export class AddSpacesToPascalCasePipe implements PipeTransform {

    transform(value: string | null | undefined): string {
        return value ? addSpacesToPascalCase(value) : '';
    }

}
