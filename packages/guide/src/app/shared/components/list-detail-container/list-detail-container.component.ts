import {
    booleanAttribute,
    ChangeDetectorRef,
    Component,
    effect,
    inject,
    input,
    OnDestroy,
    ViewChild
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { UiIcon } from '@ci/data-types';
import { MatDrawer } from '@angular/material/sidenav';
import { ListDetailService } from "./list-detail.service";

@Component({
    selector: 'app-list-detail-container',
    templateUrl: './list-detail-container.component.html',
    styleUrl: './list-detail-container.component.scss',
    standalone: false
})
export class ListDetailContainerComponent implements OnDestroy {
    @ViewChild('drawer') drawer?: MatDrawer;
    removePlaceholder = input(false, {transform: booleanAttribute})
    uiIcon = UiIcon;
    mobileQuery: MediaQueryList;
    media: MediaMatcher = inject(MediaMatcher);
    changeDetectorRef = inject(ChangeDetectorRef);
    readonly #drawerService = inject(ListDetailService);

    constructor() {
        this.mobileQuery = this.media.matchMedia('(max-width: calc(600px - 1.5rem))');
        this.mobileQuery.addListener(this.#mobileQueryListener);

        effect(() => {
            const isOpen = this.#drawerService.get()();
            isOpen ? this.drawer?.open() : this.drawer?.close();


        });

    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this.#mobileQueryListener);
    }

    readonly #mobileQueryListener = () => this.changeDetectorRef.detectChanges()

}
