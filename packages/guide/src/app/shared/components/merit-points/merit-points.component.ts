import { Component, Input, numberAttribute } from '@angular/core';

@Component({
    selector: 'app-merit-points',
    templateUrl: './merit-points.component.html',
    styleUrls: ['./merit-points.component.scss']
})
export class MeritPointsComponent {

    @Input({transform: numberAttribute, required: true}) amount!: number;

}
