<template>
    <div class="exam_frame">
        <Loading v-if="isLoading"></Loading>
        <div class="logo">查看成绩界面logo</div>

        <div class="exam_frame_centent">
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
                                   {{index+1}}.&nbsp;&nbsp; {{(t.t_names).substr(0,t.t_names.indexOf('|'))}} <span>{{t.mark}}/{{t.t_score}}分</span>
                                   <span></span>
                                </div>
                                 <!-- 单选 -->
                                <div class="radio" v-if="topics.topicType == 1" readonly>
                                  <el-radio v-for="(item,index) in (t.t_names).substr(t.t_names.indexOf('|')+1).split(',')" :key="index" v-model="t.o" 
                                  :class="item == t.correctAnswer? 'correct':'error'" 
                                  :label="item" 
                                  style=" margin:10px" disabled>
                                    {{ item }}
                                  </el-radio>
                                  <div class="yeschar">
                                      <p>我选的答案：{{t.tanswer}}</p>
                                      <p>正确答案：{{t.t_answer}}</p>
                                  </div>
                                  <!-- {{ t.userAnswer }} -->
                                </div>

                                <!-- 多选 -->
                                <div class="checkbox" v-if="topics.topicType == 2">
                                  <el-checkbox-group v-model="checkList">
                                    <el-checkbox :label="item" v-for="(item,index) in (t.t_names).substr(t.t_names.indexOf('|')+1).split(',')" 
                                    :key="index" 
                                    v-model="t.userAnswer" 
                                    style="margin:10px;" disabled  
                                    >
                                     {{ item }}
                                    </el-checkbox>
                                    </el-checkbox-group>
                                    <div class="yeschar">
                                        <p>我选的答案：{{t.tanswer}}</p>
                                        <p>正确答案：{{t.t_answer}}</p>
                                    </div>
                                </div>      

                                <!-- 填空题 -->
                                <div class="fillInBlank" v-if="topics.topicType == 3">        
                                   <div v-for="(item,indexs) in (t.t_names).substr(t.t_names.indexOf('|')+1).split(',')" :key="indexs" >
                                       <!-- <div>{{item}}</div> -->
                                        <el-input  type="textarea"  :rows="2"  :placeholder="t.tanswer" v-model="t.o" style="width:400px" ref="test" disabled></el-input>
                                      </div>
                                     <div class="yeschar">
                                        <p>我选的答案：{{t.tanswer}}</p>
                                        <p>正确答案：{{t.t_answer}}</p>
                                    </div>
                                </div>

                                <!-- 描述题 -->
                                <div class="text" v-if="topics.topicType == 4">
                                    <div v-for="(item,index) in (t.t_names).substr(t.t_names.indexOf('|')+1).split(',')" :key="index" >
                                        <!-- <div>{{item}}</div> -->
                                        <el-input  type="textarea"  :rows="2"  :placeholder="t.tanswer"  v-model="t.o" style="width:400px" ref="des" disabled></el-input>
                                    </div>
                                      <div class="yeschar">
                                        <p>我选的答案：{{t.tanswer}}</p>
                                        <p>正确答案：{{t.t_answer}}</p>
                                    </div>
                                </div>

                                <div class="text" v-if="topics.topicType == 5">
                                    <div v-for="(item,index) in (t.t_names).substr(t.t_names.indexOf('|')+1).split(',')" :key="index" >
                                        <!-- <div>{{item}}</div> -->
                                        <el-input  type="textarea"  :rows="2"  :placeholder="t.tanswer"  v-model="t.o" style="width:400px" ref="br" disabled></el-input>
                                    </div>
                                      <div class="yeschar">
                                        <p>我选的答案：{{t.tanswer}}</p>
                                        <p>正确答案：{{t.t_answer}}</p>
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
            let uid = ''
            this.$http.get('/home/studentdesc').then(
                res => {
                    if (res.code == 200) {
                        this.isLoading = false
                    }
                    this.$http.get('/exam/viewscore',{test_key:53,uid:res.data.userdata.uid})
                    .then(
                        result => {
                        //    console.log(result)
                             if(result.code == 221){
                                 result.testinfo.forEach((element,key)=> {
                                     for (let item of this.sortedTopics) {
                                        // 
                                         if((Object.keys(element))[item.topicType-1] == item.topicType){
                                             item.topic_content = element[item.topicType]
                                         }
                                     }
                                 });
                            }  
                        })
                }
            )                                                       
    }
}

</script>


<style lang="less" scoped>

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
            background-color: red;
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
    border: 1px solid red;
}
.start {
    display: none;
}
.test_info {
    display: none;
}
.wod {
    margin: 150px auto;
    width: 300px;
    height: 200px;
    border: 1px solid blue;
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