export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('jwt', token);
        // Définir une date d'expiration (1 jour)
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1);
        localStorage.setItem('jwt_expiry', expiryDate.toISOString());
    } else {
        localStorage.removeItem('jwt');
        localStorage.removeItem('jwt_expiry');
    }
};

export const getAuthToken = () => {
    return localStorage.getItem('jwt')
}

export const isAuthenticated = () => {
    return !!getAuthToken()
}