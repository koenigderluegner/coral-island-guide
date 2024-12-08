import { Component, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-error-404',
    imports: [
        SharedModule,
        RouterLink
    ],
    templateUrl: './error-404.component.html',
    host: {
        'class': 'app-error container mx-auto my-10 block'
    },
    encapsulation: ViewEncapsulation.None
})
export class Error404Component {
}
