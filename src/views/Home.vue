<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <GraficoHistorico pais="Argentina"/>
      </div>
      <div class="col-md-12">
        <GraficoHistorico pais="Spain"/>
      </div>
    </div>
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
