<template>
  <div class="mobile">
    <h1>mobile</h1>
    <button @click='sendGift(1)'>赠送礼物1</button>
    <button @click='sendGift(2)'>赠送礼物2</button>
    <button @click='sendGift(3)'>赠送礼物3</button>

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
    sendGift(gift){
      console.log(this.$Host);
      axios.post(`${this.$Host}sendGift1`, {
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
