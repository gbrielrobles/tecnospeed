<template>
  <form class="form-grid">
    <!-- Seção 0: Seleção de Método de Envio -->
    <div class="form-section">
      <h3 class="section-title">Seleção de Método de Envio</h3>
      <div class="form-group">
        <label for="transportadora">Método de Envio</label>
        <select
          id="transportadora"
          v-model="form.transportadora"
          class="form-input"
          required
        >
          <option value="">Selecione um método de envio</option>
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
          <ValidatedInput
            v-model="form.cnpj"
            label="CNPJ"
            id="cnpj"
            placeholder="00.000.000/0000-00"
            validation-type="cnpj"
            required
            @validation-change="handleValidationChange"
          />
        </div>
        <div class="form-group col-name">
          <ValidatedInput
            v-model="form.legalName"
            label="Nome Legal"
            id="legalName"
            placeholder="Razão social"
            validation-type="name"
            required
            @validation-change="handleValidationChange"
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
            disabled
            required
          />
          <input type="hidden" v-model="form.bankId">
        </div>
        <div class="form-group col-agency">
          <ValidatedInput
            v-model="form.branchNumber"
            label="Agência"
            id="branchNumber"
            placeholder="Número da agência"
            validation-type="branchNumber"
            required
            @validation-change="handleValidationChange"
          />
        </div>
        <div class="form-group col-account">
          <ValidatedInput
            v-model="form.accountNumber"
            label="Conta"
            id="accountNumber"
            placeholder="Número da conta"
            validation-type="accountNumber"
            required
            @validation-change="handleValidationChange"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-uf">
          <ValidatedInput
            v-model="form.ufBank"
            label="UF do Banco"
            id="ufBank"
            placeholder="Estado"
            validation-type="uf"
            maxlength="2"
            required
            @validation-change="handleValidationChange"
          />
        </div>
        <div class="form-group col-city">
          <ValidatedInput
            v-model="form.bankCity"
            label="Cidade do Banco"
            id="bankCity"
            placeholder="Cidade"
            validation-type="city"
            required
            @validation-change="handleValidationChange"
          />
        </div>
      </div>
    </div>

    <!-- Seção 3: Contato da Empresa -->
    <div class="form-section">
      <h3 class="section-title">Contato da Empresa</h3>
      <div class="form-row">
        <div class="form-group col-name">
          <ValidatedInput
            v-model="form.companyContact.name"
            label="Nome"
            id="companyContactName"
            placeholder="Nome do contato"
            validation-type="name"
            required
            @validation-change="handleValidationChange"
          />
        </div>
        <div class="form-group col-email">
          <ValidatedInput
            v-model="form.companyContact.email"
            label="Email"
            id="companyContactEmail"
            type="email"
            placeholder="email@empresa.com"
            validation-type="email"
            required
            @validation-change="handleValidationChange"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-phone">
          <ValidatedInput
            v-model="form.companyContact.fone"
            label="Telefone"
            id="companyContactPhone"
            placeholder="(11) 99999-9999"
            validation-type="phone"
            required
            @validation-change="handleValidationChange"
          />
        </div>
        <div class="form-group col-position">
          <ValidatedInput
            v-model="form.companyContact.positionCompany"
            label="Cargo"
            id="companyContactPosition"
            placeholder="Cargo na empresa"
            validation-type="position"
            required
            @validation-change="handleValidationChange"
          />
        </div>
      </div>
    </div>

    <!-- Seção 4: Contato do Gerente do Banco -->
    <div class="form-section">
      <h3 class="section-title">Contato do Gerente do Banco</h3>
      <div class="form-row">
        <div class="form-group col-name">
          <ValidatedInput
            v-model="form.bankManagerContact.name"
            label="Nome"
            id="bankManagerContactName"
            placeholder="Nome do gerente"
            validation-type="name"
            required
            @validation-change="handleValidationChange"
          />
        </div>
        <div class="form-group col-email">
          <ValidatedInput
            v-model="form.bankManagerContact.email"
            label="Email"
            id="bankManagerContactEmail"
            type="email"
            placeholder="email@banco.com"
            validation-type="email"
            required
            @validation-change="handleValidationChange"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-phone">
          <ValidatedInput
            v-model="form.bankManagerContact.fone"
            label="Telefone"
            id="bankManagerContactPhone"
            placeholder="(11) 99999-9999"
            validation-type="phone"
            required
            @validation-change="handleValidationChange"
          />
        </div>
        <div class="form-group col-position">
          <ValidatedInput
            v-model="form.bankManagerContact.positionCompany"
            label="Cargo"
            id="bankManagerContactPosition"
            placeholder="Cargo no banco"
            validation-type="position"
            required
            @validation-change="handleValidationChange"
          />
        </div>
      </div>
    </div>

    <!-- Seção 5: Acordo -->
    <div class="form-section">
      <h3 class="section-title">Outras Informações</h3>
      <div class="form-row">
        <div class="form-group col-agreement">
          <ValidatedInput
            v-model="form.agreement"
            label="Acordo"
            id="agreement"
            placeholder="Termo de acordo"
            validation-type="agreement"
            required
            @validation-change="handleValidationChange"
          />
        </div>
      </div>
    </div>

    <!-- Seção 6: Preferência de Contato -->
    <div class="form-section">
      <h3 class="section-title">Preferência de Contato</h3>
      <div class="form-group">
        <label class="checkbox-label">
          <input
            type="checkbox"
            v-model="form.preferenceByContact"
            value="W"
            class="checkbox-input"
          />
          WhatsApp
        </label>
        <label class="checkbox-label">
          <input
            type="checkbox"
            v-model="form.preferenceByContact"
            value="E"
            class="checkbox-input"
          />
          Email
        </label>
        <label class="checkbox-label">
          <input
            type="checkbox"
            v-model="form.preferenceByContact"
            value="T"
            class="checkbox-input"
          />
          Telefone
        </label>
      </div>
      <p v-if="preferenceLabel" class="preference-text">
        Preferências selecionadas: {{ preferenceLabel }}
      </p>
    </div>

    <!-- Modal de pré-visualização -->
    <div v-if="showPreviewModal" class="modal-overlay">
      <div class="modal-content large-modal">
        <div v-if="loading" class="loading-section">
          Carregando documentos...
        </div>
        <div v-else>
          <!-- Visualização do documento do meio de transporte selecionado -->
          <div class="document-viewer">
            <h4>
              Documento {{ form.transportadora === 'finnet' ? 'Finnet' : 'Nexxera' }}
            </h4>
            <div class="document-container">
              <iframe 
                :srcdoc="form.transportadora === 'finnet' ? finalHtmls.finnet : finalHtmls.nexxera" 
                width="100%" 
                height="600px" 
                style="border:1px solid #ccc;"
              />
            </div>
          </div>
        </div>
        <div class="modal-actions fixed-bottom">
          <button class="btn btn-confirm" @click="submitForm">Enviar</button>
          <button class="btn btn-cancel" @click="showPreviewModal = false">Voltar</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { applyMask } from '@/utils/masks';
import { validateForm } from '@/utils/validation';
import ValidatedInput from '@/components/ValidatedInput.vue';

export default {
  name: 'Cnab240Form',
  components: {
    ValidatedInput
  },
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
      validationErrors: {},
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
      const validation = validateForm(this.form);
      return validation.isValid && Object.keys(this.validationErrors).length === 0;
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
    handleValidationChange(validation) {
      if (validation.isValid) {
        delete this.validationErrors[validation.field];
      } else {
        this.validationErrors[validation.field] = validation.message;
      }
    },
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
      if (!this.isFormValid) {
        alert('Por favor, corrija os erros de validação antes de continuar.');
        return;
      }

      this.loading = true;
      
      try {
        // Converte valores string para número antes de enviar
        const formData = {
          ...this.form,
          accountNumber: this.form.accountNumber ? parseInt(this.form.accountNumber) || 0 : 0,
          branchNumber: this.form.branchNumber ? parseInt(this.form.branchNumber) || 0 : 0
        };
        
        // Gera o preview para Finnet
        const finnetResponse = await fetch('http://localhost:8000/letter/finnet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            carrier: 'FINNET'
          })
        });
        
        if (finnetResponse.ok) {
          const finnetData = await finnetResponse.json();
          this.finalHtmls.finnet = finnetData.template[0];
          this.documentHash = finnetData.hashed;
        }
        
        // Gera o preview para Nexxera
        const nexxeraResponse = await fetch('http://localhost:8000/letter/nexxera', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            carrier: 'NEXXERA'
          })
        });
        
        if (nexxeraResponse.ok) {
          const nexxeraData = await nexxeraResponse.json();
          this.finalHtmls.nexxera = nexxeraData.template[0];
        }
        
        // Emite os dados atualizados
        this.$emit('update', formData);
        
        // Abre o modal de preview
        this.showPreviewModal = true;
      } catch (error) {
        console.error('Erro ao processar formulário:', error);
        alert('Erro ao processar formulário. Tente novamente.');
      } finally {
        this.loading = false;
      }
    },
    async submitForm() {
      console.log('Iniciando envio da carta...');
      let redirect = false;
      try {
        console.log('Enviando para:', 'http://localhost:8000/send-letter');
        console.log('Hash:', this.documentHash);
        
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
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Erro na resposta:', errorText);
          throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
        }
        
        // Alteração: tratar resposta vazia
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};
        console.log('Resposta do servidor:', data);
        
        // Fecha o modal imediatamente
        this.showPreviewModal = false;
        console.log('Modal fechado');
        
        // Força o redirecionamento para o histórico
        console.log('Redirecionando para /historico...');
        this.$router.push('/historico');
        redirect = true;
        console.log('Redirecionamento executado');
        
      } catch (error) {
        console.error('Erro detalhado:', error);
        alert(`Erro ao enviar carta: ${error.message}`);
      } finally {
        // Garante o redirecionamento mesmo em caso de erro
        if (!redirect) {
          console.log('Forçando redirecionamento no finally...');
          this.showPreviewModal = false;
          this.$router.push('/historico');
        }
      }
    },
    finalize() {
      this.showPreviewModal = false;
      // Converte valores string para número antes de enviar
      const formData = {
        ...this.form,
        accountNumber: this.form.accountNumber ? parseInt(this.form.accountNumber) || 0 : 0,
        branchNumber: this.form.branchNumber ? parseInt(this.form.branchNumber) || 0 : 0
      };
      this.$emit('update', { ...formData, hash: this.documentHash });
      this.$emit('close');
    }
  }
}
</script>


<style scoped>
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.375rem;
  padding: 0.375rem;
  max-width: 1200px;
  margin: 0 auto;
  height: auto;
  overflow: visible;
  margin-bottom: 1rem;
}

.form-section {
  background: #f8f9fa;
  padding: 0.5rem;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 0.375rem;
}

.section-title {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-size: 0.9rem;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 0.25rem;
  font-weight: 600;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.375rem;
  margin-bottom: 0.375rem;
}

.form-group {
  margin-bottom: 0.375rem;
}

.form-input {
  padding: 0.375rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.85rem;
  transition: all 0.2s ease;
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

select.form-input {
  background-color: white;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
  padding-right: 30px;
  padding-top: 6px;
  padding-bottom: 6px;
  min-height: 32px;
  line-height: 1.2;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-left: 0.375rem;
  padding-right: 2rem;
}

select.form-input option {
  padding: 6px;
  white-space: normal;
  word-wrap: break-word;
}

.form-input:disabled {
  background-color: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
  opacity: 0.8;
}

label {
  font-weight: 500;
  margin-bottom: 0.0625rem;
  color: #333;
  font-size: 0.75rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 0.125rem;
  cursor: pointer;
  font-size: 0.75rem;
}

.checkbox-input {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}

.preference-text {
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: #666;
  font-style: italic;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 0.75rem;
}

.submit-btn {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #4a90e2;
  color: white;
  font-weight: 500;
}

/* Responsividade */
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
  .col-position,
  .col-agreement {
    grid-column: span 1;
  }
}

/* Classes específicas para colunas */
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
.col-agreement { grid-column: span 4; }

.document-navigation {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.25rem;
}

.nav-btn {
  padding: 0.25rem 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  border-bottom: 2px solid transparent;
  font-size: 0.85rem;
}

.nav-btn.active {
  color: #007bff;
  border-bottom: 2px solid #007bff;
}

.nav-btn:hover {
  color: #0056b3;
}

.document-viewer {
  margin-bottom: 0.75rem;
}

.document-viewer h4 {
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  color: #333;
}

.document-container iframe {
  height: calc(100vh - 250px);
  max-height: unset;
  min-height: 300px;
  width: 100%;
  border: 1px solid #ccc;
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background: white;
  padding: 0.75rem;
  border-radius: 6px;
  max-width: 95vw;
  width: 95vw;
  max-height: 90vh;
  height: 90vh;
  z-index: 101;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.large-modal {
  max-width: 95vw;
  width: 95vw;
  max-height: 90vh;
  height: 90vh;
}

.modal-actions {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
  gap: 1rem;
  background: white;
}

.fixed-bottom {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  z-index: 102;
}

.loading-section {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;
}

.btn-confirm { 
  background: #28a745; 
  color: white; 
}

.btn-confirm:hover {
  background: #218838;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.btn-cancel { 
  background: #6c757d; 
  color: white; 
}

.btn-cancel:hover {
  background: #5a6268;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
</style>