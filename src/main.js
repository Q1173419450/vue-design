import Vue from "vue";
import { Button, layout, Icon, Drawer, Radio, Menu } from 'ant-design-vue';
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import 'ant-design-vue/dist/antd.less';

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
