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
        @update-company="updateCompany"
        :bankId="selectedValues.bankId"
        :cnab-types="selectedValues.cnabTypes"
        :initial-company-data="selectedValues.companyData"
        :initial-bank-data="selectedValues.bankData"
        :selected-values="selectedValues"
        :bank="selectedValues.bank"
        :products="selectedValues.products?.names"
        :initialProductIds="selectedValues.products.ids"
        :initialProductNames="selectedValues.products.names"
      />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import DropdownBank from '@/components/Dropdowns/DropdownBank.vue'
import DropdownProducts from '@/components/Dropdowns/DropdownProducts.vue'
import DropdownCompany from '@/components/Dropdowns/DropdownCompany.vue'
import DropdownValidation from '@/components/Dropdowns/DropdownValidation.vue'

export default {
  name: 'HomeView',
  components: {
    AppHeader,
    DropdownBank,
    DropdownProducts,
    DropdownCompany,
    DropdownValidation
  },
  data() {
    return {
      currentStep: 1,
      selectedValues: {
        bank: '',
        bankId: '',
        products: {
          ids: [],
          names: ''
        },
        cnabTypes: [],
        cnabConfig: null,
        company: 'Finalizado',
        validation: 'Finnet',
        companyData: {},
        bankData: {}
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
      switch (stepId) {
        case 1:
          return this.selectedValues.bank || 'Não selecionado'
        case 2:
          return this.selectedValues.products.names || 'Não selecionado'
        case 3:
          return this.selectedValues.company
        case 4:
          return this.selectedValues.validation
        default:
          return ''
      }
    },
    updateProducts(value) {
      this.selectedValues.products = {
        ids: value.products,
        names: value.productNames
      }
      this.selectedValues.cnabTypes = value.cnabTypes
    },
    updateBank(value) {
      this.selectedValues.bank = value.label
      this.selectedValues.bankId = value.id
    },
    handleNext() {
      this.currentStep++
    },
    updateCompany(value) {
      this.selectedValues.company = value.empresa?.empresa || 'Finalizado'
      this.selectedValues.companyData = value.empresa
      this.selectedValues.bankData = value.conta
      this.selectedValues.bank = value.conta.banco || 'Não selecionado'
      this.selectedValues.bankId = value.conta.bancoId || 'Não selecionado'
      this.selectedValues.products = {
        ids: value.conta.produto || [],
        names: value.conta.produtoNome || ''
      }
      this.selectedValues.cnabConfig = {
        type: value.cnabType,
        data: value
      }
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
  min-height: calc(100vh - 60px);
  overflow: visible;
}

.collapsed-dropdown {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--gray-100);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-lg);
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
}

.collapsed-dropdown:hover {
  background-color: var(--gray-200);
}
</style>
