import {
  deleteCookie,
  getParsedCookie,
  setStringifiedCookie,
  stringifyCookieValue,
} from '../cookies';

// This is closest to what we want in unit tests
// testing a single, small function that is pure
test('stringify a cookie value', () => {
  expect(stringifyCookieValue({ 1: 10, 2: 15 })).toBe('{"1":10,"2":15}');
});

test('set, gets and delete a cookie', () => {
  const cookie = {
    key: 'diet',
    value: [{ id: '1', eatCounter: 2 }],
  };
  // First, make sure that the value is undefined
  // Use .toBe to compare primitive values or to check referential identity of object instances.
  expect(getParsedCookie(cookie.key)).toBe(undefined);

  // Set the cookie value and test that the value was updated
  expect(() => setStringifiedCookie(cookie.key, cookie.value)).not.toThrow();

  // Use .toStrictEqual to test that objects have the same types as well as structure.
  expect(getParsedCookie(cookie.key)).toStrictEqual(cookie.value);

  // Best practice: clear state after test to bring the system back to the initial state
  expect(deleteCookie(cookie.key)).toBe(undefined);
  expect(getParsedCookie(cookie.key)).toBe(undefined);
});
