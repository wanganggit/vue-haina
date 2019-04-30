<template>
<div id="usernext-1">
    <el-table :data="userList" style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="数据点 ID：">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="数据点名称：">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="从机名称：">
                  <span>{{ props.row.slaveName }}</span>
                </el-form-item>
                <el-form-item label="从机编号：">
                  <span>{{ props.row.slaveIndex }}</span>
                </el-form-item>
                <el-form-item label="当前值：">
                  <span>{{ props.row.iotModbusDataCmd.register }}</span>
                </el-form-item>
                  
              </el-form>
            </template>
        </el-table-column>
        <el-table-column label="数据点 ID" prop="id"></el-table-column>
        <el-table-column label="数据点名称" prop="name"></el-table-column>
        <el-table-column label="当前值" prop="iotModbusDataCmd.register"></el-table-column>
        <!-- <el-table-column label="从机名称" prop="slaveName"></el-table-column>
        <el-table-column label="从机编号" prop="slaveIndex"></el-table-column> -->
        <el-table-column label="操作" prop="">
          <template slot-scope="props1">
              <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
              <!-- <el-button type="info" icon="el-icon-setting" size="mini" plain></el-button> -->
              <el-button type="info" icon="el-icon-setting" size="mini" plain  @click="dialogFormVisibleData"></el-button>
              <el-button type="success" icon="el-icon-document" size="mini" plain  @click="historyRouterTo([{'devId': props1.row.deviceId,'slaveIndex':props1.row.slaveIndex,'dataId':props1.row.id}])"></el-button>
          </template>
        </el-table-column>
    </el-table>
<div id="nextstyle-1">
    <el-dialog title="串口调试界面" :visible.sync="dialogFormVisible" >
            
      <el-form :model="form" label-position="right" >
          <div class="spking">
              <el-table
                  :data="data2"
                  height="250"
                  border
                  style="width: 100%">
                  <el-table-column
                  prop="datv"
                  label="发送数据"
                  >
                  </el-table-column>
                  
                  <!-- <el-table-column
                  prop="address"
                  label="地址">
                  </el-table-column> -->
              </el-table>
              <el-table
                  :data="res1"
                  height="250"
                  border
                  style="width: 100%">
                  
                  <el-table-column
                  prop="data"
                  label="接收数据"
                  >
                  </el-table-column>
                  <!-- <el-table-column
                  prop="address"
                  label="地址">
                  </el-table-column> -->
              </el-table>
          </div>
          <!-- <el-form-item label="活动名称" label-width="120px"> -->
          <el-form-item label="数据值">
            <el-input v-model="form.data1" autocomplete="off" ></el-input>
            <el-button type="danger" icon="el-icon-edit" size="mini" plain @click="publishRawToDev">发送</el-button>
          </el-form-item>
          <el-button type="danger" icon="el-icon-edit" size="mini" plain @click="subscribeDevRaw">订阅</el-button>
          <span class="span-style">{{info2}}</span>
          <el-button type="danger" icon="el-icon-edit" size="mini" plain @click="unSubscribeDevRaw">取消订阅</el-button>
          <span class="span-style">{{info1}}</span>
          
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleClose">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisibleClose">确 定</el-button>
      </div>

    </el-dialog>
</div>
    </div>
</template>

<script>
let usrCloud = new UsrCloud();
export default {
    data() {
      return {
        // tableData: [{
        //   id: '12987122',
        //   name: '好滋好味鸡蛋仔',
        //   category: '江浙小吃、小吃零食',
        //   desc: '荷兰优质淡奶，奶香浓而不腻',
        //   address: '上海市普陀区真北路',
        //   shop: '王小虎夫妻店',
        //   shopId: '10333'
        // }, {
        //   id: '12987123',
        //   name: '好滋好味鸡蛋仔',
        //   category: '江浙小吃、小吃零食',
        //   desc: '荷兰优质淡奶，奶香浓而不腻',
        //   address: '上海市普陀区真北路',
        //   shop: '王小虎夫妻店',
        //   shopId: '10333'
        // }, {
        //   id: '12987125',
        //   name: '好滋好味鸡蛋仔',
        //   category: '江浙小吃、小吃零食',
        //   desc: '荷兰优质淡奶，奶香浓而不腻',
        //   address: '上海市普陀区真北路',
        //   shop: '王小虎夫妻店',
        //   shopId: '10333'
        // }, {
        //   id: '12987126',
        //   name: '好滋好味鸡蛋仔',
        //   category: '江浙小吃、小吃零食',
        //   desc: '荷兰优质淡奶，奶香浓而不腻',
        //   address: '上海市普陀区真北路',
        //   shop: '王小虎夫妻店',
        //   shopId: '10333'
        // }],
        divesNumb: [],
        userList: [],
        slaveName: '',
        // dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          data1: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          tableData: [{
            date: '2016-05-03'
          }]
        },
        info1: '',
        info2: '',
        subState: [],
        subState1: [],
        res: [],
        res1: [],
        info3: [],
        info4: '',
        info5:[],
        data1: '01 03 00 63 00 03 F5 D5',
        jinzhi16: true,
        dange: true,
        data2: [],
        data3: [],
        info6: ''
      }
    },
    created(){ 
        console.log('进入开始验证deviceNumb') 
        console.log(this.divesNumb) 
        console.log(this.$route.query) 
        // this.divesNumb = this.$route.params.msg
        this.divesNumb.push(this.$route.params.msg)
        console.log(this.$route.params.msg)
        this.getData()
    // },
    // created() {
        var callback = {
            USR_onConnAck: this.USR_onConnAck,
            USR_onConnLost: this.USR_onConnLost,
            USR_onSubscribeAck: this.USR_onSubscribeAck,
            USR_onUnSubscribeAck: this.USR_onUnSubscribeAck,
            USR_onRcvParsedDataPointPush: this.USR_onRcvParsedDataPointPush,
            USR_onRcvParsedOptionResponseReturn: this.USR_onRcvParsedOptionResponseReturn,
            USR_onRcvParsedDevStatusPush: this.USR_onRcvParsedDevStatusPush,
            USR_onRcvRawFromDev: this.USR_onRcvRawFromDev,
            USR_onRcvParsedDevAlarmPush: this.USR_onRcvParsedDevAlarmPush
        };
        // let usrCloud = new UsrCloud();
        console.log('wancheng1');

        usrCloud.Usr_Init("clouddata.usr.cn", 8080, 2, callback);

        console.log('wancheng2');

    },
    // destroyed() {
    //     // this.divesNumb = []
    //     console.log('数据清除操作')
    //     console.log(this.divesNumb)
    // },
    methods: {
        getData() {
            this.$http.post('https://cloudapi.usr.cn/usrCloud/datadic/getDataPointInfoByDevice',{                
                    "token": localStorage.getItem('token'), "deviceIds": this.divesNumb             
            }).then(res => {
                    console.log(res)
                    const {data, status} = res.data

                    if(status === 0){
                        // 获取数据成功
                        // this.userList = data[0]

                        console.log('处理后数据：' , data[0].slaves[0].iotDataDescription)
                        this.slaveName = data[0].slaves[0].slaveName
                        // this.userList = data[0].slaves[0].iotDataDescription
                        const userList1 = data[0].slaves[0].iotDataDescription
                        this.slaveName = data[0].slaves[0].slaveName
                        for (let index = 0; index < userList1.length; index++) {
                            userList1[index].slaveAddr = data[0].slaves[0].slaveAddr
                            userList1[index].slaveIndex = data[0].slaves[0].slaveIndex
                            userList1[index].slaveName = data[0].slaves[0].slaveName
                            userList1[index].deviceId = data[0].slaves[0].deviceId
                            // this.userList = userList1
                        }
                        this.userList = userList1
                        console.log('处理后从机数据：' , data[0].slaves[0].slaveName)
                        console.log('第二次处理后数据', data[0].slaves[0].iotDataDescription[1].iotModbusDataCmd)
                        console.log('这是数据userList：', this.userList)
                    }
                }
            )
        },
        dialogFormVisibleData() {
          this.dialogFormVisible = true
          this.connect();
        },
        dialogFormVisibleClose() {
          this.dialogFormVisible = false,
          this.info2 = ''
          this.disConnect();
          this.unSubscribeDevRaw();
          this.data2 = []
          this.res1 =[]
          this.form.data1 = ''

        },

         // 登陆（云组态和云交换机共用）
        
        connect() {
            usrCloud.USR_Connect(localStorage.getItem('account'), localStorage.getItem('password'));
        },
        // 取消登录（云组态和云交换机共用）
        disConnect() {
            // var usrCloud = new UsrCloud();
            usrCloud.USR_DisConnect();
        },
        /**
         * 连接成功回调（云组态和云交换机共用）
         */
        USR_onConnAck(event) {
            console.log(event);
            if(event.code === 0) {
                this.info1 = "连接成功"
            }else{
                this.info1 = "连接失败"
            }
        },
        // 断开连接回调函数（云组态和云交换机共用）
        USR_onConnLost(event) {
            console.log('USR_onConnLost: ',event);
            this.info1 = "断开连接"
        },
        /**
         * 订阅成功回调（云组态和云交换机共用）
         */
        USR_onSubscribeAck(event) {
            console.log(event);
            //判断返回函数名
            if (event.SubFunName === 'SubscribeDevParsed') { //云组态
                if (event.code === 0) {
                    // $("#info2").text('订阅成功');
                    this.info2 = '订阅成功'
                    this.subState.push(event.SubParam.split('/')[2])
                    // $("#topic1").append("<li>" + event.SubParam.split('/')[2] + "</li>");
                } else {
                    // $("#info2").text('订阅失败');this.info2 = '订阅成功'
                    this.info2 = '订阅失败'
                }
            } else if (event.SubFunName === 'SubDevRaw' || event.SubFunName === 'SubscribeUserRaw' || event.SubFunName === 'UnSubscribeDevRaw') { //云交换机
                if (event.code === 0) {
                    // $("#topic2").append("<li>" + event.SubParam.split('/')[2] + "</li>");
                    this.subState1.push(event.SubParam.split('/')[2])
                    this.info2 = '订阅成功'
                } else {
                    this.info2 = '订阅失败'
                }
            }
        },
        /**
         * 取消订阅成功回调（云组态和云交换机共用）
         */
        USR_onUnSubscribeAck(event) {
            console.log(event);
            if (event.SubFunName === 'UnSubscribeDevParsed') { //云组态
                if (event.code === 0) {
                    // $("#info2").text('取消订阅成功');
                    this.info2 = '取消订阅成功'
                    // $("#topic1 li").each(function () {
                    //     if ($(this).text() === event.SubParam.split('/')[2]) {
                    //         $(this).remove();
                    //     }
                    // })
                    for (let index = 0; index < this.subState.length; index++) {
                        if (this.subState[index] === event.SubParam.split('/')[2]) {
                            this.subState[index].remove
                        }
                    }
                } else {
                    // $("#info2").text('取消订阅失败');
                    this.info2 = '取消订阅失败'
                }
            } else if (event.SubFunName === 'UnSubDevRaw' || event.SubFunName === 'UnSubscribeUserRaw' || event.SubFunName === 'UnSubscribeDevRaw') { //云交换机
                if (event.code === 0) {
                    // $("#info3").text('取消订阅成功');
                    this.info2 = '取消订阅成功'
                    //遍历删除已取消订阅的设备
                    // $("#topic2 li").each(function () {
                    //     if ($(this).text() === event.SubParam.split('/')[2]) {
                    //         $(this).remove();
                    //     }
                    // })
                    for (let index = 0; index < this.subState1.length; index++) {
                        if (this.subState1[index] === event.SubParam.split('/')[2]) {
                            this.subState1[index].remove
                        }
                    }
                } else {
                    // $("#info3").text('取消订阅失败');
                    this.info3 = '取消订阅失败'
                }
            }
        },
        /**
         * 数据点数据推送回调（云组态）
         */
        //todo 看一下返回的字段
        USR_onRcvParsedDataPointPush(event) {
            for(let i in event.dataPoints){
                // $("#rcvCount1").text(parseInt($("#rcvCount1").text())+1);
                // $("#rcvData1").append("<li>devId:" + event.devId +"slaveIndex"+event.dataPoints[i].slaveIndex+ " dataPointId:" + event.dataPoints[i].pointId + " value:" + event.dataPoints[i].value);
                const tex = "devId:" + event.devId +"slaveIndex"+event.dataPoints[i].slaveIndex+ " dataPointId:" + event.dataPoints[i].pointId + " value:" + event.dataPoints[i].value
                this.res.push(tex)
            }
        },
        /**
         * 接收数据状态回调（云组态）
         */
        USR_onRcvParsedOptionResponseReturn(event) {
            // $("#rcvCount1").text(parseInt($("#rcvCount1").text())+1);
            console.log(event);
        },
        /**
         * 接收上下线回调（云组态）
         */
        USR_onRcvParsedDevStatusPush(event) {
            console.log(event);
            // $("#rcvCount1").text(parseInt($("#rcvCount1").text())+1);
            // alert('devId:' + event.devId + 'status:' + event.status);
        },
        /**
         * 接收设备报警回调（云组态）
         */
        USR_onRcvParsedDevAlarmPush(event) {
            // $("#rcvCount1").text(parseInt($("#rcvCount1").text())+1);
            console.log(event);
        },
        /**
         * 接收设备原始数据流回调（云交换机）
         */
        USR_onRcvRawFromDev(event) {
            // $("#rcvCount2").text(parseInt($("#rcvCount2").text())+1);
            console.log(event);
            const v = "devId:" + event.devId + "\tdata:" + buf2HexStr(event.payload)
            this.res1.push({data:v})
            // $("#rcvData2").append("<li>devId:" + event.devId + "\tdata:" + buf2HexStr(event.payload) + "</li>")

        },
        /**
         * 订阅设备数据
         */
        subscribeDevParsed() {
            // var result = usrCloud.USR_SubscribeDevParsed($("#devId").val());
            var result = usrCloud.USR_SubscribeDevParsed(this.$route.params.msg);
            if (result !== 0) {
                this.info2 = '订阅失败,错误代码：' + result;
            }
        },
        /**
         * 取消订阅设备数据（云组态）
         */
        unSubscribeDevParsed() {
            // var result = usrCloud.USR_UnSubscribeDevParsed($("#devId").val());
            var result = usrCloud.USR_UnSubscribeDevParsed(this.$route.params.msg);
            if (result !== 0) {
                // $("#info2").text('取消订阅失败,错误代码：' + result);
                this.info2 = '取消订阅失败,错误代码：' + result;
            }
        },
          /**
         * 读取数据点数据
         */
        publishParsedQueryDataPoint(){
            // var result = usrCloud.USR_PublishParsedQueryDataPoint($("#devId").val(), $("#dataPointId").val());
            var result = usrCloud.USR_PublishParsedQueryDataPoint("00007867000000000001", "118");
            if (result === 0) {
                // $("#sendCount1").text(parseInt($("#sendCount1").text())+1);
                // $("#info5").text("");
                // $("#sendData1").append("<li>devId:" + $("#devId").val() + " dataPointId:" + $("#dataPointId").val()+"</li>");
                const v = "devId:" + "00007867000000000001" + " dataPointId:" + "118"
                this.info5.push(v)
                console.log(this.info5)
            } else {
                // $("#info5").text("发送失败");
                this.info4 = "发送失败"
            }
        },
        /**
         * 设置数据点数据（云组态）
         */
        publishParsedSetDataPoint() {
            // var result = usrCloud.USR_PublishParsedSetSlaveDataPoint($("#devId").val(), $("#slaveIndex").val(),$("#dataPointId").val(), $("#value").val());
            var result = usrCloud.USR_PublishParsedSetSlaveDataPoint("00007867000000000001", '1',"118", "12");
            if (result === 0) {
                // $("#sendCount1").text(parseInt($("#sendCount1").text())+1);
                // $("#info5").text("");
                // $("#sendData1").append("<li>devId:" + $("#devId").val() + " slaveIndex:" + $("#slaveIndex").val() + " dataPointId:" + $("#dataPointId").val() + " value:" + $("#value").val()+"</li>");
                const v = "devId:" + "00007867000000000001" + " slaveIndex:" + "1" + " dataPointId:" + "118" + " value:" + "12"
                this.info3.push(v)
            } else {
                // $("#info5").text("发送失败");
                this.info5 = "发送失败"
            }
        },
        /**
         * 订阅设备原始数据流（云交换机）
         */
        subscribeDevRaw() {
            var result;
            // if ($("#accountsub").is(":checked")) { //订阅账号下全部设备
            //     result = usrCloud.USR_SubscribeUserRaw($("#account").val());
            // } else { //订阅单个设备
            //     result = usrCloud.USR_SubscribeDevRaw($("#devId2").val());
            // }
            // $("#info3").text("订阅失败，错误代码:" + result);
            result = usrCloud.USR_SubscribeDevRaw(this.$route.params.msg);
            if (result !== 0) {
                this.info2 = '订阅失败,错误代码：' + result;
            }

        },
        /**
         * 取消订阅设备原始数据流（云交换机）
         */
        unSubscribeDevRaw() {
            var result;
            // if ($("#devicesub").is(":checked")) { //订阅账号下全部设备
            //     result = usrCloud.USR_UnSubscribeDevRaw($("#devId2").val());
            // } else { //取消订阅单个设备
            //     result = usrCloud.USR_UnSubscribeUserRaw($("#account").val());
            // }
            // $("#info3").text("取消订阅失败，错误代码:" + result);
            // result = usrCloud.USR_UnSubscribeUserRaw(this.$route.params.msg);
            result = usrCloud.USR_UnSubscribeDevRaw(this.$route.params.msg);
            if (result !== 0) {
                this.info2 = '订阅失败,错误代码：' + result;
            }
        },
        /**
         * 发送原始数据流（云交换机）
         */
        publishRawToDev() {
          console.log('执行过了')
            var dataByte = [];
            // var devId = $('#publishTopic').val();
            var devId = this.$route.params.msg; // 设备号
            // var payload = this.data1 // 数据获取
            var payload = this.form.data1 // 数据获取
            // console.log(this.data1)
            let dataByte1 = stringToHex(payload);
            // let dataByte2 = hexToString(dataByte1);
            dataByte = HexStr2Bytes(dataByte1);
            // dataByte = Str2Buf(dataByte3);

            // dataByte = [0x31,0x32,0x33]
            console.log('16进制抓获：',dataByte)
            // if (true) {
            //     //十六机制字符串转Uint8Array格式的字节数组
            //     dataByte = HexStr2Bytes(payload);
            // } else {
            //     //获取消息UTF-8编码字节长度并创建Uint8Array字节数组
            //     for (var i = 0; i < payload.length; i++) {
            //         dataByte[i] = payload.charCodeAt(i);
            //     }
            //     stringToUTF8(payload, dataByte, 0);
            // }
            var result;
            result = usrCloud.USR_PublishRawToDev(devId, dataByte);
                if (result === 0) {
                    // $("#sendData2").append("<li>devId:" + devId + " data:" + payload);
                    const v = "devId:" + devId + " data:" + payload
                    console.log('执行的二次相见')
                    this.data2.push({datv:v})
                }
            // if (this.dange) { //向单个设备发送
            //     result = usrCloud.USR_PublishRawToDev(devId, dataByte);
            //     if (result === 0) {
            //         // $("#sendData2").append("<li>devId:" + devId + " data:" + payload);
            //         const v = "devId:" + devId + " data:" + payload
            //         console.log('执行的二次相见')
            //         this.data2.push({datv:v})
            //     }
            // } else { //向账号下全部设备发送
            //     // result = usrCloud.USR_PublishRawToUser($("#account").val(), dataByte);
            //     result = usrCloud.USR_PublishRawToUser(localStorage.getItem('account'), dataByte);
            //     if (result === 0) {
            //         // $("#sendData2").append("<li>username:" + $("#account").val() + " data:" + payload);
            //         const v = "username:" + localStorage.getItem('account') + " data:" + payload

            //         this.data3.push({datv:v})
            //     }
            // }
            if (result !== 0) {
                // $("#info4").text("发送失败");
                this.info6 = '发送失败'
            } else {
                // $("#info4").text("");
                // $("#sendCount2").text(parseInt($("#sendCount2").text())+1);
                this.info6 = ''
            }
        },
        historyRouterTo(data) {
            // this.$router.push({name: 'history', params:{msg:numbDvice}});
            this.$router.push({name: 'history', params:data});
        }
    }

}
</script>

<style scoped lang="less">
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  #nextstyle-1{
    .el-dialog__body {
      padding-top:  10px;
    }
    .el-form-item__content{
      margin-left: 0;
    }
  }
  .span-style{
    font-size: 13px;
    color: #1aa203;
  }
</style>
