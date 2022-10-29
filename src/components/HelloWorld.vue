<template>
  <div>

    <div class="title">某公司质保查询系统</div>

    <div class="form">
      <el-row v-for="item in field">
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


    <el-carousel height="350px">
      <el-carousel-item v-for="item in 4" :key="item">
        <div class="imagesCar0"></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      form: {
        carNumber: '',//车牌号
        verification: '',//核验码
      },
      field: [
        {
          name: '车牌号',
          code: 'carNumber',
        },
        {
          name: '核验码',
          code: 'verification',
        }
      ]
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
  height: 100px;
  font-size: 50px;
  font-family: cursive;
  line-height: 100px;
}

.form {
  width: 600px;
  height: 200px;
  margin: auto;
}

.el-row{
  margin-bottom: 22px;
}

.formLabel{
  font-size: 20px;
}

.imagesCar0 {
  width: 550px;
  height: 350px;
  display: inline-block;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("../assets/images/car0.jpeg");
}

.imagesCar1 {
  background-image: url("../assets/images/car1.jpeg");
}

.imagesCar2 {
  background-image: url("../assets/images/car2.jpeg");
}

.imagesCar3 {
  background-image: url("../assets/images/car3.jpeg");
}
</style>
