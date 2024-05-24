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
import { ProduceDetailsComponent } from './components/produce-details/produce-details.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CaughtTableComponent } from './components/tables/caught-table/caught-table.component';
import { MatTableModule } from '@angular/material/table';
import { FoundTableComponent } from './components/tables/found-table/found-table.component';
import { ProduceTableComponent } from './components/tables/produce-table/produce-table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CropTableComponent } from './components/tables/crop-table/crop-table.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { NotesComponent } from './components/notes/notes.component';
import { MailDetailsComponent } from './components/mail-details/mail-details.component';
import { MailTableComponent } from './components/tables/mail-table/mail-table.component';
import { TornPagesTableComponent } from './components/tables/torn-pages-table/torn-pages-table.component';
import { TornPageDetailsComponent } from './components/torn-page-details/torn-page-details.component';
import { LocationsModule } from '../locations/locations.module';
import { MailComponent } from './components/mail/mail.component';
import { MatButtonModule } from '@angular/material/button';
import { TornPageComponent } from './components/torn-page/torn-page.component';
import { BestiaryComponent } from './components/bestiary/bestiary.component';
import { BestiaryDetailsComponent } from './components/bestiary-details/bestiary-details.component';
import { BestiaryTableComponent } from './components/tables/bestiary-table/bestiary-table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BestiaryImageComponent } from './components/bestiary-image/bestiary-image.component';
import { DatabaseItemDetailsComponent } from "../shared/components/database-item-details/database-item-details.component";
import { FishComponent } from "../shared/components/database-item-details/fish/fish.component";
import { AddSpacesToPascalCasePipe } from "../shared/pipes/add-spaces-to-pascal-case.pipe";
import { InsectComponent } from "../shared/components/database-item-details/insect/insect.component";
import { DatabaseItemDetailsDirective } from "../shared/directives/database-item-details.directive";
import { ShopProcessingResultComponent } from "../shared/components/database-item-details/shop-processing-result/shop-processing-result.component";
import { CropComponent } from "../shared/components/database-item-details/crop/crop.component";
import { ProcessingComponent } from "../shared/components/database-item-details/processing/processing.component";
import { AnimalProduceComponent } from "../shared/components/database-item-details/animal-produce/animal-produce.component";
import { FoundComponent as DbItemFound } from "../shared/components/database-item-details/found/found.component";
import { FullSizeImageComponent } from "../shared/components/full-size-image/full-size-image.component";

@NgModule({
    declarations: [
        JournalComponent,
        CaughtComponent,
        CaughtDetailsComponent,
        BaseJournalPageComponent,
        FoundComponent,
        ProduceComponent,
        ProduceDetailsComponent,
        CaughtTableComponent,
        FoundTableComponent,
        ProduceTableComponent,
        CropTableComponent,
        AchievementsComponent,
        NotesComponent,
        MailDetailsComponent,
        MailTableComponent,
        TornPagesTableComponent,
        TornPageDetailsComponent,
        MailComponent,
        TornPageComponent,
        BestiaryComponent,
        BestiaryDetailsComponent,
        BestiaryTableComponent,
        BestiaryImageComponent,
    ],
    imports: [
        CommonModule,
        JournalRoutingModule,
        SharedModule,
        MatTabsModule,
        MatCardModule,
        MatSidenavModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        LocationsModule,
        MatButtonModule,
        MatTooltipModule,
        DatabaseItemDetailsComponent,
        FishComponent,
        AddSpacesToPascalCasePipe,
        InsectComponent,
        DatabaseItemDetailsDirective,
        ShopProcessingResultComponent,
        CropComponent,
        ProcessingComponent,
        AnimalProduceComponent,
        DbItemFound,
        FullSizeImageComponent,
    ],
    exports: [CaughtDetailsComponent, CaughtTableComponent, CropTableComponent, BestiaryTableComponent],
})
export class JournalModule {
}
