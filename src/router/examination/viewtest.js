export default {
    path:'viewtest',
    name:'viewtest',
    component: () => import(/* webpackChunkName: "viewtest" */ '../../views/examination/Viewtest.vue'),
}