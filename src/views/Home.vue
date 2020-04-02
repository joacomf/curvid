<template>
  <div>
    <GraficoHistorico pais="Argentina"/>
    <GraficoHistorico pais="Spain"/>
  </div>
</template>

<script>
import GraficoHistorico from '@/components/GraficoHistorico.vue'

export default {
  components: {
    GraficoHistorico
  }
}
</script>
