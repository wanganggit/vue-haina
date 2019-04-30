<template>
    <div class="login-wrapper">
      <!-- row 表示一行 -->
      <el-row type="flex" class="row-bg" justify="center" align="middle">
        <!-- <el-col :span="6" class="login-content"> -->
          <!-- 响应式布局 -->
        <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4" class="login-content">
           <!-- <p>Login登录页面</p>
        <el-button type="success">主要按钮</el-button> -->
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-position="top">
              <el-form-item label="账号" prop="account">
                  <el-input v-model="ruleForm.account"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <!-- type="password" -->
                  <el-input type="password" v-model="ruleForm.password"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
          </el-form>
        </el-col>
        
      </el-row>

       
    </div>
    
</template>

<script>
// 导入axios
import axios from 'axios'
import md5 from 'js-md5'
import Promise from 'babel-polyfill'

if (!window.Promise) {
  window.Promise = Promise;
}

export default {
    data() {
      return {
        ruleForm: {
          // username: 'sdktest',
          // password: 'eab2a1fdcfdc1924b0dfd390a2dbabe2'
          "account": "test2",
          /**
           * "password": "eab2a1fdcfdc1924b0dfd390a2dbabe2"
           */
          "password": "123456"
        },
        ruleForm1:{
          "account": "",
          
          "password": ""
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 30, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 800, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      
      // 登陆功能实现
      login(){
        // http://localhost:8888/api/private/v1/login
        axios.post('https://cloudapi.usr.cn/usrCloud/user/login',this.ruleForm1)
        .then(res=>{
          console.log(res)
          // ES6中的解构用法，取数
          // const { data, meta } = res.data
          const { data, status, info} = res.data
          if(status === 0 ){
            console.log('成功')
            localStorage.setItem('token',data.token)
            // 登陆成功后，需要跳转到首页
            this.$router.push('/home/shouye')
            this.$message({
            type: 'success',
            message: '登录成功!',
            duration: '800'
          });
          }else {
            console.log('登陆失败',info)
            // this.$message.error(meta.msg)
            this.$message.error({
              type: 'error',
              message: info,
              duration: 1000
            })
          }
        })
      },
        // $ref 有在组件中，就表示当前组件
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
            this.ruleForm1.account = this.ruleForm.account;
            this.ruleForm1.password = this.CalcuMD5(this.ruleForm.password);
            localStorage.setItem('account',this.ruleForm1.account);
            localStorage.setItem('password',this.ruleForm1.password);

            //alert('submit!');
            this.login();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // MD5编码转换
      CalcuMD5(pwd) {
        //pwd = pwd.toUpperCase();
        const pwd1 = md5(pwd);
        return pwd1;
      }

    }
          
}
</script>

<style >
  .login-wrapper {
    height: 100%;
    
  }

  .row-bg{
    height: 100%;
    width: 100%;
    position: relative;
    background-image: url(../../assets/login-bg.jpg);
    background-size: 100%;
  }


  /* .row-bg{
    background-color: #2D434C;
  } */

  .login-content{
    /* background-color: #fff; */
    background: rgba(255,255,255, 0.3);
    padding: 20px 35px;
    border-radius: 10px;
    min-width: 240px;
  }

</style>


