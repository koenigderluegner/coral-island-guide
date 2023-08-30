import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NPCsComponent } from './npcs.component';
import { SharedModule } from '../shared/shared.module';
import { GiftingComponent } from './components/gifting/gifting.component';
import { NPCsRoutingModule } from './npcs-routing.module';
import { NpcListComponent } from './components/npc-list/npc-list.component';
import { NpcComponent } from './components/npc/npc.component';

@NgModule({
    declarations: [NPCsComponent, GiftingComponent, NpcListComponent, NpcComponent],
    imports: [CommonModule, NPCsRoutingModule, SharedModule],
})
export class NPCsModule {}
