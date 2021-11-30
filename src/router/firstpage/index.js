export default {
    path: '/',
    name: 'firstpage',
    component: () => import(/* webpackChunkName: "firstpage" */ '../../views/firstpage/FirstPage.vue'),
}