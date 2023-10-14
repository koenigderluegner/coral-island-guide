import { Component } from '@angular/core';
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";
import { MailData } from "@ci/data-types";
import { combineLatest, Observable, tap } from "rxjs";

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
})
export class NotesComponent extends BaseTabbedSelectableContainerComponent<MailData> {
    protected mails: MailData[] = [];
    protected data$: Observable<[mails: MailData[]]>;


    constructor() {
        super()
        this.data$ = combineLatest([this._database.fetchMailData$()]).pipe(
            tap(([mails]) => {
                    this.mails = mails;

                    const selectedId = this.selectedId;
                    if (selectedId) {
                        const foundMail = this.mails.find(m => m.key.toLowerCase() === selectedId.toLowerCase())
                        if (foundMail) {
                            this.showDetails(foundMail)
                        }
                    }

                }
            )
        );

    }

}
