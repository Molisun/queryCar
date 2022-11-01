<template>
  <div>
    <div class="title">后台管理</div>

    <el-tabs type="border-card" v-model="activeName" @tab-click="handleTabsClick" stretch>

      <el-tab-pane label="售后记录表格" name="first">

        <div style="width: 1200px;margin: auto">

          <div style="display: flex;justify-content: space-between">
            <el-button type="danger" icon="el-icon-delete" @click="handleDel()" :disabled="selected.length===0">批量删除</el-button>
            <el-button type="success" icon="el-icon-download" @click="()=>{this.exportToExcel()}">导出excel</el-button>
          </div>

          <el-table
            stripe
            id="myTable"
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              align="center"
              width="100px">
            </el-table-column>
            <el-table-column
              prop="mobilePhone"
              label="联系方式"
              align="center"
              width="120px">
            </el-table-column>
            <el-table-column
              prop="problem"
              label="问题描述"
              align="center">
            </el-table-column>
            <el-table-column
              prop="submitTime"
              label="提交时间"
              align="center"
              :formatter="timeFormatter">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleDel(scope.row)" type="text"  :disabled="selected.length>0" icon="el-icon-delete-solid" style="color: red">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </el-tab-pane>

      <el-tab-pane label="质保信息录入" name="second">

        <div style="width: 1200px;margin: auto">
          <el-row v-for="item in field" :key="item.code">
            <el-col :span="6">
              <span class="formLabel">
                {{item.name}}：
              </span>
            </el-col>
            <el-col :span="18">
              <el-date-picker
                v-if="item.code ==='constructionTime'"
                v-model="form[item.code]"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
              <el-input v-model="form[item.code]" :placeholder="'请输入'+item.name" v-else-if="item.code !=='constructionImage'"></el-input>
              <input type="file" id="file" @change="handleImageAdd($event)" v-else-if="item.code ==='constructionImage'"></input>
            </el-col>
          </el-row>
          <div>
            <i class="el-icon-info" style="color: #67C23A"></i>
            <span>选择文件后自动完成信息录入</span>
          </div>
        </div>

      </el-tab-pane>

    </el-tabs>

  </div>

</template>

<script>
import axios from "axios";
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
Date.prototype.format = function(format) {
  var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(),    //day
    "h+" : this.getHours(),   //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
    "S" : this.getMilliseconds() //millisecond
  }
  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
      RegExp.$1.length==1 ? o[k] :
        ("00"+ o[k]).substr((""+ o[k]).length));
  return format;
}
export default {
  name: "logo",
  data(){
    return{
      activeName: 'first',
      tableData:[],
      form: {
        productModel:'',
        price:'',
        constructionTime:'',
        timeLimit:'',
        carNumber:'',
        identificationNumber:'',
        model:'',
        constructionUnit:'',
      },
      selected: [],
      field: [
        {name: '产品型号', code: 'productModel',},
        {name: '贴车价格', code: 'price',},
        {name: '施工时间', code: 'constructionTime',},
        {name: '质保期限', code: 'timeLimit',},
        {name: '车牌号', code: 'carNumber',},
        {name: '车辆识别码', code: 'identificationNumber',},
        {name: '车型', code: 'model',},
        {name: '施工单位', code: 'constructionUnit',},
        {name: '施工完成图', code: 'constructionImage',},
      ],
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    handleTabsClick(){},
    /*
    **查询售后记录
     */
    query(){
      let httpURL = `/api/listAfter`;
      let self = this
      this.tableData = []
      axios.get(httpURL).then(function (res) {

        if(res.status == 200){
          if(res.data.result.length){
            let info = res.data.result
            info.map(i=>{
              self.tableData.push(i)
            })
          }else{
            self.$message.error(res.data.msg);
          }
        }else{

        }
      })
    },

    /*
    **导出表格
     */
    exportToExcel () {
      //获取 table 表格数据
      let et = XLSX.utils.table_to_book(document.querySelector('#myTable')); //此处传入table的DOM节点
      let etout = XLSX.write(et, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      });
      try {
        FileSaver.saveAs(new Blob([etout], {
          type: 'application/octet-stream'
        }), 'trade-publish.xlsx');   //trade-publish.xlsx 为导出的文件名
      } catch (e) {
        console.log(e, etout) ;
      }
      return etout;
    },

    /*
    **删除售后记录
     */
    handleDel(val){
      let id = []
      console.log(val,!val)
      if(!val){
        console.log('1')
        this.selected.map(i=>{
          id.push(i.id)
        })
      }else{
        console.log('2')
        id = [val.id]
      }
      let params = {
        id: id
      }
      console.log(params)
      let self = this
      this.$confirm("是否确认删除?", "提示", {
        iconClass: "el-icon-delete", //自定义图标样式
        confirmButtonText: "确认", //确认按钮文字更换
        cancelButtonText: "取消", //取消按钮文字更换
        showClose: true, //是否显示右上角关闭按钮
        type: "error", //提示类型  success/info/warning/error
      }).then(function () {

        let httpURL = `/api/delAfter`;
        axios({
          url:httpURL,
          methods: "GET",
          params: params
        }).then(function (res) {

          if(res.status == 200){
            if(res.data.code == 200){
              self.query()
              self.$message.success('删除成功');
            }
          }
        })

        }).catch(function (err) {
          console.log(err);
        });
    },

    /*
    **质保信息录入
     */
    handleImageAdd(e){
      let self = this
      console.log(e.target)
      var file = e.target.files[0];
      //可打印看看
      console.log(e.target.files);
      //新建一个 FormData 对象
      var param = new FormData();
      // 把文件添加到 FormData对象里
      param.append("constructionImage", file);
      this.form.constructionTime = this.form.constructionTime.format('yyyy-MM-dd')

      for (const key in this.form) {
        param.append(key, this.form[key]);
      }
      axios
        .post("/api/imageAdd", param, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if(res.status == 200) {
            if (res.data.code == 200) {
              self.$message.success(res.data.msg)
            }else{
              self.$message.error(res.data.msg)
            }
          }
        });
    },

    /*
    **表格多选
     */
    handleSelectionChange(val){
      this.selected = val
    },

    timeFormatter(row){
      return new Date(row.submitTime).format('yyyy-MM-dd hh:mm:ss')
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

/deep/ .el-tabs__item {
  font-size: 28px;
  font-family: cursive;
}


</style>
