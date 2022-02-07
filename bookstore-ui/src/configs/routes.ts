import IRoute from '../interfaces/routes';
import { Author } from '../modules/Author/index';
import { Book } from '../modules/Book/index';
import { Dashboard } from '../modules/Dashboard';
import { Genre } from '../modules/Genre/index';
import { Login } from '../modules/Login/index';

const routes: IRoute[] = [
    {
        path: '/index',
        name: 'home',
        exact: true,
        component: Dashboard,
        layout: '/main',
    },
    {
        path: '/login',
        name: 'login',
        exact: true,
        component: Login,
        layout: '/auth',
    },
    {
        path: '/book',
        name: 'book',
        exact: true,
        component: Book,
        layout: '/main',
    },
    {
        path: '/author',
        name: 'author',
        exact: true,
        component: Author,
        layout: '/main',
    },
    {
        path: '/genre',
        name: 'genre',
        exact: true,
        component: Genre,
        layout: '/main',
    },
];

export default routes;
