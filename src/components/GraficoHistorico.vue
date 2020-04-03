<template>
  <div class="small">
    <h1>{{pais}}</h1>
    <cargando v-if="cargando"/>
    <line-chart :chart-data="datacollection" :options="options"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart.js'
import Cargando from './Cargando.vue'
import ServicioHistorico from '@/services/ServicioHistorico.js'

export default {
  name: 'GraficoHistorico',
  components: {
    LineChart,
    Cargando
  },
  props: ["pais"],
  data () {
    return {
      datacollection: {},
      options: {
        maintainAspectRatio: false,
        responsive: true
      },
      historico: null,
      cargando: true
    }
  },
  mounted () {
    this.cargando = true;
    this.historico = ServicioHistorico;
    this.historico.obtenerDatos(this.pais).then(() => {
      this.fillData()
    })
    .finally(() => this.cargando = false);
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: this.historico.diasDeLosCasos,
        datasets: [
          {
            label: 'Muertes',
            backgroundColor: '#25151599',
            borderColor: '#251515',
            fill: true,
            data: this.historico.cantidadDeMuertesPorDia
          },
          {
            label: 'Recuperados',
            backgroundColor: '#a7f57899',
            borderColor: '#a7f578',
            fill: true,
            data: this.historico.cantidadDeRecuperadosPorDia
          },
          {
            label: 'Casos Activos',
            backgroundColor: '#cc797999',
            borderColor: '#cc7979',
            fill: true,
            data: this.historico.cantidadDeDiferenciaRecuperados
          },
          {
            label: 'Casos Totales',
            backgroundColor: '#f8797999',
            borderColor: '#f87979',
            fill: true,
            data: this.historico.cantidadDeCasosPorDia
          }
        ]
      }
    }
  }
}
</script>

<style>
.small {
  position:relative;
  max-width: 100%;
  height: 550px;
  margin: 0 auto;
}
</style>
