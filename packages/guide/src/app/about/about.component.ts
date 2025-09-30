import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CardComponent } from "../shared/components/card/card.component";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    imports: [CardComponent],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'app-about container block mx-auto my-10'
    }
})
export class AboutComponent {
}
