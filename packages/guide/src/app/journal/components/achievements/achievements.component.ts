import { Component, inject } from '@angular/core';
import { DatabaseService } from "../../../shared/services/database.service";

@Component({
    selector: 'app-achievements',
    templateUrl: './achievements.component.html',
    standalone: false
})
export class AchievementsComponent {
    protected readonly _database = inject(DatabaseService).fetchAchievements$();
}
