<template>
  <div class="md:h-72 h-40 md:w-[698px]">
    <LoadingGraphPlaceholder v-if="loading" />
    <div
      v-else-if="!closePrices.length"
      class="w-full h-full flex flex-col items-center justify-center"
    >
      <p class="text-gray-500 text-sm md:text-base">No data available</p>
    </div>
    <Line v-else :data="chartData" :options="options" />
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
import LoadingGraphPlaceholder from '../atoms/LoadingGraphPlaceholder.vue'

const props = defineProps<{
  closePrices: number[]
  labels: string[]
  loading: boolean
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
