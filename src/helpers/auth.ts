import jwt from 'jwt-decode';

const setToken = (token: string) => {
	localStorage.setItem('token', token);
	localStorage.setItem('deviceId', (jwt(token) as any).di);
};

const setDeviceId = (deviceId: string) => {
	localStorage.setItem('deviceId', deviceId);
};

const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('deviceId');
	localStorage.removeItem('user');
	localStorage.removeItem('registerData');
};

const getUser = () => {
	const token = localStorage.getItem('token');
	const deviceId = localStorage.getItem('deviceId');
	const user = JSON.parse(localStorage.getItem('user') as string);

	if (!token) return null;
	else {
		return {
			token,
			deviceId,
			user
		};
	}
};

const getDeviceId = () => {
	const deviceId = localStorage.getItem('deviceId');

	if (!deviceId) return null;
	else return deviceId;
};

const getToken = () => {
	const token = localStorage.getItem('token');

	if (!token) return null;
	else return token;
};

const isLoggedIn = () => {
	const token = localStorage.getItem('token');
	const deviceId = localStorage.getItem('deviceId');
	const registerData = JSON.parse(localStorage.getItem('registerData') as string);

	if (!token || !deviceId || registerData) return false;
	else return true;
};

const register = ({ name, surname, email, country, password, timezone }: { name: string; surname: string; email: string; country: string; password: string; timezone: string }) => {
	localStorage.setItem('registerData', JSON.stringify({ name, surname, email, country, password, timezone }));

	return true;
};

const getRegisterData = () => {
	return JSON.parse(localStorage.getItem('registerData') as string);
};

const removeRegisterData = () => {
	localStorage.removeItem('registerData');
};

export { setToken, setDeviceId, logout, getUser, getToken, getDeviceId, isLoggedIn, register, getRegisterData, removeRegisterData };
