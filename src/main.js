import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import {
  Button,
  layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Select
} from "ant-design-vue";

import Authorized from "./components/Authorized";
import auth from "./directives/auth";
// import request from './utils/request';

import "ant-design-vue/dist/antd.less";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.component("Authorized", Authorized);
Vue.use(auth);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);

const NewIcon = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1189467_a3vn1wro37q.js"
});

Vue.component("NewIcon", NewIcon);

// Vue.use(request)
// Vue.protoptype.$request = request;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
