import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { BirthdayDashboardEntry, MinimalItem, UiIcon } from "@ci/data-types";
import { SharedModule } from "../../../shared/shared.module";
import { AddSpacesToPascalCasePipe } from "../../../shared/pipes/add-spaces-to-pascal-case.pipe";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { MatTooltip } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-birthday-dashboard',
    standalone: true,
    imports: [
        SharedModule,
        AddSpacesToPascalCasePipe,
        UiIconComponent,
        MatTooltip,
        RouterLink
    ],
    templateUrl: './birthday-dashboard.component.html',
    styleUrl: './birthday-dashboard.component.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'flex flex-col gap-3'
    }
})
export class BirthdayDashboardComponent {
    birthdays = input.required<BirthdayDashboardEntry[]>()
    itemClicked = output<MinimalItem>()
    protected readonly UiIcon = UiIcon;
    protected readonly uiIcon = UiIcon;
}
