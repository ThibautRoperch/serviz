<template>
  <div class="chartbox">

    <apexchart
      class="apexchart"
      :type="chartType"
      :height="chartHeight"
      :options="thumbnail ? thumbnailChartOptions : defaultChartOptions"
      :series="chartSeries"
    />

  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    apexchart: VueApexCharts
  },
  props: {
    givenChartDatas: Object,
    thumbnail: { type: Boolean, default: false }
  },
  data() {
    return {}
  },
  mounted() {
  },
  computed: {
    chartType() {
      let type = "line"
      
      if (this.chartXaxis.length === 0) {
        type = "scatter"
      } else if (!Array.isArray(this.classicChartSeries[0]) && typeof this.chartXaxis[0][0] === 'string') {
        type = "donut"
      }

      return type
    },
    classicChartSeries() {
      let series = this.givenChartDatas.y || this.givenChartDatas.series || []
      return series
    },
    chartSeries() {
      let series = this.classicChartSeries

      // Pas de valeurs par défaut => index personnalisés
      // Sinon, valeurs par défaut => index connus
      if (series.length === 0) {
        for (let name in this.givenChartDatas) {
          let value = this.givenChartDatas[name]
          if (Array.isArray(value) && value != this.chartXaxis) {
            series.push({
              name: name,
              data: value
            })
          }
        }
      } else if (this.chartType === "line") {
        if (!Array.isArray(series[0])) {
          series = [series]
        }

        series = series.map(serie => {
          return {
            name: 'serie',
            data: serie,
          }
        })
      }

      return series
    },
    chartXaxis() {
      return this.givenChartDatas.x || this.givenChartDatas.xaxis || this.givenChartDatas.labels || []
    },
    chartHeight() {
      return this.thumbnail ? 150 : 850
    },
    gridChartOptions() {
      return {
          borderColor: 'rgba(255, 255, 255, 0.1)',
          row: {
            colors: ['transparent'],
            opacity: 0.5
          },
          columns: {
            colors: ['transparent'],
          },
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        }
    },
    defaultChartOptions() {
      return {
        theme: {
          mode: 'dark',
          palette: 'palette6'
        },
        chart: {
          offsetX: -10,
          animations: {
            enabled: true,
          },
          zoom: {
            enabled: true
          },
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true
            }
          }
        },
        title: {
          text: '',
          align: 'center',
          offsetY: 20,
          style: {
            fontSize: '20px',
          },
        },
        legend: {
          show: true,
          position: 'bottom',
          horizontalAlign: 'right',
          fontSize: '20px',
          itemMargin: {
            horizontal: 10,
            vertical: 20
          }
        },
        xaxis: {
          categories: this.chartXaxis
        },
        markers: {
          strokeWidth: 0,
        },
        dataLabels: {
          enabled: (this.chartType === 'donut' || this.chartType === 'bar')
        },
        stroke: {
          curve: 'straight'
        },
        grid: this.gridChartOptions,
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: "horizontal",
            shadeIntensity: 0.5,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 100]
          }
        },
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 3,
          opacity: 0.5
        },
        tooltip: {
          enabled: true
        }
      }
    },
    thumbnailChartOptions() {
      let options = {
        ...this.defaultChartOptions,
        tooltip: {
          enabled: false
        }
      }
      options.chart.toolbar.show = false
      options.theme.mode = 'light'
      options.chart.zoom.enabled = false
      options.legend.show = false
      options.dataLabels.enabled = false
      return options
    }
  },
  methods: {
  }
}
</script>

<style>
.apexcharts-canvas.dark {
  background: transparent !important;
}
</style>

<style scoped>
.chartbox {
  flex: 1;
}
</style>
