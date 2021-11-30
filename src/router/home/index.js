import Home from '../../views/Home.vue'
import Work from '../work/index.js'
import Viewwork from '../work/viewwork.js'
import Lookexamination from '../examination/lookexamination.js'
import Viewtest from '../examination/viewtest'
import Curriculum from '../curriculum/index.js'
import Examination from '../examination/index.js'
import Communication from '../communication/index'
import FirstPage from '../firstpage/index'
import CourseDetails from '../coursedetails/index'
import lookwork from '../work/lookwork'
import modifywork from '../work/modifywork'
export default {
    path: '',
    name: 'Home',
    component: Home,
    children:[
        FirstPage,
        Curriculum,
        Work,
        Examination,
        Lookexamination,
        Communication,
        CourseDetails,
        Viewtest,
        Viewwork,
        lookwork,
        modifywork

    ]
}