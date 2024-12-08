import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';


@Component({
    selector: 'app-changelog',
    imports: [CommonModule, MarkdownModule],
    template: '<markdown [data]="markdown()" />'
})
export class ChangelogComponent {

    readonly markdown = input.required<string>();

}
