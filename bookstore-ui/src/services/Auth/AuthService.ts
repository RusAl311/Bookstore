import http from '../httpCommon';

const login = async (username: any, password: any) => {
    const response = await http.post('/token', {
        username,
        password,
    });
    if (response.data) {
        localStorage.setItem('token', JSON.stringify(response.data));
    }
    return response;
};

export default {
    login,
};
