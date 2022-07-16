<template>
  <v-timeline dense>
    <v-slide-x-reverse-transition
        group
        hide-on-leave
    >
      <v-timeline-item
          v-for="(item, index) in $store.getters.getLogs"
          :key="index"
          :color="item.color"
          small
          fill-dot
      >
        <v-alert
            :value="true"
            :color="item.color"
            :icon="item.icon"
            class="white--text"
        >
          {{ item.text }}
        </v-alert>
      </v-timeline-item>
    </v-slide-x-reverse-transition>
  </v-timeline>
</template>

<script>
export default {
  name: "Logs"
}
</script>

<style scoped>

</style>
