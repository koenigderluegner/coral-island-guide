import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),
        CoreModule,
        SharedModule,
        MarkdownModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
