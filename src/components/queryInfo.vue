<template>
  <div class="form">
    <el-row v-for="item in field" :key="item.code">
      <el-col :span="6">
          <span class="formLabel">
            {{item.name}}：
          </span>
      </el-col>
      <el-col :span="18">
        <el-input v-if="item.code !== 'constructionImage'" v-model="form[item.code]" :placeholder="'请输入'+item.name"></el-input>
        <img v-else-if="item.code === 'constructionImage'" :src="'http://127.0.0.1:3000/' + form[item.code]" alt="" style="max-width: 200px;max-height: 200px"/>
      </el-col>
    </el-row>
    <div style="margin-bottom: 6px">
      <el-button type="primary" @click="handleClick">提交问题</el-button>
    </div>

    <div v-show="afterOpen">
      <el-row v-for="item in afterMarket" :key="item.code">
        <el-col :span="6">
          <span class="formLabel">
            {{item.name}}：
          </span>
        </el-col>
        <el-col :span="18">
          <el-input v-model="afterMarketForm[item.code]" :placeholder="'请输入'+item.name"></el-input>
        </el-col>
      </el-row>
      <div style="margin-bottom: 6px">
        <el-button type="primary" @click="handleClickAfter">售后申请</el-button>
      </div>
    </div>

    <el-divider></el-divider>

    <div>
      <el-radio-group v-model="currentTag">
        <el-radio-button label="免责声明"></el-radio-button>
        <el-radio-button label="质保内容"></el-radio-button>
        <el-radio-button label="保养方法"></el-radio-button>
      </el-radio-group>

      <div>
        <h5 v-for="item in tagInfo[currentTag]" class="h5TagInfo">{{item}}</h5>
      </div>
    </div>

  </div>
</template>

<script>
import {IsPC} from "@/components/common";
import axios from "axios";
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
  name: "queryInfo",
  data(){
    return{
      form: {},
      field: [
        {
          name: '产品型号',
          code: 'productModel',
        },
        {
          name: '贴车价格',
          code: 'price',
        },
        {
          name: '施工时间',
          code: 'constructionTime',
        },
        {
          name: '质保期限',
          code: 'timeLimit',
        },
        {
          name: '车牌号',
          code: 'carNumber',
        },
        {
          name: '车辆识别码',
          code: 'identificationNumber',
        },
        {
          name: '车型',
          code: 'model',
        },
        {
          name: '施工单位',
          code: 'constructionUnit',
        },
        {
          name: '施工图',
          code: 'constructionImage',
        },
      ],

      afterMarketForm: {
        name: '',
        mobilePhone: '',
        problem: ''
      },
      afterMarket: [
        {
          name: '姓名',
          code: 'name',
        },
        {
          name: '联系方式',
          code: 'mobilePhone',
        },
        {
          name: '问题描述',
          code: 'problem',
        },
      ],
      afterOpen: false,

      items: [
        { type: 'warning', label: '免责声明' },
        { type: '', label: '质保内容' },
        { type: 'success', label: '保养方法' },
      ],
      currentTag: '免责声明',
      tagInfo: {
        '免责声明': [
          "1.因天灾、外力或强酸碱物体等因素导致的车体、膜面损伤及不正确的保养方式造成的产品损伤，施工单位将不承担任何责任。",
          "2.去除膜时，应由施工单位进行专业去除，由车主擅自去处操作引起的膜体损坏或漆面损伤，施工单位将不承担任何责任。",
          "3.对人为造成的划痕或破损可由施工单位对破损部位进行局部修复或更换，将酌情收 取工本费"
        ],
        '质保内容': [
          "施工单位在产品施工后，根据产品所属的分类，在对应的统一质保时间内提供以下质量保证:",
          "1.保证膜的自身附着性能，不产生非触碰变形、分层或自然脱离车体。",
          "2.保证膜面外观不产生明显的太阳光照褪色现象。",
          "3.保证膜与漆面剥离时几乎不留残胶，原厂漆无脱落损伤(漆面二次喷涂部分发生脱落或损伤，不在保证范围内，以权威机构漆面成份检测结果为准)"
        ],
        '保养方法': [
          "1.施工后初期交车日起3天内)，贴膜的附着力相对较低，为以防万一，请勿触碰膜面尤其是边缘部分。",
          "2.施工后初期，可能会有后续产生气泡或水泡的可能性，属正常现象，经过10天左右时间可自然消失。如果着急，也可到施工单位进行快速处理。",
          "3.清洗车辆请在完全干燥施工后约1周后进行。",
          "4.请避免使用带有胶粘剂之类的物品粘贴膜表面。",
          "5.请避免使用易对膜面造成损伤的清洗工具，请勿使用刷子、研磨剂或带有研磨剂的海绵清洗膜面。"
        ]
      }
    }
  },
  created() {
    this.flag = IsPC()
  },
  mounted() {
    let formStyle = document.querySelector('.form')
    let formLabelStyle = document.getElementsByClassName('formLabel')
    if(this.flag === false){
      formStyle.style.width = '100%'
      for (let i = 0; i < formLabelStyle.length; i++) {
        formLabelStyle[i].style.fontSize = '14px'
      }
    }

    this.form = this.$store.state.info
    this.form.price = this.form.price ? this.form.price + "元" : ''
    this.form.timeLimit = this.form.timeLimit ? this.form.timeLimit + "年" : ''
  },
  methods: {
    /*
    **提交问题
     */
    handleClick(){
      this.afterOpen = true
    },

    /*
    **售后申请
     */
    handleClickAfter(){

      let nowTime = new Date()
      let submitTime = nowTime.format('yyyy-MM-dd hh:mm:ss')

      let self = this
      axios({
        url: "/api/addAfter",
        method: "POST",
        params: {
          ...this.afterMarketForm,
          submitTime: submitTime,
          isDelete: 'false',
        }
      }).then(function (res) {
        if(res.status == 200) {
          if (res.data.code == 200) {

            self.$message.success('提交售后信息成功');
            self.$router.push({path:'/thanks'})
          }else{
            self.$message.success('提交失败');
          }
        }
      })

    },
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
  line-height: 35px;
}

.el-col-18{
  text-align: left;
  line-height: 35px;
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

/deep/ .el-divider--horizontal {
  margin: 10px 0;
}

/deep/ .el-radio-button__inner {
  border-left: 1px solid #DCDFE6;
  border-radius: 10px !important;
}

/deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
  background-color: #F56C6C;
  border-color: #F56C6C;
  color: #fff;
  -webkit-box-shadow: unset;
  box-shadow: unset;
}

.el-radio-button {
margin: 0 10px;
}
.h5TagInfo{
text-align: left;
margin: 5px 0;
}

</style>
