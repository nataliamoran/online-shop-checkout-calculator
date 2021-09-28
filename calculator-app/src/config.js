const BASE_DJANGO_URL = window.location.origin.match(/localhost/)
  ? 'http://localhost:8000'
  : window.location.origin;

const BASE_REACT_URL = window.location.origin.match(/localhost/)
  ? 'http://localhost:3000'
  : window.location.origin;

const API_ROOT = 'api';
export const CART = `${BASE_DJANGO_URL}/${API_ROOT}/cart`;
export const PRODUCTS = `${BASE_DJANGO_URL}/${API_ROOT}/products/`;

export const STORE =  `${BASE_REACT_URL}/`;
export const CHECKOUT =  `${BASE_REACT_URL}/checkout`;
export const ABOUT =  `${BASE_REACT_URL}/about`;
export const CONTACT =  `${BASE_REACT_URL}/contact`;