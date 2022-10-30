import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { UiIcon } from '../../enums/ui-icon.enum';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'app-list-detail-container',
    templateUrl: './list-detail-container.component.html',
    styleUrls: ['./list-detail-container.component.scss'],
})
export class ListDetailContainerComponent {
    @ViewChild('drawer') drawer?: MatDrawer;

    @Input()
    get openDrawer(): boolean {
        return this._openDrawer;
    }

    set openDrawer(size: boolean | number | string | null | undefined) {
        this._openDrawer = coerceBooleanProperty(size);
        this.openDrawer ? this.drawer?.open() : this.drawer?.close();

    }

    @Output() openDrawerChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    _openDrawer = false;

    uiIcon = UiIcon;

    mobileQuery: MediaQueryList;

    private readonly _mobileQueryListener: () => void;
    media: MediaMatcher = inject(MediaMatcher);
    changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

    constructor() {
        this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

}
