<template>
  <div class="validated-input-container">
    <label :for="id" class="form-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="displayValue"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      :class="inputClasses"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :maxlength="maxlength"
    />
    <div v-if="showError && errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { validateField, validatePhone } from '@/utils/validation';
import { applyMask } from '@/utils/masks';

export default {
  name: 'ValidatedInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: String,
      default: null
    },
    validationType: {
      type: String,
      default: null
    },
    showError: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'validation-change'],
  data() {
    return {
      isFocused: false,
      hasBeenBlurred: false
    };
  },
  computed: {
    displayValue() {
      // Aplica máscara baseada no tipo de validação
      if (!this.modelValue && this.modelValue !== 0) return '';
      
      const value = typeof this.modelValue === 'number' ? this.modelValue.toString() : this.modelValue;
      
      // Se o valor é uma string vazia, retorna vazio
      if (value === '') return '';
      
      switch (this.validationType) {
        case 'cnpj':
          return applyMask(value, 'cnpj');
        case 'phone':
          return applyMask(value, 'phone');
        case 'branchNumber':
          return applyMask(value, 'agency');
        case 'accountNumber':
          return applyMask(value, 'account');
        default:
          return value;
      }
    },
    errorMessage() {
      if (!this.validationType) return '';
      
      let validation;
      if (this.validationType === 'phone') {
        validation = validatePhone(this.modelValue);
      } else {
        validation = validateField(this.modelValue, this.validationType);
      }
      
      return validation.message;
    },
    inputClasses() {
      const classes = ['form-input'];
      
      if (this.showError && this.errorMessage && this.hasBeenBlurred) {
        classes.push('error');
      }
      
      if (this.isFocused) {
        classes.push('focused');
      }
      
      return classes.join(' ');
    }
  },
  methods: {
    handleInput(event) {
      let value = event.target.value;
      
      // Remove máscara para obter apenas os dígitos
      if (this.validationType === 'cnpj' || this.validationType === 'phone' || 
          this.validationType === 'branchNumber' || this.validationType === 'accountNumber') {
        value = value.replace(/\D/g, '');
      }
      
      // Para campos numéricos, mantém como string para facilitar a aplicação de máscaras
      // A conversão para número será feita apenas no momento do envio
      if (this.validationType === 'branchNumber' || this.validationType === 'accountNumber') {
        // Mantém como string vazia se não há valor
        value = value || '';
      }
      
      this.$emit('update:modelValue', value);
      
      // Emite evento de validação
      let validation;
      if (this.validationType === 'phone') {
        validation = validatePhone(value);
      } else if (this.validationType) {
        validation = validateField(value, this.validationType);
      } else {
        validation = { isValid: true, message: '' };
      }
      
      this.$emit('validation-change', {
        field: this.id,
        isValid: validation.isValid,
        message: validation.message
      });
    },
    handleBlur() {
      this.isFocused = false;
      this.hasBeenBlurred = true;
    },
    handleFocus() {
      this.isFocused = true;
    }
  }
};
</script>

<style scoped>
.validated-input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.form-label {
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #333;
  font-size: 0.8rem;
}

.form-input {
  padding: 0.375rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  background-color: #fff;
  min-height: 32px;
}

.form-input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.form-input.error {
  border-color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
}

.form-input:disabled {
  background-color: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  font-size: 0.75rem;
  margin-top: 0.125rem;
  margin-bottom: 0;
  animation: fadeIn 0.2s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 