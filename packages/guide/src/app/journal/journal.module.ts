import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalComponent } from './journal.component';
import { SharedModule } from '../shared/shared.module';
import { CaughtComponent } from './components/caught/caught.component';
import { MatTabsModule } from '@angular/material/tabs';
import { JournalRoutingModule } from './journal-routing.module';
import { CaughtDetailsComponent } from './components/caught-details/caught-details.component';
import { MatCardModule } from '@angular/material/card';
import { BaseJournalPageComponent } from './components/base-journal-page/base-journal-page.component';
import { FoundComponent } from './components/found/found.component';
import { ProduceComponent } from './components/produce/produce.component';
import { FoundDetailsComponent } from './components/found-details/found-details.component';
import { ProduceDetailsComponent } from './components/produce-details/produce-details.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
    declarations: [
        JournalComponent,
        CaughtComponent,
        CaughtDetailsComponent,
        BaseJournalPageComponent,
        FoundComponent,
        ProduceComponent,
        FoundDetailsComponent,
        ProduceDetailsComponent,
    ],
    imports: [
        CommonModule,
        JournalRoutingModule,
        SharedModule,
        MatTabsModule,
        MatCardModule,
        MatSidenavModule
    ],
})
export class JournalModule {
}
