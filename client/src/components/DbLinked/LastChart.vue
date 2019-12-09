<template>
  <div class="container">

    <Loading v-if="loading" />

    <NetworkError v-else-if="networkError">
      {{ networkError }}
    </NetworkError>

    <div class="chart" v-else-if="currentChart">
      <ChartGuesser :givenChartDatas="currentChart" />
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
    clientIP: { type: String, default: null }
  },
  data() {
    return {
      loading: true,
      networkError: false,
      currentChart: null
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
          if ((!this.currentChart || !res) || (this.currentChart && res && this.currentChart._id !== res._id)) {
            this.currentChart = res
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