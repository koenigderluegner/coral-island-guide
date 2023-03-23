import { Pipe, PipeTransform } from '@angular/core';
import { addSpacesToPascalCase } from "@ci/util";

@Pipe({
    name: 'addSpacesToPascalCase'
})
export class AddSpacesToPascalCasePipe implements PipeTransform {

    transform(value: string): string {
        return addSpacesToPascalCase(value);
    }

}
