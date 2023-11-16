import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';


@Component({
    selector: 'app-changelog',
    standalone: true,
    imports: [CommonModule, MarkdownModule],
    providers: [MarkdownService],
    template: '<markdown [data]="markdown" />',
})
export class ChangelogComponent {

    @Input({required: true}) markdown!: string;

}
