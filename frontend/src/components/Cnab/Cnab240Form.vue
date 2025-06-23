<template>
  <form @submit.prevent="handleSubmit" class="form-grid">
    <!-- Seção 0: Seleção de Método de Envio -->
    <div class="form-section">
      <h3 class="section-title">Seleção de Método de Envio</h3>
      <div class="form-group">
        <label for="transportadora">Transportadora</label>
        <select
          id="transportadora"
          v-model="form.transportadora"
          class="form-input"
          required
        >
          <option value="">Selecione um metodo de envio</option>
          <option value="finnet">Finnet</option>
          <option value="nexxera">Nexxera</option>
        </select>
      </div>
    </div>

    <!-- Seção 1: Dados da Empresa -->
    <div class="form-section">
      <h3 class="section-title">Dados da Empresa</h3>
      <div class="form-row">
        <div class="form-group col-cnpj">
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
        <div class="form-group col-name">
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
    </div>

    <!-- Seção 2: Dados Bancários -->
    <div class="form-section">
      <h3 class="section-title">Dados Bancários</h3>
      <div class="form-row">
        <div class="form-group col-bank">
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
        <div class="form-group col-agency">
          <label for="branchNumber">Agência</label>
          <input
            type="text"
            id="branchNumber"
            v-model="form.branchNumber"
            class="form-input"
            required
            placeholder="Número da agência"
            v-mask="'agency'"
          />
        </div>
        <div class="form-group col-account">
          <label for="accountNumber">Conta</label>
          <input
            type="text"
            id="accountNumber"
            v-model="form.accountNumber"
            class="form-input"
            required
            placeholder="Número da conta"
            v-mask="'account'"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-uf">
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
        <div class="form-group col-city">
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
    </div>

    <!-- Seção 3: Contato da Empresa -->
    <div class="form-section">
      <h3 class="section-title">Contato da Empresa</h3>
      <div class="form-row">
        <div class="form-group col-name">
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
        <div class="form-group col-email">
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
        <div class="form-group col-phone">
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
        <div class="form-group col-position">
          <label for="companyContact.positionCompany">Cargo</label>
          <input
            type="text"
            id="companyContact.positionCompany"
            v-model="form.companyContact.positionCompany"
            class="form-input"
            required
            placeholder="Cargo do contato"
          />
        </div>
      </div>
    </div>

    <!-- Seção 4: Contato do Gerente Bancário -->
    <div class="form-section">
      <h3 class="section-title">Contato do Gerente Bancário</h3>
      <div class="form-row">
        <div class="form-group col-name">
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
        <div class="form-group col-email">
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
        <div class="form-group col-phone">
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
        <div class="form-group col-position">
          <label for="bankManagerContact.positionCompany">Cargo</label>
          <input
            type="text"
            id="bankManagerContact.positionCompany"
            v-model="form.bankManagerContact.positionCompany"
            class="form-input"
            required
            placeholder="Cargo do gerente"
          />
        </div>
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
    </div>

    <!-- Modal de pré-visualização -->
    <div v-if="showPreviewModal" class="modal-overlay">
      <div class="modal-content">
        <div v-if="loading" class="loading-section">
          Carregando documentos...
        </div>

        <div v-else>
          <div class="document-viewer">
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
            <button class="btn btn-confirm" @click="submitForm">Enviar</button>
            <button class="btn btn-cancel" @click="showPreviewModal = false">Voltar</button>
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
        transportadora: '',
        bankId: this.bankId || '',
        legalName: '',
        cnpj: '',
        accountNumber: '',
        branchNumber: '',
        selectedProducts: Array.isArray(this.products) ? this.products : this.products.split(',').map(p => p.trim()),
        selectedCnabs: this.formType ? [this.formType] : [],
        companyContact: { name: '', email: '', fone: '', positionCompany: '' },
        bankManagerContact: { name: '', email: '', fone: '', positionCompany: '' },
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
    },
    isFormValid() {
      return this.validateFields();
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
    async handleSubmit() {
      // Primeiro abre o modal de pré-visualização
      this.showPreviewModal = true;
      this.loading = true;
      
      try {
        // Busca o HTML do backend para pré-visualização
        const endpoint = this.form.transportadora === 'finnet' 
          ? 'http://localhost:8000/letter/finnet'
          : 'http://localhost:8000/letter/nexxera';
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.form)
        });
        
        if (!response.ok) {
          throw new Error('Erro ao carregar pré-visualização');
        }
        
        const data = await response.json();
        
        // Armazena o HTML retornado
        if (this.form.transportadora === 'finnet') {
          this.finalHtmls.finnet = data.template;
        } else {
          this.finalHtmls.nexxera = data.template;
        }
        
        this.documentHash = data.hashed;
        this.loading = false;
      } catch (error) {
        console.error('Erro ao carregar pré-visualização:', error);
        this.loading = false;
        this.showPreviewModal = false;
        alert('Erro ao carregar pré-visualização. Verifique os dados do formulário.');
      }
    },
    async submitForm() {
      try {
        // Usa o endpoint de envio com o hash gerado
        const response = await fetch('http://localhost:8000/send-letter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hashed: this.documentHash
          })
        });
        
        if (!response.ok) {
          throw new Error('Erro ao enviar formulário');
        }
        
        const data = await response.json();
        this.finalize();
        // Handle success
      } catch (error) {
        console.error('Erro:', error);
        // Handle error
      }
    },
    validateFields() {
      const requiredFields = [
        'bankId', 'legalName', 'cnpj', 'accountNumber', 'branchNumber',
        'ufBank', 'bankCity', 'agreement', 'transportadora'
      ];

      const requiredContactFields = [
        'companyContact.name', 'companyContact.email', 'companyContact.fone', 'companyContact.positionCompany',
        'bankManagerContact.name', 'bankManagerContact.email', 'bankManagerContact.fone', 'bankManagerContact.positionCompany'
      ];

      const isValid = requiredFields.every(field => !!this.form[field]) &&
        requiredContactFields.every(field => {
          const [parent, child] = field.split('.');
          return !!this.form[parent]?.[child];
        });

      return isValid;
    },
    finalize() {
      this.showPreviewModal = false;
      this.$emit('update', { ...this.form, hash: this.documentHash });
      this.$emit('close');
      // Redireciona para o histórico após envio bem-sucedido
      this.$router.push('/historico');
    }
  }
}
</script>


<style scoped>
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.form-section {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section-title {
  margin-bottom: 1rem;
  color: #2c3e50;
  font-size: 1.2rem;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
}

/* Column widths */
.col-cnpj { grid-column: span 1; }
.col-name { grid-column: span 2; }
.col-bank { grid-column: span 2; }
.col-agency { grid-column: span 1; }
.col-account { grid-column: span 1; }
.col-uf { grid-column: span 1; }
.col-city { grid-column: span 2; }
.col-email { grid-column: span 2; }
.col-phone { grid-column: span 1; }
.col-position { grid-column: span 1; }

.form-row {
  grid-template-columns: repeat(4, 1fr);
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  border-color: #4a90e2;
  outline: none;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

select.form-input {
  background-color: white;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #4a90e2;
  color: white;
}

.btn-primary:hover {
  background-color: #357abd;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .col-cnpj,
  .col-name,
  .col-bank,
  .col-agency,
  .col-account,
  .col-uf,
  .col-city,
  .col-email,
  .col-phone,
  .col-position {
    grid-column: span 1;
  }
}

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
  border-radius: 8px;
  height: 550px;
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
  overflow: hidden;
  border: none;
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 1000px;
  width: 100%;
  height: auto;
  max-height: none;
  overflow-y: auto;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
.loading-section {
  text-align: center;
  padding: 2rem;
}
.btn-confirm { 
  background: #28a745; 
  color: white; 
}
.btn-cancel { 
  background: #dc3545; 
  color: white; 
}
</style>