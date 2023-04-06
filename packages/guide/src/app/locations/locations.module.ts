import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LocationsComponent } from './locations.component';
import { SharedModule } from '../shared/shared.module';
import { LakeTempleComponent } from './components/lake-temple/lake-temple.component';
import { LocationsRoutingModule } from "./locations-routing.module";
import { MatTabsModule } from "@angular/material/tabs";

@NgModule({
    declarations: [LocationsComponent, LakeTempleComponent],
    imports: [CommonModule, LocationsRoutingModule, SharedModule, MatTabsModule, NgOptimizedImage],
})
export class LocationsModule {
}
