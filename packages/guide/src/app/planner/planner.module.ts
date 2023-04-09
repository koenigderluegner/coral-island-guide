import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlannerComponent } from './planner.component';
import { GridComponent } from './components/grid/grid.component';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PlannerToolbarComponent } from './components/planner-toolbar/planner-toolbar.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

const routes: Routes = [{path: '', component: PlannerComponent}];

@NgModule({
    declarations: [PlannerComponent, GridComponent, PlannerToolbarComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule, DragDropModule, MatProgressSpinnerModule],
})
export class PlannerModule {
}
