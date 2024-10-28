import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-only-in-live',
    standalone: true,
    imports: [CommonModule, SharedModule, RouterLink],
    templateUrl: './only-in-live.component.html',
})
export class OnlyInBLiveComponent {
}
