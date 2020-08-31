<template>
  <div id="app">
    <app-header :menuToggle="menuToggle"></app-header>
    <transition name="overlay">
      <div v-if="mobileSidebarIsOpen" @click="closeSidebarMenu" class="overlay"></div>
    </transition>
    <app-main-page :mobileSidebarIsOpen = 'mobileSidebarIsOpen'
                   :closeSidebarMenu="closeSidebarMenu"
    ></app-main-page>
    <app-footer></app-footer>
  </div>
</template>

<script>


import MainPage from "./components/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: 'App',
  components: {
    appMainPage: MainPage,
    appHeader: Header,
    appFooter: Footer,
  },
  data() {
    return {
      mobileSidebarIsOpen: false
    }
  },
  methods:{
    menuToggle(){
      this.mobileSidebarIsOpen = !this.mobileSidebarIsOpen
      console.log("asd")
    },
    closeSidebarMenu(){
      this.mobileSidebarIsOpen = false
    }
  }
}
</script>

<style lang="scss">
  @import "./assets/style/reser.css";
 html{
     height: 100%;
 }
body{
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
  background-color: #e8e8e8;
}
    #app{
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;

      .overlay{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: #232323;
        opacity: .8;
        z-index: 10;
      }

      .overlay-enter-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      }
      .overlay-leave-active {
        transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      }
      .overlay-enter, .overlay-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        opacity: 0;
      }
    }

</style>
