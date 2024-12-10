import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { GameVersionService } from "../../../core/injection-tokens/version.injection-token";

@Component({
    selector: 'app-npc-head-portrait',
    templateUrl: './npc-head-portrait.component.html',
    encapsulation: ViewEncapsulation.None,

    host: {
        'class': 'npc-head-portrait'
    }
})
export class NpcHeadPortraitComponent {
    readonly portraitName = input.required<string | null | undefined>();
    readonly npcKey = input.required<string | null | undefined>();
    protected readonly environment = inject(SettingsService).getSettings().useBeta ? 'beta' : 'live';
    protected readonly version = inject(GameVersionService).value();
}
