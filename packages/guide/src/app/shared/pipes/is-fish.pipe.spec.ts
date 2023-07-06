import { IsFishPipe } from './is-fish.pipe';

describe('IsFishPipe', () => {
    it('create an instance', () => {
        const pipe = new IsFishPipe();
        expect(pipe).toBeTruthy();
    });
});
