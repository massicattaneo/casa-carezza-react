import { Find } from '../components/Find/Find';
import { Board } from '../components/Board/Board';
import { ContactUs } from '../components/ContactUs/ContactUs';
import { Home } from '../components/Home/Home';
import { Photos } from '../components/Photos/Photos';
import { Admin } from '../components/Admin/Admin';

const routes = [
    {
        path: '/index.html',
        exact: true,
        component: Home
    },
    {
        path: '/bacheca.html',
        exact: true,
        component: Board
    },
    {
        path: '/foto.html',
        exact: true,
        component: Photos
    },
    {
        path: '/contattaci.html',
        exact: true,
        component: ContactUs
    },
    {
        path: '/cerca.html',
        exact: true,
        component: Find
    },
    {
        path: '/area_proprietari.html',
        exact: true,
        component: Admin
    }
];

export default routes;
