<template>
  <div class="dropdown-container">
    <div class="dropdown-header" @click="toggleDropdown">
      <span class="step-number">3</span>
      <div class="header-content">
        <div class="dropdown-title">Preencher dados da empresa e conta</div>
        <div class="selected-value">Finalizado</div>
      </div>
    </div>
    
    <div v-if="isOpen" class="dropdown-content">
      
      <div class="buttons-container">
        <button class="back-button" @click="$emit('back')">Voltar</button>
        <button class="next-button" @click="$emit('next')">Próximo</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownCompany',
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