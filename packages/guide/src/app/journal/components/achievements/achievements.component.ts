import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { DatabaseService } from "../../../shared/services/database.service";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: 'app-achievements',
    templateUrl: './achievements.component.html',

    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        ItemIconComponent,
        TranslatePipe,
    ]
})
export class AchievementsComponent {
    protected readonly achievements = inject(DatabaseService).fetchAchievements();
}
