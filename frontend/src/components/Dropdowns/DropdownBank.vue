<template>
  <div class="dropdown-container">
    <div class="dropdown-header" @click="toggleDropdown">
      <span class="step-number">1</span>
      <div class="header-content">
        <div class="dropdown-title">Selecionar um Banco (Instituição Bancária)</div>
        <div class="selected-value">
          {{ selectedBankLabel || 'Nenhum banco selecionado' }}
        </div>
        <div class="dropdown-subtitle">
          Selecione um banco para criar uma nova carta de VAN
        </div>
      </div>
    </div>
    
    <div v-if="isOpen" class="dropdown-content">
      <h3 class="section-title">Bancos:</h3>
      
      <div v-if="loading" class="loading-message">
        Carregando bancos...
      </div>
      
      <div v-else-if="banks.length === 0" class="error-message">
        Não foi possível carregar os bancos
      </div>
      
      <select 
        v-else
        v-model="selectedBankId" 
        class="select"
      >
        <option value="">Selecione um banco</option>
        <option 
          v-for="bank in banks" 
          :key="bank.id" 
          :value="bank.id"
        >
          {{ bank.code }} - {{ bank.name }}
        </option>
      </select>
      
      <div class="buttons-container">
        <button 
          class="next-button"
          :disabled="!selectedBankId"
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
  props: {
    bankId: {
      type: String,
      default: ''
    },
    bank: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOpen: true,
      selectedBankId: '',
      selectedBankLabel: '',
      banks: [],
      loading: false,
      error: null
    }
  },
  created() {
    this.selectedBankId = this.bankId;
    this.selectedBankLabel = this.bank;
    this.getBankOptions();
  },  
  methods: {
    async getBankOptions() {
      this.loading = true;
      try {
        const response = await fetch('http://localhost:8000/bank', {
          method: 'get',
        }); 
        console.log(response)
        const data = await response.json();
        this.banks = data;
      } catch (error) {
        console.log(error);
        console.error("Erro ao carregar bancos:", error);
      } finally {
        this.loading = false;
      }
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    handleNext() {
      const selectedBank = this.banks.find(bank => bank.id === this.selectedBankId);
      if (selectedBank) {
        this.selectedBankLabel = `${selectedBank.code} - ${selectedBank.name}`;
        this.$emit('next');
        this.$emit('update-bank', {
          id: selectedBank.id,
          code: selectedBank.code,
          name: selectedBank.name,
          label: this.selectedBankLabel
        });
      }
    }
  }
}
</script>

<style scoped>
.loading-message, .error-message {
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
}

.loading-message {
  background-color: #f0f0f0;
  color: #555;
}

.error-message {
  background-color: #ffecec;
  color: #d33;
}
</style>