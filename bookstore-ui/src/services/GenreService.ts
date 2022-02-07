import IGenre from '../interfaces/Genre';
import http from './httpCommon';

const getAll = () => {
    return http.get('/genre/all', {});
};

const get = (id: number) => {
    return http.get(`/genre/${id}`, {});
};

const create = (data: IGenre) => {
    return http.post('/genre/add', data, {});
};

const update = (id: number, data: IGenre) => {
    return http.put(`/genre/update/${id}`, data, {});
};

const remove = (id: number) => {
    return http.delete(`/genre/delete/${id}`, {});
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
};
