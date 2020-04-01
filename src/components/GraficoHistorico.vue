<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart.js'

export default {
  name: 'GraficoHistorico',
  components: {
    LineChart
  },
  data () {
    return {
      datacollection: {},
      diasDeLosCasos: [],
      cantidadDeCasosPorDia: [],
      cantidadDeMuertesPorDia: [],
      cantidadDeRecuperadosPorDia: [],
      diferenciaRecuperados: []

    }
  },
  mounted () {
     this.fillData()
     this.axios
      .get('https://corona.lmao.ninja/v2/historical/Argentina')
      .then(historico => {

        let lineaDeTiempo = historico.data.timeline;

        let casosTotalesPorDia = lineaDeTiempo.cases;
        let muertesTotalesPorDia = lineaDeTiempo.deaths;
        let recuperadosTotalesPorDia = lineaDeTiempo.recovered;

        this.diasDeLosCasos = Object.keys(casosTotalesPorDia).slice(43);
        this.cantidadDeCasosPorDia = Object.values(casosTotalesPorDia).slice(43);
        this.cantidadDeMuertesPorDia = Object.values(muertesTotalesPorDia).slice(43);
        this.cantidadDeRecuperadosPorDia = Object.values(recuperadosTotalesPorDia).slice(43);
        this.diferenciaRecuperados = this.cantidadDeCasosPorDia.map((valor, i) => {
          return this.cantidadDeCasosPorDia[i] - this.cantidadDeMuertesPorDia[i] - this.cantidadDeRecuperadosPorDia[i];
        })
        this.exponencial = [];

        for (let i = 0; i < this.diasDeLosCasos.length; i++) {
          if(Number(this.diasDeLosCasos[i].substr(0,1)) > 2) {
            this.exponencial.push(Math.exp(i));
          }else{
            this.exponencial.push(0);
          }
        }

        this.muertesporDia = Object.values(casosTotalesPorDia);

        this.fillData()
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: this.diasDeLosCasos,
        datasets: [
          {
            label: 'Muertes',
            backgroundColor: '#251515',
            borderColor: '#251515',
            fill: true,
            data: this.cantidadDeMuertesPorDia
          },
          {
            label: 'Recuperados',
            backgroundColor: '#a7f578',
            borderColor: '#a7f578',
            fill: true,
            data: this.cantidadDeRecuperadosPorDia
          },
          {
            label: 'Casos Activos',
            backgroundColor: '#cc7979',
            borderColor: '#cc7979',
            fill: true,
            data: this.diferenciaRecuperados
          },
          {
            label: 'Casos Totales',
            backgroundColor: '#f87979',
            borderColor: '#f87979',
            fill: true,
            data: this.cantidadDeCasosPorDia
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
