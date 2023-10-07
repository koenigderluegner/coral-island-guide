import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCoralGuideComponent } from './my-coral-guide.component';
import { IndexComponent } from './components/index/index.component';
import { MyCoralGuideRoutingModule } from "./my-coral-guide-routing.module";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [MyCoralGuideComponent, IndexComponent],
    imports: [CommonModule, MyCoralGuideRoutingModule, SharedModule],
})
export class MyCoralGuideModule {
}
