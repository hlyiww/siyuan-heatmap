<template>
  <div class="w-full h-full text-8px">
    <calendar-heatmap
      :values="values"
      :end-date="getEndDate()"
      no-data-text="nothing for this day"
      :round="2"
      tooltip-unit="notes"
      @day-click="handleDayClick"
    />
  </div>
</template>

<script setup lang="ts">
import { getParsedData, getEndDate } from "./hooks";

const values = ref([]);

const handleDayClick = () => void 0;

onBeforeMount(() => {
  getParsedData(values);
});
</script>

<style lang="scss">
.vch__legend {
  // TODO：MVP 版不兼容
  @apply display-none;
}
</style>
