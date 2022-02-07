import IAuthor from '../interfaces/Author';
import authHeader from '../services/Auth/AuthHeaderService';
import http from './httpCommon';

const getAll = () => {
    return http.get('/author/all', { headers: authHeader() });
};

const get = (id: number) => {
    return http.get(`/author/${id}`, { headers: authHeader() });
};

const create = (data: IAuthor) => {
    return http.post('/author/add', data, { headers: authHeader() });
};

const update = (id: number, data: IAuthor) => {
    return http.put(`/author/update/${id}`, data, { headers: authHeader() });
};

const remove = (id: number) => {
    return http.delete(`/author/delete/${id}`, { headers: authHeader() });
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
};
