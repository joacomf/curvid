<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart.js'
import ServicioHistorico from '@/services/ServicioHistorico.js'

export default {
  name: 'GraficoHistorico',
  components: {
    LineChart
  },
  data () {
    return {
      datacollection: {},
      historico: null
    }
  },
  mounted () {
    this.historico = ServicioHistorico;
    this.historico.obtenerDatos().then(() => {
      this.fillData()
    });
  },
  methods: {
    fillData () {
      console.log(this.historico.cantidadDeMuertesPorDia);
      this.datacollection = {
        labels: this.historico.diasDeLosCasos,
        datasets: [
          {
            label: 'Muertes',
            backgroundColor: '#251515',
            borderColor: '#251515',
            fill: true,
            data: this.historico.cantidadDeMuertesPorDia
          },
          {
            label: 'Recuperados',
            backgroundColor: '#a7f578',
            borderColor: '#a7f578',
            fill: true,
            data: this.historico.cantidadDeRecuperadosPorDia
          },
          {
            label: 'Casos Activos',
            backgroundColor: '#cc7979',
            borderColor: '#cc7979',
            fill: true,
            data: this.historico.cantidadDeDiferenciaRecuperados
          },
          {
            label: 'Casos Totales',
            backgroundColor: '#f87979',
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
  max-width: 700px;
  margin: 0 auto;
}
</style>
