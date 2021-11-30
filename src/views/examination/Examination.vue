<template>
  <div class="examin">
    <Loading v-if="isLoading"></Loading>
    <div class="examin_tit">
      <img
        class="examinimg"
        src="https://tb1.bdstatic.com/tb/cms/frs/bg/default_head20141014.jpg"
        alt=""
      />
    </div>

    <div class="examin_class">
      <div class="examin_left">
        <div
          style="border-radius: 10px 0 0 0; border-right: none"
          class="current_examin"
          @click="lookone"
          :class="this.e_cut == 1 ? 'exam_cut' : ''"
        >
          <span>当前考试</span>
        </div>
        <div
          style="border-radius: 0 10px 0 0; border-left: none"
          class="current_examin"
          @click="looktwo"
          :class="this.e_cut == 0 ? 'exam_cut' : ''"
        >
          <span>历史考试</span>
        </div>
        <!-- <p class="navkao">当前考试</p>
                <p class="navkao" >历史考试</p> -->
      </div>
      <div class="right">
        <!-- <div>{{ Notice }}</div> -->
        <div :class="{ onec: lookviw == 1, viewonce: lookviw == -1 }">
          <div class="examin_right_tit_frame">
            <span class="examin_right_tit">考试编号</span
            ><span class="examin_right_tit">考试名称</span
            ><span class="examin_right_tit">课程名称</span
            ><span class="examin_right_tit">开始时间</span
            ><span class="examin_right_tit">操作</span>
          </div>
            <div :class="{once: dis == -1,del: dis == 1 }">
                当&nbsp;前&nbsp;没&nbsp;有&nbsp;考&nbsp;试
             </div>
          <div v-for="(item, index) in tables" :key="index" class="exam">
            <span class="exam_aim">{{ item.number }}</span>
            <span class="exam_aim">{{ item.test_name }}</span>
            <span class="exam_aim">{{ item.classname }}</span>
            <span class="exam_aim">{{ item.stat_time }}</span>
            <span class="exam_aim">
              <el-button
                type="primary"
                icon="el-icon-loading"
                class="up_exam"
                size="mini"
                plain
                round
                v-if="item.now == 1"
                >等待考试</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-thumb"
                class="up_exam"
                size="mini"
                plain
                @click="start(item.number)"
                round
                v-if="item.now == 2"
                >开始考试</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-thumb"
                class="up_exam"
                size="mini"
                plain
                round
                v-if="item.now == 3"
                >考试已停止</el-button
              >
            </span>

            <!-- <el-button type="primary"  class="exam_aim up_exam" @click="start(item.number)">开始考试</el-button> -->
            <!-- <span class="exam_aim" @click="start(item.number)">开始考试</span> -->
          </div>
        </div>

        <div :class="{ onec: lookviw == -1, viewonce: lookviw == 1 }">
          <div class="examin_right_tit_frame">
            <span class="examin_right_tit">考试编号</span
            ><span class="examin_right_tit">考试名称</span
            ><span class="examin_right_tit">课程名称</span
            ><span class="examin_right_tit">开始时间</span
            ><span class="examin_right_tit">操作</span>
          </div>
          <div v-for="(item, index) in tablew" :key="index" class="exam">
            <span class="exam_aim">{{ item.number }}</span>
            <span class="exam_aim">{{ item.test_name }}</span>
            <span class="exam_aim">{{ item.classname }}</span>
            <span class="exam_aim">{{ item.stat_time }}</span>

            <!-- <span class="exam_aim" @click="view(item.number)">查看成绩</span> -->
            <span class="exam_aim">
              <el-button
                type="success"
                icon="el-icon-view"
                class="up_exam"
                size="mini"
                plain
                @click="view(item.number)"
                round
                >查看成绩</el-button
              >
              <el-button
                type="success"
                icon="el-icon-view"
                class="up_exam"
                size="mini"
                plain
                round
                v-if="item.nowstatus == 2"
                >未批改</el-button
              >
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
        nav:[
            {uname:'当前考试'}, {uname:'历史考试'},
            {uname:'导航3'}, {uname:'导航4'}
        ],
    tables:[],
    tablew:[],
    number:[],
    lookviw : 1,
    e_cut: 1,
    isLoading: true,
    a1: 1,
    Notice:'',
    dis: -1
    };
  },
  mounted() {
    //如果没结果就是考试开始时间问题
    let arr = new Array();
    this.$http.get("/home/studentdesc").then((res) => {
      // console.log(res,2)
      if (res) {
        this.isLoading = false;
      }
      let Arr = [];
      res.data.course.forEach((element) => {
        Arr.push(element.course_name);
        arr.push(element.course_id);
      });
      arr.forEach((item,key) => {
                    this.$http.get('/exam/stuexameach',{course_id:item})
                        .then(
                            result => {
                                
                                if (result.code == 214) {
                                    this.isLoading = false;
                                    if(result.testinfo.length > 0){
                                        result.testinfo.forEach((item,key) => {
                                            this.tables.push({
                                            number :item.data.test_key,
                                            test_name:item.data.test_name,
                                            classname:Arr[key],
                                            stat_time:item.data.stat_time,
                                            now:item.state
                                            })
                                            
                                        })
                                    }else if(this.tables.length == 0){
                                        this.dis = 1
                                        this.Notice = '当前没有考试'
                                    }
                                }
                        
                                
                                
                                
                            })
                    })
                
    })

    let arrz = new Array();
    
    this.$http.get("/home/studentdesc").then((res) => {
      console.log(res, 2);
      if (res.code == 200) {
        this.isLoading = false;
      }
      let Arrz = [];

      res.data.course.forEach((element) => {
        Arrz.push(element.course_name);
        arrz.push(element.course_id);
      });
      this.$http.get("/exam/awaitexam").then((result) => {
       
        if (result.code == 215) {
          this.isLoading = false;
          if (result.testinfo.length > 0) {
            result.testinfo.forEach((item, key) => {
              this.number.push(item.test_key);
              this.tablew.push({
                number: item.test_key,
                test_name: item.test_name,
                classname: item.gname,
                stat_time: datetime(item.stat_time),
                nowstatus: item.release_state,
              });
            });
          } else if (this.tables.length == 0) {
            this.Notice = "没有历史考试记录";
          }
        }
      });
    });
  },

  methods: {
    start(n) {
      this.$router.push({ path: "Lookexamination", query: { test_key: n } });
      // launchFullScreen(document.documentElement)                  //全屏
    },
    lookone() {
      this.e_cut = 1;
      this.lookviw = 1;
    },
    looktwo() {
      this.e_cut = 0;
      this.lookviw = -1;
    },
    view(n) {
      this.$router.push({ path: "Viewtest", query: { test_key: n } });
    },
  },
};

//全屏
function launchFullScreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function datetime(stime) {
  let strtime = new Date(stime);
  strtime =
    strtime.getFullYear() +
    "-" +
    (strtime.getMonth() + 1) +
    "-" +
    strtime.getDate() +
    " " +
    strtime.getHours() +
    ":" +
    strtime.getMinutes() +
    ":" +
    strtime.getSeconds();
  return strtime;
}
</script>


<style scoped lang="less">
.examin {
  width: 1200px;
  // height: 1000%;
  background-color: #ffff;
  box-shadow: 5px 5px 5px 5px #9999;
  border-radius: 10px;
  margin: 1.25rem auto;

  .examin_tit {
    margin: 10px auto;
    width: 1200px;
    height: 200px;
    line-height: 100px;
    font-size: 20px;
    .examinimg {
      width: 100%;
      height: 100%;
    }
  }
  .examin_class {
    margin: 0 auto;
    width: 1200px;
    // margin-top: 20px;
    height: auto;
    background-color: #f2f2f2;
    overflow: hidden;
    .examin_left {
      width: 800px;
      height: 52px;
      margin-left: 58px;

      .current_examin {
        width: 200px;
        height: 51px;
        border: 1px solid #999;
        border-bottom: none;
        border-radius: 10px 10px 0 0;
        box-shadow: 2px 2px #888;
        float: left;
        cursor: pointer;
        span {
          line-height: 51px;
        }
      }
      .exam_cut {
        background-color: #52b788;
        color: #fff;
      }
    }
    .right {
      // float: left;
      margin: 0 auto;
      width: 90%;
      height: 500px;
      text-align: center;
      border: 1px solid #3333;
      border-radius: 0 10px 10px 10px;
      margin-bottom: 20px;
      .examin_right_tit_frame {
        width: 90%;
        // height: 30px;
        text-align: center;
        display: flex;
        margin: 30px auto;
        .examin_right_tit {
          flex: 1;

          width: 30px;
        }
      }
      .exam {
        width: 90%;
        height: 40px;
        background-color: #e6e6e6;
        margin: 30px auto;
        border-radius: 5px;
        line-height: 30px;
        display: flex;
        .exam_aim {
          flex: 1;
          width: 30px;
          line-height: 40px;
          float: left;
          // margin-right: 40px;
        }
        .up_exam {
          // flex: 1;
          width: 100px;
          height: 41px;
        }
      }
      .once {
        display: none;
      }

      .viewonce {
        display: none;
        border: 1px solid #888;
      }
      .one {
        margin: 10px;
        // border: 1px solid red;
      }
      .cl {
        cursor: pointer;
      }
      .cl:hover {
        color: #2dc4b2;
      }
    }
  }
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
