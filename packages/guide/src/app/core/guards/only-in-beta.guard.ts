import { ActivatedRouteSnapshot, CanActivateFn, createUrlTreeFromSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { SettingsService } from "../../shared/services/settings.service";

export const onlyInBetaGuard: CanActivateFn = (route: ActivatedRouteSnapshot,) => {
    const settings = inject(SettingsService);

    if (settings.getSettings().useBeta) {
        return true
    } else {
        return createUrlTreeFromSnapshot(route, ['/only-in-beta'])
    }

};
