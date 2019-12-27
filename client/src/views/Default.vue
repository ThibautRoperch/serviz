<template>
  
  <div class="body">

    <header :class="{ 'aside-visible' : displayAside }">
      <button @click="handleAsideVisibility()">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="history" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-history fa-w-16 fa-2x"><path fill="currentColor" d="M504 255.531c.253 136.64-111.18 248.372-247.82 248.468-59.015.042-113.223-20.53-155.822-54.911-11.077-8.94-11.905-25.541-1.839-35.607l11.267-11.267c8.609-8.609 22.353-9.551 31.891-1.984C173.062 425.135 212.781 440 256 440c101.705 0 184-82.311 184-184 0-101.705-82.311-184-184-184-48.814 0-93.149 18.969-126.068 49.932l50.754 50.754c10.08 10.08 2.941 27.314-11.313 27.314H24c-8.837 0-16-7.163-16-16V38.627c0-14.254 17.234-21.393 27.314-11.314l49.372 49.372C129.209 34.136 189.552 8 256 8c136.81 0 247.747 110.78 248 247.531zm-180.912 78.784l9.823-12.63c8.138-10.463 6.253-25.542-4.21-33.679L288 256.349V152c0-13.255-10.745-24-24-24h-16c-13.255 0-24 10.745-24 24v135.651l65.409 50.874c10.463 8.137 25.541 6.253 33.679-4.21z" class=""></path></svg>
      </button>
    </header>

    <aside :class="{ 'visible' : displayAside }">

      <h2>Filter on my IP address</h2>
      <div class="filter">
        <input type="checkbox" id="filterOnClientIP" v-model="filterOnClientIP">
        <label for="filterOnClientIP">{{ filterOnClientIP ? '✔' : '✘' }}</label>
        <input type="text" v-model="clientIP" :disabled="!filterOnClientIP">
      </div>

      <!-- <h2>History</h2> -->
      <ChartsHistory :clientIP="componentsClientIP" :key="chartsHistoryKey" />
    </aside>

    <section :class="{ 'aside-visible' : displayAside }">
      <router-view :clientIP="componentsClientIP" />
    </section>

  </div>

</template>

<script>
import IpService from '@/services/IpService.js'

import ChartsHistory from '@/components/DbLinked/ChartsHistory'

export default {
  components: {
    ChartsHistory
  },
  data() {
    return {
      clientIP: null,
      filterOnClientIP: false,
      displayAside: false,
      chartsHistoryKey: 0
    }
  },
  computed: {
    componentsClientIP() {
      return this.filterOnClientIP ? this.clientIP : null
    }
  },
  watch: {
    filterOnClientIP: function() {
      this.chartsHistoryKey++
    }
  },
  mounted() {
    this.getClientIP()
  },
  methods: {
    handleAsideVisibility() {
      this.displayAside = !this.displayAside
      this.chartsHistoryKey++
    },
    getClientIP() {
      IpService.getClientIP()
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
  
  --aside-width: 20rem;
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
  width: var(--aside-width);
  height: 100vh;
  /* border-right: 20px solid var(--dark-bg); */
  background: var(--bg-secondary);
  transition: var(--transition);
  box-shadow: -0rem 0 2rem var(--rgba-dark) inset;
  transform: translateX(-100%);
  z-index: 500;
}

aside.visible {
  transform: translateX(0);
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
  padding: 0 4rem;
  transition: var(--transition);
}

section.aside-visible {
  transform: translateX(var(--aside-width));
}
</style>