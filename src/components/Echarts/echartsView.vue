<template>
  <div id="charts">
    <data1></data1>
    <data2></data2>
  </div>
</template>

<script>
import data1 from './data1.vue'
export default {
  name: 'View',
  components: {
    data1
  }
}
</script>

<style>
#charts {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgba(234, 247, 255, 0);
  height: 80%;
  width: 30%;
  float: left;
  margin: 20px;
}
</style>
