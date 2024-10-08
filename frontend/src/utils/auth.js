export const setToken = (token) => {
    const expirationTime = new Date().getTime() + 300 * 60 * 1000; 
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', expirationTime);
};

export const isTokenExpired = () => {
    const expirationTime = localStorage.getItem('tokenExpiration');
    const currentTime = new Date().getTime();

    if (expirationTime && currentTime > expirationTime) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('auth')
        localStorage.removeItem('role')
        return true;
    }
    return false;
};

export const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
};


/* 
1725466696934
1725466696934
*/