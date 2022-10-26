import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalComponent } from './journal.component';
import { SharedModule } from '../shared/shared.module';
import { CaughtComponent } from './components/caught/caught.component';
import { MatTabsModule } from '@angular/material/tabs';
import { JournalRoutingModule } from './journal-routing.module';
import { CaughtDetailsComponent } from './components/caught-details/caught-details.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [
        JournalComponent,
        CaughtComponent,
        CaughtDetailsComponent,
    ],
    imports: [CommonModule, JournalRoutingModule, SharedModule, MatTabsModule, MatCardModule],
})
export class JournalModule {
}
