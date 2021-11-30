import Login from '../../views/login/Login.vue'
import LoginStudent from './loginstudent.js'
import LoginTeacher from './loginteacher.js'


export default {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../../views/login/Login.vue'),
    children: [
        LoginStudent,
        LoginTeacher
    ]
}