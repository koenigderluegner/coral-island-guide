import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCoralGuideComponent } from './my-coral-guide.component';
import { IndexComponent } from './components/index/index.component';
import { MyCoralGuideRoutingModule } from './my-coral-guide-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MuseumChecklistComponent } from './components/museum-checklist/museum-checklist.component';
import { JournalModule } from '../journal/journal.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { CookingRecipesChecklistComponent } from './components/cooking-recipes-checklist/cooking-recipes-checklist.component';
import { OfferingsChecklistComponent } from './components/offerings-checklist/offerings-checklist.component';
import { LocationsModule } from "../locations/locations.module";

@NgModule({
    declarations: [
        MyCoralGuideComponent,
        IndexComponent,
        MuseumChecklistComponent,
        CookingRecipesChecklistComponent,
        OfferingsChecklistComponent,
    ],
    imports: [
        CommonModule,
        MyCoralGuideRoutingModule,
        SharedModule,
        JournalModule,
        MatTabsModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        LocationsModule,
    ],
})
export class MyCoralGuideModule {
}
