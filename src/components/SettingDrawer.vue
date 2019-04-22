<template>
  <div>
    <a-drawer
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      width='300px'
    >
    <template v-slot:handle>
      <div class="setting-btn" @click='visible = !visible'>
        <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
      </div>
    </template>
      <div>
        <div :style="{marginTop:'24px'}">
          <h3>系统主题色</h3>
          <a-radio-group 
            :value="$route.query.navTheme || 'dark'"
            @change="e => handleSettingChange('navTheme', e.target.value)"
          >
            <a-radio value="dark">黑色</a-radio>
            <a-radio value="light">白色</a-radio>
          </a-radio-group>
        </div>
        <div :style="{marginTop:'24px'}">
          <h3>导航模式</h3>
          <a-radio-group 
            :value="$route.query.navLayout || 'left'"
            buttonStyle="solid"
            @change="e => handleSettingChange('navLayout', e.target.value)"
          >
            <a-radio-button value="left">左侧</a-radio-button>
            <a-radio-button value="top">顶部</a-radio-button>
          </a-radio-group>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },

    handleSettingChange(type, value) {
      this.$router.push({ query: { ...this.$route.query, [type]: value } })
    }
  },
}
</script>

<style scoped>
  .setting-btn {
    position: absolute;
    right: 300px;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 3px 0 0 3px;
    background: #1890ff;
    font-size: 20px;
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
</style>
