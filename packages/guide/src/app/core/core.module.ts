import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    declarations: [HeaderComponent, FooterComponent],
    imports: [CommonModule, SharedModule, RouterModule, CdkConnectedOverlay, CdkOverlayOrigin],
    exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {
}
