<template>
    <div>
        <div class="chart-color1">
            
            <el-row class="head-data1">
                <el-col :span="2">
                    <span>汇总历史数据</span>
                </el-col>
                <el-col :span="12">
                    <span class="span-fontsize"  style="margin-left: 20px;">设备：</span>
                <!-- 选择数据 可搜索 可查询  设备选择项-->
                <el-select v-model="value4" size="small" filterable placeholder="请选择" @change="getPointData">
                    <el-option
                    v-for="item in deviceList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.devid"                    
                    >
                    </el-option>
                </el-select>

                <span class="span-fontsize">从机：</span>
                <!-- 选择数据 可复选  可删除 从机选择框-->
                <el-select
                    class="select-machine"
                    v-model="value1"
                    
                    size="small"
                    
                    style="margin-left: 2px;"
                    placeholder="请选择">
                    
                    <el-option
                    v-for="item in slavedDivecName"
                    :key="item.slavedId"
                    :label="item.slavedName"
                    :value="item.slavedId">
                    </el-option>
                </el-select>

                <span class="span-fontsize">数据点：  </span>
                <!-- 选择数据 可复选  可删除 数据点选择器-->
                <el-select
                    class="select-datepoint"
                    v-model="value11" 
                    multiple  
                    collapse-tags                 
                    size="small"
                    style="margin-left: 2px;"
                    placeholder="请选择">
                    <!-- <el-checkbox ></el-checkbox> -->
                    <el-option
                    v-for="item in pointList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">                    
                    </el-option>
                </el-select>
                </el-col>
                <el-col :span="8" class="time-elcol">
                    <!-- 时间选择器 -->
                <span class="span-fontsize">时间段：</span>
                <el-date-picker
                    id="select-time"                    
                    v-model="value5"
                    size="small"
                    type="datetimerange"
                    :picker-options="pickerOptions2"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
                </el-date-picker>
                </el-col>
                <el-col :span="2">
                    <!-- <span>搜索按钮</span> -->
                    <el-button size="mini" round style="margin-left: 10px;" @click="getDatePoint">搜索</el-button>
                    <!-- <el-button size="mini" round style="margin-left: 10px;" @click="getDatePoint1">搜索</el-button> -->
                </el-col>
            </el-row>
            
            <el-row>
                <el-col :span="24">
                    <div id="myChart" :style="{width: '100%', height: '400px'}" ></div>
                </el-col>
            </el-row>
            <!-- <div id="myChart" :style="{width: '100%', height: '400px'}" ></div> -->
        </div>
        <div class="data-show">数据列表</div>
        <el-tabs type="border-card">
            <el-tab-pane :label="item.name" v-for="item in items" :key="item.id">
                <el-table
                    :data="item.data"
                    style="width: 100%">
                    <el-table-column
                        prop="dataPointId"
                        label="数据点ID"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="数值"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="unixFormDate"
                        label="创建时间"
                        align="center">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <!-- <el-tab-pane label="配置管理">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: {
                de: [
                    {
                    value: '选项1',
                    label: '黄金糕'
                    }, 
                    {
                    value: '选项2',
                    label: '双皮奶'
                    }, 
                    {
                    value: '选项3',
                    label: '蚵仔煎'
                    }, 
                    {
                    value: '选项4',
                    label: '龙须面'
                    }, 
                    {
                    value: '选项5',
                    label: '北京烤鸭'
                    }
                ],
                deOne: [
                    {
                    value: '选项1',
                    label: '黄金糕'
                    }, 
                    {
                    value: '选项2',
                    label: '双皮奶'
                    }
                ],
                deData: [
                    {
                    value: '选项4',
                    label: '龙须面'
                    }, 
                    {
                    value: '选项5',
                    label: '北京烤鸭'
                    }
                ]
            },
            value4: '',
            value11: '',
            value1: '',
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周', // 最近一个小时
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            // value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            value5: '',
            historyData: [{
                dataPointId: '345',
                value: '3',
                unixFormDate: 'time'
            },
            {
                dataPointId: '5445',
                value: '5',
                unixFormDate: 'time'
            }],
            // itme数据列展示数据
            items: [],
            // 当前时间变量，当前时间
            timeDateNow: 0,
            // 当前时间变量，当前前一个小时变量
            timeDateOne: 0,
            // 设备号、数据点ID、从机ID 数组
            dataPointArray: [
                {
                    devId: "00004299000000000019",
                    slaveIndex: 20,
                    dataId: "87281",
                    name: "功率"
                },
                {
                    devId: "00004299000000000019",
                    slaveIndex: 20,
                    dataId: "7032",
                    name: "温度"
                },
                {
                    devId: "00004299000000000019",
                    slaveIndex: 20,
                    dataId: "3092",
                    name: "电流"
                },
                {
                    devId: "00004299000000000019",
                    slaveIndex: 20,
                    dataId: "3091",
                    name: "电阻"
                }
            ],
            // 数据点数据转存参数
            collectionHistoryData: [],
            // ECharts中展示数据组预处理
            showEChartsData: [],
            // ECharts中展示数据组最后数据
            showEChartsDataFirst: [],
            // 初始化series数据
            seriesData: [],
            // 坐标系中类目名称
            legendData: [],
            // 用于数据展示页面使用的数据参数
            showItem1: [],
            showItem2:[],
            // 设备下拉框数据
            deviceList: [],
            // 数据点数据展示获取
            pointList: [],
            slavedDivecName: []

        }
    },
    mounted() {
        // console.log(this.$route.params)
        // this.getTimeOneHour();
        this.getDevicesData();
        this.drawLine();
        // this.gain();
        
    },
    methods: {
        // 获取展示数据
        drawLine() {
            // 数据展示前的数据处理
            this.seriesData = [] // 初始化数据
            this.legendData =[]
            this.items = []
            

            let chartDa = {}
            let chartDa1 = {}
            for (let index = 0; index < this.showEChartsDataFirst.length; index++) {
                for (let i = 0; i < this.dataPointArray.length; i++) {
                    if (this.showEChartsDataFirst[index][0][3].toString() === this.dataPointArray[i].dataId) {
                        this.legendData.push(this.dataPointArray[i].name)
                        chartDa.name = this.dataPointArray[i].name
                        chartDa.type = 'line'
                        chartDa.data = this.showEChartsDataFirst[index]
                        chartDa.smooth = true
                        this.seriesData.push(chartDa)
                        chartDa = {}
                    }                    
                }               
            }

            for (let index = 0; index < this.showItem2.length; index++) {
                for (let i = 0; i < this.dataPointArray.length; i++) {
                    if (this.showItem2[index][0].dataPointId.toString() === this.dataPointArray[i].dataId) {
                        // this.legendData.push(this.dataPointArray[i].name)
                        chartDa1.name = this.dataPointArray[i].name
                        chartDa1.id = this.dataPointArray[i].dataId
                        // chartDa1.type = 'line'
                        chartDa1.data = this.showItem2[index]
                        // chartDa1.smooth = true
                        this.items.push(chartDa1)
                        chartDa1 = {}
                        
                    }                    
                }               
            }
            console.log('这是series数据',this.seriesData)
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                
                title: {
                    text: '数据趋势'
                },
                tooltip: {
                    show: 'false',
                    trigger: 'axis'
                },
                legend: {
                    // data:['功率','温度']
                    data: this.legendData
                },
                xAxis: {
                    type: 'time',
                    boundaryGap: false,
                    // data: ['周一','周二','周三','周四','周五','周六','周日']
                    // data: this.xAxis
                },
                yAxis: {
                    type: 'value'
                },
                // series: [
                //     {
                //         name:'数值',
                //         type:'line',
                //         // stack: '总量',
                //         data:[
                //             // ['2019-04-11 16:50:09',120],['2019-04-11 12:50:09',140],['2019-04-11 18:50:09',120],['2019-04-11 11:50:09',10]
                //             ['2019-04-11 11:50:09',10],['2019-04-11 12:50:09',140],['2019-04-11 16:50:09',120],['2019-04-11 18:50:09',120]
                //             // 120, 132, 101, 134, 90, 230, 210
                //         ],
                //         // data:this.yData,
                //         smooth: true
                //     },
                //     {
                //         name:'总量',
                //         type:'line',
                //         // stack: '总量',
                //         data:[
                //             // ['2019-04-11 16:50:09',120],['2019-04-11 12:50:09',140],['2019-04-11 18:50:09',120],['2019-04-11 11:50:09',10]
                //             ['2019-04-11 10:30:09',200],['2019-04-11 13:50:09',300],['2019-04-11 17:50:09',40],['2019-04-11 19:50:09',500]
                //             // 120, 132, 101, 134, 90, 230, 210
                //         ],
                //         // data:this.yData,
                //         smooth: true
                //     }
                // ],
                series: this.seriesData,        
                dataZoom: [
                    {
                        type: 'slider',
                        xAxisIndex: 0,
                        filterMode: 'empty'
                    }
                ],
                grid: {
                    left: '5%',
                    right: '5%'
                }
            });
        },

        // 获取数据点历史数据
        getDatePoint() {
            // 刷新一小时段的取值
            this.showEChartsDataFirst = []
            this.showItem2 = []
            this.getTimeOneHour();
            // 获取数据点的数据
            this.$http.post('https://cloudapi.usr.cn/usrCloud/datadic/getDataHisByTimePeriod',{"devDataPointArray":this.dataPointArray,"token": localStorage.getItem('token'),"startTime":this.timeDateOne,"stopTime":this.timeDateNow})
            .then(res=>{
                console.log(res)
                const { data, status, info } = res.data
                if (status === 0 ) {
                    this.collectionHistoryData = data

                    for (let index = 0; index < this.collectionHistoryData.length; index++) {
                        const hd = this.collectionHistoryData[index]
                        for (let i = 0; i < hd.length; i++) {
                            // console.log(this.collectionHistoryData[index][i])
                            const v = hd[i].createTime * 1000
                            this.collectionHistoryData[index][i].unixFormDate = this.formatDateTime(v.toString())

                            // this.xAxis.push(this.collectionHistoryData[index].unixFormDate)
                            // this.yData.push(this.collectionHistoryData[index].value)
                        }
                    }
                    // console.log(this.collectionHistoryData)
                    // console.log(this.collectionHistoryData)
                    // const hd = data[0]
                    // for (let index = 0; index < hd.length; index++) {
                    //     const v = hd[index].createTime * 1000
                    //     this.historyData[index].unixFormDate = this.formatDateTime(v.toString())
                    //     this.xAxis.push(this.historyData[index].unixFormDate)
                        
                    //     this.yData.push(this.historyData[index].value)
                        
                    // }
                    // this.xAxis = this.xAxis.reverse()
                    // this.yData = this.yData.reverse()
                    // this.drawLine()
                    console.log('获取数据的原始数据',this.collectionHistoryData)
                    this.showEChartsDataFirst = []
                    this.showItem2 = []
                    this.manageChartDate();
                    console.log('这是ECharts中要展示的数据',this.showEChartsDataFirst)
                    this.drawLine()
                } else {
                    this.$message.error({
                        type: 'error',
                        message: info,
                        duration: 1000
                    })
                    this.drawLine();
                }
            });
        },
        // 获取当前一小时时间
        getTimeOneHour() {
            var da = new Date();
            // 获取当前时间的毫秒数值
            this.timeDateNow = parseInt(da.getTime()/1000);
            // var daa = new Date(da.getTime() - 1 * 60 * 60 * 1000);
            // var daa = new Date(da.getTime() - 1 * 60 * 60 * 1000);
            // 获取一个小时前时间
            var daa = da.getTime() - 3600000;
            this.timeDateOne = parseInt(daa/1000);
        },
        // unix 时间转换函数
        formatDateTime(UnixTime) {
            var a = UnixTime.replace("/Date(", "").replace(")/", "");
            var date = new Date(parseInt(a));
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        },
        // 对于ECharts展示数据整合
        manageChartDate() {
            this.showEChartsDataFirst = []
            for (let index = 0; index < this.collectionHistoryData.length; index++) {
                for (let i = 0; i < this.collectionHistoryData[index].length; i++) {
                    let da = []
                    let da1 = {}
                    da.push(this.collectionHistoryData[index][i].unixFormDate)
                    da.push(this.collectionHistoryData[index][i].value)
                    da.push(this.collectionHistoryData[index][i].createTime)
                    da.push(this.collectionHistoryData[index][i].dataPointId)
                    this.showEChartsData.push(da)
                    da = []   
                    // 用于item数据展示的数据获取
                    da1.unixFormDate = this.collectionHistoryData[index][i].unixFormDate
                    da1.value = this.collectionHistoryData[index][i].value
                    da1.createTime = this.collectionHistoryData[index][i].createTime
                    da1.dataPointId = this.collectionHistoryData[index][i].dataPointId
                    this.showItem1.push(da1)
                    da1 = {}
                }
                this.showEChartsDataFirst.push(this.showEChartsData)
                this.showItem2.push(this.showItem1)
                this.showEChartsData = []
                this.showItem1 = []
                
            }
            console.log('这是item数据',this.showItem2)
            
        },
        getDatePoint1() {
            this.items = []
        },
        // 获取设备列表数据
        getDevicesData() {
            this.$http.post('https://cloudapi.usr.cn/usrCloud/dev/getDevs',{                
                    "token": localStorage.getItem('token')                
            }).then(res => {
                    console.log(res)
                    const {data, status} = res.data

                    if(status === 0){
                        // 获取数据成功
                        this.deviceList = data.dev
                        for (let i = 0; i < this.deviceList.length; i++) {
                            if(this.deviceList[i].onlineStatus === 0){
                                this.deviceList[i].onlineStatus = false
                            } else {
                                this.deviceList[i].onlineStatus = true
                            }
                            
                        }
                        // this.totel = data.total
                        
                    }
                }
            )
        },

        // 获取数据点的列表信息
        getPointData(divesNumbId) {
            // 数据初始化，对数据进行载入时清零初始化
            console.log('数据初始化结束')
            this.slavedDivecName = []
            console.log('数据点数据列表',divesNumbId)
            const divesNumb = []
            divesNumb.push(divesNumbId)
            this.$http.post('https://cloudapi.usr.cn/usrCloud/datadic/getDataPointInfoByDevice',{
                    "token": localStorage.getItem('token'), "deviceIds": divesNumb
            }).then(res => {
                    console.log(res)
                    const {data, status} = res.data

                    if(status === 0){
                        // 获取数据成功
                        // this.userList = data[0]

                        console.log('处理后数据：' , data[0].slaves[0].iotDataDescription)
                        // this.slavedDivecName = data[0].slaves[0].slaveName
                        // this.userList = data[0].slaves[0].iotDataDescription
                        const v = {}
                        v.slavedName = data[0].slaves[0].slaveName
                        v.slavedId = data[0].slaves[0].slaveIndex
                        this.slavedDivecName.push(v)
                        const userList1 = data[0].slaves[0].iotDataDescription
                        // this.slaveName = data[0].slaves[0].slaveName
                        for (let index = 0; index < userList1.length; index++) {
                            userList1[index].slaveAddr = data[0].slaves[0].slaveAddr
                            userList1[index].slaveIndex = data[0].slaves[0].slaveIndex
                            userList1[index].slaveName = data[0].slaves[0].slaveName
                            userList1[index].deviceId = data[0].slaves[0].deviceId
                            // this.userList = userList1
                        }

                        this.pointList = userList1
                        // console.log('处理后从机数据：' , data[0].slaves[0].slaveName)
                        // console.log('第二次处理后数据', data[0].slaves[0].iotDataDescription[1].iotModbusDataCmd)
                        // console.log('这是数据userList：', this.userList)
                    }
                }
            )

        }
    }
}
</script>

<style scoped lang="less">
    .head-data1{
        /* width: 40px; */
        height: 60px;
        padding-left: 6px;
        // margin-left: 6px;
        background-color: #C0C4CC;
        /* text-align:center; */
        line-height:60px;
        // position: relative;
        .span-fontsize{
            font-size: 12px;
        }
    }
    .chart-color1{
        background-color: white;
        margin-bottom: 20px;
    }
    .data-show{
        /* width: 40px; */
        height: 40px;
        // padding-left: 6px;
        // margin-left: 6px;
        background-color: #C0C4CC;
        /* text-align:center; */
        line-height:40px;
    }
    .select-datepoint{
        width: 160px;
        
    }
    .select-machine{
        width: 180px;
    }

    #select-time{
        width: 320px;
        font-size: 2px;
        // position: absolute;
        // left: 300px;
        .el-range-input{
            font-size: 2px;
        }
    }
    .time-elcol{
        text-align: right;
    }
</style>
