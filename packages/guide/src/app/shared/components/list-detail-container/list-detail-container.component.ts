import {
    booleanAttribute,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    inject,
    input,
    Input,
    OnDestroy,
    Output,
    ViewChild
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { UiIcon } from '@ci/data-types';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'app-list-detail-container',
    templateUrl: './list-detail-container.component.html',
    styleUrl: './list-detail-container.component.scss'
})
export class ListDetailContainerComponent implements OnDestroy{
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

    removePlaceholder = input(false, {transform: booleanAttribute})

    uiIcon = UiIcon;

    mobileQuery: MediaQueryList;

    private readonly _mobileQueryListener: () => void;
    media: MediaMatcher = inject(MediaMatcher);
    changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

    constructor() {
        this.mobileQuery = this.media.matchMedia('(max-width: calc(600px - 1.5rem))');
        this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

}
