<template>
    <div class="box">
        <Loading v-if="isLoading"></Loading>
        <!-- <div class="logo">查看作业界面logo</div> -->
        <div class="overblack" @click="backTop">^</div>
        <div class="centent">
            <button @click="upper " class="test_info">返回上一层</button>
            <div :class="{text_content: text_content != ''}">{{text_content}}</div>
                <div class="box_left" >
                    <div v-for="(topics,index) in sortedTopics" :key="index" >
                        <div class="topicsType" v-if="topics.topic_content.length != 0 ">
                            
                            <h4 v-if="topics.topicType == 1">一.&nbsp;&nbsp;单选题</h4>
                            <h4 v-if="topics.topicType == 2">二.&nbsp;&nbsp;多选题</h4>
                            <h4 v-if="topics.topicType == 3">三.&nbsp;&nbsp;填空题</h4>
                            <h4 v-if="topics.topicType == 4">四.&nbsp;&nbsp;描述题</h4>
                            <h4 v-if="topics.topicType == 5">五.&nbsp;&nbsp;简答题</h4>        
                            <div class="topic-content" v-for="(t, index) in topics.topic_content" :key="index" style="margin-left:20px;margin-bottom: 10px">
                               
                                <div>
                                   {{index+1}}.&nbsp;&nbsp; {{t.substr(0,t.indexOf('|'))}}   1分数
                                   <span></span>
                                </div>
                                 <!-- 单选 -->
                                <div class="radio" v-if="topics.topicType == 1" readonly>
                                 <el-radio v-for="(item,index) in (t.substring(t.indexOf('|')+1, t.lastIndexOf('|')).split(','))" :key="index" v-model="lest[t.substr(0,t.indexOf('|'))]"
                                  :label="item.substr(0,item.indexOf('.'))" 
                                  style="display:block; margin:10px" :disabled="(item.substr(0,item.indexOf('.')) == lest[t.substr(0,t.indexOf('|'))])? false:true">
                                    {{ item }}
                                  </el-radio>
                                  <div class="yeschar">
                                      <p>我选的答案：{{t.substring(t.lastIndexOf('|')+1, t.indexOf('('))}}</p>
                                      <p>正确答案：{{t.substring(t.indexOf('[')+1, t.indexOf(']'))}}</p>
                                  </div>
                                </div>

                                <!-- 多选 -->
                                <div class="checkbox" v-if="topics.topicType == 2">
                                 <el-checkbox-group v-model="lest[t.substr(0,t.indexOf('|'))]">
                                    <el-checkbox :label="item.substr(0,item.indexOf('.')).trim()" v-for="(item,index) in (t.substring(t.indexOf('|')+1, t.lastIndexOf('|')).split(','))" 
                                    :key="index" 
                                    style="display:block; margin:10px;" :disabled="(item.substr(0,item.indexOf('.')).trim() == lest[t.substr(0,t.indexOf('|'))])? false:true"
                                    >
                                     {{ item }}
                                    </el-checkbox>
                                    </el-checkbox-group>
                                    <div class="yeschar">
                                        <p>我选的答案：{{t.substring(t.lastIndexOf('|')+1, t.indexOf('('))}}</p>
                                        <p>正确答案：{{t.substring(t.indexOf('[')+1, t.indexOf(']'))}}</p>
                                    </div>
                                </div>      

                                <!-- 填空题 -->
                                <div class="fillInBlank" v-if="topics.topicType == 3">        
                                   <div v-for="(item,indexs) in (t.substring(t.indexOf('|')+1, t.lastIndexOf('|')).split(','))" :key="indexs" >
                                        <el-input  type="textarea"  :rows="2"  :placeholder="t.substring(t.lastIndexOf('|')+1,t.indexOf('('))" v-model="t.o" style="width:400px" ref="test" disabled class="input_box"></el-input>
                                      </div>
                                     <div class="yeschar">
                                       <p>我选的答案：{{t.substring(t.lastIndexOf('|')+1, t.indexOf('('))}}</p>
                                       <p>正确答案：{{t.substring(t.indexOf('[')+1, t.indexOf(']'))}}</p>
                                    </div>
                                </div>
                                <!-- 描述题 -->
                                <div class="text" v-if="topics.topicType == 4">
                                    <div v-for="(item,index) in (t.substring(t.indexOf('|')+1, t.lastIndexOf('|')).split(','))" :key="index" >
                                        <!-- <div>{{item}}</div> -->
                                        <el-input  type="textarea"  :rows="2"  :placeholder="t.substring(t.lastIndexOf('|')+1,t.indexOf('('))"  v-model="t.o" style="width:400px" ref="des" disabled class="input_box"></el-input>
                                    </div>
                                      <div class="yeschar">
                                        <p>我选的答案：{{t.substring(t.lastIndexOf('|')+1, t.indexOf('('))}}</p>
                                        <p>正确答案：{{t.substring(t.indexOf('[')+1, t.indexOf(']'))}}</p>
                                    </div>
                                </div>

                                <div class="text" v-if="topics.topicType == 5">
                                    <div v-for="(item,index) in (t.substring(t.indexOf('|')+1, t.lastIndexOf('|')).split(','))" :key="index" >
                                        <!-- <div>{{item}}</div> -->
                                        <el-input  type="textarea"  :rows="2"  :placeholder="t.substring(t.lastIndexOf('|')+1,t.indexOf('('))"  v-model="t.o" style="width:400px" ref="br" disabled class="input_box"></el-input>
                                    </div>
                                      <div class="yeschar">
                                          <p>我选的答案：{{t.substring(t.lastIndexOf('|')+1, t.indexOf('('))}}</p>
                                          <p v-if="t.substring(t.indexOf('[')+1, t.indexOf(']'))">正确答案：{{t.substring(t.indexOf('[')+1, t.indexOf(']'))}}</p>
                                          <p v-if="!t.substring(t.indexOf('[')+1, t.indexOf(']'))">正确答案：未批改</p>
                                    </div>
                                </div>
                            </div>                                                                                                                                                                                                                                                                                                              
                      </div>    
                                                                                                                                                                                                                                     
                    </div>
                </div>
        </div>    
    </div>
</template>

<script>
export default {
    data(){
        return {
             //按题目类型分类好的题目数据
             //题目类型==>  1:单选题  2:多选题  3:填空题   4:描述  5:简答题
            sortedTopics: [
                { topicType: 1, topic_content: [] },
                { topicType: 2, topic_content: [] },
                { topicType: 3, topic_content: [] },
                { topicType: 4, topic_content: [] },
                { topicType: 5, topic_content: [] },
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
            lest:{},
            disabled:false,
            text_content:'',
            isLoading:true

        }
    },
    mounted(){
            let uid = ''
            this.$http.get('/home/studentdesc').then(
                res => {
                    if (res) {
                      this.isLoading = false
                    }
                    this.$http.get('/task/lookwork',{
                        test_key: this.$route.query.test_key, 
                        uid: res.data.userdata.uid,
                        course_id: this.$route.query.course_id, 
                        })
                    .then(
                        result => {
                            if (res) {
                              this.isLoading = false
                            }
                           console.log(result)
                             if(result.code == 200){
                                 result.data.forEach((element,key)=> {
                                     console.log(element)
                                     for (let item of this.sortedTopics) {
                                        // console.log(element.substring(element.indexOf('(')+1,element.lastIndexOf(')')))
                                         if( element.substring(element.indexOf('(')+1,element.lastIndexOf(')')) == item.topicType){
                                             item.topic_content.push(element)
                                              if(element.substr(element.indexOf('(')+1,1) == 1 ){//判断是不是单选 走不同的model
                                                this.$set(this.lest,element.substr(0,element.indexOf('|')),element.substring(element.lastIndexOf('|')+1,element.indexOf('(')))
                                            }else if(element.substr(element.indexOf('(')+1,1) == 2){//判断是否是多选 走不同的model
                                                let option = element.substring(element.lastIndexOf('|')+1,element.indexOf('('));
                                                let newoption = option.split('')
                                                this.$set(this.lest, element.substr(0,element.indexOf('|')), newoption);                                         
                                            }else {
                                                this.$set(this.lest, element.substr(0,element.indexOf('|')), element.substring(element.lastIndexOf('|')+1,element.indexOf('(')));       
                                            }
                                         }
                                     }
                                 });
                            }  
                            if(result.code == 400){
                                this.text_content = `你还未提交作业`
                            }
                            // console.log(this.sortedTopics)
                        })
                }
            )   
            window.addEventListener('scroll', this.scrollToTop)                                                    
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods:{
        upper(){
            this.$router.push('/work')
        },
        backTop () {
            const that = this
            let timer = setInterval(() => {
              let ispeed = Math.floor(-that.scrollTop / 5)
              document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
              if (that.scrollTop === 0) {
                clearInterval(timer)
              }
            }, 16)
        },
         scrollToTop () {
            const that = this
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            that.scrollTop = scrollTop
            if (that.scrollTop > 60) {
              that.btnFlag = true
            } else {
              that.btnFlag = false
            }
        }
    }
}

</script>

<style scoped lang="less">
    .centent {
    margin: 30px auto;
    width: 1200px;
    height: auto;
    min-height: 600px;
    overflow: hidden;
    text-align: left;
    border: 1px solid #888888;
    box-shadow: 5px 5px 5px #8888885d;
    border-radius: 10px;
    .box_left {
        margin-top: 10px;
        margin-left: 20px;
    }
    .test_info {
        margin-top: 10px;
        margin-left: 10px;
        padding: 5px;
        border:1px solid rgb(168, 167, 167);
        color: #fff;
        background:#409EFF;
        border-radius: 3px;
        cursor: pointer;
    }
    .test_info:hover {
        background:#bbbec2;
    }
    .input_box{
        margin: 10px auto;
        margin-left: 30px;
    }
    .input_box:focus {
        outline: none;
        border: 2px solid #1aa6b7;
    }
    .yeschar {
        margin-left: 30px;
        width: 300px;
        border: 1px solid rgba(0, 0, 0, 0.281);
        p{
            margin: 10px auto;
            
        }
    }
}
.text_content {
    margin: 30px auto;
    width: 100%;
    height: 200px;
    text-align: center;
    overflow: hidden;
    font-size: 20px;
    // border: 1px solid red;
}
.overblack {
    position:fixed;
    right: 100px;
    bottom: 20px;
    width: 50px;
    height: 40px;
    line-height: 45px; 
    font-size: 30px;
    text-align: center;
    color: #FFF;
    background: #409EFF;   
    cursor: pointer;
}
</style>

