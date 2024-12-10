import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    readonly #isBrowser = isPlatformBrowser(inject(PLATFORM_ID))

    getItem(key: string): string | null {
        if (!this.#isBrowser) return null;
        return localStorage.getItem(key)
    }

    setItem(key: string, value: string): void {
        if (!this.#isBrowser) return;
        localStorage.setItem(key, value)
    }

    removeItem(key: string): void {
        if (!this.#isBrowser) return;
        localStorage.removeItem(key)
    }
}
