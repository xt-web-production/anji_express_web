<template>
  <div class="control">
    <h1>控制场景切换</h1>
  <button @click="handleChangeScreen(1)">screen1</button>
  <button @click="handleChangeScreen(2)">screen2</button>
  <button @click="handleChangeScreen(3)">screen3</button>
  <button @click="handleChangeScreen(4)">screen4</button>
  <button @click="handleChangeScreen(5)">screen5</button>
  <button @click="handleChangeScreen(6)">screen6</button>
  <button @click="handleChangeScreen(7)">screen7</button>
  <button @click="handleChangeScreen(8)">screen8</button>
  <button @click="handleStartShow">开始直播</button>
  <button @click="handleStopShow">停止直播</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    //切换场景
  handleChangeScreen(id) {
    axios.post(`${this.$Host}/changeScreen`, {
        id
      })
  },
  //开始直播
  handleStartShow(){
    axios.post(`${this.$Host}/startShow`)
  },
  //开始直播
  handleStopShow(){
    axios.post(`${this.$Host}/stopShow`)
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
