<template>
    <div id="map">
      <div id="info">&nbsp;</div>
    </div>
</template>

<script>
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import GeoJSON from 'ol/format/GeoJSON'
import HeatmapLayer from 'ol/layer/Heatmap'
import VectorLayer from 'ol/layer/Vector'
import RasterLayer from 'ol/layer/Tile'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import {Fill, Stroke, Style, Text} from 'ol/style'
let heatData = require('../../data/china.json')

export default{
  data () {
    return {
      map: null
    }
  },
  mounted () {
    var style = new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0)'
      }),
      stroke: new Stroke({
        color: '#319FD3',
        width: 1
      }),
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
          color: '#000'
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 3
        })
      })
    })

    var vectorLayer = new VectorLayer({
      source: new VectorSource({
        url: 'http://group7.free.idcfengye.com/geoserver/china/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=china:each_province&maxFeatures=500000&outputFormat=application%2Fjson',
        format: new GeoJSON()
      }),
      style: function (feature) {
        style.getText().setText(feature.get('NAME'))
        return style
      }
    })
    // var rasterLayer = new RasterLayer({
    //   source: new RasterSource({
    //     url: 'http://127.0.0.1:8080/geoserver/china/wms',
    //     params: {
    //       'LAYERS': 'china:china_boundary',
    //       'TILED': true
    //     }
    //   })
    // })
    // var blur = document.getElementById('blur')
    // var radius = document.getElementById('radius')
    // blur.addEventListener('input', function () {
    //   heatMapLayer.setBlur(parseInt(blur.value, 5))
    // })
    // radius.addEventListener('input', function () {
    //   heatMapLayer.setRadius(parseInt(radius.value, 10))
    // })
    var heatMapLayer = new HeatmapLayer({
      source: new VectorSource({
        features: (new GeoJSON()).readFeatures(heatData, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG: 4326'
        })
      }),
      blur: 15,
      radius: 15,
      weight: function (feature) {
        var ZYData = feature.get('zhiyuan')
        var myWeight = (parseFloat(ZYData) - 7) / 25
        return myWeight
      }
      // blur: parseInt(blur.value, 10),
      // radius: parseInt(radius.value, 10)
    })
    var TDTLayer = new RasterLayer({
      source: new XYZ({
        url: 'https://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=da61ed49a2612c30ec0b7992d46e5c71'
      })
    })
    // eslint-disable-next-line no-unused-vars
    // var TDTText = new RasterLayer({
    //   source: new XYZ({
    //     url: 'https://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=da61ed49a2612c30ec0b7992d46e5c71'
    //   })
    // })
    var map = new Map({
      layers: [TDTLayer, vectorLayer],
      target: 'map',
      view: new View({
        projection: 'EPSG:4326',
        center: [104, 28],
        zoom: 3
      })
    })

    map.addLayer(heatMapLayer)

    var highlightStyle = new Style({
      stroke: new Stroke({
        color: '#f00',
        width: 1
      }),
      fill: new Fill({
        color: 'rgba(255,0,0,0.1)'
      }),
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
          color: '#000'
        }),
        stroke: new Stroke({
          color: '#f00',
          width: 3
        })
      })
    })

    var featureOverlay = new VectorLayer({
      source: new VectorSource(),
      map: map,
      style: function (feature) {
        highlightStyle.getText().setText(feature.get('NAME'))
        return highlightStyle
      }
    })

    var highlight
    var displayFeatureInfo = function (pixel) {
      vectorLayer.getFeatures(pixel).then(function (features) {
        var feature = features.length ? features[0] : undefined
        var info = document.getElementById('info')
        if (features.length) {
          info.innerHTML = feature.get('NAME')
        } else {
          info.innerHTML = '&nbsp;'
        }

        if (feature !== highlight) {
          if (highlight) {
            featureOverlay.getSource().removeFeature(highlight)
          }
          if (feature) {
            featureOverlay.getSource().addFeature(feature)
          }
          highlight = feature
        }
      })
    }

    for (var i = 0; i < vectorLayer.length; i++) {
      vectorLayer.getFeatures(i).then(function (features) {
        var feature = features.length ? features[0] : undefined
        if (feature.get('NAME') === this.checkPro) {
          featureOverlay.getSource().addFeature(feature)
        }
      })
    }

    map.on('pointermove', function (evt) {
      if (evt.dragging) {
        return
      }
      var pixel = map.getEventPixel(evt.originalEvent)
      displayFeatureInfo(pixel)
    })

    map.on('click', function (evt) {
      displayFeatureInfo(evt.pixel)
    })
  }
}
</script>

<style>
#map{
  height:95%;
  width: 60%;
  float: left;
  margin: 0px;
  background-color: rgba(0, 0, 0,0.6);
}

</style>
