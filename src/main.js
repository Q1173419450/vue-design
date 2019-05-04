import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, layout, Icon, Drawer, Radio, Menu } from 'ant-design-vue';
import Authorized from './components/Authorized';
import auth from './directives/auth';

// import 'ant-design-vue/dist/antd.less';

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.component("Authorized", Authorized);
Vue.use(auth);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
