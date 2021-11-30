export default {
    path: 'Hodetest',
    name: 'Viewtest',
    component: () => import(/* webpackChunkName: "Viewtest" */ '../../views/examination/Viewtest.vue'),
}