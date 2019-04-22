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
