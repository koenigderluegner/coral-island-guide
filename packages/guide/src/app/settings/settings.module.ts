import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [{path: '', component: SettingsComponent}];

@NgModule({
    declarations: [SettingsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        ReactiveFormsModule
    ],
})
export class SettingsModule {
}
