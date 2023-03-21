import { SpacesToPascalCasePipe } from './spaces-to-pascal-case.pipe';

describe('SpacesToPascalCasePipe', () => {
    it('create an instance', () => {
        const pipe = new SpacesToPascalCasePipe();
        expect(pipe).toBeTruthy();
    });
});
