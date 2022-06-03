import Cookies from 'js-cookie';
import { FruitInDiet } from '../pages/fruits/[fruitId]';

export function getParsedCookie(key: string) {
  const cookieValue = Cookies.get(key); // Type is string | undefined

  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(cookieValue); // Type is string
  } catch (err) {
    return undefined;
  }
}

export function setStringifiedCookie(key: string, value: FruitInDiet[]) {
  Cookies.set(key, JSON.stringify(value));
}

export function stringifyCookieValue(value: FruitInDiet[]) {
  return JSON.stringify(value);
}

export function deleteCookie(key: string) {
  Cookies.remove(key);
}
