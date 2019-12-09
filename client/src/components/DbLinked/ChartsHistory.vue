<template>
  <div class="container">

    <Loading v-if="loading" />

    <NetworkError v-else-if="networkError">
      {{ networkError }}
    </NetworkError>

    <div v-else-if="charts.length > 0">
      <ul>
        <li class="chart" v-for="chart in charts" v-bind:key="chart._id">
          <!-- {{ formattedDate(chart.createdAt) }} -->
          <ChartGuesser :givenChartDatas="chart" :thumbnail="true" />
        </li>
      </ul>
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
      charts: []
    }
  },
  mounted() {
    this.getCharts()
    this.autoRefresh()
  },
  methods: {
    getCharts() {
      ChartsService.getCharts(this.clientIP)
        .then(res => {
          if ((this.charts.length === 0 || res.length === 0) || (this.charts.length > 0 && res.length > 0 && this.charts[0]._id !== res[0]._id)) {
            this.charts = res
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
        this.getCharts()
      }, 1000)
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  /* overflow-y: auto;
  overflow-x: hidden; */
}

ul li {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  padding: 0;
}

ul li:hover {
  background: var(--rgba-dark);
  cursor: pointer;
}
</style>