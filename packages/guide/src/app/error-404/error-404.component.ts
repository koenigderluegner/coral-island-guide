import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CardComponent } from "../shared/components/card/card.component";

@Component({
    selector: 'app-error-404',
    imports: [
        RouterLink,
        CardComponent
    ],
    templateUrl: './error-404.component.html',
    host: {
        'class': 'app-error container mx-auto my-10 block'
    },
    encapsulation: ViewEncapsulation.None
})
export class Error404Component {
}
