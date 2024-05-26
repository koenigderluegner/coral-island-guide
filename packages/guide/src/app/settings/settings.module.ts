import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { UiIconComponent } from "../shared/components/ui-icon/ui-icon.component";

const routes: Routes = [{path: '', component: SettingsComponent}];

@NgModule({
    declarations: [SettingsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        ReactiveFormsModule,
        MatIconModule,
        MatSelectModule,
        UiIconComponent
    ],
})
export class SettingsModule {
}
