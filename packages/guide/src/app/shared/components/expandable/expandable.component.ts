import { Component } from '@angular/core';

@Component({
    selector: 'app-expandable',
    templateUrl: './expandable.component.html',
    styles: [':host{display: block}']
})
export class ExpandableComponent {

    open = false;

    toggle(): void {
        this.open = !this.open;
    }

}
