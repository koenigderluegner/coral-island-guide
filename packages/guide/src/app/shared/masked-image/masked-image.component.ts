import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-masked-image',
    template: '',
    host: {
        'class': 'block mask-contain bg-current bg-no-repeat',
        '[style.mask]': `maskValue()`,
        '[style.-webkit-mask]': 'maskValue()'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MaskedImageComponent {
    src = input.required<string>()
    protected maskValue = computed(() => {
        return `url(${this.src()}) no-repeat center/contain`
    });
}
