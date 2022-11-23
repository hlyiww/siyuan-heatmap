<template>
  <div class="w-full h-full">
    <calendar-heatmap
      :values="[{ date: '2018-9-22', count: 6 }]"
      :end-date="new Date()"
    />
  </div>
</template>
