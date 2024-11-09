<template>
  <header class="wrapper flex align-center">
    <img src="@/assets/img/logo.svg" alt="logo" class="logo" />
    <h1 class="app-name">Tic Tac Toe</h1>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header.wrapper {
    background-color: $vue-green;
    box-shadow: 0px 10px 25px 0px rgba(0,0,0,0.2);
    padding: 16px 8px;
    margin-bottom: 50px;
  & .logo {
    max-width: 60px;
  }

  & .app-name{
    @extend .fancy-text;
    margin: 0;
  }
}
</style>
