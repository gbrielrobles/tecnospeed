<template>
  <div class="historico-container">
    <AppHeader />
    
    <div class="content">
      <div class="header-section">
        <h1 class="page-title">Histórico de Cartas Enviadas</h1>
        <p class="page-subtitle">Consulte todas as cartas de abertura de relacionamento enviadas</p>
      </div>

      <div class="filters-section">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchTerm" 
            placeholder="Buscar por empresa, banco ou status..."
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
              title="Visualizar carta"
            >
              <span class="icon">👁️</span>
              Visualizar
            </button>
            <button 
              @click="downloadLetter(letter)" 
              class="action-btn download-btn"
              title="Baixar carta"
            >
              <span class="icon">📥</span>
              Baixar
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
            height="600px" 
            style="border:1px solid #ccc;"
          />
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
          return (letterData.legalName || '').toLowerCase().includes(term) ||
                 (letterData.cnpj || '').includes(term) ||
                 (letterData.name || '').toLowerCase().includes(term) ||
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
            bank: {
              branchNumber: 'N/A',
              accountNumber: 'N/A'
            }
          };
        }
        
        const parsedData = JSON.parse(letter.letter);
        return parsedData || {
          legalName: 'Erro ao carregar dados',
          cnpj: 'N/A',
          name: 'N/A',
          bank: {
            branchNumber: 'N/A',
            accountNumber: 'N/A'
          }
        };
      } catch (error) {
        console.error('Erro ao fazer parse da carta:', error);
        return {
          legalName: 'Erro ao carregar dados',
          cnpj: 'N/A',
          name: 'N/A',
          bank: {
            branchNumber: 'N/A',
            accountNumber: 'N/A'
          }
        };
      }
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
        if (letter.letter) {
          // Decodifica o PDF em base64
          const pdfData = atob(letter.letter);
          const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
          const pdfUrl = URL.createObjectURL(pdfBlob);
          
          // Abre o PDF em uma nova aba
          window.open(pdfUrl, '_blank');
          
          // Limpa a URL após um tempo
          setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);
        }
      } catch (error) {
        console.error('Erro ao visualizar carta:', error);
        alert('Erro ao visualizar carta');
      }
    },
    
    async downloadLetter(letter) {
      try {
        if (letter.letter) {
          // Decodifica o PDF em base64
          const pdfData = atob(letter.letter);
          const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
          
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
        }
      } catch (error) {
        console.error('Erro ao baixar carta:', error);
        alert('Erro ao baixar carta');
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
  height: 100vh;
  background: #f5f5f5;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem;
  flex: 1;
}

.header-section {
  text-align: center;
  margin-bottom: 1rem;
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

.filters-section {
  background: white;
  padding: 0.75rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
}

.search-box {
  margin-bottom: 0.5rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.35rem 0.7rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.8rem;
}

.filter-btn.active {
  background: #4a90e2;
  color: white;
  border-color: #4a90e2;
}

.loading-section {
  text-align: center;
  padding: 1.5rem;
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
}

.letter-info {
  flex: 1;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
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
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  width: 800px;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .content {
    padding: 0.5rem;
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
  }
  
  .page-title {
    font-size: 1.5rem;
  }
}
</style> 