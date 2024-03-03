import { Component, HostBinding, inject, Input, ViewEncapsulation } from '@angular/core';
import { SettingsService } from "../../../shared/services/settings.service";

@Component({
    selector: 'app-bestiary-image',
    templateUrl: './bestiary-image.component.html',
    encapsulation: ViewEncapsulation.None
})
export class BestiaryImageComponent {

    @Input() imageName?: string | null | undefined;

    protected version = inject(SettingsService).getSettings().useBeta ? 'beta' : 'live';
    @HostBinding('class.bestiary-image') private _setClass = true;

}
