<template>
  <div>
    <div class="title">后台日志</div>

    <div class="logo">
      <el-row>
        <el-col :span="6">
          <span class="formLabel">
            邮箱地址：
          </span>
        </el-col>
        <el-col :span="12">
          <el-input v-model="mail" placeholder="请输入邮箱地址"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="handleClickMail">发送</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="logo">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
          width="200px">
        </el-table-column>
        <el-table-column
          prop="contract"
          label="联系方式"
          align="center"
          width="200px">
        </el-table-column>
        <el-table-column
          prop="describe"
          label="问题描述"
          align="center">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" icon="el-icon-delete-solid" style="color: red">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>

</template>

<script>
export default {
  name: "logo",
  data(){
    return{
      mail: '',
      tableData:[
        {
          id:'1',
          name: '王小虎',
          contract: '138XXXX1234',
          describe: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id:'2',
          name: '王大虎',
          contract: '138XXXX1234',
          describe: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id:'3',
          name: '王中虎',
          contract: '138XXXX1234',
          describe: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  methods: {
    handleClickMail(){
      this.$notify({
        title: '发送成功',
        message: '表格已生成并发送至指定邮箱',
        type: 'success'
      });
    },
    handleClick(val){
      let delIndex
      this.tableData.map((i,index)=>{
        if(i.id === val.id){
          delIndex = index
        }
      })
      let self = this
      this.$confirm("是否确认删除?", "提示", {
        iconClass: "el-icon-question", //自定义图标样式
        confirmButtonText: "确认", //确认按钮文字更换
        cancelButtonText: "取消", //取消按钮文字更换
        showClose: true, //是否显示右上角关闭按钮
        type: "danger", //提示类型  success/info/warning/error
      }).then(function () {
          self.tableData.splice(delIndex,1)
        }).catch(function (err) {
          console.log(err);
        });
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

.el-input{
  width: 95%;
}
.el-row{
  margin-bottom: 6px;
}

.el-col{
  line-height: 40px;
}
.el-col-6{
  text-align: right;
}

.el-col-12{
  text-align: left;
}

.el-col-4{
  text-align: left;
}

.formLabel{
  font-size: 20px;
}

.logo{
  width: 1200px;
  margin: auto;
}
</style>
