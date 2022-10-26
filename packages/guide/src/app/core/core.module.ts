import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule {
}
