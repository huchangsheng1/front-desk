export default {
    path: 'communication/:gid',
    name: 'communication',
    component: () => import(/* webpackChunkName: "communication" */ '../../views/communication/Communication.vue'),
}