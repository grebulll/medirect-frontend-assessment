<template>
  <div class="chartContainer md:w-[698px]">
    <Line :data="chartData" :options="options" />
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
  Filler,
} from 'chart.js'
import { computed } from 'vue'
import { Line } from 'vue-chartjs'

const props = defineProps<{
  closePrices: number[]
  labels: string[]
}>()

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Filler)

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f3f9eb',
      borderColor: '#abd273',
      data: props.closePrices,
      pointRadius: 0,
      fill: true,
    },
  ],
}))

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  layout: {
    padding: 0,
  },
  scales: {
    x: {
      title: {
        display: false,
      },
      ticks: {
        display: false,
      },
      grid: {
        display: false,
        drawTicks: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      title: {
        display: false,
      },
      ticks: {
        display: false,
      },
      grid: {
        display: false,
        drawTicks: false,
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
  height: 300px;
}
</style>
