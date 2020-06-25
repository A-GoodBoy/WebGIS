<template>
    <div id="data2">
    </div>
</template>

<script>
import echarts from 'echarts'
import {province} from '../../data/shuju'
import Pass from '../../Pass.vue'
export default {
  data () {
    return {
    }
  },
  mounted () {
    // this.init()
    Pass.$on('get-fgdata', res => {
      let data2 = echarts.init(document.getElementById('data2'))
      var checkName = ''
      var option = {
        title: {
          text: '复工情况',
          x: 'center',
          textStyle: {
            color: '#ffffff',
            fontSize: 20,
            fontWeight: 'bold',
            align: 'center'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        grid: {
          top: 40,
          x: 50,
          y: 45,
          bottom: 40,
          borderWidth: 4,
          left: 120
        },
        yAxis: {
          type: 'category',
          data: province,
          axisLable: {
            show: true,
            textStyle: {
              color: '#FF0000',
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
        xAxis: [{
          type: 'value',
          axisLine: {show: false},
          axisTick: {show: false},
          splitLine: {show: false}
        }],
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
          name: '复工情况（GDP）',
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
                      {offset: 0, color: '#a45c6a'},
                      {offset: 1, color: '#a4a3e4'}
                    ]
                  )
                } else {
                  return new echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                      {offset: 0, color: '#f75d5d'},
                      {offset: 1, color: '#f0caca'}
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
      data2.setOption(option)
      data2.on('click', function (params) {
        checkName = params.name
        data2.setOption(option)
      })
      window.addEventListener('resize', function () { data2.resize() })
    })
  },
  methods: {
    init () {
      // let data2 = echarts.init(document.getElementById('data2'))
      // var checkName = ''
      // var option = {
      //   title: {
      //     text: '复工情况',
      //     x: 'center',
      //     textStyle: {
      //       color: '#ffffff',
      //       fontSize: 20,
      //       fontWeight: 'bold',
      //       align: 'center'
      //     }
      //   },
      //   tooltip: {
      //     trigger: 'axis'
      //   },
      //   toolbox: {
      //     show: true,
      //     feature: {
      //       dataView: { show: true, readOnly: false },
      //       magicType: { show: true, type: ['line', 'bar'] },
      //       restore: { show: true },
      //       saveAsImage: { show: true }
      //     }
      //   },
      //   calculable: true,
      //   grid: {
      //     top: 40,
      //     x: 50,
      //     y: 45,
      //     bottom: 40,
      //     borderWidth: 4,
      //     left: 120
      //   },
      //   yAxis: {
      //     type: 'category',
      //     data: province,
      //     axisLable: {
      //       show: true,
      //       textStyle: {
      //         color: '#FF0000',
      //         fontSize: 14
      //       }
      //     },
      //     axisLine: {
      //       lineStyle: {
      //         color: '#ffffff'
      //       }
      //     },
      //     splitLine: {
      //       show: false
      //     }
      //   },
      //   xAxis: [{
      //     type: 'value',
      //     axisLine: {show: false},
      //     axisTick: {show: false},
      //     splitLine: {show: false}
      //   }],
      //   dataZoom: [
      //     {
      //       type: 'inside',
      //       show: true,
      //       yAxisIndex: [0],
      //       top: '9%',
      //       right: -5,
      //       start: 10,
      //       end: 90
      //     }
      //   ],
      //   series: [{
      //     name: '复工情况（GDP）',
      //     type: 'bar',
      //     data: fugong,
      //     itemStyle: {
      //       emphasis: {
      //         barBorderRadius: 5
      //       },
      //       normal: {
      //         barBorderRadius: 5,
      //         color: function (params) {
      //           if (checkName === params.name) {
      //             return new echarts.graphic.LinearGradient(
      //               0, 0, 1, 0,
      //               [
      //                 {offset: 0, color: '#a45c6a'},
      //                 {offset: 1, color: '#a4a3e4'}
      //               ]
      //             )
      //           } else {
      //             return new echarts.graphic.LinearGradient(
      //               0, 0, 1, 0,
      //               [
      //                 {offset: 0, color: '#f75d5d'},
      //                 {offset: 1, color: '#f0caca'}
      //               ]
      //             )
      //           }
      //         },
      //         label: {
      //           show: true,
      //           position: 'right',
      //           formatter: '{c}',
      //           color: '#fff'
      //         }
      //       }
      //     }

      //   }]
      // }
      // data2.setOption(option)
      // data2.on('click', function (params) {
      //   checkName = params.name
      //   data2.setOption(option)
      // })
      // window.addEventListener('resize', function () { data2.resize() })
    }
  }
}
</script>

<style>
#data2{
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
