<template>
<div id ="background">
    <div id="china1">
      <keep-alive>
        <v_mapview></v_mapview>
      </keep-alive>
      <keep-alive>
        <v_echartsview></v_echartsview>
      </keep-alive>
    </div>
</div>

</template>

<script>
import mapView from '@/components/Map/chinaMap1.vue'
import echartView from '@/components/Echarts/data2.vue'
import axios from 'axios'
import Pass from '../../Pass.vue'
export default {
  name: 'china1',
  components: {
    'v_mapview': mapView,
    'v_echartsview': echartView
  },
  mounted () {
    axios
      .post('http://localhost:5277/getfugongData', {
        date: this.date
      })
      .then(res => {
        var data = res.data.data
        Pass.$emit('get-fgdata', data)
      })
  }
}
</script>

<style>
#china1{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  background: url('../../assets/background2.jpg');
}
  #background{
  background: url('../../assets/background2.jpg');
  width: 100%;
  height: 100%;
  position: inherit;
  background-size: 100% 100%;
}
</style>
