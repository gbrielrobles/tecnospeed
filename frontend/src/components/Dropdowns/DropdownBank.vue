<template>
  <div class="dropdown-container">
    <div class="dropdown-header" @click="toggleDropdown">
      <span class="step-number">1</span>
      <div class="header-content">
        <div class="dropdown-title">Selecionar um Banco (Instituição Bancária)</div>
        <div class="selected-value" v-if="selectedBank">
          {{ selectedBank }}
        </div>
        <div class="dropdown-subtitle" v-else>
          Selecione um banco para criar uma nova carta de VAN
        </div>
      </div>
    </div>
    
    <div v-if="isOpen" class="dropdown-content">
      <h3 class="section-title">Bancos:</h3>
      <select v-model="selectedBank" class="bank-select">
        <option value="">Selecione um banco</option>
        <option 
          v-for="bank in banks" 
          :key="bank.code" 
          :value="bank.label"
        >
          {{ bank.label }}
        </option>
      </select>
      
      <div class="buttons-container">
        <button 
          class="next-button"
          :disabled="!selectedBank"
          @click="handleNext"
        >
          Próximo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownBank',
  data() {
    return {
      isOpen: true,
      selectedBank: '',
      banks: [
        { code: '001', label: '001 - Banco do Brasil' },
        { code: '104', label: '104 - Caixa Econômica Federal' },
        { code: '237', label: '237 - Bradesco' },
        { code: '341', label: '341 - Itaú' },
        { code: '033', label: '033 - Santander' }
      ]
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    handleNext() {
      this.$emit('next');
      this.$emit('update-bank', this.selectedBank);
    }
  }
}
</script>