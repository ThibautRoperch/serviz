<template>
  <div class="container stretch">

    <Chart
      :class="{ 'minimized' : specificChart.consulting }"
      @click="alert('ok'); specificChart.consulting = false"
      :chartId="lastChart.chartId"
      :thumbnail="specificChart.consulting"
      :key="lastChart.chartKey"
    />

    <Chart
      v-if="specificChart.consulting"
      :chartId="specificChart.chartId"
    />

  </div>
</template>

<script>
import ChartsService from '@/services/ChartsService.js'

import Chart from '@/components/DbLinked/Chart'

export default {
  components: {
    Chart
  },
  props: {
    clientIP: String
  },
  data() {
    return {
      lastChart: {
        chartId: null,
        chartKey: 0
      },
      specificChart: {
        consulting: false,
        chartId: null
      }
    }
  },
  mounted() {
    this.getLastChart()
    this.autoRefresh()

    if (this.$route.params.id) {
      setTimeout(() => {
        this.specificChart.chartId = this.$route.params.id
        this.specificChart.consulting = true
      }, 1300)
    }
  },
  watch: {
    clientIP: function() {
      this.getLastChart()
      this.lastChart.chartKey++
    }
  },
  methods: {
    getLastChart() {
      ChartsService.getLastChart(this.clientIP)
        .then(res => {
          if ((!this.lastChart.chartId || !res) || (this.lastChart.chartId && res && this.lastChart.chartId !== res._id)) {
            this.lastChart.chartId = res._id
          }
        })
    },
    autoRefresh() {
      setInterval(() => {
        this.getLastChart()
      }, 1000)
    }
  }
}
</script>

<style scoped>
.minimized {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  width: 20rem;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  background: var(--bg-secondary);
  z-index: 500;
  cursor: pointer;
}
</style>
