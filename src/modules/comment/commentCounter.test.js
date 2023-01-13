import commentCounter from './commentCounter.js';

describe('commentCounter', () => {
  it('should return the number of comments', () => {
    expect(commentCounter()).toBe(1);
  });
});
