<template>
  <div class="background-container">
    <img src="@/assets/fundo-login.png" alt="Fundo" class="fundo" />

    <div class="form-container">
      <div class="form-box">
        <img src="@/assets/logo.png" alt="tecnospeed" class="logo" />
        <h1 class="title">Bem-vindo</h1>
        <p class="subtitle">Para criar uma nova Carta de VAN</p>

        <input 
          type="text" 
          v-model="cnpj"
          placeholder="Inserir CNPJ" 
          class="input"
        />
        
        <input 
          type="text" 
          v-model="token"
          placeholder="Inserir Token" 
          class="input"
        />
        
        <button class="button" @click="handleLogin">
          Criar
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.background-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.fundo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.form-container {
  height: 100%;
  width: 100%;
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

<script setup>
import { ref } from 'vue'

const cnpj = ref('')
const token = ref('')

function handleLogin() {
  console.log('CNPJ:', cnpj.value)
  console.log('Token:', token.value)
}
</script>