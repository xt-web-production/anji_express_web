<template lang="html">
  <div :class='$style.bigScreen' :style="'background-position: center; background-image: url(' + require('./subitem2_bg.jpg') + ');'">
    <div :class="$style['logo-wrapper']" style='opacity: 0'>
      <img style="height: 100%;" :src="require('../../assets/logo.png')" alt="">
    </div>
    <p style="color: white; margin-top:24px; font-size:31px">安吉物流2018新春团拜会</p>
    <p style='padding: 12px 0;'><img src='./subitem3_1.png'/></p>
    <div style="padding: 0 32px;">
      <div :class="$style['ticket-block']" v-for='item,index in itemDatas' :style='bgcolor(index)'>
        <img data-type='first-img' :src="require('./subitem3_2.png')" v-if='index == 0'>
        <img data-type='num-img' :src="require(`./num${index + 1}.png`)" alt="">
        <p :class="$style['ticket-block-title']">{{item.teamName}} <span style="color: #dcbe4a; margin-left:12px">{{item.name}}</span><span :class="$style.ticketVal">
          {{item.num}}<span style="margin-left: 12px">分</span>
        </span></p>
        <div :class="$style['ticket-item']">
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' :style="'width:' + item.preGift + '%'">
            </div>
            <p style="margin-top: 4px; font-size:14px">礼物数<span style="margin-left: 8px">{{item.gift}}</span></p>
          </div>
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' :style="'width:' + item.preCount + '%'">
            </div>
            <p style="margin-top: 4px; font-size:14px">投票数<span style="margin-left: 8px">{{item.count}}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  axiosPost
} from '@/lib/ajax.js';
import _Math from 'lodash/Math'
import _Collection from 'lodash/Collection'
export default {
  data(){
    return {
      itemDatas: [],
      itemNames: {
        '1' : '星星点灯',
        '2' : '有你更精彩',
        '3' : '锦绣中华',
        '4' : '津味安信',
        '5' : '大话安吉之海陆荣耀',
        '6' : '广西 我美丽的家',
        '7' : '将广告进行到底',
        '8' : '舞动未来'
      },
      teamNames: {
        '1' : '忻际穿越战队',
        '2' : '王者荣耀战队',
        '3' : '国家宝藏战队',
        '4' : '忻际穿越战队',
        '5' : '国家宝藏战队',
        '6' : '王者荣耀战队',
        '7' : '沈采飞扬战队',
        '8' : '沈采飞扬战队'
      }
    }
  },
  created(){
    this.queryResultTickets()
  },
  methods: {
    bgcolor(val){
      const alpha = (1 - val / 5) < 0.2 ? 0.2 : 1 - val / 5
      return `background-color: rgba(98,78,17, ${alpha})`
    },
    queryResultTickets(){
      axiosPost(`${this.$Host}/queryResultTickets`).then(res=> {
        const allCount = _Math.sum(res.data, 'count') || 1
        const allGift = _Math.sum(res.data, 'gift') || 1
        const itemDatas = res.data.map(item=>{
          return {
            id: item.id,
            count: item.count,
            gift: item.gift,
            num: Math.round((item.count * 0.7 + item.gift * 0.3)*100)/100,
            preCount: item.count * 100 / allCount,
            preGift: item.gift * 100 / allGift,
            name: this.itemNames[item.id],
            teamName: this.teamNames[item.id]
          }
        })
        const _itemDatas = _Collection.sortBy(itemDatas, 'num')
        this.itemDatas = _itemDatas.reverse();
      })
    }
  }
}
</script>

<style lang='less' module>
.bigScreen {
  padding: 24px 0;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  background: rgba(1, 0, 0, 0.16);
  // /background-image: none !important;
}
.logo-wrapper {
  height: 42px;
  margin-bottom: 12px;
  padding-left: 42px;
  text-align: left;
  position: relative;
}
.ticket-block {
  font-size: 20px;
  position: relative;
  border-radius: 8px;
  color: white;
  padding: 4px 32px;
  text-align: left;
  margin-bottom: 14px;
  padding-left: 100px;
  & [data-type='first-img'] {
    position: absolute;
    left: -32px;
    top: -32px;
  }
  & [data-type='num-img'] {
    position: absolute;
    left: 32px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
.ticket-block-title {
  color:white;
  font-size: 26px;
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
.ticket-item {
  position: relative;
  margin-top: 10px;
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}

.progressWrapper {
  width: 50%;
  float: left;
  padding-right: 12px;
  & [data-type='progressbar'] {
    height: 6px;
    background-color: #dcbe4a;
    }
}
.ticketVal {
  float: right;
  color: #dcbe4a;
  font-size: 28px;
}
</style>
