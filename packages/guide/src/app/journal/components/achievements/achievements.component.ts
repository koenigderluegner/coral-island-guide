import { Component, inject } from '@angular/core';
import { DatabaseService } from "../../../shared/services/database.service";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: 'app-achievements',
    templateUrl: './achievements.component.html',

    imports: [
        ItemIconComponent,
        AsyncPipe
    ]
})
export class AchievementsComponent {
    protected readonly _database = inject(DatabaseService).fetchAchievements$();
}
