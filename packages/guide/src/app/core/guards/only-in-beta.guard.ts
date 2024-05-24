import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { SettingsService } from "../../shared/services/settings.service";

export const onlyInBetaGuard: CanActivateFn = (route: ActivatedRouteSnapshot,) => {
    const settings = inject(SettingsService);
    const router = inject(Router);

    if (settings.getSettings().useBeta) {
        return true
    } else {
        return router.createUrlTree(['/only-in-beta'])
    }

};
