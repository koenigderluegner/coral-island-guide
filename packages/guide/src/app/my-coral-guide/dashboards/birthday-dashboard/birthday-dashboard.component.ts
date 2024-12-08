import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { BirthdayDashboardEntry, MinimalItem, UiIcon } from "@ci/data-types";
import { AddSpacesToPascalCasePipe } from "../../../shared/pipes/add-spaces-to-pascal-case.pipe";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { RouterLink } from "@angular/router";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";

@Component({
    selector: 'app-birthday-dashboard',
    imports: [
        AddSpacesToPascalCasePipe,
        UiIconComponent,
        RouterLink,
        ItemIconComponent
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
