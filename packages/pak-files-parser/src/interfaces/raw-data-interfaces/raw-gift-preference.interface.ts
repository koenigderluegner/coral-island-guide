import { SourceString } from '../../types/source-string.type';
import { ItemDatatableRef } from '../../types/item-datatable-ref';
import { DatatableRef } from '../../types/datatable-ref.type';

export interface RawGiftPreferenceInterface {
    favoritePreferences: RawPreferecne[];
    lovePreferences: RawPreferecne[];
    likePreferences: RawPreferecne[];
    neutralPreferences: RawPreferecne[];
    dislikePreferences: RawPreferecne[];
    hatePreferences: RawPreferecne[];

    [key: string]: RawPreferecne[];
}

interface RawPreferecne {
    data: {
        item: ItemDatatableRef;
        category: {
            data: DatatableRef;
        };
        tags: string[];
        dialogueText: SourceString;
        dialogueBirthdayText: SourceString;
        emoji: {
            DataTable: null;
            RowName: 'None';
        };
        portrait: {
            DataTable: null;
            RowName: 'None';
        };
    };
}
