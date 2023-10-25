import { ToItemListEntriesPipe } from './to-item-list-entries.pipe';

describe('ToItemListEntriesPipe', () => {
    it('create an instance', () => {
        const pipe = new ToItemListEntriesPipe();
        expect(pipe).toBeTruthy();
    });
});
