<template>
<div :class="$style['control-wrapper']">
  <h2> -----节目切换----- </h2>
  <div :class="$style['control-item']">
    <button :class="$style.controlbutton + ' ' + `${itemtype == item.id ? $style['bt-primary'] : $style['bt-default']}`" :key="'changeitem' + item.id" @click="handleChangeScreen(item)" v-for='item in itemNames'>{{`${item.id}-${item.name}`}}</button>
  </div>
  <h2> -----直播控制----- </h2>
  <div :class="$style['control-item']">
    <button :class="$style.controlbutton + ' ' + `${isAllowEnter ? $style['bt-primary'] : $style['bt-default']}`" @click="handleStartShow">开始直播</button>
    <button :class="$style.controlbutton + ' ' + `${isAllowEnter ? $style['bt-default'] : $style['bt-primary']}`" @click="handleStopShow">停止直播</button>
  </div>
  <h2> -----场景控制----- </h2>
  <div :class="$style['control-item']">
    <button :class="$style.controlbutton + ' ' + `${bigScreenStatus == 'bigscreendefault' ? $style['bt-primary'] : $style['bt-default']}`" @click="handleBigScreenPage('bigscreendefault')">年会直播</button>
    <button :class="$style.controlbutton + ' ' + `${bigScreenStatus == 'subitem1' ? $style['bt-primary'] : $style['bt-default']}`" @click="handleBigScreenPage('subitem1')">投票规则</button>
    <button :class="$style.controlbutton + ' ' + `${bigScreenStatus == 'subitem2' ? $style['bt-primary'] : $style['bt-default']}`" @click="handleBigScreenPage('subitem2')">投票中</button>
    <button :class="$style.controlbutton + ' ' + `${bigScreenStatus == 'subitem3' ? $style['bt-primary'] : $style['bt-default']}`" @click="handleBigScreenPage('subitem3')">投票结果</button>
    <button :class="$style.controlbutton + ' ' + `${allowTicket ? $style['bt-primary'] : $style['bt-default']}`" @click="handleStartTicket">开始投票</button>
    <button :class="$style.controlbutton + ' ' + `${allowTicket ? $style['bt-default'] : $style['bt-primary']}`" @click="handleStopTicket">停止投票</button>
  </div>

  <h2> -----弹幕管理----- </h2>
  <div :class="$style['control-item']">
    <button :class="$style.controlbutton + ' ' + $style['bt-default']" @click="getQueryTextListsByPage">翻页</button>
    <button :class="$style.controlbutton + ' ' + $style['bt-default']" @click="refshQueryTextListsByPage">刷新</button>
    <table cellspacing="0" cellpadding="0" border="0">
      <thead>
        <tr class="">
          <th colspan="1" rowspan="1">昵称</th>
          <th colspan="1" rowspan="1">发送内容</th>
          <th colspan="1" rowspan="1">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='item in textLists'>
          <td>{{item.name}}</td>
          <td>{{item.text}}</td>
          <td><button :class="$style.controlbutton + ' ' + $style['bt-default']" @click='handleSendtext(item)' v-if='item.allowsend == 1'>发送</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import {
  axiosPostControl
} from '@/lib/ajax.js';
import storagejs from '@/lib/storagejs'
export default {
  name: 'HelloWorld',
  data() {
    return {
      itemNames: [{
          id: 1,
          name: '小品《西天取经》'
        },
        {
          id: 2,
          name: '串烧表演《锦绣中华》'
        },
        {
          id: 3,
          name: '舞蹈《绿荫风采》'
        },
        {
          id: 4,
          name: '相声《津味安信》'
        },
        {
          id: 5,
          name: '小品《有你很精彩》'
        },
        {
          id: 6,
          name: '歌曲《广西·我美丽的家》'
        },
        {
          id: 7,
          name: '舞蹈《舞动未来》'
        },
        {
          id: 8,
          name: '小品《将广告进行到底》'
        }
      ],
      itemtype: 1,
      bigScreenStatus: 'bigscreendefault',
      isAllowEnter: 0, //是否开始直播
      allowTicket: 0, //是否开始投票
      page: 0,
      textLists: []
    }
  },
  created(){
    this.queryBaseItemInfo().then(()=>{
      this.refshQueryTextListsByPage()
    })
  },
  methods: {
    //查询基本控制信息
    queryBaseItemInfo(){
      return axiosPostControl(`${this.$Host}/queryBaseItemInfo`).then(res=>{
        this.isAllowEnter = res.data.allowEnter
        this.allowTicket = res.data.allowTicket
        this.itemtype = res.data.currentItemType
      })
    },
    //切换场景
    handleChangeScreen(item) {
      this.$MessageBox.confirm(`确定选择：${item.name}`).then(action => {
        axiosPostControl(`${this.$Host}/changeScreen`, {
          id: item.id
        }).then(() => {
          this.itemtype = item.id
          this.refshQueryTextListsByPage()
        })
      });

    },
    //开始直播
    handleStartShow() {
      this.$MessageBox.confirm('确定开始直播？').then(()=>{
        axiosPostControl(`${this.$Host}/startShow`).then(()=>{
          this.isAllowEnter = 1
        })
      })
    },
    //停止直播
    handleStopShow() {
      this.$MessageBox.confirm('确定停止直播？').then(()=>{
        axiosPostControl(`${this.$Host}/stopShow`).then(()=>{
          this.isAllowEnter = 0
        })
      })
    },
    //开始投票
    handleStartTicket() {
      this.$MessageBox.confirm('确定开始投票？').then(()=>{
        axiosPostControl(`${this.$Host}/allowStartTicket`).then(()=>{
          this.allowTicket = 1
        })
      })
    },
    //停止投票
    handleStopTicket() {
      this.$MessageBox.confirm('确定停止投票？').then(()=>{
        axiosPostControl(`${this.$Host}/allowEndTicket`).then(()=>{
          this.allowTicket = 0
        })
      })
    },
    //翻页
    getQueryTextListsByPage() {
      this.page++;
      this.getQueryTextLists(1)
    },
    //刷新
    refshQueryTextListsByPage() {
      this.page = 0;
      this.getQueryTextLists(0)
    },

    //获取祝福语列表
    getQueryTextLists(isAddPage = 0) {
      const params = {
        page: this.page * 10,
        pagesize: 10,
        itemtype: this.itemtype
      }
      axiosPostControl(`${this.$Host}/queryText`, params).then(res => {
        if (res.data.length < 1) {
          this.page = 0
          if (isAddPage) {
            this.page = -1
            this.$MessageBox('已经是最后一页！')
          }
        }
        this.textLists = res.data
      })
    },
    //发送祝福语
    handleSendtext(item) {
      item.allowsend = 0
      axiosPostControl(`${this.$Host}/sendText`, item)
    },

    //切换大屏的显示内容
    handleBigScreenPage(routeName) {
      this.bigScreenStatus = routeName
      axiosPostControl(`${this.$Host}/changeBigPage`, {
        routeName
      })
    }
  }
}
</script>

<style lang="less" module>
.controlbutton {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: 1.5;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 6px 15px;
    font-size: 12px;
    border-radius: 4px;
    transition: color 0.2s linear,background-color 0.2s linear,border 0.2s linear;
    margin: 6px;
}

.bt-default {
    color: #495060;
    background-color: #f7f7f7;
    border-color: #dddee1;
    &:hover {
        color: #57a3f3;
        background-color: #fff;
        border-color: #57a3f3;
    }
}
.bt-primary {
    color: #fff;
    background-color: #2d8cf0;
    border-color: #2d8cf0;
    &:hover {
        background-color: #57a3f3;
        border-color: #57a3f3;
    }
}

.control-wrapper {
    color: #495060;
    & h2 {
        margin-top: 12px;
    }
}
.control-item {
    padding-top: 12px;
}
</style>
