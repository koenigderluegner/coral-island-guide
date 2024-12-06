import { Component, Input, numberAttribute } from '@angular/core';

@Component({
    selector: 'app-merit-points',
    templateUrl: './merit-points.component.html',
    styleUrls: ['./merit-points.component.scss'],
    standalone: false
})
export class MeritPointsComponent {

    @Input({transform: numberAttribute, required: true}) amount!: number;

}
