import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CardComponent } from "../../../shared/components/card/card.component";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { NpcPortraitComponent } from "../../../shared/components/npc-portrait/npc-portrait.component";
import { DatabaseService } from "../../../shared/services/database.service";
import { SettingsService } from "../../../shared/services/settings.service";
import { GameVersionService } from "../../../core/injection-tokens/version.injection-token";
import { UiIcon } from "@ci/data-types";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { DatabaseHeaderButtonComponent } from "../../../database/components/database-header-button/database-header-button.component";
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";
import { ShopItemProcessTableComponent } from "../../../locations/components/tables/shop-item-process-table/shop-item-process-table.component";

@Component({
    selector: 'app-unlinked-npc-images',
    templateUrl: './unlinked-npc-images.component.html',
    styleUrls: ['./unlinked-npc-images.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        CardComponent,
        UiIconComponent,
        NpcPortraitComponent,
        MatProgressSpinner,
        DatabaseHeaderButtonComponent,
        ExpandableComponent,
        ShopItemProcessTableComponent
    ],
    host: {
        class: 'block px-main-hz py-main-vt w-full'
    }
})
export class UnlinkedNpcImages {
    paths = inject(DatabaseService).fetchUnlinkedNPCImages();
    protected environment = inject(SettingsService).getSettings().useBeta ? 'beta' : 'live';
    protected version = inject(GameVersionService).value();

    protected readonly uiIcon = UiIcon;
}
