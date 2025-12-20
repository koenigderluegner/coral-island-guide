import { Component, inject, signal } from '@angular/core';
import { DatabaseService } from "../../shared/services/database.service";
import { TranslatePipe } from "@ngx-translate/core";
import { SettingsService } from "../../shared/services/settings.service";
import { ItemIconComponent } from "../../shared/components/item-icon/item-icon.component";
import { ListDetailContainerComponent } from "../../shared/components/list-detail-container/list-detail-container.component";
import { BaseTabbedSelectableContainerComponent } from "../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";
import { type Attraction } from "@ci/data-types";
import { AttractionComponent } from "./attraction/attraction.component";
import { ConfigService } from "../../core/services/config.service";

@Component({
    selector: 'app-attractions',
    imports: [
        TranslatePipe,
        ItemIconComponent,
        ListDetailContainerComponent,
        AttractionComponent
    ],
    templateUrl: './attractions.component.html'
})
export class AttractionsComponent extends BaseTabbedSelectableContainerComponent<Attraction> {
    attractions = inject(DatabaseService).fetchAttractions();
    protected readonly useBeta = inject(SettingsService).getSettings().useBeta;

    protected readonly iconsPath = inject(ConfigService).config().iconPath;
}
