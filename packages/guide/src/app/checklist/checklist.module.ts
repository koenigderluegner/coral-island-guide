import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChecklistComponent } from './checklist.component';
import { ChecklistEntryComponent } from './components/checklist-entry/checklist-entry.component';
import { ChecklistEntryOfferingComponent } from './components/checklist-entry-offering/checklist-entry-offering.component';
import { ChecklistEntryFishComponent } from './components/checklist-entry-fish/checklist-entry-fish.component';
import { ChecklistEntryBaseComponent } from './components/checklist-entry-base/checklist-entry-base.component';
import { SharedModule } from '../shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { ChecklistPartialComponent } from './components/checklist-partial/checklist-partial.component';
import { ChecklistEntryInsectComponent } from './components/checklist-entry-insect/checklist-entry-insect.component';
import { ChecklistEntrySeaCritterComponent } from './components/checklist-entry-sea-critter/checklist-entry-sea-critter.component';

const routes: Routes = [
    {path: '', component: ChecklistComponent},
    {path: ':checklistId', component: ChecklistComponent},
];

@NgModule({
    declarations: [
        ChecklistComponent,
        ChecklistEntryComponent,
        ChecklistEntryOfferingComponent,
        ChecklistEntryFishComponent,
        ChecklistEntryBaseComponent,
        ChecklistPartialComponent,
        ChecklistEntryInsectComponent,
        ChecklistEntrySeaCritterComponent,
    ],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule, MatCheckboxModule, MatTableModule],
})
export class ChecklistModule {
}
