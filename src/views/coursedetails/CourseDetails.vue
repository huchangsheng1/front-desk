<template>
    <div class="coursedetails">
         <Loading v-if="isLoading"></Loading>
        <div class="courss_info" :style="{ 'background': 'url(' + course_data.imgsrc + ') no-repeat center', 'background-size': '100%'}">
            <div class="courss_info_data">
                <div class="cours_head">
                   <h2>{{ course_data.course_name }}</h2> 
                </div>
                <div class="cours_body">

                    <div><span>授课教师:</span>{{ course_data.nickname }}</div>
                    <div><span>我的班级:</span>{{ course_data.gname }}</div>
                    <div><span>课程简介:</span>{{ course_data.descs }}</div>
                    <div style="overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap" class="course_start_time"><span>课程时长:</span>{{course_data.start_time}} --- {{course_data.end_time}}</div>


                </div>
            </div>
                
        </div>
        <div class="main">
            <div class="chapter_set">
                <div class="chapter_tit">
                        本章目录
                </div>
                <div class="chapter_info">
                   <div class="chapter" v-for="(item, index) in chapterdata" :key="index" :data-key=item.chapter_id :class="[index == status   ? 'cour_cut' : '']"  @click="lookchapter(item.chapter_id, index )"  >
                       &emsp;第{{index+1 }}章&emsp;{{ item.chapter_name }}
                   </div>
                </div>
            </div>
            <div class="section_set">
                <div class="section_info">
                    <div class="section_tit">
                        本章小节
                    </div>
                    <div class="section_content">
                        <div class="section" v-for="(item, index) in sectiondata" :key="index" :data-key=item.chapter_id @click="lookresources(item.chapter_id, index)" :class="[index == statustwo  ? 'cour_cut' : '']" >
                            &emsp;第{{index+1}}节&emsp;{{ item.chapter_name }}
                        </div>
                    </div>
                </div>

                <div class="section_resources">

                    <div class="resources_ppt">
                        <div class="resources_tit">
                        课件资料
                        </div>
                        <div class="ppt" v-for="(item, index) in resourcesdata['ppt']" :key="index" :class="[index == statusthree  ? 'cour_cut' : '']">
                            
                            <i class="pptKey"></i><span>{{item['srcname']}}</span><i class="upppt" @click="lookptf(item['src'], index)"></i>
                        </div>
                        


                    </div>

                    

                    <div class="resources_video">
                        <div class="resources_tit">
                        视频资料
                        </div>
                        <div class="video" v-for="(item, index) in resourcesdata['video']" :key="index" :class="[index == status  ? 'cour_cut' : '']"  @click="lookvideo(item['src'] ,index)">
                           <i class="videoKey"></i><span>{{item['srcname']}}</span><i class="upvideo" @click="videodialog = true"></i>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- 预览ppt -->
        <el-dialog
            title="提示"
            :visible.sync="pptdialog"
            width="50%"
            height="100%"
           
           
            :before-close="handleClose">
            <!-- <template> -->
                <div class='demoptf' style="height=700px">
                 <embed
                :src=ptfsrc
                type="application/pdf"
                width="100%"
                height="600px"/>
                </div>
            <!-- </template> -->
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="pptdialog = false">取 消</el-button>
                <el-button type="primary" @click="pptdialog = false">确 定</el-button>
            </span> -->
        </el-dialog>



        <!-- 播放视频 -->
        <el-dialog
            title="提示"
            :visible.sync="videodialog"
            width="50%"
            :before-close="handleClose">
            <template>
                <div class='demo'>
                <video-player class="video-player vjs-custom-skin" 
                        ref="videoPlayer" 
                        :playsinline="true" 
                        :options="playerOptions">
                </video-player>
                </div>
            </template>
            <span slot="footer" class="dialog-footer">
                <el-button @click="videodialog = false">取 消</el-button>
                <el-button type="primary" @click="videodialog = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
    data() {
        return {
            status:0,
            statustwo:0,
            statusthree:0,
            course_data: '',
            pptdialog: false,
            videodialog: false,
            chapterdata: [],
            sectionset: [],
            sectiondata: [],
            resourcesdata:[],
            playerOptions: {
                playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
                autoplay: false, // 如果为true,浏览器准备好时开始回放。
                muted: true, // 默认情况下将会消除任何音频。
                loop: false, // 是否视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                type: "video/mp4", // 类型
                src: '' // url地址
                }],
                poster: '', // 封面地址
                // notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                // controlBar: {
                //     timeDivider: true, // 当前时间和持续时间的分隔符
                //     durationDisplay: true, // 显示持续时间
                //     remainingTimeDisplay: false, // 是否显示剩余时间功能
                //     fullscreenToggle: true // 是否显示全屏按钮
                // }
            },
            ptfsrc: '',
            isLoading: true,
            chapter_Serial_number: []



        }
    },
    methods: {
        lookchapter(chapter_id,index){
            this.status = index;
            this.sectiondata.length = 0
            this.sectionset.forEach((val, key) => {
                if (val.chapter_key == chapter_id) {
                    this.sectiondata.push(val)
                }
                 
            })
        },
        lookresources(chapter_id, index){
            this.statustwo = index;
            this.$http.get('/course/sectionresource',{ chapter_id }).then(
                res => {
                    if (res.code == 200) {
                        this.isLoading = false
                    }
                    this.resourcesdata = res.data
                }
            )
        },
        lookvideo(videosrc, index) {
           this.statusthree = index;
            this.playerOptions.sources[0].src = videosrc
        },
        lookptf(ptfsrc, index){
            this.statusthree = index
            console.log(ptfsrc,'kkkkkk');
            this.pptdialog = true;
            this.ptfsrc = ptfsrc

            console.log(ptfsrc);

        },
         handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
             })
            .catch(_ => {});
      }
    },

    mounted(){
        console.log(this.$route.params.course_id);
        let chapter_course_id = this.$route.params.course_id;
        console.log(this.$route.params.course_id);
        this.$http.get('/course/foundchapters',{
            chapter_course_id,
        }).then(
            res => {
              if (res.code == 200) {
                    this.isLoading = false
              }
              if (!res[0]) {
                  return;
              }
               res.forEach((val, key) => {
                   if (val.chapter_key == 0) {
                       this.chapterdata.push(val)
                   } else if (val.chapter_key != 0){
                       this.sectionset.push(val)
                   } 
               });
               
               this.lookchapter(this.chapterdata.sort(function(a, b) {
                    return a.chapter_sort - b.chapter_sort;
               })[0].chapter_id, 0)

               
                this.lookresources(this.sectiondata.sort(function(a, b) {
                    return a.chapter_sort - b.chapter_sort;
               })[0].chapter_id, 0)

               
            }
        )

        this.$http.get('/course/setcourse', {'course_id':chapter_course_id}).then(
            res => {
                if (res.code == 200) {
                    this.isLoading = false
                }
                this.course_data = res.data[0]
            }
        )

        
        
    }
    
}
</script>

<style lang="less" scoped>



.cours_label {
    background: #E1F3D8;
}
.demoptf{
    height: 100%;
}
.coursedetails{
    height: 1000px;
    .courss_info {
        
        height: 12.5rem;
        border: 1px solid #999;
        // background-color: #FFF;
        
        .courss_info_data {
            position: relative;
            text-align: center;
            width: 1200px;
            height: 12.5rem;
           
            background: rgba(30, 30, 30, 0.8);
            margin:  0 auto;
            
            .cours_head {
                
                color: #faf9f9;
                h2 {
                    font-size: 100px;
                }
            }
            .cours_body {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 20%;
                padding-left: 20px;
                // border: 1px solid red;
                div {
                    width: 22%;
                    text-align: left;
                    float: left;
                    color: #FFF;
                        // overflow: hidden;
                        // text-overflow: ellipsis;
                        // -o-text-overflow: ellipsis;
                        // -webkit-text-overflow: ellipsis;
                        // -moz-text-overflow: ellipsis;
                        // white-space: nowrap;
                    span {
                        // display: block;
                        // width: 110px;
                        font-size: 20px;
                        margin-right: 5px;
                        // float: left;
                        
                    }
                    
                    
                }
                .course_start_time {
                    width: 300px;
                }
            }
           
            
            
        }
    }
    .main {
        width: 1200px;
        height: 37.2rem;
        background-color: #ffff;
        box-shadow: 5px 5px 5px 5px #9999;
        border-radius: 10px;
        margin: 1.25rem auto;
        .chapter_set {
            width: 20%;
            height: 100%;
            border-radius: 10px;
            margin: 20px;
            float: left;
            .chapter_tit {
                height: 10%;
                // border: 1px solid #333;
                box-shadow: 5px 5px#ced4da;
                border-radius: 10px;
                margin-bottom: 1.25rem;
                line-height: 53px;
                background-color: #52b788;
                font-size: 20px;
                color: #FFF;
            }
            .chapter_info {
                height: 80%;
                border-radius: 10px;
                border: 5px solid #52b788;
                .chapter {
                    width: 200px;
                    height: 30px;
                    border-radius: 4px;
                    line-height: 30px;
                    text-align: left;
                    background: #d3dce6;
                    font-size: 10px;
                    margin: 10px auto;

                }
                // .chapter:hover {
                //     background-color: #52b788;
                //     color: #FFF;
                // }
            }
        }
        .section_set {
            width: 72.5%;
            height: 94%;
            border: 5px solid #52b788;
            float: left;
            border-radius: 0 10px 0 10px;
            margin: 20px;
            .section_info {
                width: 69.543%;
                height: 100%;
                border-right: 5px solid #52b788;
                // border-bottom: none;
                float: left;
                .section_tit {
                    height: 10%;
                    border-bottom: 1px solid #52b788;
                    height: 10%;
                    line-height: 53px;
                    background-color: #52b788;
                    // box-shadow: 0px 5px 5px 0px #ced4da;
                    font-size: 20px;
                    color: #FFF;
                }
                .section {
                    width: 580px;
                    height: 30px;
                    border-radius: 4px;
                    line-height: 30px;
                    text-align: left;
                    margin: 10px auto;
                    background: #d3dce6;
                    font-size: 10px;
                }
                
                //  .section:hover {
                //      background-color: #52b788;
                //      color: #FFF;
                //  }
            }
            .section_resources {
                    width: 29.885%;
                    height: 100%;
                    float: left;
                    .resources_ppt {
                        height: 49%;
                        border-bottom: 1px solid #ced4da;
                        .resources_tit {
                            height: 10%;
                            color: #fff;
                            background-color: #52b788;
                            width: 101%;
                            // box-shadow: 0px 5px 5px 0px #ced4da;
                            
                        }
                        .ppt {
                            width: 90%;
                            height: 30px;
                            box-shadow: none;
                            font-size: 10px;
                            text-align: left;
                            margin: 10px auto;
                            .pptKey {
                                display: block;
                                width: 30px;
                                height: 30px;
                                background: url('../../assets/images/pptKey.png');
                                background-size: contain;
                                margin-right: 20px;
                                float: left;
                            }
                        
                            span {
                                display: block;
                                width: 60%;
                                line-height: 30px;
                                font-size: 12px;
                                float: left;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                -o-text-overflow: ellipsis;
                                -webkit-text-overflow: ellipsis;
                                -moz-text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            .upppt {
                               display: block;
                                width: 20px;
                                height: 20px;
                                background: url('../../assets/images/upppt.png');
                                margin: 5px 10px;
                                background-size: contain;
                                float: right;
                            }
                            
                        }
                        .ppt:hover {
                            box-shadow: 2px 2px 2px 2px #999;
                            
                        }
                    }
                    .resources_video {
                        height: 49%;
                        box-shadow: none;
                        .resources_tit {
                            height: 10%;
                            width: 101%;
                            color: #fff;
                            background-color: #52b788;
                            border-top: 5px solid #52b788;
                            // box-shadow: 0px 5px 5px 0px #ced4da;
                            // border-bottom: 5px solid #ced4da;
                          
                        }
                        .video {
                            width: 90%;
                            height: 30px;
                            box-shadow: none;
                            font-size: 10px;
                            text-align: left;
                            margin: 10px auto;
                                .videoKey {
                                    display: block;
                                    width: 30px;
                                    height: 30px;
                                    background: url('../../assets/images/videoKey.png');
                                    background-size: contain;
                                    margin-right: 20px;
                                    float: left;
                                }
                                span {
                                    display: block;
                                    width: 60%;
                                    line-height: 30px;
                                    font-size: 12px;
                                    float: left;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    -o-text-overflow: ellipsis;
                                    -webkit-text-overflow: ellipsis;
                                    -moz-text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                                .upvideo {
                                    display: block;
                                    width: 20px;
                                    height: 20px;
                                    background: url('../../assets/images/upvideo.png');
                                    margin: 5px 10px;
                                    background-size: contain;
                                    float: right;
                                                            
                                
                                }
                        }
                        .video:hover {
                        box-shadow: 2px 2px 2px 2px #999;
                    }
                }
                    

                    
            }

            
        }

    }
    
}

.cour_cut {
        color: #FFF;
        background-color: #52b788;
    
    }
</style>