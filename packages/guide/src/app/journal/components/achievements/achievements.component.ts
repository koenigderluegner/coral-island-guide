import { Component, inject } from '@angular/core';
import { DatabaseService } from "../../../shared/services/database.service";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";

@Component({
    selector: 'app-achievements',
    templateUrl: './achievements.component.html',

    imports: [
        ItemIconComponent,
    ]
})
export class AchievementsComponent {
    protected readonly achievements = inject(DatabaseService).fetchAchievements();
}
