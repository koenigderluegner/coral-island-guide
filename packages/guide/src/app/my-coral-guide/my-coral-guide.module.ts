import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCoralGuideComponent } from './my-coral-guide.component';
import { IndexComponent } from './components/index/index.component';
import { MyCoralGuideRoutingModule } from "./my-coral-guide-routing.module";


@NgModule({
    declarations: [MyCoralGuideComponent, IndexComponent],
    imports: [CommonModule, MyCoralGuideRoutingModule],
})
export class MyCoralGuideModule {
}
