<template>
    
<div class="first">
    <Loading v-if="isLoading"></Loading>
    <div class="rotation_chart">
          <template>
            <el-carousel indicator-position="outside" height="500px">
            <el-carousel-item v-for="(item, index) in winimg" :key="index">
                <img :src=item alt="" class="winimage">
            </el-carousel-item>
            </el-carousel>
          </template>
    </div>

    <!-- 核心内容 -->
    <div class="main">

        
        <div class="before_course">
            <div class="heads">
                <span class="tit"><span class="tit_content"><i class="el-icon-s-management"></i>当前课程</span></span>
            </div>

            <div class="course_set" v-for="(item, index) in course_data" :key="index" 
            :data-key="item" @click="details(item.course_id)">
                <div class="course_winimg">
                    <img :src=item.imgsrc alt="123" class="courseimage">
                </div>
                 
                <div class="course_text">
                    <p class="course_name">{{ item.course_name }}</p>
                <p class="course_classes">{{ item.gname }}</p>
                <p class="course_time">{{item.start_time}}-{{item.end_time}}</p>
                <p class="course_descs">{{ item.descs }}</p>
                <p class="course_brief">
                    <a>章:{{ item.chapter }}</a>
                    <a>节:{{ item.section }}</a>
                    <a>人数:{{ item.gnub }}</a>
                    <a>教师:{{ item.nickname }}</a>
                </p>
                </div>
                
            </div>
        </div>
        <div class="course_foot">
            <div class="pagetool">
                    <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageNo"
                    layout="prev, pager, next"
                    :total="totalsum"
                    
                    >
                    </el-pagination>
            </div>
        </div>
        
    </div>

</div>

</template>

<script>
export default {
    data(){
        return {
            course_data: '',
            imgsrc: [],
            winimg: '',
            pageNo: 1,
            totalsum: 1,
            isLoading: true,
            userinfo:''
         
        }
        
    },
    methods: {
        handleCurrentChange(page) {
            this.pageNo = page
            this.$http.get('/course/rendercourses',{
            'page':this.pageNo
            }).then(
                res => {
                
                    if (res.code == 200) {
                        this.isLoading = false
                    }
                    this.course_data = res.data;
                    this.tool = res.turnpages
                    

                }
            )
        },
        details(course_id) {     //跳转课程详情
            console.log(course_id);
            this.$router.push(`/coursedetails/${course_id}`)
        }

    },
    mounted(){
        this.$http.get('/user/personal').then(
            res => {
                console.log(res,'信息');
                if (res.code == 200) {
                    this.userinfo = res 
                }
               
            }
        )

       
         
        this.$http.get('/home/homeimg').then(
            res => {
                if (res.code == 200) {
                    this.isLoading = false
                }
                this.winimg = res.data
            }
        )
    
        //获取课程数据
        this.$http.get('/course/rendercourses',{
         
            'page':this.pageNo
        }).then(
            res => {
              
                if (res.code == 200) {
                    this.isLoading = false
                }
               this.totalsum =  res.turnpages *10
             let coureslist = []
               res.data.forEach((val) => {
                   let currenttime = new Date(val.end_time).getTime()
                   
                   if (currenttime > Date.now()) {
                       coureslist.push(val)
                   }
                   
               })
                this.course_data = coureslist
                this.tool = res.turnpages
            

            }
        )         
    }
}
</script>

<style lang="less" scoped>
.winimage{
    width: 100%;
    // height: 100%;
    
}

.first {
    // .rotation_chart{
       
    // }
    .main {
        height: 80%;
        background-color: #f8f9fa;
        margin-top: 1.25rem;
        
        i {
            float: left;
            line-height: 1.9375rem;;

        }
        .before_course {
            width: 75rem;
            height: 700px;
            
            border: 3px solid #52b788;
            background-color: #f2f2f2;
            margin: 0 auto;
        }
        
        
        .heads {
            height: 1.9375rem;
            // background-color: #777;
            margin-bottom: 1.875rem;
        }
        .tit {
            float: left;
            height: 51px;
            font-size: 1.25rem;
            background-color: #52b788;
            padding-right: 300px;
            border-radius: 0px 0px 10px 0 ;
            .tit_content {
                color: #ffff;
                line-height: 51px;
                i {
                    margin: 10px;
                }
            }
            

        }
        .course_set {
            width: 18%;
            // box-shadow:5px 5px 11px #999;
            background-color: #fff;
            border-radius: 15px;
            margin: 20px 1% 1% 1%;
            float: left;
            .course_winimg {
                width: 100%;
                height: 150px;
                .courseimage {
                    width: 100%;
                    height: 100%;
                    border-top-left-radius: 15px;
                    border-top-right-radius: 15px;
                }

            }
            
            .course_text {
                margin-left: .625rem;
                p {
                padding-top: 3px;
                height: 1.5rem;
                text-align: left;
                line-height: 1.5rem;
                }
                .course_name{
                    
                    font-size: 1.25rem;
                }
                .course_classes{
                    font-size: 1rem;
                }
                .course_time{
                    font-size: .625rem;
                }
                .course_brief{
                    font-size: .625rem;
                    a {
                        margin-right: .625rem;
                    }
                   
                }
                .course_descs{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                    -webkit-text-overflow: ellipsis;
                    -moz-text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            

        }
        .course_set:hover {
            cursor:pointer;
            box-shadow:5px 5px 11px #999;
        }
        
        
        .course_foot {
            width: 100%;
            height: 100px;
            .pagetool {
                margin: 50px auto;
            }
            
        }

        

   


      



    }
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
	background-color: #52b788;
}





</style>