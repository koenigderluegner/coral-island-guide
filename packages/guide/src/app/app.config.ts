import { ApplicationConfig, importProvidersFrom, inject, isDevMode, provideAppInitializer } from '@angular/core';
import {
    ExtraOptions,
    provideRouter,
    TitleStrategy,
    withComponentInputBinding,
    withEnabledBlockingInitialNavigation,
    withRouterConfig,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { provideMarkdown } from 'ngx-markdown';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SettingsService } from './shared/services/settings.service';
import { of } from 'rxjs';
import { BETA_CODE } from './core/injection-tokens/beta-code.injection-token';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { MAT_TABS_CONFIG, MatTabsConfig } from '@angular/material/tabs';
import { PageTitleService } from './shared/services/page-title.service';
import { provideGameVersion } from './core/injection-tokens/version.injection-token';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { assetVersionInterceptor } from './core/interceptors/asset-version.interceptor';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'disabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64],
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideClientHydration(withEventReplay()),
        provideRouter(
            appRoutes,
            withComponentInputBinding(),
            withEnabledBlockingInitialNavigation(),
            withRouterConfig(routerOptions)
        ),
        provideAnimationsAsync(),
        provideMarkdown(),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {appearance: 'outline', hideRequiredMarker: false} satisfies MatFormFieldDefaultOptions,
        },
        provideAppInitializer(() => {
            const initializerFn = ((BETA_CODE: string | null, settingsService: SettingsService) => {
                if (!BETA_CODE) {
                    settingsService.saveSettings({...settingsService.getSettings(), useBeta: false});
                }
                return () => of();
            })(inject(BETA_CODE, {optional: true}), inject(SettingsService));
            return initializerFn();
        }),
        {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: {disabled: true}},
        {provide: MAT_TABS_CONFIG, useValue: {animationDuration: '0', stretchTabs: false} satisfies MatTabsConfig},
        {provide: TitleStrategy, useClass: PageTitleService},
        provideHttpClient(withInterceptors([assetVersionInterceptor]), withFetch()),
        importProvidersFrom(
            ServiceWorkerModule.register('ngsw-worker.js', {
                enabled: !isDevMode(),
                // Register the ServiceWorker as soon as the application is stable
                // or after 30 seconds (whichever comes first).
                registrationStrategy: 'registerWhenStable:30000',
            })
        ),

        provideGameVersion(),
    ],
};
