<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider 
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        collapsible
        v-model="collapsed"
        width="256px"
      >
        <div class="logo" >Ant Design Vue Pro</div>
        <SiderMenu :theme='navTheme'/>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0" >
          <!-- v-auth="['admin']" -->
          <a-icon 
            v-if="navLayout === 'left'"
            class="base-trigger"
            :type="collapsed ? 'menu-fold' : 'menu-unfold'" 
            @click='collapsed = !collapsed'
          ></a-icon>
          <Header></Header>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <Authorized :authority="['admin']">
      <SettingDrawer></SettingDrawer>
    </Authorized>
  </div>
</template>

<script>
import Header from './Header';
import Footer from './Footer';
import SiderMenu from './SiderMenu';
import SettingDrawer from '../components/SettingDrawer';

export default {
  data() {
    return {
      collapsed: false,
    }
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || 'dark'
    },
    navLayout() {
      return this.$route.query.navLayout || 'left'
    }
  },
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer
  }
};
</script>

<style scoped>
  .base-trigger {
    padding: 0 20px;
    line-height: 64px;
    font-size: 20px;
  }
  
  .base-trigger:hover {
    background: #eee;
  }

  .logo {
    height: 64px;
    line-height: 64px;
    font-size: 20px;
    text-align: center;
    overflow: hidden;
  }

  .nav-theme-dark >>> .logo {
    color: #fff;
  }
</style>
