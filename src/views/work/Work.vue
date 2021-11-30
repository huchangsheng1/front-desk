<template>
  <div class="box animate__animated animate__backInLeft">
    <Loading v-if="isLoading"></Loading>
    <div class="boximg">
      <div class="lookwork">
        <div class="lookwork_logo">
          <!-- <div class="lookwork2">我的<br/>作业</div> -->
        </div>
      </div>
      <!-- <div class="head"></div> -->
    </div>
    <div class="work">
      
      
      
        <div class="work_head">
            <span class="work_title">作业编号</span><span class="work_title">作业名称</span><span class="work_title">课程名称</span><span class="work_title">开始时间</span>
            <span class="work_title">截止时间</span><span class="work_title">操作</span>
            <div class="clear"></div>
        </div>
        <!-- <div :class="{once: dis == -1,del: dis == 1 }"> -->
          <!-- 当&nbsp;前&nbsp;没&nbsp;有&nbsp;作&nbsp;业 -->
        <!-- </div> -->
       <div v-for="(item,index) in tables" :key="index" class="worktables">
           <span class="work_table">{{item.number}}</span>
           <span class="work_table">{{item.test_name}}</span>
           <span class="work_table">{{item.classname}}</span>
           <span class="work_table">{{item.stat_time}}</span>
           <span class="work_table">{{item.end_time}}</span>
           <!-- <span class="write_table" @click="view(item.number,item.classname)">写作业</span> -->
           <span class="write_table" v-if="item.now == 1" @click="view(item.number,item.classname)"><i class="el-icon-edit"></i>写作业</span>
           <span class="write_table" v-if="item.now == 2" @click="modify(item.number,item.classname)"><i class="el-icon-edit-outline"></i>&nbsp;修改作业</span>
           <span class="write_table" v-if="item.now == -1" @click="look(item.number,item.classname)"><i class="el-icon-search"></i>&nbsp;查看作业</span>
           <div class="clear"></div>
       </div>                        
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        tables:[],
        isLoading:true,
         dis:-1
    };
  },
  mounted(){
    let arr = new Array()
      this.$http.get('/home/studentdesc')
      .then(
          res => {
            if (res) {
              this.isLoading = false
            }
            // console.log(res)
            // console.log(res.data.userdata.uid)学生id
              let Arr = []
              res.data.course.forEach(element => {
                  
                  Arr.push(element.course_name)
                  arr.push(element.course_id)
              });
              arr.forEach((item,key) => {
                  this.$http.get('/task/teacherworks',{
                      course_id:item,
                      nowtime:new Date() ,
                      uid:res.data.userdata.uid
                    })
                      .then(
                          result => {
                            if(result.code == 200){
                              this.isLoading = false
                              this.tables.push({
                                number :result.data[0].substr(0,result.data[0].indexOf('|')),//作业编号
                                test_name:result.data[0].substring(result.data[0].indexOf('|')+1,result.data[0].lastIndexOf('|')),
                                classname:Arr[key] +'('+result.data[0].substr(result.data[0].lastIndexOf('|')+1) +')',
                                stat_time:result.oldtime[0],
                                end_time:result.endtime[0],
                                now:result.now
                              })
                            }  else {
                              this.dis = 1
                            }          
                          }
                      )
              })
          }
      )
      // console.log(this.tables)
  },
  methods:{
    view(n,k){
      // console.log(n,k)
      let a = (k.lastIndexOf(')'))
      // console.log(k.substring(k.indexOf('(')+1,a))
       this.$router.push({ path: 'Viewwork', query: { test_key: n ,course_id:k.substring(k.indexOf('(')+1,a)}})
    },
    modify(n,k){
      let a = (k.lastIndexOf(')'))
        this.$router.push({ path: 'Modifywork', query: { test_key: n ,course_id:k.substring(k.indexOf('(')+1,a)}})    
    },
    look(n,k){
      let a = (k.lastIndexOf(')'))
      this.$router.push({ path: 'Lookwork', query: { test_key: n ,course_id:k.substring(k.indexOf('(')+1,a)}})    
    }
  } 
};
</script>
<style lang='less' scoped>
.box {
  margin: 10px auto;
  width: 1200px;
  height: 100vh;
  background-color: rgb(179, 170, 170);
  overflow: hidden;
  // background: url(../../assets/login_bg.jpg);
  background-color: #efefef;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  box-shadow: 10px 10px 5px #888888;
  border-radius: 30px;
  .boximg {
    margin-bottom: 10px;
    width: 1200px;
    height: 200px;
    // border: 1px solid red;
    overflow: hidden;
    .lookwork {
        float: left;
        margin: 0;
    
        width: 100%;
        height: 200px;
        border: 1px solid #aeceaa;
        .lookwork_logo{
          height: 300px;
          background: url(../../assets/images/worktwo.webp)no-repeat;
          background-size: 1200px 700px;
          background-position: center center;
        }
        .lookwork2 {
            margin-top: 25px;
            font-size: 20px;
            font-weight: bold;
        }
    }
  }
  .work {
    margin: 0 auto;
    margin-bottom: 100px;
    width: 1100px;
    height: auto;
    min-height: 500px;
    overflow: hidden;
    text-align: left;
    border: 1px solid #8888887a;
    border-radius: 20px;
    color: black;
    background-color: rgba(253, 252, 252, 0);
    .work_head {
      margin: 10px;
      // border: 1px solid red;
      .clear {
        clear: both;
      }
      .work_title{
        display: block;
        float: left;
        margin: 5px;
        width: 150px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        // border: 1px solid red;
        background: #efefef;
        }
    }
    .worktables {
      margin: 10px;
      margin-top: 20px;
      // border: 1px solid red;
      background:#ddd8d8;
      .clear {
        clear: both;
      }
      .write_table {
        display: block;
        float: left;
        margin: 5px;
        width: 150px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        // border: 1px solid red;
        background: #78c1e0;
        cursor: pointer;
        border-radius: 20px;
        // box-shadow: 3px 3px 5px #888888;
      }
      .write_table:hover {
        background-color: #3496f8;
        box-shadow: 3px 3px 5px #8888885d;
      }
      .work_table {
        display: block;
        float: left;
        margin: 5px;
        width: 150px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        // border: 1px solid red;
        // background: #efefef;
      }
    }
  }
}
.one {
  margin: 10px;
}
.once {
  width: 100%;
  height: 200px;
  line-height: 200px;
  text-align: center;
  font-size: 20px;
}
.del {
  display: none;
}
</style>

