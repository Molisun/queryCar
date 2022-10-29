<template>
  <div>
    <div>
      <i class="el-icon-success" style="color:#67C23A"></i>
      <span>提交成功！</span>
    </div>
    <h4>
      感谢您对膜老匠的支持！
    </h4>
    <div>
      <el-button type="primary" @click="handleClick">返回首页</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: "thanks",
  methods: {
    handleClick(){
      this.$router.push({path:'/'})
    }
  }
}
</script>

<style scoped>
/deep/ .el-button--primary {
  background-color: rgba(19,84,106,1);
  border-color: rgba(19,84,106,1) ;
}
</style>
