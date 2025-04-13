<template>
  <!-- Fundo -->
  <img src="@/assets/fundo-login.png" alt="Tecnospeed" class="background-image" />

  <div class="login-wrapper">
    <!-- Conteúdo -->
    <div class="login-container">
      <div class="login-box">
        <img src="@/assets/logo-azul.png" alt="tecnospeed" class="logo" />
        <h1 class="title">Bem-vindo</h1>
        <p class="subtitle">Para criar uma nova Carta de VAN</p>

        <div class="input-group">
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
        </div>
        
        <a 
          href="/home"
          class="btn-submit"
          @click.prevent="handleLogin">
          Acessar
        </a>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const cnpj = ref('')
const token = ref('')

function handleLogin() {
  if (!cnpj.value || !token.value) {
    alert('Por favor, preencha CNPJ e Token')
    return
  }
  
  console.log('CNPJ:', cnpj.value)
  console.log('Token:', token.value)
  router.push('/home')
}
</script>

<style>
/* Reset e estilos base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

body {
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  background-color: #f5f7fa;
}

/* Wrapper geral */
.login-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Fundo */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.1;
}

/* Container com conteúdo centralizado */
.login-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  display: flex;
  justify-content: center;
}

/* Box de login - Estilo minimalista */
.login-box {
  width: 100%;
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Logo */
.logo {
  height: 40px;
  margin: 0 auto 1.5rem;
  display: block;
}

/* Títulos */
.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.subtitle {
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 400;
}

/* Grupo de inputs */
.input-group {
  width: 100%;
  margin-bottom: 1.5rem;
}

/* Inputs */
.input-custom {
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  background-color: #f8fafc;
}

.input-custom:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

/* Botão */
.btn-submit {
  background-color: #2563eb;
  color: white;
  font-weight: 500;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  width: 100%;
  transition: background-color 0.2s ease;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  display: block;
}

.btn-submit:hover {
  background-color: #1d4ed8;
}

/* Texto Assessor */
.assessor-text {
  margin-top: 1.5rem;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Responsividade para tablets */
@media (max-width: 768px) {
  .login-box {
    padding: 2rem;
    max-width: 90%;
  }
  
  .logo {
    height: 36px;
    margin-bottom: 1.25rem;
  }
  
  .title {
    font-size: 1.3rem;
  }
  
  .subtitle {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
}

/* Responsividade para celulares */
@media (max-width: 480px) {
  .login-box {
    padding: 1.5rem;
    border-radius: 8px;
  }
  
  .logo {
    height: 32px;
    margin-bottom: 1rem;
  }
  
  .input-custom {
    padding: 0.65rem 0.9rem;
    font-size: 0.9rem;
  }
  
  .btn-submit {
    padding: 0.65rem;
    font-size: 0.95rem;
  }
}
</style>