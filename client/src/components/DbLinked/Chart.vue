<template>
  <div class="container">

    <Loading v-if="loading" />

    <NetworkError v-else-if="networkError">
      {{ networkError }}
    </NetworkError>

    <div class="chart" v-else-if="chartData">
      <ChartGuesser :givenChartData="chartData" :thumbnail="thumbnail" />
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
    chartId: String,
    thumbnail: { type: Boolean, default: false }
  },
  data() {
    return {
      loading: true,
      networkError: false,
      chartData: null
    }
  },
  mounted() {
    this.getChart()
  },
  watch: {
    chartId: function() {
      this.getChart()
    }
  },
  methods: {
    getChart() {
      ChartsService.getChart(this.chartId)
        .then(res => {
          this.chartData = res
        })
        .catch((e) => {
          this.networkError = e
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>

</style>