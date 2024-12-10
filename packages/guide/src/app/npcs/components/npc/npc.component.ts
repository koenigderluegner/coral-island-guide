import { Component, inject, input, OnInit, ViewEncapsulation } from '@angular/core';
import { GiftPreferences, HeartEvent, MinimalItem, NPC, UiIcon } from "@ci/data-types";
import { combineLatest } from "rxjs";
import { MapKeyed } from "../../../shared/types/map-keyed.type";
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import { SettingsService } from "../../../shared/services/settings.service";
import { GameVersionService } from "../../../core/injection-tokens/version.injection-token";
import { ListDetailContainerComponent } from "../../../shared/components/list-detail-container/list-detail-container.component";
import { ItemCardSwitchComponent } from "../../../shared/components/item-card-switch/item-card-switch.component";
import { OfferingComponent } from "../../../shared/components/database-item-details/offering/offering.component";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { CardComponent } from "../../../shared/components/card/card.component";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { IngameDatePipe } from "../../../shared/pipes/ingame-date.pipe";
import { GiftingGridComponent } from "../gifting-grid/gifting-grid.component";
import { HeartEventsComponent } from "../heart-events/heart-events.component";
import { KeyValuePipe } from "@angular/common";
import { NpcPortraitComponent } from "../../../shared/components/npc-portrait/npc-portrait.component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { DatabaseItemDetailsDirective } from "../../../shared/directives/database-item-details.directive";
import { MatTooltip } from "@angular/material/tooltip";

@Component({
    selector: 'app-npc',
    templateUrl: './npc.component.html',
    styleUrls: ['./npc.component.scss'],
    encapsulation: ViewEncapsulation.None,

    imports: [
        ListDetailContainerComponent,
        ItemCardSwitchComponent,
        OfferingComponent,
        ItemIconComponent,
        CardComponent,
        UiIconComponent,
        IngameDatePipe,
        GiftingGridComponent,
        HeartEventsComponent,
        KeyValuePipe,
        NpcPortraitComponent,
        MatProgressSpinner,
        DatabaseItemDetailsDirective,
        MatTooltip
    ]
})
export class NpcComponent extends BaseSelectableContainerComponent<MinimalItem> implements OnInit {

    npcKey = input.required<string>();
    protected npc?: NPC | null = null;
    protected heartEvents: HeartEvent[] = []
    protected readonly UiIcon = UiIcon;
    protected giftingPreferences?: MapKeyed<GiftPreferences>;
    protected readonly uiIcon = UiIcon;
    protected environment = inject(SettingsService).getSettings().useBeta ? 'beta' : 'live';
    protected version = inject(GameVersionService).value();

    ngOnInit(): void {
        combineLatest([this._database.fetchNPCs$(), this._database.fetchHeartEvents$(), this._database.fetchGiftingPreferences$()]).subscribe({
            next: ([npcs, heartEvents, giftingPreferences]) => {
                this.npc = npcs.find(npc => npc.key.toLowerCase() === this.npcKey().toLowerCase())
                this.heartEvents = heartEvents[this.npcKey().toLowerCase()] ?? []
                this.giftingPreferences = giftingPreferences.find(g => g.mapKey.toLowerCase() === this.npc?.key.toLowerCase())
            }
        })
    }
}
