import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Logo from '../views/Logo.vue'
import Brand from '../views/Brand.vue'
import Colors from '../views/Colors.vue'
import Typography from '../views/Typography.vue'
import DashboardHome from '../Dashboard/DashboardHome.vue'
import Login from '../views/Login.vue'
import DashboardPage from '../components/DashboardPage.vue'
import DashboardSelector from '../views/DashboardSelector.vue'


const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about'
    },
    {
        path: '/logo',
        name: 'logo',
        component: Logo
    },
    {
        path: '/brand',
        name: 'brand',
        component: Brand
    },
    {
        path: '/colors',
        name: 'colors',
        component: Colors
    },
    {
        path: '/typography',
        name: 'typography',
        component: Typography
    },
    {
        path: '/dashboard/home',
        name: 'DashboardHome',
        component: DashboardHome
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/dashboard/selector',
        name: 'DashboardSelector',
        component: DashboardSelector
    },
    {
        path: '/dashboard/:id',
        name: 'DashboardIntroduction',
        component: DashboardPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router