<template>
  <div>

    <div class="title">膜老匠质保查询系统</div>

    <div class="form">
      <el-row v-for="item in field" :key="item.code">
        <el-col :span="6">
          <span class="formLabel">
            {{item.name}}：
          </span>
        </el-col>
        <el-col :span="18">
          <el-input v-model="form[item.code]" :placeholder="'请输入'+item.name"></el-input>
        </el-col>
      </el-row>
      <div>
        <el-button type="primary" @click="handleClick">点击查询</el-button>
      </div>
    </div>


    <el-carousel height="350px" class="carousel">
      <el-carousel-item v-for="item in 4" :key="item">
        <div :class="'imagesCar'+item" class="imagesCar"></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import {IsPC} from "@/components/common";

export default {
  name: 'home',
  data() {
    return {
      form: {
        carNumber: '',//车牌号
      },
      field: [
        {
          name: '车牌号',
          code: 'carNumber',
        }
      ]
    }
  },
  created() {
    this.flag = IsPC()
  },
  mounted() {
    let formStyle = document.querySelector('.form')
    let carouselStyle = document.querySelector('.carousel')
    let imagesCarStyle = document.getElementsByClassName('imagesCar')
    console.log('formStyle',formStyle)
    if(this.flag === false){
      formStyle.style.width = '100%'
      carouselStyle.style.width = '100%'
      for (let i = 0; i < imagesCarStyle.length; i++) {
        imagesCarStyle[i].style.width = '100%'
        imagesCarStyle[i].style.height = '100%'
      }
    }
  },
  methods: {
    handleClick() {
      this.$router.push({path:'/queryInfo'})
    }
  }
}
</script>

<style scoped>
.title {
  width: 100%;
  height: 70px;
  font-size: 30px;
  font-family: cursive;
  line-height: 70px;
}

.form {
  width: 600px;
  height: 150px;
  margin: auto;
}

.el-row{
  margin-bottom: 12px;
}

.el-col-6{
  text-align: right;
  line-height: 35px;
}

.el-col-18{
  text-align: left;
  line-height: 35px;
}

.el-input{
  width: 83%;
}

/deep/ .el-input__inner {
  border: 1px solid rgba(19,84,106,0.8);
  height: 35px;
}

/deep/ .el-button--primary {
  background-color: rgba(19,84,106,1);
  border-color: rgba(19,84,106,1) ;
}

.formLabel{
  font-size: 20px;
}

.carousel{
  width: 800px;
  margin: auto;
}
.imagesCar{
  width: 525px;
  height: 350px;
  display: inline-block;
  background-repeat: no-repeat;
  margin: auto;
}

.imagesCar1 {
  background-size: contain;
  background-image: url("../assets/images/car0.jpg");
}

.imagesCar2 {
  background-size: 100% 100%;
  background-image: url("../assets/images/car1.jpg");
}

.imagesCar3 {
  background-size: 100% 100%;
  background-image: url("../assets/images/car2.jpg");
}

.imagesCar4 {
  background-size: 100% 100%;
  background-image: url("../assets/images/car3.jpg");
}
</style>
