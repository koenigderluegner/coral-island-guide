import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CardComponent } from "../shared/components/card/card.component";

@Component({
    selector: 'app-only-in-beta',
    imports: [RouterLink, CardComponent],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './only-in-beta.component.html'
})
export class OnlyInBetaComponent {
}
