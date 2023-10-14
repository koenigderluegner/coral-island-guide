import { Component } from '@angular/core';
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";
import { MailData, TornPageData } from "@ci/data-types";
import { combineLatest, Observable, tap } from "rxjs";

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
})
export class NotesComponent extends BaseTabbedSelectableContainerComponent<MailData> {
    selectedTornPage?: TornPageData;
    showTornPagesTable = false
    protected mails: MailData[] = [];
    protected tornPages: TornPageData[] = [];
    protected data$: Observable<[mails: MailData[], tornPages: TornPageData[]]>;
    protected tabNames = ['Letters', 'Torn pages'];

    constructor() {
        super()
        this.data$ = combineLatest([
            this._database.fetchMailData$(),
            this._database.fetchTornPagesData$()
        ]).pipe(
            tap(([mails, tornPages]) => {
                    this.mails = mails;
                this.tornPages = tornPages;

                    const selectedId = this.selectedId;
                    if (selectedId) {
                        const foundMail = this.mails.find(m => m.key.toLowerCase() === selectedId.toLowerCase())
                        if (foundMail) {
                            this.showDetails(foundMail)
                        }

                        const foundTornPage = this.tornPages.find(m => m.key.toLowerCase() === selectedId.toLowerCase())
                        if (foundTornPage) {
                            this.showTornPageDetails(foundTornPage)
                        }
                    }

                this.activateTabFromRoute(this.tabNames)

                }
            )
        );

    }

    override showDetails(selectedEntry?: MailData) {
        this.selectedTornPage = undefined;
        super.showDetails(selectedEntry);
    }

    showTornPageDetails(tornPage: TornPageData): void {
        this.selectedEntity = undefined;
        this.selectedTornPage = tornPage;
        this.openDrawer = true;
    }

}
