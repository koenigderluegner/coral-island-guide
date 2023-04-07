import { inject, Injectable } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class PageTitleService extends TitleStrategy {

    private title: Title = inject(Title)

    override updateTitle(routerState: RouterStateSnapshot) {
        const title = this.buildTitle(routerState);

        if (title !== undefined) {
            this.title.setTitle(`${title} - Coral Guide`);
        } else {
            this.title.setTitle(`Coral Guide`);
        }
    }
}
