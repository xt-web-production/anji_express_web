<template>
  <div class="control-wrapper">
    <h2> -----节目切换----- </h2>
    <div class="item-types-wrapper">
      <button @click="handleChangeScreen(1)">screen1</button>
      <button @click="handleChangeScreen(2)">screen2</button>
      <button @click="handleChangeScreen(3)">screen3</button>
      <button @click="handleChangeScreen(4)">screen4</button>
      <button @click="handleChangeScreen(5)">screen5</button>
      <button @click="handleChangeScreen(6)">screen6</button>
      <button @click="handleChangeScreen(7)">screen7</button>
      <button @click="handleChangeScreen(8)">screen8</button>
    </div>
    <h2> -----直播控制----- </h2>
    <div class="player-control-wrapper">
      <button @click="handleStartShow">开始直播</button>
      <button @click="handleStopShow">停止直播</button>
    </div>
    <h2> -----场景控制----- </h2>
    <div class="ticket-control-wrapper">
      <button @click="handleStartTicket">年会直播</button>
      <button @click="handleStartTicket">投票大屏显示二维码</button>
      <button @click="handleStartTicket">开始投票</button>
      <button @click="handleStopTicket">停止投票</button>
      <button @click="handleStopTicket">投票规则</button>
      <button @click="handleStopTicket">投票中</button>
      <button @click="handleStopTicket">投票结果</button>
    </div>

    <h2> -----弹幕管理----- </h2>
    <button @click="getQueryTextListsByPage">翻页</button>
    <button @click="refshQueryTextListsByPage">刷新</button>
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
            <td><button @click='handleSendtext(item)' v-if='item.allowsend == 1'>发送</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  axiosPost
} from '@/lib/ajax.js';
import storagejs from '@/lib/storagejs'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      itemtype: 1,
      page: 0,
      textLists: []
    }
  },
  mounted(){
    this.itemtype = storagejs.get('currentItemType')
    this.refshQueryTextListsByPage()
  },
  methods: {
    //切换场景
  handleChangeScreen(id) {
    axiosPost(`${this.$Host}/changeScreen`, {
        id
      }).then(()=>{
        this.itemtype = id
        storagejs.set('currentItemType', id)
        this.refshQueryTextListsByPage()
      })
  },
  //开始直播
  handleStartShow(){
    axiosPost(`${this.$Host}/startShow`)
  },
  //开始直播
  handleStopShow(){
    axiosPost(`${this.$Host}/stopShow`)
  },
  //开始投票
  handleStartTicket(){
    axiosPost(`${this.$Host}/startTicket`)
  },
  //停止投票
  handleStopTicket(){
    axiosPost(`${this.$Host}/endTicket`)
  },
  //翻页
  getQueryTextListsByPage(){
    this.page ++;
    this.getQueryTextLists(1)
  },
  //刷新
  refshQueryTextListsByPage(){
    this.page = 0;
    this.getQueryTextLists(0)
  },

  //获取祝福语列表
  getQueryTextLists(isAddPage = 0){
    const params = {
      page: this.page * 10,
      pagesize: 10,
      itemtype: this.itemtype
    }
    axiosPost(`${this.$Host}/queryText`, params).then(res=>{
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
  handleSendtext(item){
    item.allowsend = 0
    axiosPost(`${this.$Host}/sendText`, item)
  }
}
}
</script>
