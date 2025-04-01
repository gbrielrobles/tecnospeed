<template>
  <header class="app-header">
    <div class="header-content">
      <img src="@/assets/logo.png" alt="Tecnospeed" class="logo">
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.app-header {
  background-color: #0353B3;
}

.header-content {
  max-width: 1200px;
  height: 30px;
}

.logo {
  height: 30px;
  margin-left: 15px;
  filter: brightness(0) invert(1);
}
</style>