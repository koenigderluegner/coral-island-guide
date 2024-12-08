import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { CardComponent } from "../shared/components/card/card.component";

@Component({
    selector: 'app-only-in-live',
    imports: [CommonModule, RouterLink, CardComponent],
    templateUrl: './only-in-live.component.html'
})
export class OnlyInBLiveComponent {
}
