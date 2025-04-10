<template>
  <div class="login-wrapper">
    <!-- Fundo -->
    <img src="@/assets/fundo-login.png" alt="Tecnospeed" class="background-image" />

    <!-- Conteúdo -->
    <div class="login-container">
      <div class="login-box">
        <img src="@/assets/logo.png" alt="tecnospeed" class="logo" />
        <h1 class="title">Bem-vindo</h1>
        <p class="subtitle">Para criar uma nova Carta de VAN</p>

        <input 
          v-model="cnpj"
          type="text" 
          placeholder="Inserir CNPJ" 
          class="input-custom"
        />
        
        <input 
          v-model="token"
          type="text" 
          placeholder="Inserir Token" 
          class="input-custom"
        />
        
        <button 
          @click="handleLogin"
          class="btn-submit">
          Criar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cnpj = ref('')
const token = ref('')

function handleLogin() {
  console.log('CNPJ:', cnpj.value)
  console.log('Token:', token.value)
}
</script>

<style>
/* Estilo base */
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}

/* Wrapper geral */
.login-wrapper {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* Fundo */
.background-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* Container com conteúdo centralizado */
.login-container {
  position: relative;
  z-index: 10;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Box de login */
.login-box {
  background-color: rgba(255, 255, 255, 0.92);
  padding: 2rem;
  border-radius: 1.25rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

/* Logo */
.logo {
  height: 2.5rem;
  margin: 0 auto 1.5rem;
}

/* Títulos */
.title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #4b5563;
  margin-bottom: 1.5rem;
}

/* Inputs */
.input-custom {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
  transition: box-shadow 0.3s ease;
}

.input-custom:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* Botão */
.btn-submit {
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  width: 100%;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #1d4ed8;
}
</style>
