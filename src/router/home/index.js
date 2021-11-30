import Home from '../../views/Home.vue'
import Lookexamination from '../examination/lookexamination.js'
import Viewtest from '../examination/viewtest'
import Curriculum from '../curriculum/index.js'
import Examination from '../examination/index.js'
import Communication from '../communication/index'
import FirstPage from '../firstpage/index'
import CourseDetails from '../coursedetails/index'
export default {
    path: '',
    name: 'Home',
    component: Home,
    children:[
        FirstPage,
        Curriculum,
        Examination,
        Lookexamination,
        Communication,
        CourseDetails,
        Viewtest,

    ]
}