<template>

    <div id="user">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="user-bread">
            <el-breadcrumb-item :to="{ path: '/home' }">设备首页</el-breadcrumb-item>
            <el-breadcrumb-item>设备列表</el-breadcrumb-item>
            
        </el-breadcrumb>
        <br>
        <el-table
            :data="userList"
            stripe
            border
            style="width: 100%">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column
            prop="onlineStatus"
            label="状态"
            width="60">
            <!-- scope.row 表示当前行的状态 -->
                <template slot-scope="scope">
                    <el-switch  v-model="scope.row.onlineStatus" @change="changeSwitch(scope.row.id,scope.row.onlineStatus)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column
            prop="name"
            label="名称"
            >
            </el-table-column>
            <el-table-column
            prop="address"
            label="位置">
            </el-table-column>
            <el-table-column
            prop="devid"
            label="设备号">
            </el-table-column>
            <el-table-column
            prop="groupId"
            label="所属分组">
            </el-table-column>
            <el-table-column
            prop=""
            label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="routerIn(scope.row.devid)" plain></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
                    <el-button type="info" icon="el-icon-setting" size="mini" plain  @click="dialogFormVisibleData"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <div class="pagination">
                <el-pagination page-size="6" :current-page="currentPage" background @current-change="handleCurrentChange" layout="prev, pager, next" :total="totel"></el-pagination>
        </div>      -->
        <el-dialog title="串口调试界面" :visible.sync="dialogFormVisible">
            
            <el-form :model="form">
                <div class="spking">
                    <el-table
                        :data="tableData"
                        height="250"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="date"
                        label="发送数据"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="接收数据"
                        >
                        </el-table-column>
                        <!-- <el-table-column
                        prop="address"
                        label="地址">
                        </el-table-column> -->
                    </el-table>
                </div>
                <el-form-item label="活动名称" label-width="120px">
                <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" label-width="120px">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>

        </el-dialog>
    </div>
</template>

<script>
// import axios from 'axios'
import Promise from 'babel-polyfill'

if (!window.Promise) {
  window.Promise = Promise;
}


export default {
    data() {
      return {        
        userList: [],
        totel: 0,
        currentPage: '',
        // dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          tableData: [{
            date: '2016-05-03',
            name: ''
            }]
        },
        tableData: [{
            date: '2016-05-03',
            name: ''
        }]
      }
    },
    created() {
        this.getDivesList();
    }, 
    methods: {
        getUserList() {
            this.$http.get('/users',{
                params: {
                    pagenum: 1,
                    pagesize: 3

                },
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }).then(res => { 
                    console.log(res)
                    const {data, meta} = res.data

                    if(meta.status === 200){
                        // 获取数据成功
                        this.userList = data.users
                        // this.totel = data.total
                    }
                }
            )
        },
        /**
         * 获取列表数据
         */
        getDivesList() {
            this.$http.post('https://cloudapi.usr.cn/usrCloud/dev/getDevs',{                
                    "token": localStorage.getItem('token')                
            }).then(res => {
                    console.log(res)
                    const {data, status} = res.data

                    if(status === 0){
                        // 获取数据成功
                        this.userList = data.dev
                        for (let i = 0; i < this.userList.length; i++) {
                            if(this.userList[i].onlineStatus === 0){
                                this.userList[i].onlineStatus = false
                            } else {
                                this.userList[i].onlineStatus = true
                            }
                            
                        }
                        this.totel = data.total
                        
                    }
                }
            )
        },
        handleCurrentChange(pageF = 1) {
            console.log('分页处理事件',pageF)
            this.currentPage = pageF
        },
        // 启用或者禁用按钮
        changeSwitch(id,curState) {
            console.log('switch改变数据',id,curState);          
        },
        routerIn(numbDvice) {
            this.$router.push({name: 'nextpage', params:{msg:numbDvice}});
        },
        dialogFormVisibleData() {
          this.dialogFormVisible = true
        }

    }

}
</script>

<style  lang="less">
.user-bread {
    line-height: 30px;
    background-color: #D4DAE0;
    font-size: 18px;
    padding-left: 10px;
}

.spking {
    // height: 120px;
    // border: #D4DAE0 solid 1px;
    // //background-color: rebeccapurple;
    // margin-bottom: 10px;
    margin-bottom: 10px;
}
#user{
    .el-dialog__body {
    padding-top:  10px;
    }
}

    
</style>
