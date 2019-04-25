<template>
  <div style="width: 256px">
    <a-menu
      :SelectedKeys="selectedKeys"
      :OpenKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children" :key="item.path" @click='() => $router.push({path: item.path})'>
          <a-icon v-if='item.meta.icon' :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.key"/>
      </template>
    </a-menu>
  </div>
</template>

<script>
/* 
 * recommend(函数式组件) SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
 * SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
 * */
import SubMenu from './SubMenu'
export default {
  props: {
    theme: {
      type: String,
      default: 'dark'
    }
  },
  components: {
    'sub-menu': SubMenu,
  },
  data () {
    this.selectedKeysMap  = {};
    this.openKeysMap  = {};
    // 拿到路由配置
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path],
      menuData,
    }
  },
  watch: {
    // *自己..错哪了。。大写。。
    // "$route.path": function(val) {
    //   this.selectedKeys = this.SelectedKeysMap[val]
    //   this.openKeys = this.collapsed ? [] : this.openKeysMap[val]
    // }
    // 官方
    "$route.path": function(val) {
      // console.log(val);
      this.selectedKeys = this.selectedKeysMap[val]
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val]
    }
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      routes.forEach(item => {
        if (item.name && !item.hideInMenu) {
          // 层级
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];

          const newItem = {...item};
          // console.log('newItem');
          // console.log(newItem);
          // disunderstand
          delete newItem.children;
          if (item.children && !item.hideInChildrenMenu) {
            newItem.children = this.getMenuData(
              item.children, 
              [...parentKeys, item.path]);
          } else {
            // 分步表单数据处理
            // *查了半小时...
            this.getMenuData(
              item.children, 
              selectedKey ? parentKeys : [...parentKeys, item.path], 
              selectedKey || item.path
            );
          }
          menuData.push(newItem);
        } else if (!item.hideInMenu && !item.hideInChildrenMenu && item.children) {
          // console.log('children');
          // console.log(item.children);
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      })
      console.log(menuData);
      return menuData;
    }
  },
}
</script>
