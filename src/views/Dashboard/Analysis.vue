<template>
  <div>
    <Chart :option='chartOption'/>
  </div>
</template>

<script>
import Chart from '../../components/Chart';
import random from 'lodash/random';
export default {
  data() {
    return {
      chartOption: {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }
  },
  mounted() {
    var that = this;
    this.interval = setInterval(() => {
      // console.log(this.chartOption.series[0].data);
      this.chartOption.series[0].data = this.chartOption.series[0].data.map(
        () => random(100)
      );
      // option 重新赋值
      this.chartOption = { ...this.chartOption };
    },3000)
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  components: {
    Chart
  },
}
</script>

<style scoped>

</style>
