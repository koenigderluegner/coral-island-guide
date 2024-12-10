import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from "@angular/core";
import { GameVersionService } from "../injection-tokens/version.injection-token";

export const assetVersionInterceptor: HttpInterceptorFn = (req, next) => {

    const version = inject(GameVersionService).value();

    if (req.url.includes('assets')) {
        const r = req.clone({params: req.params.append('version', version)});
        return next(r);
    }

    return next(req);
};
