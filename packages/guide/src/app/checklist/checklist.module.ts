import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChecklistComponent } from './checklist.component';
import { ChecklistEntryComponent } from './components/checklist-entry/checklist-entry.component';
import { ChecklistEntryOfferingComponent } from './components/checklist-entry-offering/checklist-entry-offering.component';
import { ChecklistEntryCatchableComponent } from './components/checklist-entry-catchable/checklist-entry-catchable.component';
import { ChecklistEntryBaseComponent } from './components/checklist-entry-base/checklist-entry-base.component';
import { SharedModule } from "../shared/shared.module";
import { MatCheckboxModule } from "@angular/material/checkbox";

const routes: Routes = [{path: '', component: ChecklistComponent}];

@NgModule({
    declarations: [
        ChecklistComponent,
        ChecklistEntryComponent,
        ChecklistEntryOfferingComponent,
        ChecklistEntryCatchableComponent,
        ChecklistEntryBaseComponent,
    ],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule, MatCheckboxModule],
})
export class ChecklistModule {
}
