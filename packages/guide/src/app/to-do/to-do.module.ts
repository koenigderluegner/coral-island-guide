import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ToDoComponent } from './to-do.component';
import { ToDoEntryBaseComponent } from './components/to-do-entry-base/to-do-entry-base.component';
import { SharedModule } from '../shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { ToDoPartialComponent } from './components/to-do-partial/to-do-partial.component';
import { MatSelectModule } from "@angular/material/select";
import { ReactiveFormsModule } from "@angular/forms";
import { AddSpacesToPascalCasePipe } from "../shared/pipes/add-spaces-to-pascal-case.pipe";
import { UiIconComponent } from "../shared/components/ui-icon/ui-icon.component";

const routes: Routes = [
    {path: '', component: ToDoComponent},
    {path: ':toDoId', redirectTo: ''},
];

@NgModule({
    declarations: [
        ToDoComponent,
        ToDoEntryBaseComponent,
        ToDoPartialComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        UiIconComponent,
        MatCheckboxModule,
        MatTableModule,
        MatSelectModule,
        ReactiveFormsModule,
        AddSpacesToPascalCasePipe
    ],
})
export class ToDoModule {
}
