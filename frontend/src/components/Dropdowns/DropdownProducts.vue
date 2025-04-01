<template>
  <div class="dropdown-container" :class="{ 'is-open': isOpen }">
    <div class="dropdown-header" @click="toggleDropdown">
      <span class="step-number">2</span>
      <div class="header-content">
        <h2 class="dropdown-title">Selecionar um ou mais produtos</h2>
        <p class="dropdown-subtitle">Selecione quais produtos deseja utilizar a transferência de arquivos por VAN</p>
        <div class="selected-value" v-if="selectedProducts.length > 0">
          Selecionados: {{ selectedProductsNames.join(', ') }}
        </div>
      </div>
    </div>
    
    <div v-if="isOpen" class="dropdown-content">
      <h3 class="section-title">Produtos:</h3>
      
      <div class="products-grid">
        <label 
          v-for="product in products" 
          :key="product.id"
          class="product-card"
          :class="{ 'selected': isProductSelected(product.id) }"
        >
          <input 
            type="checkbox" 
            :id="'product-' + product.id"
            class="product-checkbox"
            v-model="selectedProducts"
            :value="product.id"
            @click.stop
          />
          <div>
            <h4 class="product-name">{{ product.name }}</h4>
            <p class="product-description">{{ product.description }}</p>
          </div>
        </label>
      </div>
      
      <div class="navigation-buttons">
        <button class="secondary-button" @click="$emit('back')">
          Voltar
        </button>
        <button 
          class="next-button"
          :disabled="selectedProducts.length === 0"
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
  name: 'DropdownProducts',
  data() {
    return {
      isOpen: true,
      selectedProducts: [],      
      products: [
        { 
          id: 'boletos', 
          name: 'Boletos', 
          description: 'Transferir arquivos de remessa e reserva de boletos' 
        },
        { 
          id: 'pagamentos', 
          name: 'Pagamentos', 
          description: 'Transferir arquivos de remessa e reserva de pagamentos' 
        },
        { 
          id: 'extrato', 
          name: 'Extrato', 
          description: 'Transferir arquivos de extrato' 
        },
        { 
          id: 'dda', 
          name: 'DDA', 
          description: 'Transferir arquivos de débito direto autorizado' 
        }
      ]
    }
  },
  computed: {
    selectedProductsNames() {
      return this.selectedProducts.map(id => {
        const product = this.products.find(p => p.id === id);
        return product ? product.name : '';
      }).filter(name => name !== '');
    }
  },
  methods: {
    isProductSelected(productId) {
      return this.selectedProducts.includes(productId);
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    handleNext() {
      this.$emit('next');
      this.$emit('update-products', this.selectedProductsNames.join(', '));
    }
  }
}
</script>