<template>
<div class ="wuhanview">
    <div id="wuhan">
    </div>
    <div class="charts">
      <div id="sistogram-add"></div>
      <div id="sistogram-total"></div>
    </div>
</div>

</template>

<script>
import echarts from 'echarts'
import { times, addPerson, totalPerson } from '../../data/personData'
let geoJson = require('../../data/wuhan.json')

const colorList = {
  C_0: '#FFFFFF',
  C_9: '#FFF8F8',
  C_99: '#FFA0A0',
  C_499: '#FF7878',
  C_999: '#FF4646',
  C_10000: '#FF1313',
  C_10000_: '#FF0000'
}

export default {
  name: 'wuhan',
  data () {
    return {
      background: '#ccc',
      currentItemName: ''
    }
  },
  mounted () {
    this.initEcharts()
  },
  methods: {
    initEcharts () {
      this.$nextTick(() => {
        this.myChart1 = echarts.init(document.getElementById('wuhan'))
        this.myChart2 = echarts.init(document.getElementById('sistogram-add'))
        this.myChart3 = echarts.init(
          document.getElementById('sistogram-total')
        )
        this.myChart2.on('click', this.handleClickItem)
        this.myChart3.on('click', this.handleClickItem)
        echarts.registerMap('武汉市', geoJson) // #2

        this.option = {
          title: {
            text: '武汉疫情',
            x: 'center',
            textStyle: { color: 'rgba(120,255,255,0.8)' }
          },
          dataRange: {
            x: 'right',
            y: 'bottom',
            splitList: [
              {start: 13000, label: '新增确诊>13000', color: '#FF0000'},
              {start: 1000, end: 12999, label: '1000~12999', color: '#FF1313'},
              {start: 500, end: 999, label: '500~999', color: '#FF4646'},
              {start: 100, end: 499, label: '100~499', color: '#FF7878'},
              {start: 10, end: 99, label: '10~99', color: '#FFA0A0'},
              {start: 1, end: 9, label: '1~9', color: '#FFF8F8'},
              {end: 0, label: '新增确诊=0', color: '#FFFFFF'}
            ],
            textStyle: {
              color: 'rgb(255,255,255)'
            }
          },
          series: [
            {
              name: 'wuhanmap',
              type: 'map',
              roam: true,
              map: '武汉市',
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              iaspectScale: 0.75,
              zoom: 1,
              itemStyle: {
                normal: {
                  borderWidth: 0.5, // 区域边框宽度
                  borderColor: '#009fe8', // 区域边框颜色
                  areaColor: this.background // 区域颜色
                }
              }
            }
          ]
        }

        this.option1 = {
          title: {
            text: '新增确诊',
            x: 'center',
            textStyle: { color: 'rgba(90,235,255,0.8)' }
          },
          tooltip: {},
          grid: {
            left: 55
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
              type: 'line',
              data: addPerson,
              itemStyle: {
                normal: {
                  color: params => {
                    return this.setBarItemColor(params)
                  }
                }
              }
            }
          ]
        }

        this.option2 = {
          title: {
            text: '累积确诊',
            x: 'center',
            textStyle: { color: 'rgba(130,215,255,0.8)' }
          },
          tooltip: {},
          grid: {
            left: 55
          },
          xAxis: {
            data: times,
            axisLabel: {
              color: '#fff'
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
          yAxis: {
            min: 35000,
            axisLabel: {
              color: '#fff'
            },
            splitLine: {
              show: false
            }
          },
          series: [
            {
              name: '累积确诊',
              type: 'bar',
              data: totalPerson,
              itemStyle: {
                normal: {
                  barBorderRadius: 5,
                  color: params => {
                    return this.setBarItemColor(params)
                  }
                }
              }
            }
          ]
        }

        this.myChart1.setOption(this.option, true)
        this.myChart2.setOption(this.option1, true)
        this.myChart3.setOption(this.option2, true)
      })
    },
    handleClickItem (params) {
      let { data, name, seriesName } = params
      if (seriesName !== '新增确诊') {
        data = addPerson[params.dataIndex]
      }
      if (data < 1) {
        this.background = colorList.C_0
      } else if (data <= 9) {
        this.background = colorList.C_9
      } else if (data <= 99) {
        this.background = colorList.C_99
      } else if (data <= 499) {
        this.background = colorList.C_499
      } else if (data <= 999) {
        this.background = colorList.C_999
      } else if (data <= 10000) {
        this.background = colorList.C_10000
      } else if (data > 10000) {
        this.background = colorList.C_10000_
      }

      this.currentItemName = name
      this.initEcharts()
    },
    setBarItemColor (params) {
      let colors = times.map(item => {
        if (this.currentItemName === params.name) {
          return '#00ffff'
        }
        return '#A20F1C'
      })
      return colors[params.dataIndex]
    }
  }
}
</script>

<style>
.wuhanview{
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: space-between;
  background: url('../../assets/background3.jpg');
  background-size: 100% 100%;
  padding-top: 40px;
}
#wuhan{
  height:90%;
  width: 60%;
  float: left;
  margin: 20px;
}
.charts{
  height: 80%;
  width: 30%;
  float: left;
  margin: 20px;
}
#sistogram-add{
  width: 100%;
  height: 50%;
  float: left;

}
#sistogram-total{
  width: 100%;
  height: 50%;
  float: left;
  margin-top: 10px;

}
</style>
