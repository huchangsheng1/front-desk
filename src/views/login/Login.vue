<template>
    <div class="login">
        <div class="frame">
            <div class="poster">
               <img src="../../assets/images/psketch .png" alt="" class="lllustration">
            </div>
    
        <div class="verification">
            <div class="tit">
                
                <span @click="currentCom = 'LoginStudent', state =1" class="cut_student nuv" :class="this.state == 1 ? 'choose': '' ">学生登录</span>
                <span @click="currentCom = 'VerificationCode', state =0" class="cut_teacher" :class="this.state == 0 ? 'choose': '' ">手机验证码登录</span>
                <!-- <router-link to="/login/loginstudent" class="cut">我是学生</router-link>
                <router-link to="/login/loginteacher" class="cut">我是老师</router-link> -->
                
            </div>
           
            <hr>
            <keep-alive>
                <component :is="currentCom" class="show">登录</component>
            </keep-alive>
            <router-view class="show"></router-view>
             <div class="tall"> 
               
            </div>
        </div>        

        </div>
        
        
    </div>
    
</template>



<script>
import LoginStudent from './LoginStudent.vue'

import VerificationCode from './VerificationCode.vue'
export default {
    data(){
        return {
            currentCom: LoginStudent,
            state: 1
        }
    },
    components: {
       LoginStudent,
   
       VerificationCode

    },
    methods:{
        
    }

}

</script>

<style lang="less" scoped>

.login{
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(../../assets/login_bg.jpg);
    .frame{
        box-shadow:5px 5px 5px #333; 
        background: rgba(30, 30, 30, 0.5);
        width: 75rem;
        height:25rem;
        position: absolute;
        top: calc((100% - 25rem)/2);
        left: calc((100% - 75rem)/2);
        .verification{
            width: 50%;
            height: 100%;
            float: right;
            
            background-color: #ffffff;
            .tit {
                height: 10%;
                color: #FFF;
                .cut_student {
                    width: 50%;
                    display: block;
                    color: #000;
                    line-height: 50px;
                    float: left;
                }
                .cut_teacher {
                    width: 50%;
                    display: block;
                    color: #000;
                    line-height: 50px;
                    float: left;
                }
                .choose {
                    color: #ffffff;
                    background-color: #0582ca;
                }
                
            }
            
            .show {
                height: 80%;
            }
            .tall {
                height: 10%;
            }
        }
        .poster {
            width: 50%;
            height: 100%;
            float: left;
           .lllustration {
               width: 100%;
               height: 100%;
            }
            
        }
    }
    
}
    

</style>