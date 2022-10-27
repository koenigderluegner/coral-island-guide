import { MaxPipe } from './max.pipe';

describe('MaxPipe', () => {
  it('create an instance', () => {
    const pipe = new MaxPipe();
    expect(pipe).toBeTruthy();
  });
});
