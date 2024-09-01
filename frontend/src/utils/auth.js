export const setToken = (token) => {
    const expirationTime = new Date().getTime() + 30 * 60 * 1000; 
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', expirationTime);
};

export const isTokenExpired = () => {
    const expirationTime = localStorage.getItem('tokenExpiration');
    const currentTime = new Date().getTime();

    if (expirationTime && currentTime > expirationTime) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        return true;
    }
    return false;
};

export const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
};
