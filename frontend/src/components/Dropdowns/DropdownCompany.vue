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
          class="form-input"
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
        ref="cnb240Form"
        formType="CNAB240"
        :initial-data="bankData"
        :bank="bank"
        :products="products"
        :bankId="bankId"
        :bank-name="bank"
        @update="updateBankData"
        @preview-closed="handlePreviewClosed"
        @close="handlePreviewClosed"
        :productsIds="initialProductIds"
      />
      
      <Cnab400Form
        v-if="selectedCnabType === 'CNAB400'"
        ref="cnb400Form"
        formType="CNAB400"
        :initial-data="bankData"
        :bank="bank"
        :products="products"
        :bankId="bankId"
        :bank-name="bank"
        @update="updateBankData"
        @preview-closed="handlePreviewClosed"
        @close="handlePreviewClosed"
        :productsIds="initialProductIds"
      />

      <div class="navigation-buttons">
        <button class="secondary-button" @click="$emit('back')">
          Voltar
        </button>
        <button 
          class="next-button"
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
    bankId: {
      type: String,
      default: ''
    },
    products: {
      type: String,
      default: ''
    },
    initialProductIds: {
      type: Array,
      default: function() {
        return [];
      }
    },
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
      if (this.selectedCnabType === 'CNAB240') {
        /** @type {any} */
        const form = this.$refs.cnb240Form;
        if (form) {
          form.handleSubmit();
        }
      } else if (this.selectedCnabType === 'CNAB400') {
        /** @type {any} */
        const form = this.$refs.cnb400Form;
        if (form) {
          form.handleSubmit();
        }
      }
    },
    handlePreviewClosed: function() {
      var allData = Object.assign(
        {},
        this.commonData,
        this.bankData,
        { cnabType: this.selectedCnabType }
      );

      this.$emit('next');
      this.$emit('update-company', allData);
    }
  }
});
</script>

<style scoped>
.navigation-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
  padding: 1rem;
  background-color: white;
  border-top: 1px solid #eee;
  min-height: 60px;
  align-items: center;
  position: sticky;
  bottom: 0;
  z-index: 10;
}

.secondary-button {
  padding: 0.5rem 1.25rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.secondary-button:hover {
  background: #f8f9fa;
  border-color: #ccc;
}

.form-section {
  margin-bottom: 0.75rem;
}

.section-title {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-input {
  padding: 0.375rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  min-height: 32px;
  width: 100%;
  box-sizing: border-box;
  line-height: 1.2;
}

select.form-input {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-left: 0.375rem;
  padding-right: 2rem;
  height: 32px;
  min-height: 32px;
}
</style>