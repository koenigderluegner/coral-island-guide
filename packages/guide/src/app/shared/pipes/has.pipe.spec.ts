import { HasPipe } from './has.pipe';

describe('HasPipe', () => {
    it('create an instance', () => {
        const pipe = new HasPipe();
        expect(pipe).toBeTruthy();
    });
});
