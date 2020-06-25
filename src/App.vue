<template>
  <div id="app">
    <el-container v-if = "$route.meta.keepalive">
      <el-header style="padding-left: 0px; padding-right: 0px">
        <keep-alive>
          <v_header></v_header>
        </keep-alive>
      </el-header>
      <el-container>
        <el-aside style="width:200px; height:520px">
          <keep-alive>
            <v_leftmenu></v_leftmenu>
          </keep-alive>
        </el-aside>
        <el-container>
          <el-main style="padding-left: 0px; padding-right: 0px; padding-top: 0px; padding-bottom: 0px">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-main>
        </el-container>
      </el-container>
      <el-footer style="padding-left: 0px; padding-right: 0px;">
            <v_footer></v_footer>
      </el-footer>
    </el-container>
    <router-view v-if="!$route.meta.keepalive"></router-view>
</div>
</template>

<script>
import LeftMenu from './components/menu.vue'
import Header from './components/Ornament/Header.vue'
import Footer from './components/Ornament/Footer.vue'

export default {
  name: 'App',
  components: {
    'v_header': Header,
    'v_leftmenu': LeftMenu,
    'v_footer': Footer

  }

}
</script>

<style>
#app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
