<template>
<div id ="background">
    <div id="china">
      <keep-alive>
        <v_echartsview @event1="change($event)"></v_echartsview>
      </keep-alive>
      <keep-alive>
        <v_mapview :checkPro = 'checkPro'></v_mapview>
      </keep-alive>
    </div>
</div>

</template>

<script>
import mapView from '@/components/Map/chinaMap.vue'
import echartView from '@/components/Echarts/data1.vue'
import axios from 'axios'
import Pass from '../../Pass.vue'

export default {
  name: 'china',
  components: {
    'v_mapview': mapView,
    'v_echartsview': echartView
  },
  data () {
    return {
      checkPro: ''
    }
  },
  mounted () {
    axios
      .post('http://localhost:5277/getzhiyuanData', {
        date: this.date
      })
      .then(res => {
        var data = res.data.data
        Pass.$emit('get-zydata', data)
      })
  },
  method: {
    change (checkPro) {
      this.checkPro = checkPro
    }
  }
}
</script>

<style>
#china{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
  #background{
  background: url('../../assets/background2.jpg');
  width: 100%;
  height: 100%;
  position: inherit;
  background-size: 100% 100%;
}
</style>
