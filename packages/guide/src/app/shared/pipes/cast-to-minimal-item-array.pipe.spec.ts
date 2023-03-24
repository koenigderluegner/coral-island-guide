import { CastToMinimalItemArrayPipe } from './cast-to-minimal-item-array.pipe';

describe('CastToMinimalItemArrayPipe', () => {
    it('create an instance', () => {
        const pipe = new CastToMinimalItemArrayPipe();
        expect(pipe).toBeTruthy();
    });
});
