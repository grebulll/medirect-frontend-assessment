<template>
  <div class="chartContainer">
    <Line :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: 'rgba(171, 210, 115, 0.9)',
      borderColor: '#abd273',
      data: [40, 39, 10, 40, 39, 80, 40],
      pointRadius: 0,
      fill: true,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
  },
  scales: {
    x: {
      title: {
        display: false,
        text: 'Months',
      },
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      title: {
        display: false,
        text: 'Values',
      },
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },
}
</script>

<style scoped>
.chartContainer {
  position: relative;
  width: 530px;
  height: 300px;
}
</style>
