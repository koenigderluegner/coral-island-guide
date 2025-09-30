import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CardComponent } from "../shared/components/card/card.component";

@Component({
    selector: 'app-only-in-live',
    imports: [RouterLink, CardComponent],
    templateUrl: './only-in-live.component.html'
})
export class OnlyInBLiveComponent {
}
