import IBook from '../interfaces/Book';
import authHeader from '../services/Auth/AuthHeaderService';
import http from './httpCommon';

const getAll = () => {
    return http.get('/book/all', { headers: authHeader() });
};

const get = (id: number) => {
    return http.get(`/book/${id}`, { headers: authHeader() });
};

const create = (data: IBook) => {
    return http.post('/book/add', data, { headers: authHeader() });
};

const update = (id: number, data: IBook) => {
    return http.put(`/book/update/${id}`, data, { headers: authHeader() });
};

const remove = (id: number) => {
    return http.delete(`/book/delete/${id}`, { headers: authHeader() });
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
};
