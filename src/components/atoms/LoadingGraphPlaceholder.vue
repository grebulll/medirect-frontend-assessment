<template>
  <div class="w-full h-80 animate-pulse flex flex-col items-center justify-center">
    <p class="text-gray-500 text-sm md:text-base mb-2">Loading data...</p>
    <svg class="w-full h-full text-gray-300" viewBox="0 0 100 50" preserveAspectRatio="none">
      <polyline
        class="md:block hidden"
        points="0,43 20,30 40,35 60,25 80,20 100,10"
        fill="none"
        stroke="currentColor"
        stroke-width="0.5"
        stroke-linecap="round"
      />
      <polyline
        class="md:hidden block"
        points="0,20 20,10 40,15 60,15 80,10 100,0"
        fill="none"
        stroke="currentColor"
        stroke-width="0.5"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>
