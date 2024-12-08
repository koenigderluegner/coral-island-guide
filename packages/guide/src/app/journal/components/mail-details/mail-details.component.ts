import { Component, inject, input } from '@angular/core';
import { MailData, UiIcon } from "@ci/data-types";
import { ListDetailService } from "../../../shared/components/list-detail-container/list-detail.service";

@Component({
    selector: 'app-mail-details',
    templateUrl: './mail-details.component.html',
    standalone: false
})
export class MailDetailsComponent {

    mail = input.required<MailData>()
    listDetails = inject(ListDetailService)
    protected readonly uiIcon = UiIcon;
}
