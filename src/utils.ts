import cookie from 'js-cookie';

export const SERVICE_API_URL = 'http://35.228.28.191:5000/api';
export const YANDEX_API_KEY = 'dea03618-5cfd-4539-8433-fded4842f48f';
export const AUTH_COOKIE_KEY = 'auth_cookie';

export const getJwt = () => {
	return cookie.get(AUTH_COOKIE_KEY);
};

export const setJwt = (token: string) => {
	cookie.set(AUTH_COOKIE_KEY, token);
};

export const removeJwt = () => {
	cookie.remove(AUTH_COOKIE_KEY);
};
