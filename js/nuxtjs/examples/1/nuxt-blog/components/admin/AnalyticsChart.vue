<template>
  <div class="mb2">
    <canvas height="50vh" ref="canvas"></canvas><!-- лечение ошибки getContext of undefined -->
  </div>
</template>

<script>
  import {Bar} from 'vue-chartjs'
  export default {
    props: {
      labels: {
        type: Array,
        default() { // дефолтное значение, чтобы не было проблем с мутациями
          return []
        }
      },
      data: {
        type: Array,
        default() {
          return []
        }
      },
      title: String
    },
    extends: Bar, // наследуемся от Bar
    mounted() {
      const data = {
        labels: this.labels,
        datasets: [{
          label: this.title,
          data: this.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }

      const options = {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

      this.renderChart(data, options)
    }
  }
</script>

