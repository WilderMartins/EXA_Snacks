export const isAuthenticated = () => localStorage.getItem('token') !== null;

export const getToken = () => localStorage.getItem('token');

export const login = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
