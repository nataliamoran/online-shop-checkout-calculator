   const BASE_URL = window.location.origin.match(/localhost/)
  ? 'http://localhost:3000'
  : window.location.origin;

const API_ROOT = 'api';
export const CART = `${BASE_URL}/${API_ROOT}/cart`;
export const PRODUCTS = `${BASE_URL}/${API_ROOT}/products`;

export const STORE =  `${BASE_URL}/`;
export const CHECKOUT =  `${BASE_URL}/checkout`;
export const ABOUT =  `${BASE_URL}/about`;
export const CONTACT =  `${BASE_URL}/contact`;