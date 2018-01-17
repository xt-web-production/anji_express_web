<template lang="html">
  <div :class='$style.bigScreen' :style="'background-position: center; background-image: url(' + require('./subitem2_bg.jpg') + ');'">
    <div :class="$style['logo-wrapper']">
      <img style="height: 100%;" :src="require('../../assets/logo.png')" alt="">
    </div>
    <p style="color: white; margin-top:72px; font-size:31px">安吉物流2018新春团拜会</p>
    <p style='padding: 52px 0 42px; 0'><img src='./subitem2_1.png'/></p>
    <div style="padding: 0 100px;" v-if='itemDatas.length > 0'>
      <div :class="$style['ticket-block']">
        <p style="color: #dcbe4a; font-size: 26px;">{{itemDatas[0].teamName}}</p>
        <div :class="$style['ticket-item']">
          <p style="padding-bottom: 16px">{{itemDatas[0].name}}</p>
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' :style="'width:' + itemDatas[0].pre + '%'">
            </div>
          </div>
          <span :class="$style.ticketVal">
            {{itemDatas[0].count}}<span style="margin-left: 12px">票</span>
          </span>
        </div>
        <div :class="$style['ticket-item']">
          <p style="padding-bottom: 16px">{{itemDatas[1].name}}</p>
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' :style="'width:' + itemDatas[1].pre + '%'">
            </div>
          </div>
          <span :class="$style.ticketVal">
            {{itemDatas[1].count}}<span style="margin-left: 12px">票</span>
          </span>
        </div>
      </div>
      <div :class="$style['ticket-block']">
        <p style="color: #dcbe4a; font-size: 26px;">{{itemDatas[2].teamName}}</p>
        <div :class="$style['ticket-item']">
          <p style="padding-bottom: 16px">{{itemDatas[2].name}}</p>
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' :style="'width:' + itemDatas[2].pre + '%'">
            </div>
          </div>
          <span :class="$style.ticketVal">
            {{itemDatas[2].count}}<span style="margin-left: 12px">票</span>
          </span>
        </div>
        <div :class="$style['ticket-item']">
          <p style="padding-bottom: 16px">{{itemDatas[3].name}}</p>
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' :style="'width:' + itemDatas[3].pre + '%'">
            </div>
          </div>
          <span :class="$style.ticketVal">
            {{itemDatas[3].count}}<span style="margin-left: 12px">票</span>
          </span>
        </div>
      </div>
      <div :class="$style['ticket-block']">
        <p style="color: #dcbe4a; font-size: 26px;">{{itemDatas[4].teamName}}</p>
        <div :class="$style['ticket-item']">
          <p style="padding-bottom: 16px">{{itemDatas[4].name}}</p>
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' :style="'width:' + itemDatas[4].pre + '%'">
            </div>
          </div>
          <span :class="$style.ticketVal">
            {{itemDatas[4].count}}<span style="margin-left: 12px">票</span>
          </span>
        </div>
        <div :class="$style['ticket-item']">
          <p style="padding-bottom: 16px">{{itemDatas[5].name}}</p>
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' :style="'width:' + itemDatas[5].pre + '%'">
            </div>
          </div>
          <span :class="$style.ticketVal">
            {{itemDatas[5].count}}<span style="margin-left: 12px">票</span>
          </span>
        </div>
      </div>
      <div :class="$style['ticket-block']">
        <p style="color: #dcbe4a; font-size: 26px;">{{itemDatas[6].teamName}}</p>
        <div :class="$style['ticket-item']">
          <p style="padding-bottom: 16px">{{itemDatas[6].name}}</p>
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' :style="'width:' + itemDatas[6].pre + '%'">
            </div>
          </div>
          <span :class="$style.ticketVal">
            {{itemDatas[6].count}}<span style="margin-left: 12px">票</span>
          </span>
        </div>
        <div :class="$style['ticket-item']">
          <p style="padding-bottom: 16px">{{itemDatas[7].name}}</p>
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' :style="'width:' + itemDatas[7].pre + '%'">
            </div>
          </div>
          <span :class="$style.ticketVal">
            {{itemDatas[7].count}}<span style="margin-left: 12px">票</span>
          </span>
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
        '1' : '小品《西天取经》',
        '2' : '串烧表演《锦绣中华》',
        '3' : '舞蹈《绿荫风采》',
        '4' : '相声《津味安信》',
        '5' : '小品《有你很精彩》',
        '6' : '歌曲《广西·我美丽的家》',
        '7' : '舞蹈《舞动未来》',
        '8' : '小品《将广告进行到底》'
      },
      teamNames: {
        '1' : '战队1',
        '2' : '战队1',
        '3' : '战队2',
        '4' : '战队2',
        '5' : '战队3',
        '6' : '战队3',
        '7' : '战队4',
        '8' : '战队4'
      }
    }
  },
  created(){
    this.queryResultTickets()
    this.Interval = setInterval(this.queryResultTickets,3000);
  },
  methods: {
    queryResultTickets(){
      axiosPost(`${this.$Host}/queryResultTickets`).then(res=> {
        const allCount = _Math.sum(res.data, 'count') || 1
        const itemDatas = res.data.map(item=>{
          return {
            id: item.id,
            count: item.count,
            pre: item.count * 100 / allCount,
            name: this.itemNames[item.id],
            teamName: this.teamNames[item.id]
          }
        })
        this.itemDatas = _Collection.sortBy(itemDatas, 'id')
      })
    }
  },
  beforeDestroy(){
    clearInterval(this.Interval)
  }
}
</script>

<style lang='less' module>
.bigScreen {
  padding: 64px 0;
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
  background-color: rgba(115,110,41,0.2);
  border-radius: 8px;
  color: white;
  padding: 24px 32px;
  text-align: left;
  margin-bottom: 14px;
}
.ticket-item {
  position: relative;
  padding-right: 186px;
  margin-top: 28px;
}

.progressWrapper {
  & [data-type='progressbar'] {
    height: 6px;
    transition: width .3s ease;
    background-color: #dcbe4a;
    }
}
.ticketVal {
  position: absolute;
  background-color: #736429;
  padding: 8px 24px;
  bottom: 0;
  right: 32px;
  border-radius: 24px;
}
</style>
