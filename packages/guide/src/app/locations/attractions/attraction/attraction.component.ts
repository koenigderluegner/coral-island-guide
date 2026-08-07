import { Component, computed, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { type Attraction, UiIcon } from "@ci/data-types";
import { TranslatePipe } from "@ngx-translate/core";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { MoneyComponent } from "../../../shared/components/money/money.component";
import { ItemListComponent } from "../../../shared/components/item-list/item-list.component";
import { ConfigService } from "../../../core/services/config.service"
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { MaskedImageComponent } from "../../../shared/masked-image/masked-image.component";

@Component({
    selector: 'app-attraction',
    imports: [
        TranslatePipe,
        ItemIconComponent,
        MoneyComponent,
        ItemListComponent,
        UiIconComponent,
        MaskedImageComponent
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './attraction.component.html'
})
export class AttractionComponent {
    readonly attraction = input.required<Attraction>();
    protected readonly images = computed(() => this.attraction().contractors.npcImages)
    protected readonly iconsPath = inject(ConfigService).config().iconPath;

    protected readonly UiIcon = UiIcon;
}
