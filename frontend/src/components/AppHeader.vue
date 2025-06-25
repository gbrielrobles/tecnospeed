<template>
  <header class="app-header">
    <div class="header-content">
      <img src="@/assets/logo.png" alt="Tecnospeed" class="logo">
      <a href="/" class="logout-link">Sair</a>
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
  background-color: var(--primary-blue);
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
}

.header-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  height: 100%;
}

.logo {
  height: 30px;
  filter: brightness(0) invert(1);
  margin-left: 20px;
  margin-top: 20px;
}

.logout-link {
  color: var(--white);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: opacity 0.2s ease;
  margin-right: 20px;
}

.logout-link:hover {
  opacity: 0.8;
}
</style>
