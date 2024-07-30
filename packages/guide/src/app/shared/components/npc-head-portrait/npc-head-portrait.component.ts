import { Component, HostBinding, inject, input, ViewEncapsulation } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { GAME_VERSION } from "../../../core/injection-tokens/version.injection-token";

@Component({
    selector: 'app-npc-head-portrait',
    templateUrl: './npc-head-portrait.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class NpcHeadPortraitComponent {
    portraitName = input.required<string | null | undefined>();
    npcKey = input.required<string | null | undefined>();
    protected environment = inject(SettingsService).getSettings().useBeta ? 'beta' : 'live';
    protected version = inject(GAME_VERSION);
    @HostBinding('class.npc-head-portrait') private _setClass = true;

}
