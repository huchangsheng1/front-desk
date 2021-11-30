<template>
    <div class="loginstudent">
        
        <div class="modality">
            <h2>学生登录</h2>
            <el-input placeholder="用户名" v-model="usernamevalue" clearable class="username"></el-input>
            <el-input placeholder="请输入密码" v-model="userpasswordvalue" show-password class="userpassword"></el-input>
            
        </div>
        <div class="operation">
                <el-button :plain="true" type="primary" @click="login" class="login_btn">登录</el-button>
        </div>
        
       
    </div>
</template>


<script>

export default {
    name: 'Login',
    data() {
        return {
            usernamevalue: '',
            userpasswordvalue: '',
            currentCom: '',
        };
    },
    methods:{
        
        login(){
            //账号为空验证
            if (this.usernamevalue == '') {
                return this.$message({
                    message: '用户名不能为空!',
                    type: 'error'
                });
            }
            //密码为空验证
            if (this.userpasswordvalue == '') {
                return this.$message({
                    message: '密码不能为空!',
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
            //发起请求
            this.$http.post('/user/login',{
                'phone':this.usernamevalue,
                'password':this.userpasswordvalue,
                'loginblo':false
            }).then(res => {
                    if (res.code == 200  && res.data.rid == 4) {          //请求成功
                        this.$router.push('/')
                        return this.$message({
                            message: '欢迎^-^',
                            type: 'success'
                        });
                    } else if (res.code == 504) {      //登录失败(密码错误)
                        return this.$message({
                            message: '登录失败，密码错误!',
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
                    } else if (res.data.rid != 4) {          //请求成功
                         this.$message({
                            message: '您是管理账号,正为您跳转到管理登录页',
                            type: 'success'
                            
                        });

                        localStorage.removeItem('User-Token');
                        window.location.href =  'http://localhost:8082/login#/login'
                        
                    }

                })

        }
    }
}
</script>

<style lang="less" scoped>
.loginstudent{
    border: 1px solid #FFF;
    .modality {
        height: 70%;
        h2 {
            margin-top: 10px;
        }
        .username ,.userpassword{
            width: 18.75rem;
            margin-top: 1.875rem;
        }
         
            
        
    }
    .operation {
        height: 20%;
        .login_btn {
            width: 12.5rem;
        }
    }

    
}


</style>