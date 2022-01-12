import Rates from '../components/Rates/Rates'
import Exchange from '../components/Exchange/Exchange'

const routes = [
    {
        path: '/rates',
        exact: true,
        component: Rates,
    },
    {
        path: '/exchange',
        exact: false,
        component: Exchange,
    }
]

export default routes
