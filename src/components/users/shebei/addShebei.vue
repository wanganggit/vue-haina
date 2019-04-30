<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="添加设备">
                <ul class="add-ul">
                    <li class="add-li add-li-1"><span class="add-span">所属用户：</span><el-input class="add-input" v-model="input" placeholder="请输入内容"></el-input></li>
                    <li class="add-li"><span style="padding-right:3px;font-size:12px;color:red;">*</span><span class="add-span">所属分组：</span><el-input class="add-input-1" v-model="input" placeholder="请输入内容"></el-input></li>
                    <li class="add-li"><span style="padding-right:3px;font-size:12px;color:red;">*</span><span class="add-span">设备名称：</span><el-input class="add-input" v-model="input" placeholder="请输入内容"></el-input></li>
                    <li class="add-li add-li-1 add-li-2 clearfix">
                        <span class="add-span add-span-1">设备类型：</span>
                        <div class="add-div-el-radio-group">
                            <el-radio-group v-model="radio2" class="add-el-radio-group">
                                <el-radio :label="1">默认设备</el-radio>
                                <el-radio :label="2">LoRaWAN模块</el-radio>
                                <el-radio :label="3">网络IO</el-radio>
                                <el-radio :label="3">LoRa模块</el-radio>
                                <el-radio :label="3">LoRa集中器</el-radio>
                                <el-radio :label="3">CoAP/NB-IoT</el-radio>
                                <el-radio :label="3">电信CoAP/NB-IoT</el-radio>
                                <el-radio :label="3">PLC云网管</el-radio>
                            </el-radio-group>
                        </div>
                    </li>
                    <li class="add-li add-li-1">
                        <span class="add-span">设备图片：</span>
                        <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                        </el-upload>
                    </li>
                    <li class="add-li add-li-1"><el-button type="primary" class="add-input-button" v-model="input">保存</el-button></li>
                </ul>
                <div>

                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: '',
            radio2: 1
        }
    }
}
</script>

<style>
.add-ul {
    padding-left: 80px;
    line-height: 60px;
    list-style: none;
    
}
.add-li .add-input {
    width: 25%;
}
.add-li .add-input-1 {
    width: 15%;
}
.add-span {
    /* width: 30%; */
    font-size: 14px;
    /* display: block; */
    /* float: left; */
}
.add-li-1 {
    margin-left: 9px;
}
.add-li-2 {
    width: 60%;
}
.add-el-radio-group {
    line-height: 70px;
}
.clearfix::after {
    content: '';
    display: block;
    clear: both;
    height: 0;
    visibility: hidden;
}
.clearfix {
    *zoom: 1;
}
.add-div-el-radio-group {
    width: 80%;
    display: block;
    float: left;
}
.add-span-1 {
    /* display: block; */
    display: block;
    float: left;
    /* width: 30%; */
}
.add-input-button {
    /* width: 40px; */
    

}
</style>
