<template>
    
    <div class="verificationvode">
        <div class="modality">
            <h2>手机验证码登录</h2>
            <el-input placeholder="手机号" v-model="usernamevalue" clearable class="username"></el-input>
            <p>
                <!-- <el-input placeholder="请输入您收到的验证码" v-model="userpasswordvalue" show-password class="usercode"></el-input> -->
                    <el-input
                            class="usercode"
                            placeholder="验证码"
                            prefix-icon="el-icon-chat-line-round"
                            v-model="sms"
                            clearable>
                        <template slot="append">
                            <span class="sms" @click="send_sms">{{ sms_interval }}</span>
                        </template>
                    </el-input>

            </p>
           
           
            
        </div>
        <div class="operation">
                <el-button :plain="true" type="primary" @click="login" class="login_but">登录</el-button>
        </div>
    </div>

</template>

<script>

export default {
    name: 'Login',
    data() {
        return {
            usernamevalue: '',
            currentCom: '',
            mobile: '',
            sms: '',
            sms_interval: '获取验证码',
            is_send: false,
        };
    },
    methods:{
        // 登录活动
        login(){
            //手机号为空验证
            if (this.usernamevalue == '') {
                return this.$message({
                    message: '手机号不能为空!',
                    type: 'error'
                });
            }
          
            //格式验证
            let phoneverifi = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
            if (phoneverifi.test(this.usernamevalue) == false) { 
               return this.$message({
                    message: '账号格式有误!',
                    type: 'error'
                });
            }
            this.is_send = true;        //符合条件 
            //验证码为空验证
            if (this.sms == '') {
                return this.$message({
                    message: '验证码不能为空!',
                    type: 'error'
                });
            }
            
            this.$http.post('http://localhost:3000/user/login',{
                'phone':this.usernamevalue,
                'smsnub':this.sms,
                'loginblo':true
            }).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$router.push('/')
                        return this.$message({
                            message: '欢迎^-^',
                            type: 'success'
                        });
                    } else if (res.code == 504) {
                        return this.$message({
                            message: '验证码有误!',
                            type: 'error'
                        });
                    } else if (res.code == 505) {
                        return this.$message({
                            message: '登录失败，请检查您的用户名格式是否正确!',
                            type: 'error'
                        });
                    } else if (res.code == 503) {
                        return this.$message({
                            message: '登录失败，请检查您的用户名和密码!',
                            type: 'error'
                        });
                    }

                })

        },
        //获取验证码活动
        send_sms() {
                if (this.usernamevalue == '') {
                    return this.$message({
                        message: '手机号不能为空!',
                        type: 'error'
                    });
                }
          
                //格式验证
                let phoneverifi = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
                if (phoneverifi.test(this.usernamevalue) == false) { 
                return this.$message({
                        message: '账号格式有误!',
                        type: 'error'
                    });
                }
                this.is_send = true;        //符合条件 

                if (!this.is_send) return;
                this.is_send = false;
                let sms_interval_time = 60;
                this.sms_interval = "发送中...";
                let timer = setInterval(() => {
                    if (sms_interval_time <= 1) {
                        clearInterval(timer);
                        this.sms_interval = "获取验证码";
                        this.is_send = true; // 重新回复点击发送功能的条件
                    } else {
                        sms_interval_time -= 1;
                        this.sms_interval = `${sms_interval_time}秒后再发`;
                    }
                }, 1000);
            
                this.$http.post('http://localhost:3000/user/loginsms',{
                'phone':this.usernamevalue,
                'loginblo':false
                }).then(
                    res => {
                        console.log(res);
                        if (res.code == 200) {
                            this.$message({
                                message: '短信发送成功',
                                type: 'success',
                            })
                        } else if (res.code == 506) {
                            this.$message({
                                message: '手机号格式有误!',
                                type: 'error',
                            })
                        } else {
                            this.$message({
                                message: '短信发送失败，请稍后再试。。。',
                                type: 'error',
                            })

                        }
                    }
                )

        }







    }
}
</script>

<style lang="less" scoped>
.verificationvode{
    border: 1px solid #FFF;
    .modality {
        height: 70%;
        h2 {
            margin-top: 10px;
        }
        .username {
            width: 20.75rem;
            margin-top: 1.875rem;
        }
        .usercode {
            width: 20.75rem;
            margin-top: 1.875rem;
        }
        .getcode {
            height: 41px;
        }
         
            
        
    }
    .operation {
        height: 20%;
        .login_but{
      
            width: 12.5rem;
        }

    }

    
}
</style>
