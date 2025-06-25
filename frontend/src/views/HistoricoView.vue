<template>
  <div class="historico-container">
    <AppHeader />
    
    <div class="content">
      <div class="header-section">
        <div class="title-container">
          <h1 class="page-title">Histórico de Cartas Enviadas</h1>
          <p class="page-subtitle">Consulte todas as cartas de abertura de relacionamento enviadas</p>
        </div>
        <button @click="goToCreate" class="new-letter-btn">
          <span class="icon">📝</span>
          Nova Carta
        </button>
      </div>

      <div class="filters-section">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchTerm" 
            placeholder="Buscar por empresa, banco, produtos ou status..."
            class="search-input"
          />
        </div>
        <div class="filter-buttons">
          <button 
            v-for="status in statusFilters" 
            :key="status.value"
            @click="filterByStatus(status.value)"
            :class="['filter-btn', { active: selectedStatus === status.value }]"
          >
            {{ status.label }}
          </button>
        </div>
      </div>

      <div class="loading-section" v-if="loading">
        <div class="loading-spinner"></div>
        <p>Carregando histórico...</p>
      </div>

      <div class="error-section" v-else-if="error">
        <p class="error-message">{{ error }}</p>
        <button @click="loadHistory" class="retry-btn">Tentar novamente</button>
      </div>

      <div class="history-list" v-else>
        <div 
          v-for="letter in filteredLetters" 
          :key="letter.id" 
          class="letter-card"
        >
          <div class="letter-info">
            <div class="company-info">
              <h3 class="company-name">{{ getLetterData(letter)?.legalName || 'N/A' }}</h3>
              <p class="cnpj">CNPJ: {{ getLetterData(letter)?.cnpj || 'N/A' }}</p>
            </div>
            
            <div class="bank-info">
              <h4 class="bank-name">{{ getLetterData(letter)?.name || 'N/A' }}</h4>
              <p class="account-info">
                Agência: {{ getLetterData(letter)?.bank?.branchNumber || 'N/A' }} | 
                Conta: {{ getLetterData(letter)?.bank?.accountNumber || 'N/A' }}
              </p>
            </div>

            <div class="products-info">
              <h4 class="products-title">Produtos</h4>
              <p class="products-list">{{ getProductsText(letter) }}</p>
            </div>

            <div class="status-info">
              <span :class="['status-badge', getStatusClass(letter.status)]">
                {{ getStatusLabel(letter.status) }}
              </span>
              <p class="date">{{ formatDate(letter.createdAt) }}</p>
              <p class="carrier">Transportadora: {{ letter.carrier }}</p>
            </div>
          </div>

          <div class="letter-actions">
            <button 
              @click="viewLetter(letter)" 
              class="action-btn view-btn"
              :disabled="!letter.base64letter"
              :title="letter.base64letter ? 'Visualizar carta' : 'PDF não disponível'"
            >
              <span class="icon">👁️</span>
              {{ letter.base64letter ? 'Visualizar' : 'Indisponível' }}
            </button>
            <button 
              @click="downloadLetter(letter)" 
              class="action-btn download-btn"
              :disabled="!letter.base64letter"
              :title="letter.base64letter ? 'Baixar carta' : 'PDF não disponível'"
            >
              <span class="icon">📥</span>
              {{ letter.base64letter ? 'Baixar' : 'Indisponível' }}
            </button>
          </div>
        </div>

        <div v-if="filteredLetters.length === 0" class="empty-state">
          <p>Nenhuma carta encontrada</p>
        </div>
      </div>
    </div>

    <!-- Modal de visualização -->
    <div v-if="showViewModal" class="modal-overlay" @click="closeViewModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Visualizar Carta</h3>
          <button @click="closeViewModal" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <iframe 
            :srcdoc="selectedLetterHtml" 
            width="100%" 
            height="100%" 
            style="border:1px solid #ccc;"
          />
        </div>
        <div class="modal-footer">
          <button @click="closeViewModal" class="modal-btn cancel-btn">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
  name: 'HistoricoView',
  components: {
    AppHeader
  },
  data() {
    return {
      letters: [],
      loading: true,
      error: null,
      searchTerm: '',
      selectedStatus: 'all',
      showViewModal: false,
      selectedLetterHtml: '',
      statusFilters: [
        { value: 'all', label: 'Todos' },
        { value: 'PENDING', label: 'Pendente' },
        { value: 'SENDING', label: 'Enviando' },
        { value: 'SENT', label: 'Enviado' },
        { value: 'ERROR', label: 'Erro' }
      ]
    }
  },
  computed: {
    filteredLetters() {
      let filtered = this.letters;

      // Filtro por status
      if (this.selectedStatus !== 'all') {
        filtered = filtered.filter(letter => letter.status === this.selectedStatus);
      }

      // Filtro por busca
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        filtered = filtered.filter(letter => {
          const letterData = this.getLetterData(letter);
          const products = this.getProducts(letter);
          const productsText = products.map(p => p.name).join(' ').toLowerCase();
          
          return (letterData.legalName || '').toLowerCase().includes(term) ||
                 (letterData.cnpj || '').includes(term) ||
                 (letterData.name || '').toLowerCase().includes(term) ||
                 productsText.includes(term) ||
                 this.getStatusLabel(letter.status).toLowerCase().includes(term) ||
                 (letter.carrier || '').toLowerCase().includes(term);
        });
      }

      return filtered;
    }
  },
  mounted() {
    this.loadHistory();
  },
  methods: {
    goToCreate() {
      this.$router.push('/create');
    },
    // Função auxiliar para processar base64 de forma robusta
    processBase64ToBlob(base64String, mimeType = 'application/pdf') {
      try {
        // Remove possíveis espaços e quebras de linha
        const cleanBase64 = base64String.replace(/\s/g, '');
        
        // Decodifica o base64
        const binaryString = atob(cleanBase64);
        
        // Converte para Uint8Array
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        console.log('Base64 processado com sucesso');
        console.log('Tamanho original:', base64String.length);
        console.log('Tamanho limpo:', cleanBase64.length);
        console.log('Tamanho decodificado:', bytes.length);
        console.log('Primeiros bytes:', Array.from(bytes.slice(0, 10)));
        
        return new Blob([bytes], { type: mimeType });
      } catch (error) {
        console.error('Erro ao processar base64:', error);
        throw error;
      }
    },
    
    async loadHistory() {
      this.loading = true;
      this.error = null;
      
      try {
        console.log('Iniciando carregamento do histórico...');
        
        const response = await fetch('http://localhost:8000/get-history-letter/cmbk78ynb000007lbabwkfokt', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Response error text:', errorText);
          throw new Error(`Erro HTTP ${response.status}: ${errorText || 'Erro ao carregar histórico'}`);
        }
        
        const data = await response.json();
        console.log('Dados recebidos:', data);
        
        if (!Array.isArray(data)) {
          console.warn('Dados não são um array:', typeof data, data);
          this.letters = Array.isArray(data) ? data : [data];
        } else {
          this.letters = data;
        }
        
        console.log('Histórico carregado com sucesso. Total de cartas:', this.letters.length);
        
      } catch (error) {
        console.error('Erro detalhado ao carregar histórico:', error);
        
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          this.error = 'Erro de conexão. Verifique se o servidor está rodando em http://localhost:8000';
        } else if (error.message.includes('CORS')) {
          this.error = 'Erro de CORS. Verifique a configuração do servidor.';
        } else {
          this.error = `Erro ao carregar histórico: ${error.message}`;
        }
      } finally {
        this.loading = false;
      }
    },
    
    getLetterData(letter) {
      try {
        if (!letter || !letter.letter) {
          return {
            legalName: 'Dados não disponíveis',
            cnpj: 'N/A',
            name: 'N/A',
            products: [],
            bank: {
              branchNumber: 'N/A',
              accountNumber: 'N/A'
            }
          };
        }
        
        // O campo 'letter' contém um JSON string com todos os dados
        const parsedData = JSON.parse(letter.letter);
        
        // Verifica se os dados estão no formato esperado
        if (parsedData && typeof parsedData === 'object') {
          // Novo formato com bank e client separados
          if (parsedData.bank && parsedData.client) {
            return {
              legalName: parsedData.client.legalName || 'N/A',
              cnpj: parsedData.client.cnpj || 'N/A',
              name: parsedData.bank.name || 'N/A',
              products: parsedData.bank.products || [],
              bank: {
                branchNumber: parsedData.client.branchNumber || 'N/A',
                accountNumber: parsedData.client.accountNumber || 'N/A'
              }
            };
          }
          
          // Formato antigo com estrutura plana
          return {
            legalName: parsedData.legalName || 'N/A',
            cnpj: parsedData.cnpj || 'N/A',
            name: parsedData.name || 'N/A',
            products: parsedData.products || [],
            bank: parsedData.bank || {
              branchNumber: 'N/A',
              accountNumber: 'N/A'
            }
          };
        }
        
        return {
          legalName: 'Erro ao carregar dados',
          cnpj: 'N/A',
          name: 'N/A',
          products: [],
          bank: {
            branchNumber: 'N/A',
            accountNumber: 'N/A'
          }
        };
      } catch (error) {
        console.error('Erro ao fazer parse da carta:', error, letter);
        return {
          legalName: 'Erro ao carregar dados',
          cnpj: 'N/A',
          name: 'N/A',
          products: [],
          bank: {
            branchNumber: 'N/A',
            accountNumber: 'N/A'
          }
        };
      }
    },
    
    getProducts(letter) {
      try {
        const letterData = this.getLetterData(letter);
        // Verifica se products é um array e tem a estrutura esperada
        if (Array.isArray(letterData.products)) {
          // Filtra apenas produtos selecionados se houver a propriedade selected
          const selectedProducts = letterData.products.filter(product => 
            product.selected !== false // Inclui produtos sem propriedade selected ou com selected: true
          );
          return selectedProducts;
        }
        return [];
      } catch (error) {
        console.error('Erro ao obter produtos:', error);
        return [];
      }
    },
    
    getProductsText(letter) {
      const products = this.getProducts(letter);
      if (products.length === 0) return 'Nenhum produto';
      
      return products.map(product => product.name).join(', ');
    },
    
    filterByStatus(status) {
      this.selectedStatus = status;
    },
    
    getStatusLabel(status) {
      const statusMap = {
        'PENDING': 'Pendente',
        'SENDING': 'Enviando',
        'SENT': 'Enviado',
        'ERROR': 'Erro'
      };
      return statusMap[status] || status;
    },
    
    getStatusClass(status) {
      const classMap = {
        'PENDING': 'status-pending',
        'SENDING': 'status-sending',
        'SENT': 'status-sent',
        'ERROR': 'status-error'
      };
      return classMap[status] || 'status-default';
    },
    
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    
    async viewLetter(letter) {
      try {
        console.log('Visualizando carta:', letter);
        console.log('base64letter disponível:', !!letter.base64letter);
        console.log('Tamanho do base64letter:', letter.base64letter?.length);
        
        if (letter.base64letter) {
          // Verifica se o base64 é válido
          if (letter.base64letter.length < 100) {
            console.error('Base64 muito pequeno, pode estar inválido');
            alert('PDF não está disponível ou está corrompido');
            return;
          }
          
          // Processa o base64 usando a função auxiliar
          const pdfBlob = this.processBase64ToBlob(letter.base64letter);
          console.log('Blob criado, tamanho:', pdfBlob.size);
          
          // Verifica se os primeiros bytes são do PDF
          const arrayBuffer = await pdfBlob.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          const pdfSignature = String.fromCharCode(...uint8Array.slice(0, 4));
          
          if (pdfSignature !== '%PDF') {
            console.error('Dados não parecem ser um PDF válido:', pdfSignature);
            alert('Arquivo não é um PDF válido');
            return;
          }
          
          // Cria URL do Blob e abre em nova aba
          const pdfUrl = URL.createObjectURL(pdfBlob);
          console.log('Abrindo PDF com URL:', pdfUrl);
          
          const newWindow = window.open(pdfUrl, '_blank');
          
          if (!newWindow) {
            console.error('Popup bloqueado pelo navegador');
            alert('Popup bloqueado. Permita popups para este site.');
            return;
          }
          
          // Limpa a URL após um tempo
          setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);
        } else {
          alert('PDF não disponível para visualização');
        }
      } catch (error) {
        console.error('Erro ao visualizar carta:', error);
        alert('Erro ao visualizar carta: ' + error.message);
      }
    },
    
    async downloadLetter(letter) {
      try {
        console.log('Baixando carta:', letter);
        console.log('base64letter disponível:', !!letter.base64letter);
        console.log('Tamanho do base64letter:', letter.base64letter?.length);
        
        if (letter.base64letter) {
          // Verifica se o base64 é válido
          if (letter.base64letter.length < 100) {
            console.error('Base64 muito pequeno, pode estar inválido');
            alert('PDF não está disponível ou está corrompido');
            return;
          }
          
          // Processa o base64 usando a função auxiliar
          const pdfBlob = this.processBase64ToBlob(letter.base64letter);
          console.log('Blob criado, tamanho:', pdfBlob.size);
          
          // Verifica se os primeiros bytes são do PDF
          const arrayBuffer = await pdfBlob.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          const pdfSignature = String.fromCharCode(...uint8Array.slice(0, 4));
          
          if (pdfSignature !== '%PDF') {
            console.error('Dados não parecem ser um PDF válido:', pdfSignature);
            alert('Arquivo não é um PDF válido');
            return;
          }
          
          // Cria link de download
          const downloadUrl = URL.createObjectURL(pdfBlob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          
          // Nome do arquivo baseado na empresa e data
          const letterData = this.getLetterData(letter);
          const companyName = letterData?.legalName || 'carta';
          const date = new Date(letter.createdAt).toISOString().split('T')[0];
          link.download = `carta_${companyName}_${date}.pdf`;
          
          // Executa o download
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Limpa a URL
          setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
        } else {
          alert('PDF não disponível para download');
        }
      } catch (error) {
        console.error('Erro ao baixar carta:', error);
        alert('Erro ao baixar carta: ' + error.message);
      }
    },
    
    closeViewModal() {
      this.showViewModal = false;
      this.selectedLetterHtml = '';
    }
  }
}
</script>

<style scoped>
.historico-container {
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.title-container {
  flex: 1;
  text-align: left;
}

.page-title {
  font-size: 1.75rem;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.page-subtitle {
  color: #666;
  font-size: 0.9rem;
}

.new-letter-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #4a90e2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  white-space: nowrap;
}

.new-letter-btn:hover {
  background: #357abd;
}

.new-letter-btn .icon {
  font-size: 1rem;
}

.filters-section {
  background: white;
  padding: 0.75rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
  height: 100px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  box-sizing: border-box;
  position: relative;
  overflow: visible;
}

.search-box {
  margin-bottom: 0.5rem;
  flex-shrink: 0;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  height: 36px;
  box-sizing: border-box;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  height: 40px;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  /* Força os botões a manterem posição */
  justify-content: flex-start;
}

.filter-btn {
  padding: 0.35rem 0.7rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.8rem;
  flex-shrink: 0;
  white-space: nowrap;
}

.filter-btn.active {
  background: #4a90e2;
  color: white;
  border-color: #4a90e2;
}

.loading-section {
  text-align: center;
  padding: 1.5rem;
  width: 100%;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4a90e2;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 0 auto 0.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-section {
  text-align: center;
  padding: 1.5rem;
  width: 100%;
}

.error-message {
  color: #dc3545;
  margin-bottom: 0.5rem;
}

.retry-btn {
  padding: 0.4rem 0.8rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.history-list {
  width: 100%;
}

.letter-card {
  background: white;
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  min-height: 70px;
  width: 100%;
  box-sizing: border-box;
}

.letter-info {
  flex: 1;
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 1fr;
  gap: 0.75rem;
  align-items: center;
}

.company-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.company-name {
  font-size: 0.95rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
  line-height: 1.2;
}

.cnpj {
  color: #666;
  font-size: 0.75rem;
  margin: 0;
}

.bank-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.bank-name {
  font-size: 0.85rem;
  font-weight: bold;
  color: #4a90e2;
  margin: 0;
  line-height: 1.2;
}

.account-info {
  color: #666;
  font-size: 0.75rem;
  margin: 0;
}

.products-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.products-title {
  font-size: 0.85rem;
  font-weight: bold;
  color: #4a90e2;
  margin: 0;
  line-height: 1.2;
}

.products-list {
  color: #666;
  font-size: 0.75rem;
  margin: 0;
}

.status-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: flex-end;
}

.status-badge {
  display: inline-block;
  padding: 0.15rem 0.3rem;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: bold;
  margin: 0;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-sending {
  background: #cce5ff;
  color: #004085;
}

.status-sent {
  background: #d4edda;
  color: #155724;
}

.status-error {
  background: #f8d7da;
  color: #721c24;
}

.date {
  color: #666;
  font-size: 0.65rem;
  margin: 0;
}

.carrier {
  color: #666;
  font-size: 0.65rem;
  font-weight: bold;
  margin: 0;
}

.letter-actions {
  display: flex;
  gap: 0.4rem;
  flex-shrink: 0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.35rem 0.6rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.2s;
  white-space: nowrap;
}

.action-btn:disabled {
  background: #ccc !important;
  color: #666 !important;
  cursor: not-allowed;
  opacity: 0.6;
}

.action-btn:disabled:hover {
  background: #ccc !important;
  color: #666 !important;
}

.view-btn {
  background: #17a2b8;
  color: white;
}

.view-btn:hover {
  background: #138496;
}

.download-btn {
  background: #28a745;
  color: white;
}

.download-btn:hover {
  background: #218838;
}

.icon {
  font-size: 0.8rem;
}

.empty-state {
  text-align: center;
  padding: 1.5rem;
  color: #666;
  width: 100%;
  box-sizing: border-box;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 0.5rem;
}

.modal-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  width: 95%;
  max-width: 1400px;
  height: 95vh;
  max-height: 900px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;
  flex-shrink: 0;
}

.modal-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background: #e9ecef;
}

.modal-body {
  flex: 1;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.modal-body iframe {
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0;
  min-height: 0;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
  background: #f8f9fa;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;
}

.modal-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
  min-width: 80px;
}

.cancel-btn {
  background: #6c757d;
  color: white;
}

.cancel-btn:hover {
  background: #5a6268;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .content {
    padding: 0.5rem;
    /* Remove largura mínima em telas pequenas */
    min-width: auto;
  }
  
  .header-section {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
  
  .title-container {
    text-align: center;
  }
  
  .new-letter-btn {
    align-self: center;
  }
  
  .filters-section {
    width: 100%;
    min-width: auto;
    max-width: none;
    box-sizing: border-box;
    height: auto;
    min-height: 100px;
  }
  
  .search-input {
    min-width: auto;
  }
  
  .letter-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .letter-info {
    grid-template-columns: 1fr;
    gap: 0.4rem;
    width: 100%;
  }
  
  .status-info {
    align-items: flex-start;
  }
  
  .letter-actions {
    width: 100%;
    justify-content: flex-end;
  }
  
  .filter-buttons {
    justify-content: center;
    height: auto;
    min-height: 40px;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
}
</style> 