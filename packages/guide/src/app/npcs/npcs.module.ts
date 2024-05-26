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
import { AddSpacesToPascalCasePipe } from "../shared/pipes/add-spaces-to-pascal-case.pipe";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInput } from "@angular/material/input";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { MatCheckbox } from "@angular/material/checkbox";
import { NpcFilterComponent } from "./npc-filter/npc-filter.component";
import { JournalModule } from "../journal/journal.module";
import { DatabaseItemDetailsDirective } from "../shared/directives/database-item-details.directive";
import { ItemCardSwitchComponent } from "../shared/components/item-card-switch/item-card-switch.component";
import { OfferingComponent } from "../shared/components/database-item-details/offering/offering.component";
import { UiIconComponent } from "../shared/components/ui-icon/ui-icon.component";

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
    imports: [
        CommonModule,
        NPCsRoutingModule,
        SharedModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        AddSpacesToPascalCasePipe,
        MatFormField,
        ReactiveFormsModule,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        MatCheckbox,
        NpcFilterComponent,
        JournalModule,
        DatabaseItemDetailsDirective,
        ItemCardSwitchComponent,
        OfferingComponent,
        UiIconComponent
    ],
})
export class NPCsModule {
}
