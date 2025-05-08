<template>
  <form @submit.prevent="handleSubmit" class="form-grid">
    <!-- Seção 1: Dados da Empresa -->
    <div class="form-section">
      <h3 class="section-title">Dados da Empresa</h3>           

      <div class="form-group">
        <label for="cnpj">CNPJ</label>
        <input
          type="text"
          id="cnpj"
          v-model="form.cnpj"
          class="form-input"
          required
          placeholder="00.000.000/0000-00"
          v-mask="'cnpj'"
        />
      </div>

      <div class="form-group">
        <label for="legalName">Nome Legal</label>
        <input
          type="text"
          id="legalName"
          v-model="form.legalName"
          class="form-input"
          required
          placeholder="Razão social"
        />
      </div>
    </div>

    <!-- Seção 2: Dados Bancários -->
    <div class="form-section">
      <h3 class="section-title">Dados Bancários</h3>
      
      <div class="form-group">
        <label for="bank">Banco</label>
        <input
          type="text"
          id="bank"
          :value="bankDisplay"
          class="form-input"
          required
          disabled
        />
        <input type="hidden" v-model="form.bankId">
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="branchNumber">Agência</label>
          <input
            type="number"
            id="branchNumber"
            v-model.number ="form.branchNumber"
            class="form-input"
            required
            placeholder="Número da agência"
          />
        </div>

        <div class="form-group">
          <label for="accountNumber">Conta</label>
          <input
            type="number"
            id="accountNumber"
            v-model.number="form.accountNumber"
            class="form-input"
            required
            placeholder="Número da conta"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="ufBank">UF do Banco</label>
        <input
          type="text"
          id="ufBank"
          v-model="form.ufBank"
          class="form-input"
          required
          placeholder="Estado"
          maxlength="2"
        />
      </div>

      <div class="form-group">
        <label for="bankCity">Cidade do Banco</label>
        <input
          type="text"
          id="bankCity"
          v-model="form.bankCity"
          class="form-input"
          required
          placeholder="Cidade"
        />
      </div>
    </div>

    <!-- Seção 3: Contatos -->
    <div class="form-section">
      <h3 class="section-title">Contato da Empresa</h3>
      
      <div class="form-group">
        <label for="companyContact.name">Nome</label>
        <input
          type="text"
          id="companyContact.name"
          v-model="form.companyContact.name"
          class="form-input"
          required
          placeholder="Nome do contato"
        />
      </div>

      <div class="form-group">
        <label for="companyContact.email">Email</label>
        <input
          type="email"
          id="companyContact.email"
          v-model="form.companyContact.email"
          class="form-input"
          required
          placeholder="Email do contato"
        />
      </div>

      <div class="form-group">
        <label for="companyContact.fone">Telefone</label>
        <input
          type="text"
          id="companyContact.fone"
          v-model="form.companyContact.fone"
          class="form-input"
          required
          placeholder="Telefone do contato"
          v-mask="'phone'"
        />
      </div>
    </div>

    <!-- Seção 4: Contato do Gerente Bancário -->
    <div class="form-section">
      <h3 class="section-title">Contato do Gerente Bancário</h3>
      
      <div class="form-group">
        <label for="bankManagerContact.name">Nome</label>
        <input
          type="text"
          id="bankManagerContact.name"
          v-model="form.bankManagerContact.name"
          class="form-input"
          required
          placeholder="Nome do gerente"
        />
      </div>

      <div class="form-group">
        <label for="bankManagerContact.email">Email</label>
        <input
          type="email"
          id="bankManagerContact.email"
          v-model="form.bankManagerContact.email"
          class="form-input"
          required
          placeholder="Email do gerente"
        />
      </div>

      <div class="form-group">
        <label for="bankManagerContact.fone">Telefone</label>
        <input
          type="text"
          id="bankManagerContact.fone"
          v-model="form.bankManagerContact.fone"
          class="form-input"
          required
          placeholder="Telefone do gerente"
          v-mask="'phone'"
        />
      </div>
    </div>

    <!-- Seção 5: Outras Informações -->
    <div class="form-section">
      <h3 class="section-title">Outras Informações</h3>
      
      <div class="form-group">
        <label for="agreement">Acordo</label>
        <input
          type="text"
          id="agreement"
          v-model="form.agreement"
          class="form-input"
          required
          placeholder="Termo de acordo"
        />
      </div>

      <div class="form-group">
        <label>Preferência de Contato</label>
        <div class="checkbox-group">
          <label><input type="checkbox" value="W" v-model="form.preferenceByContact"> WhatsApp</label>
          <label><input type="checkbox" value="E" v-model="form.preferenceByContact"> Email</label>
          <label><input type="checkbox" value="P" v-model="form.preferenceByContact"> Telefone</label>
        </div>
      </div>
    </div>

    <!-- Botão de pré-visualização -->
    <div class="form-actions">
      <button type="button" @click="handlePreview" class="btn btn-preview">
        Pré-visualizar
      </button>
    </div>

    <!-- Modal de pré-visualização -->
    <div v-if="showPreviewModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Visualização dos Documentos</h3>

        <div v-if="loading" class="loading-section">
          Carregando documentos...
        </div>

        <div v-else>
          <!-- Navegação entre documentos -->
          <div class="document-navigation">
            <button 
              @click="currentDocument = 'finnet'" 
              :class="{ 'active': currentDocument === 'finnet' }"
              class="nav-btn"
            >
              Finnet
            </button>
            <button 
              @click="currentDocument = 'nexxera'" 
              :class="{ 'active': currentDocument === 'nexxera' }"
              class="nav-btn"
            >
              Nexxera
            </button>
          </div>

          <!-- Visualização do documento atual -->
          <div class="document-viewer">
            <h4 v-if="currentDocument === 'finnet'">Documento Finnet</h4>
            <h4 v-else>Documento Nexxera</h4>
            
            <div class="document-container">
              <iframe 
                :srcdoc="currentDocument === 'finnet' ? finalHtmls.finnet : finalHtmls.nexxera" 
                width="100%" 
                height="500px" 
                style="border:1px solid #ccc;"
              />
            </div>
          </div>

          <div class="modal-actions">
            <button class="btn btn-confirm" @click="finalize()">Confirmar</button>
            <button class="btn btn-cancel" @click="showPreviewModal = false">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { applyMask } from '@/utils/masks';

export default {
  name: 'Cnab240Form',
  props: {
    initialData: Object,
    bankName: { type: String, required: true },
    bankId: { type: String, required: true },
    products: { type: [Array, String], required: true },
    formType: { type: String, required: true },
    productsIds: { type: Array, default: () => [] }
  },
  emits: ['update'],
  data() {
    return {
      currentDocument: 'finnet',
      bankDisplay: this.bankName,
      showPreviewModal: false,
      loading: false,
      finalHtmls: {
        finnet: '',
        nexxera: ''
      },
      documentHash: '',
      form: {
        bankId: this.bankId || '',
        legalName: '',
        cnpj: '',
        accountNumber: 0,
        branchNumber: 0,
        selectedProducts: Array.isArray(this.products) ? this.products : this.products.split(',').map(p => p.trim()),
        selectedCnabs: this.formType ? [this.formType] : [],
        companyContact: { name: '', email: '', fone: '' },
        bankManagerContact: { name: '', email: '', fone: '' },
        agreement: '',
        ufBank: '',
        bankCity: '',
        preferenceByContact: []
      }
    }
  },
  computed: {
    preferenceLabel() {
      const map = { W: 'WhatsApp', E: 'Email', T: 'Telefone' };
      return this.form.preferenceByContact.map(p => map[p]).join(', ');
    }
  },
  created() {
    if (this.initialData) {
      this.form = {
        ...this.form,
        ...this.initialData,
        selectedProducts: this.initialData.selectedProducts || (Array.isArray(this.productsIds) ? this.productsIds : []),
        selectedCnabs: this.initialData.selectedCnabs || [this.formType],
        companyContact: {
          ...this.form.companyContact,
          ...(this.initialData.companyContact || {})
        },
        bankManagerContact: {
          ...this.form.bankManagerContact,
          ...(this.initialData.bankManagerContact || {})
        }
      }
    }
  },
  watch: {
    'form.cnpj'(newCnpj) {
      const cleaned = newCnpj.replace(/\D/g, '');
      if (cleaned.length === 14) {
        this.fetchCnpjData(cleaned);
      }
    }
  },
  methods: {
    async fetchCnpjData(cnpj) {
      try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
        if (!response.ok) throw new Error('Erro ao buscar CNPJ');
        const data = await response.json();

        this.form.legalName = data.razao_social || '';
        this.form.bankCity = data.municipio || '';
        this.form.ufBank = data.uf || '';
        this.form.companyContact.email = data.email || '';
        this.form.companyContact.name = data.nome_fantasia || this.form.companyContact.name;

        if (data.ddd_telefone_1) {
          const phoneDigits = data.ddd_telefone_1.replace(/\D/g, '');
          this.form.companyContact.fone = applyMask(phoneDigits, 'phone');
        } else {
          this.form.companyContact.fone = '';
        }

      } catch (error) {
        console.error('Erro ao buscar dados do CNPJ:', error);
        alert('Erro ao buscar dados do CNPJ. Verifique se o número está correto.');
      }
    },
    handleSubmit() {
      console.log('Formulário enviado');
    },
    async handlePreview() {
      if (!this.validateFields()) return;

      this.loading = true;
      this.showPreviewModal = true;
      this.currentDocument = 'finnet'; 

      try {
        const response = await fetch('http://localhost:8000/letter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form)
        });

        if (!response.ok) throw new Error('Erro ao enviar para /api/letter');
        const data = await response.json();

        this.finalHtmls.finnet = data.data.finnet || '';
        this.finalHtmls.nexxera = data.data.nexxera || '';
        this.documentHash = data.hashed || '';
      } catch (error) {
        console.error('Erro no envio para /api/letter:', error);
        alert('Erro ao gerar os documentos. Tente novamente.');
        this.showPreviewModal = false;
      } finally {
        this.loading = false;
      }
    },
    validateFields() {
      const requiredFields = [
        'bankId', 'legalName', 'cnpj', 'accountNumber', 'branchNumber',
        'ufBank', 'bankCity', 'agreement'
      ];

      const requiredContactFields = [
        'companyContact.name', 'companyContact.email', 'companyContact.fone',
        'bankManagerContact.name', 'bankManagerContact.email', 'bankManagerContact.fone'
      ];

      const isValid = requiredFields.every(field => !!this.form[field]) &&
        requiredContactFields.every(field => {
          const [parent, child] = field.split('.');
          return !!this.form[parent]?.[child];
        }) &&
        this.form.preferenceByContact.length > 0;

      return true;
    },
    finalize() {
      this.showPreviewModal = false;
      this.$emit('update', { ...this.form, hash: this.documentHash });
    }
  }
}
</script>



<style scoped>
.document-navigation {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.nav-btn {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  border-bottom: 2px solid transparent;
}

.nav-btn.active {
  color: #007bff;
  border-bottom: 2px solid #007bff;
}

.nav-btn:hover {
  color: #0056b3;
}

.document-viewer {
  margin-bottom: 1.5rem;
}

.document-viewer h4 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: #333;
}

.document-container {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.hash-section {
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  word-break: break-all;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}
.modal-section {
  margin-bottom: 1.5rem;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}
.loading-section {
  text-align: center;
  padding: 2rem;
}
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}
.btn-preview { 
  background: #007bff; 
  color: white; 
}
.btn-confirm { 
  background: #28a745; 
  color: white; 
}
.btn-cancel { 
  background: #dc3545; 
  color: white; 
}
.form-actions {
  margin-top: 2rem;
  text-align: right;
}
</style>