export default {
    path: 'coursedetails/:course_id',
    name: 'coursedetails',
    component: () => import(/* webpackChunkName: "coursedetails" */ '../../views/coursedetails/CourseDetails.vue'),
}