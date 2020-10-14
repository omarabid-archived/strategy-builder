const sum_test = require('../sum');

test('adds 1 + 2 to equal 3', () => {
    expect(sum_test(1, 2)).toBe(3);
});
