import {
  deleteCookie,
  getParsedCookie,
  setStringifiedCookie,
  stringifyCookieValue,
} from '../cookies';

// This is closest to what you want your unit
// tests to be like - testing a single, small
// function that is pure (doesn't have any
// side effects)
test('stringifies a cookie value', () => {
  expect(stringifyCookieValue({ 1: 10, 2: 15 })).toBe(
    JSON.stringify({ 1: 10, 2: 15 }),
  );
});

// Also tests the implementation details of the
// js-cookie library, which may not be as useful
// for you
test('sets, gets and deletes a cookie', () => {
  const cookie = {
    key: 'stars',
    value: { 1: 3, 2: 4 },
  };
  // First, make sure that the value at the start is undefined
  expect(getParsedCookie(cookie.key)).toBe(undefined);

  // Set the cookie value and test that the value was updated
  expect(setStringifiedCookie(cookie.key, cookie.value)).toBeUndefined();
  // expect(setStringifiedCookie(cookie.key, cookie.value)).toBe(undefined);
  expect(getParsedCookie(cookie.key)).toStrictEqual(cookie.value);

  // Best practice: tests clean up any state after themselves
  expect(deleteCookie(cookie.key)).toBe(undefined);
  expect(getParsedCookie(cookie.key)).toBe(undefined);
});
