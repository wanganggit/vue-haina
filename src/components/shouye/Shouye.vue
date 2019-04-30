<template>
    <div class="div-shouye-1">
        <template>
            <el-carousel :interval="4000" type="card" height="600px">
                <!-- <el-carousel-item v-for="item in 4" :key="item" class="img-shezhi"> -->
                <el-carousel-item  class="img-shezhi">
                <img src="../../assets/H3BPM_HN.png" alt="无" class="img-shezhi1">
                </el-carousel-item>
                <el-carousel-item  class="img-shezhi-1">
                <img src="../../assets/H3BPM_HN.png" alt="无" class="img-shezhi1">
                </el-carousel-item>
                <el-carousel-item  class="img-shezhi-2">
                <img src="../../assets/H3BPM_HN.png" alt="无" class="img-shezhi1">
                </el-carousel-item>
            </el-carousel>
        </template>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}  
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}  
.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.img-shezhi {
    background: url(../../assets/laoying.jpg) 0 0 round;
    text-align: center;
    line-height: 600px;
}
.img-shezhi-1 {
    background: url(../../assets/laoyingbeijing.jpg) 0 0 round;
    text-align: center;
    line-height: 600px;
}
.img-shezhi-2 {
    background: url(../../assets/laoying.jpg) 0 0 round;
    text-align: center;
    line-height: 600px;
}
.div-shouye-1 {
    height: 100%;
    width: 100%;
    background: url(../../assets/laoying.jpg) 0 0 round;
}
</style>
