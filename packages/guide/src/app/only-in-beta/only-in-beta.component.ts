import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangelogComponent } from "../changelog/changelog.component";
import { SharedModule } from "../shared/shared.module";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-only-in-beta',
    standalone: true,
    imports: [CommonModule, ChangelogComponent, SharedModule, RouterLink],
    templateUrl: './only-in-beta.component.html',
})
export class OnlyInBetaComponent {
}
