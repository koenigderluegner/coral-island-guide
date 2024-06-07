import { booleanAttribute, Component, computed, HostBinding, inject, input, ViewEncapsulation } from '@angular/core';
import { SettingsService } from "../../services/settings.service";

@Component({
    selector: 'app-full-size-image',
    standalone: true,
    imports: [],
    templateUrl: './full-size-image.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FullSizeImageComponent {

    imageName = input.required<string | null | undefined>();
    hasThumb = input(false, {transform: booleanAttribute});

    shownImage = computed(() => {
        const imagePath = this.imageName();

        if (!imagePath || !this.hasThumb()) return imagePath;

        const parts = imagePath.split('/');
        parts.splice(parts.length - 1, 0, 'thumbs')
        return parts.join('/');

    })
    protected version = inject(SettingsService).getSettings().useBeta ? 'beta' : 'live';
    @HostBinding('class.full-size-image') private _setClass = true;

}
