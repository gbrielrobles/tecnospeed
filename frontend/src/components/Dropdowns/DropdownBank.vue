<template>
  <div class="dropdown-container">
    <div class="dropdown-header" @click="toggleDropdown">
      <span class="step-number">1</span>
      <div class="header-content">
        <div class="dropdown-title">Selecionar um Banco (Instituição Bancária)</div>
        <div class="selected-value">
          {{ selectedBank }}
        </div>
        <div class="dropdown-subtitle">
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
          :value="bank.name"
        >
          {{ bank.name }}
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
import { useBank } from '@/hooks/bank';
console.log(useBank)

export default {
  name: 'DropdownBank',
  data() {
    return {
      isOpen: true,
      selectedBank: '',
      bank: [],
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
  },
  setup() {
    const { banks, error, loading } = useBank();

    return {
      banks,
      error,
      loading
    }
  }
}
</script>