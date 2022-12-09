import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { default as pageMarkdown } from 'raw-loader!../../../CHANGELOG.md';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';


@Component({
    selector: 'app-changelog',
    standalone: true,
    imports: [CommonModule, MarkdownModule],
    providers: [MarkdownService],
    templateUrl: './changelog.component.html',
    styleUrls: ['./changelog.component.scss'],
})
export class ChangelogComponent {

    markdown = pageMarkdown;

}
