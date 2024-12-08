import { Component } from '@angular/core';
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";
import { MailData, TornPageData, TreasureHunt, UiIcon } from "@ci/data-types";
import { combineLatest, Observable, tap } from "rxjs";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { DataFilterComponent } from "../../../shared/components/data-filter/data-filter.component";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { AsyncPipe } from "@angular/common";
import { MailTableComponent } from "../tables/mail-table/mail-table.component";
import { TornPageDetailsComponent } from "../torn-page-details/torn-page-details.component";
import { MailDetailsComponent } from "../mail-details/mail-details.component";
import { ListDetailContainerComponent } from "../../../shared/components/list-detail-container/list-detail-container.component";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { CardComponent } from "../../../shared/components/card/card.component";
import { FullSizeImageComponent } from "../../../shared/components/full-size-image/full-size-image.component";
import { TornPagesTableComponent } from "../tables/torn-pages-table/torn-pages-table.component";

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',

    imports: [
        ItemIconComponent,
        DataFilterComponent,
        MatTabGroup,
        AsyncPipe,
        MatTab,
        MailTableComponent,
        TornPageDetailsComponent,
        MailDetailsComponent,
        ListDetailContainerComponent,
        UiIconComponent,
        CardComponent,
        FullSizeImageComponent,
        TornPagesTableComponent
    ]
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
    protected readonly uiIcon = UiIcon;

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
}
