import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalComponent } from './journal.component';
import { SharedModule } from '../shared/shared.module';
import { CaughtComponent } from './components/caught/caught.component';
import { MatTabsModule } from '@angular/material/tabs';
import { JournalRoutingModule } from './journal-routing.module';


@NgModule({
    declarations: [JournalComponent, CaughtComponent],
    imports: [CommonModule, JournalRoutingModule, SharedModule, MatTabsModule],
})
export class JournalModule {
}
