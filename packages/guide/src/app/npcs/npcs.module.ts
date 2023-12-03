import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NPCsComponent } from './npcs.component';
import { SharedModule } from '../shared/shared.module';
import { GiftingComponent } from './components/gifting/gifting.component';
import { NPCsRoutingModule } from './npcs-routing.module';
import { NpcListComponent } from './components/npc-list/npc-list.component';
import { NpcComponent } from './components/npc/npc.component';
import { HeartEventsComponent } from './components/heart-events/heart-events.component';
import { HeartEventTriggerComponent } from './components/heart-event-trigger/heart-event-trigger.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GiftingGridComponent } from './components/gifting-grid/gifting-grid.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
    declarations: [
        NPCsComponent,
        GiftingComponent,
        NpcListComponent,
        NpcComponent,
        HeartEventsComponent,
        HeartEventTriggerComponent,
        GiftingGridComponent,
    ],
    imports: [CommonModule, NPCsRoutingModule, SharedModule, MatTooltipModule, MatProgressSpinnerModule],
})
export class NPCsModule {}
