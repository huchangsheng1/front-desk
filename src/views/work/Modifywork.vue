<template>

    <div class="box">
        <Loading v-if="isLoading"></Loading>
        <div class="overblack" @click="backTop">^</div>
        <!-- <div class="logo">修改界面logo</div> -->
        <div class="centent">
                <el-button type="text" @click="dialogVisible = true" style="padding:10px;color:black;border:1px solid #1aa6b7;color: #FFF" :class="{test_info : start != 1 }" >提交作业</el-button>

                    <el-dialog title="提示" :visible.sync="dialogVisible"  width="30%"  >
                      <span>这是一段信息</span>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submt()">确 定</el-button>
                      </span>
                    </el-dialog>

                <div class="box_left" >

                    <div v-for="(topics,index) in sortedTopics" :key="index" >
                        <!-- {{topics}} -->
                        <div class="topicsType" v-if="topics.topic_content.length != 0 ">
                            
                            <h4 v-if="topics.topicType == 1">一.&nbsp;&nbsp;单选题</h4>
                            <h4 v-if="topics.topicType == 2">二.&nbsp;&nbsp;多选题</h4>
                            <h4 v-if="topics.topicType == 3">三.&nbsp;&nbsp;填空题</h4>
                            <h4 v-if="topics.topicType == 4">四.&nbsp;&nbsp;描述题</h4>
                            <h4 v-if="topics.topicType == 5">五.&nbsp;&nbsp;简答题</h4>
                            <div class="topic-content" v-for="(t, index) in topics.topic_content" :key="index" style="margin-left:20px;margin-bottom: 10px">
                                <div>
                                   {{index+1}}.&nbsp;&nbsp;{{t.substr(0,t.indexOf('|'))}} 
                                   <span></span>
                                </div>     

                                <!-- 单选 -->
                                <div class="radio" v-if="topics.topicType == 1" >                           
                                  <el-radio v-for="(item,index) in (t.substring(t.indexOf('|')+1, t.lastIndexOf('|')).split(','))" :key="index" v-model="lest[t.substr(0,t.indexOf('|'))]"
                                  :label="item.substr(0,item.indexOf('.'))" 
                                  style="display:block; margin:10px"  @change="choice(item,t.substr(0,t.indexOf('|')),topics.topicType)">
                                    {{ item }}
                                  </el-radio>
                                </div>
                                <!-- 多选 -->
                                <div class="checkbox" v-if="topics.topicType == 2">
                                  <el-checkbox-group v-model="lest[t.substr(0,t.indexOf('|'))]">
                                    <el-checkbox :label="item.substr(0,item.indexOf('.')).trim()" v-for="(item,index) in (t.substring(t.indexOf('|')+1, t.lastIndexOf('|')).split(','))" 
                                    :key="index" 
                                    style="display:block; margin:10px;" @change="multiple(item,t.substr(0,t.indexOf('|')),topics.topicType)"
                                    >
                                     {{ item }}
                                    </el-checkbox>
                                    </el-checkbox-group>
                                </div>

                                 <!-- 填空题 -->
                                <div class="fillInBlank" v-if="topics.topicType == 3">        
                                   <div v-for="(item,indexs) in t.substr(t.lastIndexOf('|')+1).split(',')" :key="indexs" @change="completion(index,t.substr(0,t.indexOf('|')),topics.topicType)">
                                       <!-- <div>{{item}}</div> -->
                                       <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="lest[t.substr(0,t.indexOf('|'))]" style="width:400px;height:100px;line-heigth:100px;" ref="test" class="input_box"></el-input>
                                        <!-- <input  type="textarea" placeholder="请输入内容" :value="t.substring(t.lastIndexOf('|')+1,t.indexOf('('))" style="width:400px;height:100px;line-heigth:100px;" ref="test" class="input_box"> -->
                                      </div>
                                  <!-- {{ t.userAnswer }} -->
                                </div>

                                <!-- 描述题 -->
                                <div class="text" v-if="topics.topicType == 4">
                                    <div v-for="(item,index) in t.substr(t.lastIndexOf('|')+1).split(',')" :key="index"  @change="describe(index,t.substr(0,t.indexOf('|')),topics.topicType)">
                                        <!-- <div>{{item}}</div> -->
                                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="lest[t.substr(0,t.indexOf('|'))]" style="width:400px;height:100px;line-heigth:100px;" ref="des" class="input_box"></el-input>
                                         <!-- <input  type="textarea" placeholder="请输入内容" :value="t.substring(t.lastIndexOf('|')+1,t.indexOf('('))" style="width:400px;height:100px;line-heigth:100px;" ref="des" class="input_box"> -->
                                    </div>
                                </div>
                                 <!-- 简答题 -->
                                <div class="texts" v-if="topics.topicType == 5">
                                    <div v-for="(item,index) in t.substr(t.lastIndexOf('|')+1).split(',')" :key="index" @change="brief(index,t.substr(0,t.indexOf('|')),topics.topicType)">
                                       <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="lest[t.substr(0,t.indexOf('|'))]" 
                                            style="width:400px;height:100px;line-heigth:100px;" ref="br" class="input_box">
                                        </el-input>

                                       <!-- <input  type="textarea" placeholder="请输入内容" :value="t.substring(t.lastIndexOf('|')+1,t.indexOf('('))" style="width:400px;height:100px;line-heigth:100px;" ref="br" class="input_box"> -->
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
            isLoading:true,
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
            nowtime:"00:00:00",
            start: -1,
            dialogVisible: false,
            wow:'',
            test_key:'',
            answer:[],//全部题
            ccw:[],
            lest:{},
            once:['A','B','C']
           


        }
    },
   mounted(){  
            this.$http.get('/home/studentdesc')
                .then(
                    res => {
                        if (res) {
                          this.isLoading = false
                        }
                    //   console.log(res.data.userdata.uid)
                    //修改的ajax    
                       this.$http.get('/task/modifywork',{test_key:this.$route.query.test_key, 
                        course_id:this.$route.query.course_id,
                        uid: res.data.userdata.uid,
                        }).then(
                            result => {
                                // console.log(result)
                                if(result.code == 200){
                                    if (res) {
                                      this.isLoading = false
                                    }
                                 result.data.forEach((element,key)=> {
                                   
                                     for (let item of this.sortedTopics) {
                                        
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
                                 console.log(this.lest)
                                }  
                            }
                        )
                    }
                )
                window.addEventListener('scroll', this.scrollToTop)
        },

    destroyed () {
      window.removeEventListener('scroll', this.scrollToTop)
    },

    methods:{
        submt() {
            // {
                // courseID:1,
                // deal_text:'题目内容',
                // uid:'学生id',
                // deal_nub:'1' //类型默认1作业
            // }
            let uid = '';
            this.$http.get('/home/studentdesc')
                .then(
                    res => {
                       uid = res.data.userdata.uid
                    
                let newduo = ''
                this.ccw.forEach((item )=> {
                   item.deal_text =  item.deal_text.sort()
                   this.lest[item.head]=this.lest[item.head].sort()
                    console.log(this.lest[item.head])
                   this.lest[item.head].forEach((once,key)=> {
                       newduo += once.trim()
                   })
                //    console.log(newduo)
                   let a = -1
                    this.answer.forEach((once,index) => {
                        if(once.head == item.head){
                            a = 1
                            once.deal_text = item.head+'|'+newduo+'(2)'
                        }                                                        
                    })      
                   if(a == -1){
                        this.answer.push({
                            head:item.head,
                            deal_text:item.head+'|'+newduo+'(2)'
                        })
                   }
                   newduo = ''
                })
                // console.log(JSON.stringify(this.answer))
                this.$http.post('/task/viewhomework',{
                    courseID:this.$route.query.course_id,  
                    uid: uid,  //学生编号
                    deal_nub:1,
                    tid:this.$route.query.test_key,//作业编号
                    deal_text: JSON.stringify(this.answer)     
                }).then(
                    res =>{
                        console.log(res)
                        this.$router.push('/work')
                    }
                )
            })
                // console.log(this.answer)
            
         },
    

         //选择
         choice(item,subject,type){          
            console.log(this.radio,2)
            if(this.answer.length  == 0){
                this.answer.push({
                    head: subject.trim(),
                    deal_text: subject.trim()+'|'+item.substr(0,item.indexOf('.') ).trim()+'('+type+')'
                })
            }
            else {
                let a = -1
                this.answer.forEach((once,index) => {
                    if(once.head == subject){
                        a = 1
                        once.deal_text = subject.trim()+'|'+item.substr(0,item.indexOf('.') ).trim()+'('+type+')'
                    }                                                                                                
                })      
                if( a == -1){
                    this.answer.push({
                        head: subject.trim(),   
                        deal_text: subject.trim()+'|'+item.substr(0,item.indexOf('.') ).trim()+'('+type+')'
                    })
                }  
                 
            }
             console.log(this.answer) 
        } ,                                       
        //  //多选
         multiple(item,subject,type){
            //  console.log(item)
            // console.log(item,subject,type)
            if(this.ccw.length  == 0){
                this.ccw.push({
                   head: subject.trim(),   
                   deal_text: [item.substr(0,item.indexOf('.') ).trim()]
                })
            }else {
                let a = -1
                let b = -1;
                let num = 0
                this.ccw.forEach((once,index) => {
                    if(once.head == subject.trim()){
                        b =  1
                        num = index
                        once.deal_text.forEach((itemc,key) => {
                            // console.log(itemc)
                            
                            if(itemc == item.substr(0,item.indexOf('.')).trim()){//如果相等删除
                                a = 1
                                once.deal_text.splice(key,1)
                            }  
                
                        })                    
                    }                                                    
                })    
                if(b == -1){
                    this.ccw.push({
                        head: subject,   
                        deal_text: [item.substr(0,item.indexOf('.') ).trim()]
                    })
                
                }else if (a == -1){
                    this.ccw[num].deal_text.push(item.substr(0,item.indexOf('.') ).trim())
                }      
            }  
            console.log(this.ccw)                                                                                                                                  
         },
        //  //填空题
        completion(index,subject,type){
             if(this.answer.length  == 0){
                    this.answer.push({
                       head: subject.trim(),   
                       deal_text: subject.trim() +'|'+this.lest[subject]+'('+type+')'
                    })
                   
                }else {     
                    let a = -1  
                    this.answer.forEach((once,index) => {
                        if(once.head == subject){
                            a =1
                            once.deal_text = subject.trim() +'|'+this.lest[subject]+'('+type+')'
                           
                        }                                                         
                    })   
                    if( a == -1){
                        this.answer.push({
                            head: subject.trim(),   
                            deal_text: subject.trim() +'|'+this.lest[subject]+'('+type+')'
                        })
                        
                    }    
                }
            // console.log(this.answer)                                                   
        },
   
        //描述
        describe(index,subject,type){
            if(this.answer.length  == 0){
                        this.answer.push({
                           head: subject.trim(),   
                           deal_text: subject.trim() +'|'+this.lest[subject]+'('+type+')'
                        })
                    }else {     
                        let a = -1  
                        this.answer.forEach((once,index) => {
                            if(once.head == subject){
                                a =1
                                once.deal_text = subject.trim() +'|'+this.lest[subject]+'('+type+')'
                            }                                                         
                        })   
                        if( a == -1){
                            this.answer.push({
                                head: subject.trim(),   
                                 deal_text: subject.trim() +'|'+this.lest[subject]+'('+type+')'
                            })
                        }    
                    }                    
            console.log(this.answer)
        },
        //简答
        brief(index,subject,type){ 
            console.log(this.lest[subject])
            if(this.answer.length  == 0){
                this.answer.push({
                   head: subject.trim(),   
                   deal_text: subject.trim() +'|'+this.lest[subject]+'('+type+')'
                })
            }else {     
                let a = -1  
                this.answer.forEach((once,index) => {
                    if(once.head == subject){
                        a =1
                        once.deal_text = subject.trim() +'|'+this.lest[subject]+'('+type+')'
                    }                                                         
                })   
                if( a == -1){
                    this.answer.push({
                        head: subject.trim(),   
                        deal_text: subject.trim() +'|'+this.lest[subject]+'('+type+')'
                    })
                }    
            }                     
        console.log(this.answer)    
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
    },
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
    border-radius: 10px;
    box-shadow: 5px 5px 5px #8888885d;
    .box_left {
        margin-top: 20px;
        margin-left: 20px;
    }
    .test_info {
        float: right;
        margin-top: 10px;
        margin-right: 30px;
        border:1px solid black;
        color: #FFF;
        background:#409EFF;
        
    }
    .test_info:hover {
        background:#bbbec2;
    }
    .input_box:focus {
        outline: none;
        border: 2px solid #1aa6b7;
    }
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


