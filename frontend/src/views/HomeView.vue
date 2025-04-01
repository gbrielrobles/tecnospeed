<template>
  <app-header></app-header>
  <div class="home-view">
    <div v-for="step in steps" :key="step.id">
      <div v-if="step.id < currentStep" class="collapsed-dropdown" @click="currentStep = step.id">
        <span class="step-number">{{ step.id }}</span>
        <div class="header-content">
          <div class="dropdown-title">{{ step.title }}</div>
          <div class="selected-value">{{ getStepValue(step.id) }}</div>
        </div>
        <span class="dropdown-arrow">▼</span>
      </div>
      
      <component 
        v-if="step.id === currentStep"
        :is="step.component"
        @back="currentStep--"
        @next="handleNext"
        @update-products="updateProducts"
        @update-bank="updateBank"
      />
    </div>
  </div>
</template>

<script>
import DropdownBank from '@/components/Dropdowns/DropdownBank.vue'
import DropdownProducts from '@/components/Dropdowns/DropdownProducts.vue'
import DropdownCompany from '@/components/Dropdowns/DropdownCompany.vue'
import DropdownValidation from '@/components/Dropdowns/DropdownValidation.vue'
import AppHeader from '@/components/AppHeader.vue'

export default {
  components: {
    DropdownBank,
    DropdownProducts,
    DropdownCompany,
    DropdownValidation,
    AppHeader
  },
  data() {
    return {
      currentStep: 1,
      selectedValues: {
        bank: '',
        products: '',
        company: 'Finalizado',
        validation: 'Finnet'
      },
      steps: [
        { 
          id: 1, 
          component: 'DropdownBank',
          title: 'Selecionar um Banco (Instituição Bancária)'
        },
        { 
          id: 2, 
          component: 'DropdownProducts',
          title: 'Selecionar um ou mais produtos'
        },
        { 
          id: 3, 
          component: 'DropdownCompany',
          title: 'Preencher dados da empresa e conta'
        },
        { 
          id: 4, 
          component: 'DropdownValidation',
          title: 'Conferir e validar informações da carta'
        }
      ]
    }
  },
  methods: {
    getStepValue(stepId) {
      switch(stepId) {
        case 1: return this.selectedValues.bank || 'Não selecionado';
        case 2: return this.selectedValues.products || 'Não selecionado';
        case 3: return this.selectedValues.company;
        case 4: return this.selectedValues.validation;
        default: return '';
      }
    },
    updateProducts(value) {
      this.selectedValues.products = value;
    },
    updateBank(value) {
      this.selectedValues.bank = value;
    },
    handleNext() {
      this.currentStep++;
    }
  }
}
</script>

<style scoped>
.home-view {
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.collapsed-dropdown {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
}

.collapsed-dropdown:hover {
  background-color: #f0f0f0;
}

/* Mantenha os outros estilos do global.css */
</style>