import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from "@angular/core";
import { GAME_VERSION } from "../injection-tokens/version.injection-token";

export const assetVersionInterceptor: HttpInterceptorFn = (req, next) => {

    const version = inject(GAME_VERSION)

    if (req.url.includes('assets')) {
        const r = req.clone({params: req.params.append('version', version)});
        return next(r);
    }

    return next(req);
};
