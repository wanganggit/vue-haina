<template>
    <div>
        <div >
            <el-button type="danger" icon="el-icon-delete" size="mini" plain @click="disConnect">退出</el-button>
            <el-button type="danger" icon="el-icon-edit" size="mini" plain @click="connect">登陆</el-button>
            <el-button type="danger" icon="el-icon-edit" size="mini" plain @click="subscribeDevParsed">订阅</el-button>
            <el-button type="danger" icon="el-icon-edit" size="mini" plain @click="unSubscribeDevParsed">取消订阅</el-button>
            这是页面{{ info1 }}--------------{{ info2 }}
        </div>
        <div style="margin-top: 20px">
            <div id="allmap" ref="allmap"></div>
        </div>
    </div>
    
</template>

<script>
// import BMap from 'BMap'
// let usrCloud = new UsrCloud(this.$refs.allm);
// console.log('shuju ',usrCloud)
// var callback = {
//         USR_onConnAck: USR_onConnAck,
//         USR_onConnLost: USR_onConnLost,
//         USR_onSubscribeAck: USR_onSubscribeAck,
//         USR_onUnSubscribeAck: USR_onUnSubscribeAck,
//         USR_onRcvParsedDataPointPush: USR_onRcvParsedDataPointPush,
//         USR_onRcvParsedOptionResponseReturn: USR_onRcvParsedOptionResponseReturn,
//         USR_onRcvParsedDevStatusPush: USR_onRcvParsedDevStatusPush,
//         USR_onRcvRawFromDev: USR_onRcvRawFromDev,
//         USR_onRcvParsedDevAlarmPush: USR_onRcvParsedDevAlarmPush
// };
let usrCloud = new UsrCloud();  
export default {
    data() {
        return {
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
    created() {
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
    mounted() {
        this.map();
    },
    methods: {
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
            this.res1.push(v)
            $("#rcvData2").append("<li>devId:" + event.devId + "\tdata:" + buf2HexStr(event.payload) + "</li>")

        },
        /**
         * 订阅设备数据
         */
        subscribeDevParsed() {
            // var result = usrCloud.USR_SubscribeDevParsed($("#devId").val());
            var result = usrCloud.USR_SubscribeDevParsed("00007867000000000001");
            if (result !== 0) {
                this.info2 = '订阅失败,错误代码：' + result;
            }
        },
        /**
         * 取消订阅设备数据（云组态）
         */
        unSubscribeDevParsed() {
            // var result = usrCloud.USR_UnSubscribeDevParsed($("#devId").val());
            var result = usrCloud.USR_UnSubscribeDevParsed("00007867000000000001");
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
            if ($("#accountsub").is(":checked")) { //订阅账号下全部设备
                result = usrCloud.USR_SubscribeUserRaw($("#account").val());
            } else { //取消订阅单个设备
                result = usrCloud.USR_SubscribeDevRaw($("#devId2").val());
            }
            $("#info3").text("订阅失败，错误代码:" + result);
        },
        /**
         * 取消订阅设备原始数据流（云交换机）
         */
        unSubscribeDevRaw() {
            var result;
            if ($("#devicesub").is(":checked")) { //订阅账号下全部设备
                result = usrCloud.USR_UnSubscribeDevRaw($("#devId2").val());
            } else { //取消订阅单个设备
                result = usrCloud.USR_UnSubscribeUserRaw($("#account").val());
            }
            $("#info3").text("取消订阅失败，错误代码:" + result);
        },
        /**
         * 发送原始数据流（云交换机）
         */
        publishRawToDev() {
            var dataByte = [];
            // var devId = $('#publishTopic').val();
            var devId = "00007867000000000001"; // 设备号
            var payload = this.data1; // 数据获取
            if (this.jinzhi16) {
                //十六机制字符串转Uint8Array格式的字节数组
                dataByte = HexStr2Bytes(payload);
            } else {
                //获取消息UTF-8编码字节长度并创建Uint8Array字节数组
                for (var i = 0; i < payload.length; i++) {
                    dataByte[i] = payload.charCodeAt(i);
                }
                stringToUTF8(payload, dataByte, 0);
            }
            var result;
            if (this.dange) { //向单个设备发送
                result = usrCloud.USR_PublishRawToDev(devId, dataByte);
                if (result === 0) {
                    // $("#sendData2").append("<li>devId:" + devId + " data:" + payload);
                    const v = "devId:" + devId + " data:" + payload
                    this.data2.push(v)
                }
            } else { //向账号下全部设备发送
                // result = usrCloud.USR_PublishRawToUser($("#account").val(), dataByte);
                result = usrCloud.USR_PublishRawToUser(localStorage.getItem('account'), dataByte);
                if (result === 0) {
                    // $("#sendData2").append("<li>username:" + $("#account").val() + " data:" + payload);
                    const v = "username:" + localStorage.getItem('account') + " data:" + payload
                    this.data3.push(v)
                }
            }
            if (result !== 0) {
                // $("#info4").text("发送失败");
                this.info6 = '发送失败'
            } else {
                // $("#info4").text("");
                // $("#sendCount2").text(parseInt($("#sendCount2").text())+1);
                this.info6 = ''
            }
        },
        map(){      
            /*var map = new BMap.Map("allmap");          // 创建地图实例        
            var point = new BMap.Point(116.331398,39.897445);  // 创建点坐标        
            map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别            
            map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放       
            map.addControl(new BMap.NavigationControl());          
            map.addControl(new BMap.ScaleControl());          
            map.addControl(new BMap.OverviewMapControl());          
            map.addControl(new BMap.MapTypeControl());    */      
            // map.setCurrentCity("青岛"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用      
            // var opts = {type: BMAP_NAVIGATION_CONTROL_ZOOM}       
            // map.addControl(new BMap.NavigationControl(opts)); 自定义控件      
            // map.setMapStyle({style:'midnight'});//地图风格

            var map = new BMap.Map("allmap");    
            var point = new BMap.Point(116.404, 39.915);    
            map.centerAndZoom(point, 15);  // 编写自定义函数，创建标注   
            map.enableScrollWheelZoom(true);
            function addMarker(point, index){  // 创建图标对象   
                var myIcon = new BMap.Icon("markers.png", new BMap.Size(23, 25), {    
                    // 指定定位位置。   
                    // 当标注显示在地图上时，其所指向的地理位置距离图标左上    
                    // 角各偏移10像素和25像素。您可以看到在本例中该位置即是   
                    // 图标中央下端的尖角位置。    
                    anchor: new BMap.Size(10, 25),    
                    // 设置图片偏移。   
                    // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您   
                    // 需要指定大图的偏移位置，此做法与css sprites技术类似。    
                    imageOffset: new BMap.Size(0, 0 - index * 25)   // 设置图片偏移    
                });      
                // 创建标注对象并添加到地图   
                var marker = new BMap.Marker(point, {icon: myIcon});    
                map.addOverlay(marker);    
            }    
            // 随机向地图添加10个标注    
            var bounds = map.getBounds();    
            var lngSpan = bounds.maxX - bounds.minX;    
            var latSpan = bounds.maxY - bounds.minY;    
            for (var i = 0; i < 10; i ++) {    
                var point = new BMap.Point(bounds.minX + lngSpan * (Math.random() * 0.7 + 0.15),    
                                            bounds.minY + latSpan * (Math.random() * 0.7 + 0.15));    
                addMarker(point, i);    
            }

        }


    }
}
</script>

<style scoped >
#allmap{
  height: 500px;
  overflow: hidden;
  background-color: antiquewhite;
}
</style>
