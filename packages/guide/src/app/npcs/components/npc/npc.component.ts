import { Component, inject, input, OnInit, ViewEncapsulation } from '@angular/core';
import { GiftPreferences, HeartEvent, MinimalItem, NPC, UiIcon } from "@ci/data-types";
import { combineLatest } from "rxjs";
import { MapKeyed } from "../../../shared/types/map-keyed.type";
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import { SettingsService } from "../../../shared/services/settings.service";
import { GAME_VERSION } from "../../../core/injection-tokens/version.injection-token";

@Component({
    selector: 'app-npc',
    templateUrl: './npc.component.html',
    styleUrls: ['./npc.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NpcComponent extends BaseSelectableContainerComponent<MinimalItem> implements OnInit {

    npcKey = input.required<string>();
    protected npc?: NPC | null = null;
    protected heartEvents: HeartEvent[] = []
    protected readonly UiIcon = UiIcon;
    protected giftingPreferences?: MapKeyed<GiftPreferences>;
    protected readonly uiIcon = UiIcon;
    protected environment = inject(SettingsService).getSettings().useBeta ? 'beta' : 'live';
    protected version = inject(GAME_VERSION);

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
