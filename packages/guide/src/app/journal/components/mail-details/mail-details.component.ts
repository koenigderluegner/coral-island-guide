import { Component, inject, input } from '@angular/core';
import { MailData, UiIcon } from "@ci/data-types";
import { ListDetailService } from "../../../shared/components/list-detail-container/list-detail.service";
import { CardComponent } from "../../../shared/components/card/card.component";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { MailComponent } from "../mail/mail.component";
import { EffectComponent } from "../../../shared/components/effect/effect.component";

@Component({
    selector: 'app-mail-details',
    templateUrl: './mail-details.component.html',

    imports: [
        CardComponent,
        UiIconComponent,
        MailComponent,
        EffectComponent
    ]
})
export class MailDetailsComponent {

    mail = input.required<MailData>()
    listDetails = inject(ListDetailService)
    protected readonly uiIcon = UiIcon;
}
