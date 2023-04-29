import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExtraOptions, Route, RouterModule, TitleStrategy } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { MAT_TABS_CONFIG } from '@angular/material/tabs';
import { PageTitleService } from './shared/services/page-title.service';
import { StartComponent } from './start/start.component';

const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'disabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64],
    initialNavigation: 'enabledBlocking',
};

const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: StartComponent,
    },
    {
        path: 'journal',
        loadChildren: () => import('./journal/journal.module').then((m) => m.JournalModule),
    },
    {
        path: 'database',
        pathMatch: 'full',
        redirectTo: 'database/',
    },
    {
        path: 'database/:itemId',
        loadChildren: () => import('./database/database.module').then((m) => m.DatabaseModule),
    },
    {
        path: 'crafting',
        loadChildren: () => import('./crafting/crafting.module').then((m) => m.CraftingModule),
    },
    {
        path: 'shops',
        loadChildren: () => import('./shops/shops.module').then((m) => m.ShopsModule),
    },
    {
        path: 'people',
        loadChildren: () => import('./people/people.module').then((m) => m.PeopleModule),
    },
    {
        path: 'locations',
        loadChildren: () => import('./locations/locations.module').then((m) => m.LocationsModule),
    },
    {
        path: 'planner',
        loadChildren: () =>
            import('./planner/planner.module').then((m) => m.PlannerModule),
    },
    {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule)
    },
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerOptions),
        CoreModule,
        SharedModule,
        MarkdownModule.forRoot(),
    ],
    providers: [
        {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: {disabled: true}},
        {provide: MAT_TABS_CONFIG, useValue: {animationDuration: '0'}},
        {provide: TitleStrategy, useClass: PageTitleService},
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
