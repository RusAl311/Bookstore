import IGenre from '../interfaces/Genre';
import authHeader from '../services/Auth/AuthHeaderService';
import http from './httpCommon';

const getAll = () => {
    return http.get('/genre/all', { headers: authHeader() });
};

const get = (id: number) => {
    return http.get(`/genre/${id}`, { headers: authHeader() });
};

const create = (data: IGenre) => {
    return http.post('/genre/add', data, { headers: authHeader() });
};

const update = (id: number, data: IGenre) => {
    return http.put(`/genre/update/${id}`, data, { headers: authHeader() });
};

const remove = (id: number) => {
    return http.delete(`/genre/delete/${id}`, { headers: authHeader() });
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
};
