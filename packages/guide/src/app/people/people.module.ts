import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent } from './people.component';
import { SharedModule } from '../shared/shared.module';
import { GiftingComponent } from './components/gifting/gifting.component';
import { PeopleRoutingModule } from './people-routing.module';

@NgModule({
    declarations: [PeopleComponent, GiftingComponent],
    imports: [CommonModule, PeopleRoutingModule, SharedModule],
})
export class PeopleModule {
}
