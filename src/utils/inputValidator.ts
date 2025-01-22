export const validatePassword = (password: string) => {
    return password.length > 8;
};

export     const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
