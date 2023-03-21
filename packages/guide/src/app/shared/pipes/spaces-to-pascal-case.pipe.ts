import { Pipe, PipeTransform } from '@angular/core';
import { addSpacesToPascalCase } from "@ci/util";

@Pipe({
    name: 'spacesToPascalCase'
})
export class SpacesToPascalCasePipe implements PipeTransform {

    transform(value: string): string {
        return addSpacesToPascalCase(value);
    }

}
