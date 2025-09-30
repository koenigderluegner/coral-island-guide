import { Component, input } from '@angular/core';
import { getTruthyValues } from "@ci/util";
import { Critter } from "@ci/data-types";
import { AddSpacesToPascalCasePipe } from "../../../pipes/add-spaces-to-pascal-case.pipe";

@Component({
    selector: 'app-insect',
    imports: [AddSpacesToPascalCasePipe],
    templateUrl: './insect.component.html'
})
export class InsectComponent {

   readonly critter = input.required<Critter>();

    protected readonly getTruthyValues = getTruthyValues;
}
