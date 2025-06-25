<template>
  <div class="dropdown-container">
    <div class="dropdown-header" @click="toggleDropdown">
      <span class="step-number">4</span>
      <div class="header-content">
        <div class="dropdown-title">Conferir e validar informações da carta</div>
        <div class="selected-value">Finnet</div>
      </div>
    </div>
    
    <div v-if="isOpen" class="dropdown-content">
      <div class="buttons-container">
        <button class="secondary-button" @click="$emit('back')">Voltar</button>
        <button class="next-button">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownValidation',
  data() {
    return {
      isOpen: true
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>