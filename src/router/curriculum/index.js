export default {
    path: 'curriculum',
    name: 'curriculum',
    component: () => import(/* webpackChunkName: "curriculum" */ '../../views/curriculum/Curriculum.vue'),
}