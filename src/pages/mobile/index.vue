<template>
  <div class="mobile">
    <h1>mobile</h1>
    <button @click="sendGift('name1', 'http://1jad.ad1/ads/113.png', 1)">赠送礼物1</button>
    <button @click="sendGift('name2', 'http://1123adad/qwert.png', 2)">赠送礼物2</button>
    <button @click="sendGift('name3', 'http://1ggg123/adad13.png', 3)">赠送礼物3</button>

    <button @click='queryAllGift'>查询所有赠送礼物</button>

    <input placeholder="请输入内容" v-model='msg'>
    <button @click='submitText(msg)'>发送祝福语</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    sendGift(wcname, img, gift){
      axios.post(`${this.$Host}sendGift1`, {
        wcname,
        img,
        gift
      })
    },
    queryAllGift(){
      axios.post(`${this.$Host}quertGift1`)
    },
    submitText(val){
      console.log(val);
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
