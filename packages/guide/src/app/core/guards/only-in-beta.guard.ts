import { CanActivateFn, RedirectCommand, Router } from "@angular/router";
import { inject } from "@angular/core";
import { SettingsService } from "../../shared/services/settings.service";

export const onlyInBetaGuard: CanActivateFn = () => {
    const settings = inject(SettingsService);
    const router = inject(Router);

    if (settings.getSettings().useBeta) {
        return true
    } else {
        const routePath = router.parseUrl('/only-in-beta');
        return new RedirectCommand(routePath, {
            skipLocationChange: true,
        });
    }

};
