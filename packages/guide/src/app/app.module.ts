import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),
        CoreModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
