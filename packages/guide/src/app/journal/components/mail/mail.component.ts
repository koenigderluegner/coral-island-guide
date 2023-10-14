import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MailData } from "@ci/data-types";

@Component({
    selector: 'app-mail',
    templateUrl: './mail.component.html',
    styles: [`
        :host {
            display: block;
        }
    `]
})
export class MailComponent implements OnChanges {

    @Input({required: true}) mail!: MailData

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['mail']) {
            this.mail = this._parseTexts(changes['mail'].currentValue)
        }
    }

    private _parseTexts(mail: MailData): MailData {
        const mailCopy = {...mail};

        const keys = ["title", 'sender', "content", "greetCloseMessage"] as const

        keys.forEach(key => {
            let mailCopyElement: string | null = mailCopy[key];
            if (mailCopyElement) {
                mailCopyElement = mailCopyElement.replaceAll(/<PlayerName>\$player<\/>/gmi, '<span class="text-[#69ac52]">Player</span>');

                const replaceValue = key === "content" ? '<span class="text-accent">$1</span>' : '$1';

                mailCopyElement = mailCopyElement.replaceAll(/<NPCName>(.*?)<\/>/gmi, replaceValue)
                mailCopyElement = mailCopyElement.replaceAll(/<items>(.*?)<\/>/gmi, replaceValue)
                mailCopyElement = mailCopyElement.replaceAll(/<RickText.Place>(.*?)<\/>/gmi, replaceValue)
                mailCopyElement = mailCopyElement.replaceAll(/<Places>(.*?)<\/>/gmi, replaceValue)

                mailCopy[key] = mailCopyElement;
            }
        })


        return mailCopy;
    }
}
