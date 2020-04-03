<template>
  <div class="grafico">
    <h3>{{pais}}</h3>
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
            backgroundColor: '#df786199',
            borderColor: '#df7861',
            fill: true,
            data: this.historico.cantidadDeDiferenciaRecuperados
          },
          {
            label: 'Casos Totales',
            backgroundColor: '#ecb39099',
            borderColor: '#ecb390',
            fill: true,
            data: this.historico.cantidadDeCasosPorDia
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
.grafico {
  position:relative;
  margin: 0 auto;
  margin-top: 30px;

  background-color: #fff;
  padding: 30px
}
</style>
