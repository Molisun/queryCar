<template>
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
    <div style="margin-bottom: 6px">
      <el-button type="primary" @click="handleClick">点击查询</el-button>
    </div>

    <div v-show="afterOpen">
      <el-row v-for="item in afterMarket">
        <el-col :span="6">
          <span class="formLabel">
            {{item.name}}：
          </span>
        </el-col>
        <el-col :span="18">
          <el-input v-model="form[item.code]" :placeholder="'请输入'+item.name"></el-input>
        </el-col>
      </el-row>
      <div style="margin-bottom: 6px">
        <el-button type="primary" @click="handleClickAfter">售后申请</el-button>
      </div>
    </div>

    <div>
      <el-carousel height="50px" direction="vertical">
        <el-carousel-item v-for="item in 3" :key="item">
          <i class="el-icon-chat-dot-round"/> <span>您有一条新的消息{{item}}</span>
        </el-carousel-item>
      </el-carousel>
    </div>

  </div>
</template>

<script>
export default {
  name: "queryInfo",
  data(){
    return{
      form: {
        waresName: '',
        project: '',
        warranty: '',
        carNumber: '',
        verification: '',
        provider: '',
        company: '',
        finished: '',
      },
      field: [
        {
          name: '品名',
          code: 'waresName',
        },
        {
          name: '施工项目',
          code: 'project',
        },
        {
          name: '质保期限',
          code: 'warranty',
        },
        {
          name: '车牌号',
          code: 'carNumber',
        },
        {
          name: '车架号',
          code: 'verification',
        },
        {
          name: '渠道商',
          code: 'provider',
        },
        {
          name: '施工单位',
          code: 'company',
        },
        {
          name: '施工完成图',
          code: 'finished',
        },
      ],

      afterMarketForm: {
        name: '',
        contract: '',
        describe: ''
      },
      afterMarket: [
        {
          name: '姓名',
          code: 'name',
        },
        {
          name: '联系方式',
          code: 'contract',
        },
        {
          name: '问题描述',
          code: 'describe',
        },
      ],
      afterOpen: false,
    }
  },
  methods: {
    handleClick(){
      this.afterOpen = true
    },
    handleClickAfter(){
      this.$router.push({path:'/logo'})
    }
  }
}
</script>

<style scoped>
.form {
  width: 600px;
  height: 200px;
  margin: auto;
}

.el-input{
  width: 80%;
}

.el-row{
  margin-bottom: 6px;
}

.el-col-6{
  text-align: right;
  line-height: 40px;
}

.el-col-18{
  text-align: left;
  line-height: 40px;
}

.formLabel{
  font-size: 20px;
}
</style>
