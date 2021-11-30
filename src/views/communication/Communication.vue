<template>
    
    <div class="selectask">
     

  <Loading v-if="isLoading"></Loading>

        <div class="show_selectask">
            <div class="heads">
                <div class="headsdata">
                    <el-row :gutter="20">
                    <el-col :span="5"><div class="release_kit">
                    <div style="line-height: 300px;  width: 400px; margin-left: 20px; height: 100px">
                    <el-input placeholder="搜索内容关键词" style=""  class="input-with-select selectkeyword" v-model="searchvalue" clearable @change="gobackproblem(searchvalue)">
                        <el-button slot="append" icon="el-icon-search" @click="handleCurrentChange(pageNo, searchvalue)"></el-button>
                    </el-input>
                    </div>
                    </div></el-col>
                    <el-col :span="19"><div class="release_kit">
                    <!-- <el-button type="text" @click="publish()"> 发布</el-button> -->
                   
                        <el-dialog title="请发布" :visible.sync="dialogFormVisible" width="500px" >

                            <!-- 问题对应课程下拉框选择 -->

                            <div class="release_frame_list">
                                    <el-select v-model="course_value" placeholder="请选择想问的课程" style="margin-bottom:20px ;">
                                    <el-option
                                    v-for="item in course_data"
                                    :key="item.course_id"
                                    :label="item.course_name"
                                    :value="item.course_id">
                                    </el-option>
                                    </el-select>



                                    <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入你的问题"
                                    v-model="ask_textvalue">
                                    </el-input>
                            </div>
                            

                            <!-- <el-input  autocomplete="off" placeholder="你的问题" v-model="ask_textvalue"></el-input> -->
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="release_aim(course_value, ask_textvalue)">发 布</el-button>
                                </div>
                        </el-dialog>
                        </div></el-col>
                    </el-row>
                </div>
            </div>

             <el-button type="primary" size="medium" class="fixrelease" icon="el-icon-edit" circle @click="publish()" ></el-button>


            <!-- <div  style="margin: 0 auto;width: 1200px;background-color: #fff;" v-show="gobackstate">
                <el-page-header @back="goBack" content="返回首页"></el-page-header>
            </div>
             -->
            <div class="show_middle">
                <div class="record" v-for="(item, index) in askdata" :key="index">
                    <div class="record_heads">
                        <el-avatar shape="square" :size="20" :src="item.head_img" class="record_heads_img"></el-avatar>
                        <span class="askname">{{ item.nickname }}</span>
                        <el-tag type="danger" effect="dark" class="record_heads_course_name" size="mini">{{ item.course_name }}</el-tag>
                        <span class="ask_info">
                           
                        </span>
                    </div>
                
                     
                    <div class="record_content">
                        <div class="record_content_ask_text">{{ item.ask_text }}</div>
                        <div class="answerdata" @click="getanswer(item.ask_key)">
                            <el-collapse style="border: none; color: red;" >
                                <el-collapse-item  class="replylinke" title="查看回复" name="4" style="border: none; ">
                                     <div v-for="(item, index) in answerdata" :key="index" style="margin-bottom: 20px;">
                                            <div class="record_heads">
                                                <el-avatar shape="square" :size="20" :src="item.head_img" class="record_heads_img"></el-avatar>
                                                <span class="askname">{{ item.nickname }}</span>
                                                 <span class="record_content_ask_time" style="">{{ item.replay_time }}</span>
                                                <div class="record_replay_text">
                                                    <span class="record_content_ask_text" style="margin-left: 20px;">{{ item.replay_text }}</span>
                                                </div>
                                            </div>
                                     </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        
                        <div class="record_content_ask_time">{{ item.ask_time }}</div>
                        
                    </div>
                    
                    
                     
                     
                </div>

            </div>
            
            <div class="foot">
                <div class="footer">
               <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="pageNo"
                layout="prev, pager, next"
                :total="pagetotal">
                </el-pagination>
            </div>
            </div>
        </div>

         <el-backtop target=".selectask">123</el-backtop>
    </div>
</template>

<script>
export default {
    data(){
        return {
            pageNo: 1,
            askdata:[],
            answerdata:[],
            dialogFormVisible: false,
            course_value: '',
            searchvalue: '',
            ask_textvalue:'',
            course_data:[],
            pagetotal: 1,
            gobackstate: false,
            isLoading: true
            }
    },
    methods: {
        handleCurrentChange(page, keyword ='') {
            console.log(keyword);
            if (keyword != '') {
               this.gobackstate = true 
            }
            this.pageNo = page
            
            this.$http.get('/forum/selectask',{
            'page':this.pageNo,
            'keyword': keyword
            }).then(
                res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.isLoading = false
                    }
                    this.askdata = res.data.desc
            
                    this.pagetotal = res.data.item * 10
                    this.askdata.forEach((val) => {
                        this.$http.get('/forum/count',{'ask_key':val.ask_key}).then(
                            res => {
                            
                           
                                val['count_ask_key'] = res.data['count(ask_key or null)']
                            }
                        )
                    })
                    
                    
                }
            )
        },
        getanswer(ask_key){
            
            this.$http.get('/forum/showask',{ask_key}).then(
                res => {
                    if (res.code == 200) {
                        this.isLoading = false
                    }
                    this.answerdata = res.data
                   
                }
            )
            
        },
        gobackproblem(keyword) {
            if (keyword == '') {
                this.handleCurrentChange()

            }

        },
        // 搜索返回
        goBack() {
            this.gobackstate = false
            this.handleCurrentChange(1)
            
        },
        publish(){
     
            this.dialogFormVisible = true;
            let gid = this.$route.params.gid;
            this.$http.get('grade/findgrade', {gid}).then(
                res => {
                    if (res.code == 200) {
                        this.isLoading = false
                    }
                    this.course_data = res.data
                }
            )

        },
        release_aim(course_value, ask_textvalue){
   
            this.dialogFormVisible = false;

            this.$http.post('/forum/addask',{
                course_id: course_value,
                ask_text: ask_textvalue
            }).then(
                res => {
                    if (res.code == 200) {
                        this.isLoading = false
                        this.$notify({
                            title: '发布成功',
                            message: '请安心等待老师的解答',
                            type: 'success'
                        });
                        this.ask_textvalue = '';
                        this.handleCurrentChange(this.pageNo)
                    }else {
                        this.$notify({
                            title: '发布失败',
                            message: '请重试',
                            type: 'error'
                        });
                    }
                    
                }
            )
        }
      
    },
    
    mounted() {
        this.handleCurrentChange(this.pageNo)
        
        


    }
    
}
</script>

<style lang="less" scoped>



.item {
    
  margin-top: 10px;
  margin-right: 40px;
  
}
.selectkeyword {
    opacity: 0.8;
}

.selectkeyword:hover {
    opacity: 1;
}

.fixrelease {
    position: fixed;
    top:100px;
    right: 120px;
}

.release_frame_list {
    width: 300px;
    text-align: left;
    margin: 0 auto;
}


.show_selectask {
    min-height: 1000px;
   
    // background-color: #333;
    .heads {
        height: 250px;
        width: 1200px;
        margin:  10px auto;
        background: url('../../assets/images/problem.png');
        background-size: contain;
        
        .headsdata {
            width: 1200px;
            height: 100%;
            margin: 0 auto;
            .release_kit {
               
                height: 100%;
            }
        }
    }
    .show_middle {
        width: 1200px;
        min-height: 800px;
        background-color: #fff;
        box-shadow: 2px 2px 10px #888;
        margin: 10px auto;
        .record {
            
            width: 100%;
            height: auto;
            border-bottom: 1px dashed #999;
            .record_heads {
                text-align: left;
                height: 50px;
                color: #0077b6;
                margin-left: 30px;
                .record_heads_img {
                    line-height: 50px;
                    margin-right: 10px;
                }
                .askname {
                    line-height: 50px;  
                    margin-right: 50px;
                }
                .record_heads_course_name{
                    margin-right: 30px;
                }
                .ask_info {
                    margin-left: 800px;
                }
            }
            .record_content {
                margin-left: 30px;
                text-align: left;
                .record_content_ask_text {
                    height: 100px;
                    overflow: hidden;
                    
                     
                }
                .record_content_ask_time {
                 
                    color: #999;
                    font-size: 8px;
                    text-align: right;
                    padding-right: 50px;
                }
               
            }
        }
    }
    
    .foot {
        height: 100px;
        background-color: #fff;
        border-top: 1px solid #999;
        .footer {
        width: 1200px;
        margin:  0 auto;
        background-color: #FFF;
    }
       
    }
}




</style>