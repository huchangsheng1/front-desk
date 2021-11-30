<template>

    <div class="exam_frame">
        <Loading v-if="isLoading"></Loading>
        <div class="exam_frame_heads">
            <div class="exam_frame_info">
                <div :class="{test_info : start != 1 }">答题时间:{{time}} 分钟</div>
                <div :class="{test_info : start != 1 }">剩余时间:{{nowtime}}</div>
                <div :class="{test_info : start != 1 }">总分:{{full}} 分</div>
                <p class="submit_exam">
                    <el-button type="text" @click="dialogVisible = true" style="padding:10px;color:black;border:1px solid red;" :class="{test_info : start != 1 }" >提交试卷</el-button>
                </p>
                 
            </div>
            
           
        </div>
        <div class="exam_frame_centent">
                <div :class="{ wod: start == -1 }">
                    <!-- <button @click="upopen" :class="{ start: start !== -1 ,startw:start == -1}">开始考试</button> -->
                      <el-button type="primary" round @click="upopen" :class="{ start: start !== -1 ,startw:start == -1}"><span class="start_word">开始考试</span></el-button>
                </div>
                <!-- <button @click="upopen" :class="{ start: start !== -1 }">开始考试</button> -->
                
                

                    <el-dialog title="提示" :visible.sync="dialogVisible"  width="30%"  >
                      <span>这是一段信息</span>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submt">确 定</el-button>
                      </span>
                    </el-dialog>

                <div class="left" >
                    <div v-for="(topics,index) in sortedTopics" :key="index" >
        
                        <div class="topicsType" v-if="topics.topic_content.length != 0 ">
                            
                            <h4 v-if="topics.topicType == 1">一.&nbsp;&nbsp;单选题</h4>
                            <h4 v-if="topics.topicType == 2">二.&nbsp;&nbsp;多选题</h4>
                            <h4 v-if="topics.topicType == 3">三.&nbsp;&nbsp;填空题</h4>
                            <h4 v-if="topics.topicType == 4">四.&nbsp;&nbsp;描述题</h4>
                            <h4 v-if="topics.topicType == 5">五.&nbsp;&nbsp;简答题</h4>
                            <div class="topic-content" v-for="(t, index) in topics.topic_content" :key="index" style="margin-left:20px;margin-bottom: 10px">
                                <div>
                                   {{index+1}}.&nbsp;&nbsp; {{(t.t_names).substr(0,t.t_names.indexOf('|'))}} <span>({{t.t_score}})分</span>
                                   <span></span>
                                </div>

                                
                                 <!-- 单选 -->
                                <div class="radio" v-if="topics.topicType == 1">
                                  <el-radio v-for="(item,index) in (t.t_names).substr(t.t_names.indexOf('|')+1).split(',')" :key="index" v-model="t.o" 
                                  :class="item == t.correctAnswer? 'correct':'error'" 
                                  :label="item" 
                                  style="display:block; margin:10px" @change="choice(item,t.tid)">
                                    {{ item }}
                                  </el-radio>
                                  <!-- {{ t.userAnswer }} -->
                                </div>
                                <!-- 多选 -->
                                <div class="checkbox" v-if="topics.topicType == 2">
                                  <el-checkbox-group v-model="checkList">
                                    <el-checkbox :label="item" v-for="(item,index) in (t.t_names).substr(t.t_names.indexOf('|')+1).split(',')" 
                                    :key="index" 
                                    v-model="t.userAnswer" 
                                    style="display:block; margin:10px;" @change="multiple(item,t.tid,index)" 
                                    >
                                     {{ item }}
                                    </el-checkbox>
                                  </el-checkbox-group>
                                  <!-- {{ t.userAnswer }} -->
                                </div>      
                                <!-- 填空题 -->
                                <div class="fillInBlank" v-if="topics.topicType == 3">        
                                   <div v-for="(item,indexs) in (t.t_names).substr(t.t_names.indexOf('|')+1).split(',')" :key="indexs" @change="completion(index,t.tid)">
                                       <!-- <div>{{item}}</div> -->
                                        <el-input  type="textarea"  :rows="2"  placeholder="请输入内容"  v-model="t.o" style="width:400px" ref="test"></el-input>
                                      </div>
                                  <!-- {{ t.userAnswer }} -->
                                </div>
                                <!-- 描述题 -->
                                <div class="text" v-if="topics.topicType == 4">
                                    <div v-for="(item,index) in (t.t_names).substr(t.t_names.indexOf('|')+1).split(',')" :key="index"  @change="describe(index,t.tid)">
                                        <!-- <div>{{item}}</div> -->
                                        <el-input  type="textarea"  :rows="2"  placeholder="请输入内容"  v-model="t.o" style="width:400px" ref="des"></el-input>
                                    </div>
                                </div>
                                <!-- 简答题 -->
                                <div class="text" v-if="topics.topicType == 5">
                                    <div v-for="(item,index) in (t.t_names).substr(t.t_names.indexOf('|')+1).split(',')" :key="index" @change="brief(index,t.tid)">
                                        <!-- <div>{{item}}</div> -->
                                        <el-input  type="textarea"  :rows="2"  placeholder="请输入内容"  v-model="t.o" style="width:400px" ref="br"></el-input>
                                    </div>
                                
                                </div>
                            </div>
                                                                                                                                                        
                                         
                      </div>                                                                                                                                                                                                                   
                    </div>
                </div>
        </div>    
    </div>
</template>
<script >
export default {
    data(){
        return {
             //按题目类型分类好的题目数据
             //题目类型==>  1:单选题  2:多选题  3:填空题   4:描述  5:简答题
            sortedTopics: [
                { topicType: 1, topic_content: '' },
                { topicType: 2, topic_content: '' },
                { topicType: 3, topic_content: '' },
                { topicType: 4, topic_content: '' },
                { topicType: 5, topic_content: '' },
            ],
            hao:['one','two',"three"],
            radio: '',
            checkList: ['选中且禁用','复选框 A'],
            textarea:'',
            full:'',
            endtime:'',
            stattime:'',
            time:'',
            nowtime:"00:00:00",
            yaotime: -1,
            istrue: false,
            start: -1,
            dialogVisible: false,
            wow:'',
            test_key:'',
            our:{},
            answer:[],//全部题
            ccw:[],
            suo:[],
            isLoading: true

        }
    },
   mounted(){
       this.isLoading = false
   },
   methods:{
        text(index){
        },
        upopen(){
            this.$http.get('/exam/startexam',{'test_key':this.$route.query.test_key})
            .then(
                res => {
                    console.log(res);
                    if (res.code == 211) {
                        this.isLoading = false
                    }
                    this.test_key = res.test_key
                    this.full = res.full_score
                    this.endtime = datetime(res.end_time)
                    this.stattime = datetime(res.stat_time)
                    let time1 = new Date(this.stattime).getTime()
                    let time2 = new Date(this.endtime).getTime()
                    this.time = (time2-time1)/1000/60;
                    this.start = 1
                    if(res.code == 211){
                         res.questions.forEach((element,key)=> {
                             for (let item of this.sortedTopics) {
                                
                                 if((Object.keys(element))[item.topicType-1] == item.topicType){
                                     item.topic_content = element[item.topicType]
                                 }
                             }
                         });
                    }  
                    launchFullScreen(document.documentElement)
                    let times = this.time * 60;
                    let timer = setInterval(()=> {
                        this.nowtime = computateTime(times);
                        
                        times--
                        if(times < 1 ){
                           clearInterval(timer)
                           this.$router.push('/examination')
                         }           
                    },1000)   
                }
            )
        },
        
        submt() {
            let newduo = ''
            this.ccw.forEach((item )=> {
               item.tanswer =  item.tanswer.sort()
            //    console.log(item.tanswer)
               item.tanswer.forEach((once,key)=> {
                   newduo += once.trim()
               })
               let a = -1
                this.answer.forEach((once,index) => {
                    if(once.tid == item.tid){
                        a = 1
                        once.tanswer = newduo
                    }                                                        
                })      
               if(a == -1){
                    this.answer.push({
                        tid:item.tid,
                        tanswer:newduo
                    })
               }
               newduo = ''
            })
            // this.$http.get('/home/')
            this.$http.post('/exam/submitanswer',{
                test_key: this.$route.query.test_key,    //头部
                uid: 28,         
                answer: JSON.stringify(this.answer)     
            }).then(
                res =>{
                    if (res) {
                        this.isLoading = false
                    }
                }
            )
            // console.log(this.answer)
            this.$router.push('/examination')
            exitFullscreen()
         },
         //选择
         choice(item,tid){          
            if(this.answer.length  == 0){
                this.answer.push({
                   tid: tid,   
                   tanswer: item.substr(0,item.indexOf('.') )
                })
            }else {
                let a = -1
                this.answer.forEach((once,index) => {
                    if(once.tid == tid){
                        a = 1
                        once.tanswer = item.substr(0,item.indexOf('.'))
                    }                                                                                                
                })      
                if( a == -1){
                    this.answer.push({
                        tid: tid,   
                        tanswer: item.substr(0,item.indexOf('.') )
                    })
                }                                                                  }                                        
         },
         //多选
         multiple(item,tid){
            
            if(this.ccw.length  == 0){
                this.ccw.push({
                   tid: tid,   
                   tanswer: [item.substr(0,item.indexOf('.')).trim()]
                })
            }else {
                let a = -1
                let b = -1
                let num = 0
                this.ccw.forEach((once,index) => {

                    if(once.tid == tid){
                        b = 1
                        // console.log(tid)
                        num = index
                        // once.tanswer.push(item.substr(0,item.indexOf('.'))) 
                        once.tanswer.forEach((itemc,key) => {
                            if(itemc == item.substr(0,item.indexOf('.')).trim()){//如果相等删除
                                a = 1
                                once.tanswer.splice(key,1)
                            }  
                
                        })                    
                    }                                                    
                })    
                if(b == -1){
                    this.ccw.push({
                       tid: tid,   
                       tanswer: [item.substr(0,item.indexOf('.') ).trim()]
                    })
                }else if (a == -1){
                    this.ccw[num].tanswer.push(item.substr(0,item.indexOf('.') ).trim())
                }      
            }  
            // console.log(this.ccw)                                                                                                                                  
         },
         //填空题
        completion(index,tid){
             if(this.answer.length  == 0){
                    this.answer.push({
                       tid: tid,   
                       tanswer: this.$refs.test[index].value
                    })
                }else {     
                    let a = -1  
                    this.answer.forEach((once,index) => {
                        if(once.tid == tid){
                            a =1
                            once.tanswer = this.$refs.test[index].value
                        }                                                         
                    })   
                    if( a == -1){
                        this.answer.push({
                            tid: tid,   
                            tanswer: this.$refs.test[index].value
                        })
                    }    
                }
            // console.log(this.answer)                                                   
        },
        describe(index,tid){
             if(this.answer.length  == 0){
                    this.answer.push({
                       tid: tid,   
                       tanswer: this.$refs.des[index].value
                    })
                }else {     
                    let a = -1  
                    this.answer.forEach((once,index) => {
                        if(once.tid == tid){
                            a =1
                            once.tanswer = this.$refs.des[index].value
                        }                                                         
                    })   
                    if( a == -1){
                        this.answer.push({
                            tid: tid,   
                            tanswer: this.$refs.des[index].value
                        })
                    }    
                }
            // console.log(this.answer)                                                   
        },
        brief(index,tid){
             if(this.answer.length  == 0){
                    this.answer.push({
                       tid: tid,   
                       tanswer: this.$refs.br[index].value
                    })
                }else {     
                    let a = -1  
                    this.answer.forEach((once,index) => {
                        if(once.tid == tid){
                            a =1
                            once.tanswer = this.$refs.br[index].value
                        }                                                         
                    })   
                    if( a == -1){
                        this.answer.push({
                            tid: tid,   
                            tanswer: this.$refs.br[index].value
                        })
                    }    
                }
            // console.log(this.answer)                                                   
        },          

   },
}
//倒计时00:00:00
function computateTime(time) {
      var sec = "00";
      var minute = "00";
      var hour = "00";
      if (time >= 0) {
        sec = time % 60;
        if (sec < 10) {
          sec = "0" + sec;
        }
      }
      if (time / 60 >= 0) {
        minute = parseInt((time / 60) % 60);
        if (minute < 10) {
          minute = "0" + minute;
        }
      }
      if (time / 60 / 60 >= 0) {
        hour = parseInt((time / 60 / 60) % 60);
        if (hour < 10) {
          hour = "0" + hour;
        }
      }
      return hour + ":" + minute + ":" + sec;   
}

function datetime(stime) {
    let strtime = new Date(stime);
    strtime = strtime.getFullYear() + '-' + (strtime.getMonth() + 1) + '-' + strtime.getDate() + ' ' +
        strtime.getHours() + ':' + strtime.getMinutes() + ':' + strtime.getSeconds();
    return strtime;
}
//进入全屏
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
  //退出全屏
function exitFullscreen() {

 if (document.exitFullscreen) {

   document.exitFullscreen();

 } else if (document.mozCancelFullScreen) {

   document.mozCancelFullScreen();

 } else if (document.webkitExitFullscreen) {

   document.webkitExitFullscreen();
 }
}
</script>
<style scoped lang="less">
.exam_frame {
    margin: 10px auto;
    width: 100%;
    height: auto;
    min-height: 800px;
    // border: 1px solid red;
    .exam_frame_heads {
        width: 100%;
        height: auto;
        border-bottom: 1px solid #999;
        .exam_frame_info {
            width: 1200px;
            margin: 0 auto;
            text-align: left;
            // background-color: red;
            div  {
                width: 80%;
                 float: left;
            }
            .submit_exam {
                display: block;
                width: 15%;
                height: 100%;
                float: left;
            }
        }
    }
    .exam_frame_centent {
        margin: 10px auto;
        background-color: #FFF;
        width: 1200px;
        height: auto;
        min-height: 600px;
        overflow: hidden;
        text-align: left;

        box-shadow: 10px 10px 10px #888;
        border-radius: 15px;
        .topicsType {
            margin-bottom: 50px;
        }
        .cent {
            margin: 10px;
            width: 60%;
            border: 1px solid blue;
            .centxuan {
                margin: 5px;
                border: 1px solid red;
                .nei {
                    margin-left: 5px;
                }
            }
        }
        .left {
            margin-left: 20px;
        }
    }
}
.up {
    width: 200px;
    height: 30px;
    // border: 1px solid red;
}
.start {
    display: none;
}
.test_info {
    display: none;
}
.wod {
    margin: 150px auto;
    
    .start_word {
        line-height: 30px;
    }
    // border: 1px solid blue;
    // overflow: hidden;
}
.startw {
    display: block;
    margin: 155px auto;
    width: 100px;
    height: 30px;
    line-height: 30px;
   
}

</style>