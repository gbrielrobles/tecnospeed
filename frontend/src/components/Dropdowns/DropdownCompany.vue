<template>
  <div class="dropdown-container" :class="{ 'is-open': isOpen }">
    <div class="dropdown-header" @click="toggleDropdown">
      <span class="step-number">3</span>
      <div class="header-content">
        <h2 class="dropdown-title">Preencher dados da empresa e conta</h2>
        <div class="selected-value">{{ selectedCnabType || 'Não selecionado' }}</div>
      </div>
    </div>
    
    <div v-if="isOpen" class="dropdown-content">
      <div class="form-section">
        <h3 class="section-title">Selecione o tipo de CNAB:</h3>
        <select 
          v-model="selectedCnabType" 
          class="select"
          @change="handleCnabChange"
        >
          <option value="">Selecione um tipo</option>
          <option 
            v-for="(cnab, index) in availableCnabTypes" 
            :key="`cnab-${index}`" 
            :value="cnab"
          >
            {{ cnab }}
          </option>
        </select>
      </div>

      <Cnab240Form
        v-if="selectedCnabType === 'CNAB240'"
        ref="cnab240Form"
        :initial-data="bankData"
        :bank="bank"
        :products="products"
        @update="updateBankData"
      />
      
      <Cnab400Form
        v-if="selectedCnabType === 'CNAB400'"
        ref="cnab400Form"
        :initial-data="bankData"
        :bank="bank"
        :products="products"
        @update="updateBankData"
      />

      <div class="navigation-buttons">
        <button class="secondary-button" @click="$emit('back')">
          Voltar
        </button>
        <button 
          class="next-button"
          :disabled="!isFormValid"
          @click="handleNext"
        >
          Próximo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Cnab240Form from '@/components/Cnab/Cnab240Form.vue';
import Cnab400Form from '@/components/Cnab/Cnab400Form.vue';

export default defineComponent({
  name: 'DropdownCompany',
  components: {
    Cnab240Form,
    Cnab400Form
  },
  props: {
    cnabTypes: {
      type: Array,
      default: function() {
        return [];
      }
    },
    initialCompanyData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    initialBankData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    bank: {
      type: String,
      default: ''
    },
    products: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOpen: true,
      selectedCnabType: this.initialCompanyData.cnabType || '',
      commonData: {
        empresa: this.initialCompanyData.empresa || '',
        responsavel: this.initialCompanyData.responsavel || '',
        telefone: this.initialCompanyData.telefone || '',
        email: this.initialCompanyData.email || ''
      },
      bankData: this.initialBankData || {}
    };
  },
  computed: {
    availableCnabTypes: function() {
      return this.cnabTypes || [];
    },
    isFormValid: function() {
      if (!this.selectedCnabType) return false;

      const commonFieldsValid = Object.values(this.commonData).every(field => !!field);

      if (this.selectedCnabType === 'CNAB240') {
        /** @type {any} */
        const form = this.$refs.cnab240Form;
        return commonFieldsValid && form && form.validateFields();
      }

      if (this.selectedCnabType === 'CNAB400') {
        /** @type {any} */
        const form = this.$refs.cnab400Form;
        return commonFieldsValid && form && form.validateFields();
      }

      return false;
    }
  },
  methods: {
    updateBankData: function(data) {
      this.bankData = Object.assign({}, this.bankData, data);
    },
    toggleDropdown: function() {
      this.isOpen = !this.isOpen;
    },
    handleCnabChange: function() {
      this.bankData = {};
    },
    handleNext: function() {
      var allData = Object.assign(
        {},
        this.commonData,
        this.bankData,
        { cnabType: this.selectedCnabType }
      );

      this.$emit('next');
      this.$emit('update-company', allData);
    },
    validateFields: function() {
      return this.isFormValid;
    }
  }
});
</script>