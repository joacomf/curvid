import axios from 'axios';

export default {
  diasDeLosCasos: [],
  cantidadDeCasosPorDia: [],
  cantidadDeMuertesPorDia: [],
  cantidadDeRecuperadosPorDia: [],
  cantidadDeDiferenciaRecuperados: [],

  diaInicial: 43,

  url: 'https://corona.lmao.ninja/v2/historical/',
  pais: 'Argentina',

  obtenerDatos (pais) {
    return axios.get(this.url + pais).then(historico => {
      const lineaDeTiempo = historico.data.timeline

      const casosTotalesPorDia = lineaDeTiempo.cases
      const muertesTotalesPorDia = lineaDeTiempo.deaths
      const recuperadosTotalesPorDia = lineaDeTiempo.recovered

      this.diasDeLosCasos = Object.keys(casosTotalesPorDia).slice(this.diaInicial)
      this.cantidadDeCasosPorDia = Object.values(casosTotalesPorDia).slice(this.diaInicial)
      this.cantidadDeMuertesPorDia = Object.values(muertesTotalesPorDia).slice(this.diaInicial)
      this.cantidadDeRecuperadosPorDia = Object.values(recuperadosTotalesPorDia).slice(this.diaInicial)

      this.calcularDiferencial()
      this.calcularExponencial()
    })
      .catch(error => {
        console.log(error)
      })
  },

  calcularDiferencial () {
    this.cantidadDeDiferenciaRecuperados = this.cantidadDeCasosPorDia.map((_valor, i) => {
      return this.cantidadDeCasosPorDia[i] - this.cantidadDeMuertesPorDia[i] - this.cantidadDeRecuperadosPorDia[i]
    })
  },

  calcularExponencial () {
    this.exponencial = []

    for (let i = 0; i < this.diasDeLosCasos.length; i++) {
      if (Number(this.diasDeLosCasos[i].substr(0, 1)) > 2) {
        this.exponencial.push(Math.exp(i))
      } else {
        this.exponencial.push(0)
      }
    }
  }
}
