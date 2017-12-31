<template>
  <div class="mobile">
    <h1>mobile {{itemNames[itemType.itemType - 1]}}</h1>
    <button @click="sendGift(1)">赠送礼物1</button>
    <button @click="sendGift(2)">赠送礼物2</button>
    <button @click="sendGift(3)">赠送礼物3</button>

    <input placeholder="请输入内容" v-model='msg'>
    <button @click='submitText(msg)'>发送祝福语</button>


    <button @click='handleClickPraise'>点赞</button>
  </div>
</template>

<script>
import axios from 'axios';
import faker from 'faker';
import {mapState} from 'vuex';
export default {
  name: 'mobile',
  beforeRouteEnter (to, from, next) {
    next(vm => vm.setData())
  },
  data () {
    return {
      itemNames: ['节目1', '节目2', '节目3', '节目4', '节目5', '节目6', '节目7', '节目8'],
      name: '',
      img: '',
      msg: '',
      //根据类型搜索礼物
      queryGiftItem : {
        itemtype: this.itemtype,
        page: 0,
        pagesize: 4
      }
    }
  },
  computed: {
  ...mapState(['itemType'])
  },
  methods: {
    setData () {
      this.name = faker.name.findName()
      this.img = faker.image.imageUrl()
    },
    /**
    发送礼物
    **/
    sendGift(gift){
      axios.post(`${this.$Host}/sendGift`, {
        name: this.name,
        itemtype: this.itemType.itemType,
        img: this.img,
        gift
      })
    },
    submitText(text){
      axios.post(`${this.$Host}/addText`, {
        name: this.name,
        itemtype: this.itemType.itemType,
        img: this.img,
        text
      })
    },
    handleClickPraise(){
      axios.post(`${this.$Host}/addPraise`, {itemtype: this.itemType.itemType})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
