<template>
    <div>
        <div class="chart-color">
            <div class="head-data">历史曲线</div>
            <div id="myChart" :style="{width: '100%', height: '400px'}" ></div>
        </div>
        <!-- <button @click="drawLine">点击测试</button> -->
        <div class="head-data">历史数据</div>
        <el-table
        :data="historyData"
        style="width: 100%"
        >
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
        <!-- <button @click="getData">点击测试</button>
        <button @click="gain">点击测试</button> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            historyData: [],
            xAxis: [],
            yData: [],
            // 当前时间变量，当前时间
            timeDateNow: 0,
            // 当前时间变量，当前前一个小时变量
            timeDateOne: 0
        }
    },
    mounted() {
        console.log(this.$route.params)
        this.getTimeOneHour();
        this.gain();
        
    },
    // beforeMount() {
    //     this.drawLine();
    // },
    methods: {

        gain() {
            // this.$http.post('https://cloudapi.usr.cn/usrCloud/datadic/getDataHisByTimePeriod',{"devDataPointArray":this.$route.params,"token": localStorage.getItem('token'),"startTime":1554105657,"stopTime":1554192057})
            this.$http.post('https://cloudapi.usr.cn/usrCloud/datadic/getDataHisByTimePeriod',{"devDataPointArray":this.$route.params,"token": localStorage.getItem('token'),"startTime":this.timeDateOne,"stopTime":this.timeDateNow})
            .then(res=>{
                console.log(res)

                const { data, status, info } = res.data
                if (status === 0 ) {
                    this.historyData = data[0]
                    const hd = data[0]
                    for (let index = 0; index < hd.length; index++) {
                        const v = hd[index].createTime * 1000
                        this.historyData[index].unixFormDate = this.formatDateTime(v.toString())
                        this.xAxis.push(this.historyData[index].unixFormDate)
                        
                        this.yData.push(this.historyData[index].value)
                        
                    }
                    this.xAxis = this.xAxis.reverse()
                    this.yData = this.yData.reverse()
                    this.drawLine()
                } else {
                    this.$message.error({
                        type: 'error',
                        message: info,
                        duration: 1000
                    })
                    this.drawLine();
                }

            // ES6中的解构用法，取数
            // const { data, meta } = res.data
            // const { data, status, info} = res.data
            // if(status === 0 ){
            //     console.log('成功')
            //     localStorage.setItem('token',data.token)
            //     // 登陆成功后，需要跳转到首页
            //     this.$router.push('/home')
            // }else {
            //     console.log('登陆失败',info)
            //     // this.$message.error(meta.msg)
            //     this.$message.error({
            //     type: 'error',
            //     message: info,
            //     duration: 1000
            //     })
            // }
            });
            

        },
        getData() {
            console.log('传输的数据：',this.$route.params)
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
        // echarts 配置函数
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                // title: { text: '在Vue中使用echarts' },
                // tooltip: {},
                // xAxis: {
                //     data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                // },
                // yAxis: {},
                // series: [{
                //     name: '销量',
                //     type: 'bar',
                //     data: [5, 20, 36, 10, 10, 20]
                // }]
                title: {
                    text: '数据趋势'
                },
                tooltip: {
                    show: 'false',
                    trigger: 'axis'
                },
                legend: {
                    data:['数值']
                },
                /*grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                /*toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },*/
                
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    // data: ['周一','周二','周三','周四','周五','周六','周日']
                    data: this.xAxis
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'数值',
                        type:'line',
                        // stack: '总量',
                        // data:[120, 132, 101, 134, 90, 230, 210],
                        data:this.yData,
                        smooth: true
                    }
                ],
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
        }
    }
}
</script>

<style  scoped lang="less">
.head-data{
    /* width: 40px; */
    height: 30px;
    background-color: #C0C4CC;
    /* text-align:center; */
    line-height:30px;
}
.chart-color{
    background-color: white;
    margin-bottom: 20px;
}
</style>
