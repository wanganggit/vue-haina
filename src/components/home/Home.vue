<template>
    <el-container class="home-wrapper">
            <el-header>
              <el-row>
                <el-col :span="8" class="logo">
                  <img src="@/assets/H3BPM_HN.png" alt="黑马logo">
                </el-col>
                <el-col :span="8">
                  <h4 class="title">海纳（崂应）后台管理系统</h4>
                </el-col>
                <el-col :span="8">
                  <div class="welcome">
                    <span>海纳（崂应）欢迎您！</span>
                    <a href="javascript:;" class="aline" @click.prevent="logout">退出</a>
                  </div>
                </el-col>
              </el-row>
            </el-header>
            
            <el-container>
                <el-aside width="220px">                  
                                 
                  <el-menu
                  router   
                  :data="listDate"            
                  :default-active="$route.path"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"                  
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b">
                    <el-menu-item index="/home/shouye" id="el-submenu-shezhi">
                      <template slot="title">
                        <i id="home-button" class="icon iconfont icon-home"></i>
                        <span>首页</span>
                      </template>
                    </el-menu-item>
                    <el-submenu index="2">
                      <template slot="title">
                        <!-- <i class="el-icon-printer"></i> -->
                        <i id="home-button-shebei" class="icon iconfont icon-jichuguanli"></i>
                        <span>设备首页</span>
                      </template>
                      <el-menu-item index="/home/users">
                        <template slot="title">
                          <!-- <i class="el-icon-menu"></i> -->
                          <span>设备列表</span>
                        </template>
                      </el-menu-item>
                      <el-menu-item index="/home/addshebei">
                        <template slot="title">
                          <!-- <i class="el-icon-menu"></i> -->
                          <span>添加设备</span>
                        </template>
                      </el-menu-item>
                      <el-menu-item index="/home/groupshebei">
                        <template slot="title">
                          <!-- <i class="el-icon-menu"></i> -->
                          <span>设备分组</span>
                        </template>
                      </el-menu-item> 
                      <el-menu-item index="/home/users">
                        <template slot="title">
                          <!-- <i class="el-icon-menu"></i> -->
                          <span>透传组列表</span>
                        </template>
                      </el-menu-item>
                      <el-menu-item index="/home/users">
                        <template slot="title">
                          <!-- <i class="el-icon-menu"></i> -->
                          <span>设备上下线</span>
                        </template>
                      </el-menu-item>                         
                    </el-submenu>
                    <el-submenu index="3">
                      <template slot="title">
                        <i id="home-button-shebei" class="icon iconfont icon-gongnengdingyi"></i>
                        <span>数据管理</span>
                      </template>
                      <el-menu-item index="/home/SDKpage">数据模板</el-menu-item>                             
                      <el-menu-item index="/home/collectHistory">历史数据</el-menu-item>
                    </el-submenu>
                    <!-- 从这里开始，新添加 -->
                    <el-submenu index="4">
                      <template slot="title">
                        <i id="home-button-shebei" class="icon iconfont icon-yunyingzhongxin"></i>
                        <span>监控中心</span>
                      </template>
                      <el-menu-item index="/home/SDKpage">数据测试</el-menu-item>                             
                      <el-menu-item index="/home/collectHistory">历史数据</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                      <template slot="title">
                        <i id="home-button-shebei" class="icon iconfont icon-guandao"></i>
                        <span>触发器管理</span>
                      </template>
                      <el-menu-item index="/home/SDKpage">数据测试</el-menu-item>                             
                      <el-menu-item index="/home/collectHistory">历史数据</el-menu-item>
                    </el-submenu>
                    <el-submenu index="6">
                      <template slot="title">
                        <i id="home-button-shebei" class="icon iconfont icon-jianceqi"></i>
                        <span>定时任务</span>
                      </template>
                      <el-menu-item index="/home/SDKpage">数据测试</el-menu-item>                             
                      <el-menu-item index="/home/collectHistory">历史数据</el-menu-item>
                    </el-submenu>
                    <el-submenu index="7">
                      <template slot="title">
                        <i id="home-button-shebei" class="icon iconfont icon-icon_zhanghao"></i>
                        <span>用户中心</span>
                      </template>
                      <el-menu-item index="/home/SDKpage">数据测试</el-menu-item>                             
                      <el-menu-item index="/home/collectHistory">历史数据</el-menu-item>
                    </el-submenu>
                    <el-submenu index="8">
                      <template slot="title">
                        <i id="home-button-shebei" class="icon iconfont icon-guize"></i>
                        <span>组态管理</span>
                      </template>
                      <el-menu-item index="/home/SDKpage">数据测试</el-menu-item>                             
                      <el-menu-item index="/home/collectHistory">历史数据</el-menu-item>
                    </el-submenu>
                    <el-submenu index="9">
                      <template slot="title">
                        <i id="home-button-shebei" class="icon iconfont icon-yunyingguanli"></i>
                        <span>中性管理</span>
                      </template>
                      <el-menu-item index="/home/SDKpage">数据测试</el-menu-item>                             
                      <el-menu-item index="/home/collectHistory">历史数据</el-menu-item>
                    </el-submenu>
                    <el-submenu index="10">
                      <template slot="title">
                        <i id="home-button-shebei" class="icon iconfont icon-ceshishenqing"></i>
                        <span>留言反馈</span>
                      </template>
                      <el-menu-item index="/home/SDKpage">数据测试</el-menu-item>                             
                      <el-menu-item index="/home/collectHistory">历史数据</el-menu-item>
                    </el-submenu>
                    <el-submenu index="11">
                      <template slot="title">
                        <i id="home-button-shebei" class="icon iconfont icon-tianshenpi"></i>
                        <span>定制申请</span>
                      </template>
                      <el-menu-item index="/home/SDKpage">数据测试</el-menu-item>                             
                      <el-menu-item index="/home/collectHistory">历史数据</el-menu-item>
                    </el-submenu>
                  </el-menu>
                </el-aside>
                <el-main>
                  <!-- 子路由出口 -->
                  <router-view></router-view>
                </el-main>
            </el-container>
    </el-container>
</template>

<script>
import Promise from 'babel-polyfill'

if (!window.Promise) {
  window.Promise = Promise;
}


export default {
  data() {
    return {
      listDate: []
    }
  },
  methods: {
    logout() {
      // 1 弹出确认对话框
      // 2 用户点击确认
      //    2.1 跳回登陆页面
      //    2.1 清除token
      this.$confirm('您是否确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 清除token
          localStorage.removeItem('token');
          localStorage.removeItem('account');
          localStorage.removeItem('password');
          // 跳回登陆界面
          this.$router.push('/login'); 
          this.$message({
            type: 'success',
            message: '退出成功!',
            duration: '500'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出',
            duration: '500'
          });          
        });
    },

    handleOpen(key, keyPath) {
      console.log('open',key, keyPath);
    },

    handleClose(key, keyPath) {
      console.log('close',key, keyPath);
    }
  }
  
}
</script>

<style scoped lang="less">
.el-header {
    padding: 0;
    /* margin: 0; */
    background-color: #B3C1cd;
    color: #333;
    text-align: center;
    /* line-height: 60px; */

    .logo{
      text-align: left;
      img{
        padding-top: 15px;
        padding-left: 26px;
      }
    }
  }
  
  .el-aside {
    background-color: #545c64;
    color: #333;
    // text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    // text-align: center;
    // line-height: 160px;
  }
  
  .home-wrapper {
    /* margin-bottom: 40px; */
    height: 100%;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .title {
    margin: 0;
    line-height: 60px;
    color: #fff;
    font-size: 20px;
  }
  .welcome {
    line-height: 60px;
    font-weight: bold;
    text-align: right;
    padding-right: 24px;

    .aline {
      text-decoration: none;
      color: #b07a17;
    }
  }

  #home-button {
    font-size: 22px;
    margin-right: 8px;
    text-align: center;
  }

  #home-button-shebei {
    font-size: 20px;
    margin-right: 8px;
    // padding: 1px;
    text-align: center;
  }

  .shouyeshezhi {
    height: 56px;
    width: 209px;
    // position: absolute;
  }
  
  
// .home-wrapper {
//   height: 100%;

//   .el-header {
//     padding: 0;
//     background-color: #b3c1cd;
//     color: #333;
//     text-align: center;

//     .logo {
//       text-align: left;
//     }

//     .title {
//       margin: 0;
//       line-height: 60px;
//       color: #fff;
//       font-size: 36px;
//     }

//     .welcome {
//       line-height: 60px;
//       font-weight: bold;
//       text-align: right;
//       padding-right: 30px;

//       a {
//         color: #b07a17;
//         text-decoration: none;
//       }
//     }
//   }

//   .el-aside {
//     background-color: #545c64;
//     color: #333;
//     line-height: 200px;
//   }

//   .el-main {
//     background-color: #eaeef1;
//     color: #333;
//   }

//   .el-container:nth-child(5) .el-aside,
//   .el-container:nth-child(6) .el-aside {
//     line-height: 260px;
//   }

//   .el-container:nth-child(7) .el-aside {
//     line-height: 320px;
//   }
// }
</style>
