import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
// import 'animate.css';
import http from './utils/http.js'
import './assets/css/index.css'

import {
  Button, 
  Menu, 
  Submenu, 
  MenuItem,
  Carousel,
  CarouselItem,
  Input,
  InputNumber,
  Message,
  Icon,
  Row,
  Col,
  Pagination,
  Descriptions,
  DescriptionsItem,
  Tag,
  Avatar,
  MessageBox,
  Table ,
  TableColumn,
  Radio,
  RadioGroup,
  Dialog,
  Empty,
  Collapse,
  Badge,
  CollapseItem,
  CheckboxGroup,
  Checkbox,
  CheckboxButton,
  Select,
  Option,
  PageHeader,
  Notification,
  Backtop,
  ButtonGroup
  
  
  
 
} from  'element-ui'

import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(RadioGroup)
//引入插件
import Loading from './components/Loading'
//全局注册插件
Vue.component('Loading',Loading)




Vue.use(ButtonGroup)
Vue.use(Backtop)
Vue.use(PageHeader)
Vue.use(Select)
Vue.use(Option)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(Badge)
Vue.use(CollapseItem)
Vue.use(Collapse)
Vue.use(VideoPlayer)
Vue.use(Empty);
Vue.use(Dialog);
Vue.use(Radio);
Vue.use(Avatar);
Vue.use(Tag);
Vue.use(Descriptions);
Vue.use(DescriptionsItem);
Vue.use(Pagination);
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.config.productionTip = false
Vue.prototype.$http = http;
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };


Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
