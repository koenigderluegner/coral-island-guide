import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-only-in-beta',
    imports: [CommonModule, SharedModule, RouterLink],
    templateUrl: './only-in-beta.component.html'
})
export class OnlyInBetaComponent {
}
