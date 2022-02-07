import IBook from '../interfaces/Book';
import http from './httpCommon';

const getAll = () => {
    return http.get('/book/all', {});
};

const get = (id: number) => {
    return http.get(`/book/${id}`, {});
};

const create = (data: IBook) => {
    return http.post('/book/add', data, {});
};

const update = (id: number, data: IBook) => {
    return http.put(`/book/update/${id}`, data, {});
};

const remove = (id: number) => {
    return http.delete(`/book/delete/${id}`, {});
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
};
