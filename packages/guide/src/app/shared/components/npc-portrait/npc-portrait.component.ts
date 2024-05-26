import { Component, HostBinding, Input, ViewEncapsulation, inject } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
    selector: 'app-npc-portrait',
    templateUrl: './npc-portrait.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class NpcPortraitComponent {
    private readonly _settings = inject(SettingsService);
    @Input({ required: true }) portraitName: string | null | undefined;
    @Input({ required: true }) npcKey: string | null | undefined;
    protected version: string;
    @HostBinding('class.npc-portrait') private _setClass = true;

    constructor() {
        this.version = this._settings.getSettings().useBeta ? 'beta' : 'live';
    }
}
