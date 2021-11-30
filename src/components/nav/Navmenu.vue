<template>
  <div class="nav_column">
    
    <el-menu :default-active="activeIndex" class="el-menu-demo nav_menu" mode="horizontal" @select="handleSelect" > 
      <el-menu-item  @click="first"> <img src="../../assets/images/taoli.png" alt="" class="logo"></el-menu-item>
      <el-menu-item index="2" @click="first">首页</el-menu-item>
      <el-menu-item index="3" @click="curriculum">我的课程</el-menu-item>
      <el-menu-item index="4" @click="lookwork">我的作业</el-menu-item>
      <el-menu-item index="5" @click="examination">我的考试</el-menu-item>
      <el-menu-item index="6" @click="communication">我的问答</el-menu-item>
      
      <el-menu-item index="7" class="uplod" @click="open">退出登录</el-menu-item>
      <el-submenu index="8" class="uplod">
            <template slot="title" >
               <span class="uname">{{ userinfo.nickname }}</span>
            </template>
            <el-menu-item index="2-1">账号:{{ userinfo.phone }}</el-menu-item>
            <el-menu-item index="2-2">班级:{{ courseinfo.gname }}</el-menu-item>
           
      </el-submenu> 
      
      <el-avatar :size="40" fit="cover" :src="userinfo.headimg" class="headimg"></el-avatar>
    </el-menu>

    <el-dialog
      title="选择你喜欢的头像"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div class="headimgset">
        <img v-for="(item, index) in headimgset" :key="index" :src=item alt="" 
        class="head_portrait"
        :class="{active:currentIndex === index}"
        @click="btnClick(index, item)">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
// import Work from '../../view/work/Work.vue'

export default {
  name: "nav_column",
  data() {
    return {
        activeIndex: '1',
        activeIndex2: '1',
        userinfo: '',
        courseinfo:'',
        centerDialogVisible: false,
        headimgset: '',
        currentIndex:0,
        
      };
  },
  methods:{
    first(){    //首页
      this.$router.push('/')
    },
    lookwork(){     //我的作业
      this.$router.push('/work')
    },
    curriculum(){   //我的课程
      this.$router.push('/curriculum')
    },
    examination(){  //我的考试
      this.$router.push('/examination')
    },
    communication(){  //我的问答
      this.$router.push(`/communication/${this.courseinfo.gid}`)
    },
    handleSelect(key, keyPath) {
        // console.log(key, keyPath);
    },
    open() {
      this.$confirm('教授级老师正在授课, 确认退出登录吗?', '退出登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('User-Token');
        this.$message({
          type: 'success',
          message: '即将退出,期待你的下次登录!'
        });
        this.$router.push('/login');
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '欢迎! 感谢你选择我们!'
        });          
      });
    },
    getHeadImgs() {
      this.$http.get('/user/userimg').then(
        res => {
          console.log(res.data,'头像集');
          this.headimgset = res.data
        }
      ) 
    
    },
    btnClick(index, headimgname){
				this.currentIndex = index
        let imgsrc = headimgname.replace('http://localhost:3000/img/userimg/','')
        
        this.$http.post('/user/usersetimg',{imgsrc}).then(
          res => {
            console.log(res);
            this.userinfo['headimg'] = headimgname;
          }
        )
        
		},
    
    

  },
  mounted(){
    this.$http.get('/home/studentdesc').then(
      res => {
        console.log(res,'用户');
        if (res.code == 200 && res.data.course[0]) {
          
           this.userinfo = res.data.userdata;
          this.courseinfo = res.data.course[0];
        } else {
             res.data.course.push({gname:'未加入班级'}) 
              this.userinfo = res.data.userdata;
              this.courseinfo = res.data.course[0];
              
               
        }
        
    
      }
    )
  }
};
</script>
<style scoped lang="less">
.nav_menu{
  box-shadow:5px 5px 10px #888;
  .logo {
    width: 35px;
    height: 40px;
  }
}
.uplod {
  float: right;
 
  .uname {
    font-size: 16px;
    font-weight: bold;
    color: #212529;
  }
}
.headimg {
  display: block;
  margin-top: 10px;
  float: right;
}

//头像部分

.headimgset {
  width: 320px;
  height: 300px;
  border: 1px solid #888;
  margin: 0 auto;
  .head_portrait {
    width: 60px;
    height: 60px;
    margin: 2px;
  }
}
.active{    border: 1px solid red; }






</style>
