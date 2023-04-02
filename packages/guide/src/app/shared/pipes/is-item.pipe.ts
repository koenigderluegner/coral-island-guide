import { Pipe, PipeTransform } from '@angular/core';
import { Item } from "@ci/data-types";

@Pipe({
    name: 'isItem'
})
export class IsItemPipe implements PipeTransform {

    transform(value: any): value is Item {
        return 'id' in value && 'displayName' in value && 'price' in value && 'sellPrice' in value;
    }

}
