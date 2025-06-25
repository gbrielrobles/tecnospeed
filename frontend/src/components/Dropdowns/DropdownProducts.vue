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
      
      <div v-if="loading" class="loading-message">
        Carregando produtos...
      </div>
      
      <div v-else-if="error" class="error-message">
        Erro ao carregar produtos: {{ error }}
      </div>
      
      <div v-else class="products-grid">
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
  props: {
    bankId: String,
    initialProductIds: {
      type: Array,
      default: () => []
    },
    initialProductNames: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOpen: true,
      selectedProducts: [],      
      products: [],
      bankData: null,
      loading: false,
      error: null
    }
  },
  mounted() {
    if (this.initialProductIds && this.initialProductIds.length > 0) {
      this.selectedProducts = [...this.initialProductIds];
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
  watch: {
    bankId: {
      immediate: true,
      handler(newBankId, oldBankId) {
        if (newBankId && newBankId !== oldBankId) {
          this.fetchProducts(newBankId);
        }
      }
    }
  },
  methods: {
    async fetchProducts(bankId) {
      this.loading = true;
      this.error = null;
      this.selectedProducts = [];
      this.products = [];
      this.bankData = null;
              
      try {
        const response = await fetch(`http://localhost:8000/bank/${bankId}`); 
        if (!response.ok) throw new Error('Falha ao carregar produtos');
        
        const data = await response.json();
        this.products = data.products || [];
        this.bankData = data;
        
        this.selectedProducts = [];
        
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        this.error = err.message;
        this.products = [];
        this.selectedProducts = [];
      } finally {
        this.loading = false;
      }
    },
    isProductSelected(productId) {
      return this.selectedProducts.includes(productId);
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    handleNext() {
      this.$emit('next');
      this.$emit('update-products', {
        products: this.selectedProducts,
        productNames: this.selectedProductsNames.join(', '),
        cnabTypes: this.getBankCnabTypes(),
        bankData: this.bankData 
      });
    },
    getBankCnabTypes() {
      return this.bankData?.cnabs || [];
    }
  }
}
</script>