import { sum } from '../math';

test('add two numbers together', () => {
  expect(sum(1, 1)).toBe(2);
  expect(sum(-100, 200)).toBe(100);
  expect(sum(1, 1)).not.toBe(100);
});

test('throws an error if arguments are not numbers', () => {
  // Wrap the code in a function, otherwise the error will not be caught and the assertion will fail
  // https://jestjs.io/docs/expect#tothrowerror
  // @ts-expect-error testing incorrect argument type
  expect(() => sum(1, '2')).toThrow('Pass only numbers!');
  // @ts-expect-error testing incorrect argument type
  expect(() => sum('1', 'number')).toThrow('Pass only numbers!');
});
