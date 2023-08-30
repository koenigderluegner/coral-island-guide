import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { SettingsService } from "../../services/settings.service";

@Component({
    selector: 'app-npc-head-portrait',
    templateUrl: './npc-head-portrait.component.html',
    encapsulation: ViewEncapsulation.None
})
export class NpcHeadPortraitComponent {
    @Input({required: true}) portraitName: string | null | undefined;
    @Input({required: true}) npcKey: string | null | undefined;
    protected version: string;
    @HostBinding('class.npc-head-portrait') private _setClass = true;

    constructor(private readonly _settings: SettingsService) {
        this.version = this._settings.getSettings().useBeta ? 'beta' : 'live';
    }


}
