<template>
<div id = "background">
    <div id = "brief">
    </div>
</div>
</template>>
<script>
import echarts from 'echarts'
import { times, addPerson, supplies } from '../../data/personData'
export default {
  name: 'brief',
  data () {
    return {
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let brief = echarts.init(document.getElementById('brief'))
      var checkName = ''
      var option = {
        title: {
          text: '武汉新增确诊&&物资',
          x: 'center',
          textStyle: { color: 'rgba(255,235,255,0.8)' }
        },
        tooltip: {trigger: 'axis'},
        toolbox: {
          show: true,
          feature: {
            dataView: {
              show: true,
              readOnly: false
            },
            magicType: {
              show: true,
              type: ['line', 'bar']
            }
          }
        },
        grid: {
          left: 55
        },
        legend: {
          show: true,
          data: [{name: '新增确诊'}, {name: '防疫物资'}],
          padding: [50, 0, 0, 0],
          textStyle: {
            fontSize: 12,
            fontWeight: 'bolder',
            color: '#ffffff'
          }
        },
        xAxis: {
          data: times,
          axisLabel: {
            color: '#fff'
          }
        },
        yAxis: {
          axisLabel: {
            color: '#fff'
          },
          splitLine: {
            show: false
          }
        },
        dataZoom: [
          {
            type: 'inside',
            show: true,
            xAxisIndex: [0],
            left: '9%',
            bottom: -5,
            start: 10,
            end: 90
          }
        ],
        series: [
          {
            name: '新增确诊',
            type: 'bar',
            data: addPerson,
            itemStyle: {
              emphasis: {
                barBorderRadius: 5
              },
              normal: {
                barBorderRadius: 5,
                color: function (params) {
                  if (checkName === params.name) {
                    return new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        {offset: 0, color: '#F4A0DE'},
                        {offset: 1, color: '#8AC4DA'}
                      ]
                    )
                  } else {
                    return new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        {offset: 0, color: '#65D0DE'},
                        {offset: 1, color: '#ABD5DA'}
                      ]
                    )
                  }
                }
              }
            }
          },
          {
            name: '防疫物资',
            type: 'line',
            data: supplies,
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: '#ffa0e8',
                lineStyle: {
                  width: 3,
                  color: '#71e412'
                }
              }
            },
            label: {
              show: true,
              position: 'top',
              formatter: '{c}',
              color: '#ff0000'
            }
          }
        ]
      }

      brief.setOption(option, true)
      brief.on('click', function (params) {
        checkName = params.name
        brief.setOption(option)
      })
      window.addEventListener('resize', function () { brief.resize() })
    }
  }
}
</script>>
<style scoped>
#brief{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 80%;
  width: 90%;
  float: left;
  margin: 20px;
  background: url('../../assets/background4.jpg');
}
#background{
  background: url('../../assets/background4.jpg');
  width: 100%;
  height: 100%;
  position: inherit;
  background-size: 100% 100%;
}
</style>
