<template>
    <div id="data1">
    </div>
</template>

<script>
import echarts from 'echarts'
import {province} from '../../data/shuju'
import Pass from '../../Pass.vue'
export default {
  data () {
    return {
      checkPro: ''
    }
  },
  mounted () {
    // this.init()
    Pass.$on('get-zydata', res => {
      let data1 = echarts.init(document.getElementById('data1'))
      var checkName = ''
      var option = {
        title: {
          text: '各省支援',
          x: 'center',
          textStyle: {
            color: '#ffffff',
            fontSize: 20,
            fontWeight: 'bold',
            align: 'center'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 40,
          x: 50,
          y: 45,
          bottom: 40,
          borderWidth: 4,
          left: 120
        },
        yAxis: {
          data: province,
          axisLable: {
            show: true,
            textStyle: {
              color: '#ffffff',
              fontSize: 14
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          },
          splitLine: {
            show: false
          }
        },
        xAxis: {
          splitLine: {
            show: false
          }},
        dataZoom: [
          {
            type: 'inside',
            show: true,
            yAxisIndex: [0],
            top: '9%',
            right: -5,
            start: 10,
            end: 90
          }
        ],
        series: [{
          name: '支援情况',
          type: 'bar',
          data: res,
          itemStyle: {
            emphasis: {
              barBorderRadius: 5
            },
            normal: {
              barBorderRadius: 5,
              color: function (params) {
                if (checkName === params.name) {
                  return new echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                      {offset: 0, color: '#F4A0DE'},
                      {offset: 1, color: '#8AC4DA'}
                    ]
                  )
                } else {
                  return new echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                      {offset: 0, color: '#65D0DE'},
                      {offset: 1, color: '#ABD5DA'}
                    ]
                  )
                }
              },
              label: {
                show: true,
                position: 'right',
                formatter: '{c}',
                color: '#fff'
              }
            }
          }
        }]
      }
      data1.setOption(option)
      data1.on('click', function (params) {
        checkName = params.name
        this.checkPro = checkName
        data1.setOption(option)
      })
      window.addEventListener('resize', function () { data1.resize() })
    })
  },
  methods: {
    toParent: function () {
      this.$emit('event1', this.checkPro)
    }
    // init () {
    //   let data1 = echarts.init(document.getElementById('data1'))
    //   var checkName = ''
    //   var option = {
    //     title: {
    //       text: '各省支援',
    //       x: 'center',
    //       textStyle: {
    //         color: '#ffffff',
    //         fontSize: 20,
    //         fontWeight: 'bold',
    //         align: 'center'
    //       }
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: { // 坐标轴指示器，坐标轴触发有效
    //         type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    //       }
    //     },
    //     grid: {
    //       top: 40,
    //       x: 50,
    //       y: 45,
    //       bottom: 40,
    //       borderWidth: 4,
    //       left: 120
    //     },
    //     yAxis: {
    //       data: province,
    //       axisLable: {
    //         show: true,
    //         textStyle: {
    //           color: '#ffffff',
    //           fontSize: 14
    //         }
    //       },
    //       axisLine: {
    //         lineStyle: {
    //           color: '#ffffff'
    //         }
    //       },
    //       splitLine: {
    //         show: false
    //       }
    //     },
    //     xAxis: {
    //       splitLine: {
    //         show: false
    //       }},
    //     dataZoom: [
    //       {
    //         type: 'inside',
    //         show: true,
    //         yAxisIndex: [0],
    //         top: '9%',
    //         right: -5,
    //         start: 10,
    //         end: 90
    //       }
    //     ],
    //     series: [{
    //       name: '支援情况',
    //       type: 'bar',
    //       data: zhiyuan,
    //       itemStyle: {
    //         emphasis: {
    //           barBorderRadius: 5
    //         },
    //         normal: {
    //           barBorderRadius: 5,
    //           color: function (params) {
    //             if (checkName === params.name) {
    //               return new echarts.graphic.LinearGradient(
    //                 0, 0, 1, 0,
    //                 [
    //                   {offset: 0, color: '#F4A0DE'},
    //                   {offset: 1, color: '#8AC4DA'}
    //                 ]
    //               )
    //             } else {
    //               return new echarts.graphic.LinearGradient(
    //                 0, 0, 1, 0,
    //                 [
    //                   {offset: 0, color: '#65D0DE'},
    //                   {offset: 1, color: '#ABD5DA'}
    //                 ]
    //               )
    //             }
    //           },
    //           label: {
    //             show: true,
    //             position: 'right',
    //             formatter: '{c}',
    //             color: '#fff'
    //           }
    //         }
    //       }
    //     }]
    //   }
    //   data1.setOption(option)
    //   data1.on('click', function (params) {
    //     checkName = params.name
    //     this.checkPro = checkName
    //     data1.setOption(option)
    //   })
    //   window.addEventListener('resize', function () { data1.resize() })
    // }
  }
}

</script>

<style scoped>
#data1{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #eaf7ff00;
  height: 90%;
  width: 30%;
  float: left;
  margin: 20px;
}
</style>
