import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { preferencesMap } from "../../../shared/constants/preference-map.const";
import { MinimalNPC } from "@ci/data-types";

@Component({
    selector: 'app-database-gifts',
    templateUrl: './database-gifts.component.html',
    styles: [`
        .database-gifts .app-responsive-table .app-item-icon {
            & > img {
                aspect-ratio: unset;
                width: auto;
                max-height: 3rem;
            }
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseGiftsComponent extends BaseDatabaseDetailPartComponent implements OnInit {

    @HostBinding('class.database-gifts')
    displayedHeaderColumns = ['preference', 'npcs'];
    displayedColumns = ['icon', ...this.displayedHeaderColumns];

    favoritePreferences: MinimalNPC[] = [];
    lovePreferences: MinimalNPC[] = [];
    likePreferences: MinimalNPC[] = [];
    neutralPreferences: MinimalNPC[] = [];
    dislikePreferences: MinimalNPC[] = [];
    hatePreferences: MinimalNPC[] = [];

    dataSource: { pref: typeof preferencesMap[0], npcs: MinimalNPC[] }[] = []
    private keys = [
        'favoritePreferences',
        'lovePreferences',
        'likePreferences',
        'neutralPreferences',
        'dislikePreferences',
        'hatePreferences'
    ] as const

    ngOnInit(): void {
        const item = this.item

        if (!item) return;

        const preferences = this.database.getGiftingPreferences();

        preferences.forEach(prefs => {
            this.keys.forEach(key => {
                const preferenceIndex = prefs[key].findIndex(pref => pref.type === "item" && item.id === pref.item.id);
                if (preferenceIndex !== -1 && prefs.npc) {
                    this[key].push(prefs.npc);
                }
            })

        })

        this.keys.forEach(key => {
            const npcs = this[key];
            if (npcs.length) {
                this.dataSource.push({pref: preferencesMap.find(p => p.preferenceField === key)!, npcs})
            }

        })

    }


}
