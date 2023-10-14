import { Component, Input } from '@angular/core';
import { MailData } from "@ci/data-types";

@Component({
    selector: 'app-mail-details',
    templateUrl: './mail-details.component.html',
})
export class MailDetailsComponent {

    @Input({required: true}) mail!: MailData

}
