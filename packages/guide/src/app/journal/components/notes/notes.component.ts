import { Component } from '@angular/core';
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";
import { MailData, TornPageData, TreasureHunt, UiIcon } from "@ci/data-types";
import { combineLatest, Observable, tap } from "rxjs";

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    standalone: false
})
export class NotesComponent extends BaseTabbedSelectableContainerComponent<MailData> {
    selectedTornPage?: TornPageData;
    selectedTreasureHunt?: TreasureHunt;
    showTornPagesTable = false
    protected mails: MailData[] = [];
    protected tornPages: TornPageData[] = [];
    protected treasureMaps: TreasureHunt[] = [];
    protected data$: Observable<[mails: MailData[], tornPages: TornPageData[], treasureMaps: TreasureHunt[]]>;
    protected tabNames = ['Letters', 'Torn pages', 'Treasure Map'];

    constructor() {
        super()
        this.data$ = combineLatest([
            this._database.fetchMailData$(),
            this._database.fetchTornPagesData$(),
            this._database.fetchTreasureHunts$(),
        ]).pipe(
            tap(([mails, tornPages, treasureMaps]) => {
                    this.mails = mails;
                    this.tornPages = tornPages;
                    this.treasureMaps = treasureMaps;

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

                        const foundTreasureMap = this.treasureMaps.find(m => m.treasureId === +selectedId.toLowerCase())
                        if (foundTreasureMap) {
                            this.showTreasureDetails(foundTreasureMap)
                        }
                    }

                    this.activateTabFromRoute(this.tabNames)

                }
            )
        );

    }

    override showDetails(selectedEntry?: MailData) {
        this.selectedTornPage = undefined;
        this.selectedTreasureHunt = undefined;
        super.showDetails(selectedEntry);
    }

    showTornPageDetails(tornPage: TornPageData): void {
        this.selectedEntity = undefined;
        this.selectedTreasureHunt = undefined;
        this.selectedTornPage = tornPage;
        this.listDetail.open()
    }

    showTreasureDetails(treasureHunt: TreasureHunt): void {
        this.selectedEntity = undefined;
        this.selectedTornPage = undefined;
        this.selectedTreasureHunt = treasureHunt;
        this.listDetail.open()
    }

    protected readonly uiIcon = UiIcon;
}
