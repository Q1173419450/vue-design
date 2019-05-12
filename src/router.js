import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import findLast from "lodash/findLast";
// 提示
import { notification } from "ant-design-vue";
import NotFound from "./views/404.vue";
import Forbidden from "./views/403.vue";
import { isCheck, isLogin } from "./utils/auth";
// import RenderRouterView from './components/RenderRouterView';

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      // 提供router-view 的占位符
      path: "/user",
      hideInMenu: true,
      // render 函数
      // component: {render: h => h('router-view')},
      component: () => {
        return import(/* webpackChunkName: 'layout' */ "./layouts/UserLayout");
      },
      children: [
        {
          path: "/user",
          redirect: "/user/login"
        },
        {
          path: "/user/login",
          name: "login",
          component: () => {
            return import(/* webpackChunkName: 'user' */ "./views/User/Login");
          }
        },
        {
          path: "/user/register",
          name: "register",
          component: () => {
            return import(/* webpackChunkName: 'user' */ "./views/User/Register");
          }
        }
      ]
    },

    {
      path: "/",
      component: () => import("./layouts/Basiclayout"),
      meta: { authority: ["user", "admin"] },
      children: [
        // dashboard
        {
          path: "/",
          redirect: "/dashboard/analysis"
        },
        {
          path: "/dashboard",
          name: "dashboard",
          meta: {
            icon: "dashboard",
            title: "仪表盘"
          },
          component: { render: h => h("router-view") },
          children: [
            {
              // 分析页
              path: "/dashboard/analysis",
              name: "analysis",
              meta: {
                title: "分析页"
              },
              component: () => import("./views/Dashboard/Analysis")
            }
          ]
        },
        // form
        {
          path: "/form",
          name: "form",
          meta: {
            icon: "form",
            title: "表单",
            authority: ["admin"]
          },
          component: { render: h => h("router-view") },
          children: [
            {
              // 基础表单
              path: "/form/basic-form",
              name: "basicform",
              meta: { title: "基础表单" },
              component: () => import("./views/Forms/BasicForm")
            },
            {
              // 分步表单
              path: "/form/step-form",
              name: "stepform",
              meta: { title: "分步表单" },
              hideInChildrenMenu: true,
              component: () => import("./views/Forms/StepForm"),
              children: [
                {
                  path: "/form/step-form",
                  redirect: "/form/step-form/info"
                },
                {
                  // 信息页
                  path: "/form/step-form/info",
                  name: "info",
                  component: () => import("./views/Forms/StepForm/StepInfo")
                },
                {
                  // 确认页
                  path: "/form/step-form/confirm",
                  name: "confirm",
                  component: () => import("./views/Forms/StepForm/StepConfirm")
                },
                {
                  // 结果页
                  path: "/form/step-form/result",
                  name: "result",
                  component: () => import("./views/Forms/StepForm/StepResult")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: "/403",
      name: "403",
      hideInMenu: true,
      component: Forbidden
    },
    {
      path: "*",
      name: "404",
      hideInMenu: true,
      component: NotFound
    }
  ]
});

/**
 * to: 将要到达的页面
 * from： 现在的页面
 * next：异步
 */
router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    NProgress.start();
  }
  console.log("matched");
  console.log(to.matched);
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !isCheck(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      notification.open({
        message: "403",
        description: "你没有权限访问，请联系管理员咨询。"
      });
      next({
        path: "/403"
      });
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
