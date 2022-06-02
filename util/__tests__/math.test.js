import { sum } from '../math';

test('adds two numbers together', () => {
  expect(sum(1, 1)).toBe(2);
  expect(sum(1, 2)).toBe(3);
  expect(sum(-1, 1)).toBe(0);
});

test('throws an error if arguments are not numbers', () => {
  expect(() => sum(1, '2')).toThrow('Pass only numbers!');
  expect(() => sum('1', 2)).toThrow('Pass only numbers!');
  expect(() => sum('hallo', '2')).toThrow('Pass only numbers!');
});
