<template>
  <div class="background-container">
    <div class="header-content">
      <img src="@/assets/fundo-login.png" alt="Tecnospeed" class="fundo">
    </div>
  </div>
</template>

<style scoped>

.background-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden; 
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5; 
}

.fundo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; 
  display: block;
}
</style>

<script>
export default {
  name: 'LoginView'
}
</script>
