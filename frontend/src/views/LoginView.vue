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
        
       <a 
          href="/home"
          class="btn-submit">
          Acessar
        </a>
      </div>
    </div>
  </div>
</template>

<script>

import { useRouter } from 'vue-router'

const router = useRouter()

import { ref } from 'vue'

const cnpj = ref('')
const token = ref('')

function handleLogin() {
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
}

/* Container com conteúdo centralizado */
.login-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  padding: 20px;
  display: flex;
  justify-content: center;
}

/* Box de login - Tamanho grande para desktop */
.login-box {
  width: 100%;
  background: rgba(255, 255, 255, 0.92);
  padding: 3.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 700px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Logo */
.logo {
  height: 3rem;
  margin: 0 auto 2rem;
  display: block;
}

/* Títulos */
.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #1a1a1a;
}

.subtitle {
  color: #4b5563;
  margin-bottom: 2.5rem;
  font-size: 1.25rem;
}

/* Inputs */
.input-custom {
  width: 100%;
  padding: 1rem 1.25rem;
  margin-bottom: 1.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  outline: none;
  transition: all 0.3s ease;
  font-size: 1.1rem;
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
  padding: 1rem;
  border: none;
  border-radius: 0.75rem;
  width: 100%;
  transition: background-color 0.3s ease;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.btn-submit:hover {
  background-color: #1d4ed8;
}

/* Responsividade para tablets */
@media (max-width: 1024px) {
  .login-box {
    max-width: 700px;
    height: 450px;
    padding: 2.5rem;
  }
  
  .title {
    font-size: 1.75rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
  
  .input-custom, .btn-submit {
    padding: 0.9rem;
    margin-bottom: 1.5rem;
  }
}

/* Responsividade para celulares */
@media (max-width: 768px) {
  .login-box {
    max-width: 90%;
    height: auto;
    padding: 2rem 1.5rem;
    min-height: auto;
  }
  
  .logo {
    height: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  .title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .input-custom, .btn-submit {
    padding: 0.75rem;
    margin-bottom: 1.25rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .login-box {
    padding: 1.5rem 1rem;
  }
  
  .logo {
    height: 2rem;
    margin-bottom: 1rem;
  }
  
  .input-custom, .btn-submit {
    padding: 0.65rem;
  }
}
</style>