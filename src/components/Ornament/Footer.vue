<template>
<div class="footer_style">
    WebGIS_Group_Seven --- {{date}}
</div>
</template>
<script>
export default {
  name: 'test',
  data: function () {
    return {
      date: new Date()
    }
  },
  created () {
  },
  mounted () {
    let _this = this
    this.timer = setInterval(function () {
      _this.date = new Date().toLocaleString()
    })
  },
  beforeDestroy: function () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
  }
}
</script>>
<style>
.footer_style{
  background-color: rgba(84, 92, 100, 1);
  color: white;
  margin-top: 0px;
  line-height: 30px;
  }
</style>
