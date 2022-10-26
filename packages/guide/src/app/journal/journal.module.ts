import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JournalComponent } from './journal.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{path: '', component: JournalComponent}];

@NgModule({
    declarations: [JournalComponent,],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class JournalModule {
}
