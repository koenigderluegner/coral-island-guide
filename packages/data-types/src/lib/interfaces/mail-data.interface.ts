import { Effect } from "../types/effects/effect.type";

export interface MailData {
    key: string;
    sender: string | null,
    title: string | null,
    content: string,
    greetOpenMessage: string | null,
    greetCloseMessage: string | null,
    mailType: string | null
    tags: string[],

    isImportant: boolean;
    effects?: Effect[]
}
