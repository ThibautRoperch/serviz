<template>
  <div class="body">

    <header :class="{ 'aside-visible' : displayAside }">
      <button @click="handleAsideVisibility()">{{ displayAside ? 'X' : 'OPTIONS' }}</button>
    </header>

    <aside :class="{ 'visible' : displayAside }">

      <h2>Filter on my IP address</h2>
      <div class="filter">
        <input type="checkbox" id="filterOnClientIP" v-model="filterOnClientIP">
        <label for="filterOnClientIP">{{ filterOnClientIP ? '✔' : '✘' }}</label>
        <input type="text" v-model="clientIP" :disabled="!filterOnClientIP">
      </div>

      <h2>History</h2>
      <ChartsHistory :clientIP="componentsClientIP" :key="chartsHistoryKey" />
    </aside>

    <section :class="{ 'aside-visible' : displayAside }">
      <LastChart :clientIP="componentsClientIP" :key="lastChartKey" />
    </section>

  </div>
</template>

<script>
import ChartsService from '@/services/ChartsService.js'

import LastChart from '@/components/DbLinked/LastChart'
import ChartsHistory from '@/components/DbLinked/ChartsHistory'

export default {
  components: {
    LastChart,
    ChartsHistory
  },
  data() {
    return {
      clientIP: null,
      filterOnClientIP: false,
      displayAside: false,
      lastChartKey: 0,
      chartsHistoryKey: 0
    }
  },
  computed: {
    componentsClientIP() {
      return this.filterOnClientIP ? this.clientIP : null
    }
  },
  mounted() {
    this.getClientIP()
  },
  watch: {
    filterOnClientIP: function() {
      this.lastChartKey++
      this.chartsHistoryKey++
    }
  },
  methods: {
    handleAsideVisibility() {
      this.displayAside = !this.displayAside
      this.chartsHistoryKey++
    },
    formattedDate(date) {
      if (date) {
        let objDate = new Date(date)
        return `${objDate.getDate()}/${objDate.getMonth()}/${objDate.getFullYear()}`
      }
      return ""
    },  
    getClientIP() {
      ChartsService.getClientIP()
        .then(res => {
          this.clientIP = res.ip
        })
    }
  }
}
</script>

<style scoped>
.body {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100vh;
  
  --aside-width: 18rem;
}

header {
  position: fixed;
  padding: 1.3rem 1rem;
  transition: var(--transition);
  z-index: 800;
}

header.aside-visible {
  transform: translateX(var(--aside-width));
}

aside {
  position: fixed;
  display: flex;
  flex-direction: column;
  height: 100vh;
  transform: translateX(-100%);
  width: var(--aside-width);
  background: var(--rgba-dark);
  transition: var(--transition);
  z-index: 500;
}

aside.visible {
  transform: translateX(0);
  box-shadow: var(--box-shadow);
}

aside div.filter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  padding: 0 1.7rem;
}

section {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: stretch;
  padding: 2rem;
  transition: var(--transition);
}
</style>
