import { APP_INITIALIZER, isDevMode, NgModule, Optional } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExtraOptions, Route, RouterModule, TitleStrategy } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { MAT_TABS_CONFIG, MatTabsConfig } from '@angular/material/tabs';
import { PageTitleService } from './shared/services/page-title.service';
import { StartComponent } from './start/start.component';
import { BETA_CODE } from "./core/injection-tokens/beta-code.injection-token";
import { SettingsService } from "./shared/services/settings.service";
import { of } from "rxjs";
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'disabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64],
    initialNavigation: 'enabledBlocking',
    bindToComponentInputs: true
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
        path: 'people',
        pathMatch: 'prefix',
        redirectTo: 'npcs',
    },
    {
        path: 'npcs',
        loadChildren: () => import('./npcs/npcs.module').then((m) => m.NPCsModule),
    },
    {
        path: 'locations',
        loadChildren: () => import('./locations/locations.module').then((m) => m.LocationsModule),
    },
    {
        path: 'settings',
        pathMatch: "full",
        redirectTo: 'my/settings',
        data: {
            redirected: true
        }
    },
    {
        path: 'checklist',
        pathMatch: "prefix",
        redirectTo: 'my/to-do',
        data: {
            redirected: true
        }
    },
    {
        path: 'only-in-beta',
        loadComponent: () => import('./only-in-beta/only-in-beta.component').then(c => c.OnlyInBetaComponent)
    },
    {
        path: 'my',
        loadChildren: () => import('./my-coral-guide/my-coral-guide.module').then(m => m.MyCoralGuideModule)
    },
    {
        path: 'about',
        loadComponent: () => import('./about/about.component').then(c => c.AboutComponent)
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
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        MatProgressSpinnerModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: (BETA_CODE: string | null, settingsService: SettingsService) => {
                if (!BETA_CODE) {
                    settingsService.saveSettings({...settingsService.getSettings(), useBeta: false})
                }
                return () => of()
            },
            deps: [[new Optional(), BETA_CODE], SettingsService]
        },
        {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: {disabled: true}},
        {provide: MAT_TABS_CONFIG, useValue: {animationDuration: '0', stretchTabs: false} satisfies MatTabsConfig},
        {provide: TitleStrategy, useClass: PageTitleService},
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
