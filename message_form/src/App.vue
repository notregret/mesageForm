<template>
  <div id="app">
    <Catalog/>
  </div>
</template>

<script>
import Catalog from './components/Catalog.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import axios from 'axios'

export default {
  name: 'App',
  components: {
    Catalog
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
