# vue-design

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

大纲：

### 使用 Vue-cli 创建项目

### 使用 Vue-router 定好路由骨架

### 创建文件目录，定好页面组件

### 页面通过路由来展示，路由配合页面

### 控制用户权限，以及失效页面

### 精细化权限，使用组件式、命令式控制权限

### 使用 Echarts

问题：
  - 37讲
    - 绑定属性
    - 插槽
    - this.$router
    - this.$route.query
    - 计算属性
    -
    - 会引入单一组件时，忘了怎么引入全部组件
    - SettingDrawer 页的 this.$router.push({ query: { ...this.$route.query, [type]: value } }),`[type]: value`写到了外面（蠢）
