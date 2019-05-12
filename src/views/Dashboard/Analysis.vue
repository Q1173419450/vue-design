<template>
  <div>
    <Chart :option="chartOption" />
  </div>
</template>

<script>
import Chart from "../../components/Chart";
// 随机数
// import random from 'lodash/random';
// import axios from 'axios';
import request from "../../utils/request";

export default {
  data() {
    return {
      chartOption: {}
    };
  },
  mounted() {
    this.getChartList();
    // 轮询
    this.interval = setInterval(() => {
      // this.getChartList();
      // this.chartOption.series[0].data = this.chartOption.series[0].data.map(
      //   () => random(100)
      // );
      // // option 重新赋值，防止更改某个数据，不更新的现状
      // this.chartOption = { ...this.chartOption };
    }, 3000);
  },
  methods: {
    getChartList() {
      request({
        url: "/api/dashboard/chart",
        method: "get",
        params: { ID: 12345 }
      })
        // axios.get('/api/dashboard/chart', { params: {ID: 12345} })
        .then(response => {
          this.chartOption = {
            title: {
              text: "ECharts 入门示例"
            },
            tooltip: {},
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [
              {
                name: "销量",
                type: "bar",
                data: response.data
              }
            ]
          };
        });
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  components: {
    Chart
  }
};
</script>

<style scoped></style>
