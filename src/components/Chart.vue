<template>
  <div ref="chartDom" style="height: 400px"></div>
</template>

<script>
import echarts from "echarts";
import debounce from "lodash/debounce";
// 监听屏幕大小变化，图表也变化
import { addListener, removeListener } from "resize-detector";
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    // 改了chart内部的值，option是不会变化的
    option(val) {
      this.chart.setOption(val);
    }
    // 深度监听、过于耗费性能
    // option: {
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true
    // }
  },
  // 防抖处理
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  methods: {
    resize() {
      // 防抖
      console.log("resize");
      this.chart.resize();
    },
    renderChart() {
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
    }
  },
  beforeDestroy() {
    // 销毁实例 & 图表
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  }
};
</script>

<style scoped></style>
