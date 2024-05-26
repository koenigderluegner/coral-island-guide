import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ListDetailService {


    #drawerOpened = signal(false);

    toggle() {
        this.#drawerOpened.update(o => !o);
    }

    open() {
        this.#drawerOpened.set(true);
    }

    close() {
        this.#drawerOpened.set(false);
    }

    get() {
        return this.#drawerOpened.asReadonly();
    }

}
