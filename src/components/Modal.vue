<template>
  <transition name="fade-in">
    <div class="modal-wrapper">
      <span class="modal-title">{{ "hello" }}</span>
      <button @click="onCloseModal()">Close</button>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  //   created() {},
  methods: {
    // onCloseModal(): void {
    // },
  },
});
</script>

<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.2rem;
  background-color: #fff;
}
</style>
