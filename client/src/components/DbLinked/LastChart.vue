<template>
  <div :class="[ 'container', { 'minimized' : minimize } ]">

    <Loading v-if="loading" />

    <NetworkError v-else-if="networkError">
      {{ networkError }}
    </NetworkError>

    <div class="chart" v-else-if="currentChartData">
      <ChartGuesser :givenChartData="currentChartData" :thumbnail="minimize" />
    </div>

    <NoCharts v-else />

  </div>
</template>

<script>
import ChartsService from '@/services/ChartsService.js'

import NetworkError from '@/components/NetworkError'
import Loading from '@/components/Loading'
import NoCharts from '@/components/NoCharts'
import ChartGuesser from '@/components/ChartGuesser'

export default {
  components: {
    NetworkError,
    Loading,
    NoCharts,
    ChartGuesser
  },
  props: {
    minimize: { type: Boolean, default: false },
    clientIP: { type: String, default: null }
  },
  data() {
    return {
      loading: true,
      networkError: false,
      currentChartData: null
    }
  },
  mounted() {
    this.getLastChart()
    this.autoRefresh()
  },
  methods: {
    getLastChart() {
      ChartsService.getLastChart(this.clientIP)
        .then(res => {
          if ((!this.currentChartData || !res) || (this.currentChartData && res && this.currentChartData._id !== res._id)) {
            this.currentChartData = res
          }
        })
        .catch((e) => {
          this.networkError = e
        })
        .finally(() => {
          this.loading = false
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
.chart {
  flex: 1;
  align-self: flex-end;
}
</style>