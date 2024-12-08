import { booleanAttribute, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { SettingsService } from "../../services/settings.service";

@Component({
    selector: 'app-full-size-image',
    templateUrl: './full-size-image.component.html',
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'full-size-image'
    }
})
export class FullSizeImageComponent {

    readonly imageName = input.required<string | null | undefined>();
    readonly hasThumb = input(false, {transform: booleanAttribute});

    readonly shownImage = computed(() => {
        const imagePath = this.imageName();

        if (!imagePath || !this.hasThumb()) return imagePath;

        const parts = imagePath.split('/');
        parts.splice(parts.length - 1, 0, 'thumbs')
        return parts.join('/');

    })
    protected readonly version = inject(SettingsService).getSettings().useBeta ? 'beta' : 'live';

}
