import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { GAME_VERSION } from "../../../core/injection-tokens/version.injection-token";

@Component({
    selector: 'app-npc-portrait',
    templateUrl: './npc-portrait.component.html',
    encapsulation: ViewEncapsulation.None,

    host: {
        'class': 'npc-portrait'
    }
})
export class NpcPortraitComponent {
    readonly portraitName = input.required<string | null | undefined>();
    readonly npcKey = input.required<string | null | undefined>();
    protected readonly environment = inject(SettingsService).getSettings().useBeta ? 'beta' : 'live';
    protected readonly version = inject(GAME_VERSION);

}
