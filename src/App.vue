<template>
  <AppHeader />
  <router-view />
</template>

<script lang="ts">
import AppHeader from "./components/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
};
</script>

<style lang="scss"></style>
