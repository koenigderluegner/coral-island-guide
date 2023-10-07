import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ToDoComponent } from './to-do.component';
import { ToDoEntryComponent } from './components/to-do-entry/to-do-entry.component';
import { ToDoEntryOfferingComponent } from './components/to-do-entry-offering/to-do-entry-offering.component';
import { ToDoEntryFishComponent } from './components/to-do-entry-fish/to-do-entry-fish.component';
import { ToDoEntryBaseComponent } from './components/to-do-entry-base/to-do-entry-base.component';
import { SharedModule } from '../shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { ToDoPartialComponent } from './components/to-do-partial/to-do-partial.component';
import { ToDoEntryInsectComponent } from './components/to-do-entry-insect/to-do-entry-insect.component';
import { ToDoEntrySeaCritterComponent } from './components/to-do-entry-sea-critter/to-do-entry-sea-critter.component';
import { MatSelectModule } from "@angular/material/select";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
    {path: '', component: ToDoComponent},
    {path: ':toDoId', redirectTo: ''},
];

@NgModule({
    declarations: [
        ToDoComponent,
        ToDoEntryComponent,
        ToDoEntryOfferingComponent,
        ToDoEntryFishComponent,
        ToDoEntryBaseComponent,
        ToDoPartialComponent,
        ToDoEntryInsectComponent,
        ToDoEntrySeaCritterComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        MatCheckboxModule,
        MatTableModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
})
export class ToDoModule {
}
