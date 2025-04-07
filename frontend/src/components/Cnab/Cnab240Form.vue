<template>
  <form @submit.prevent="handleSubmit" class="form-grid">
    <!-- Seção 1: Dados Bancários -->
    <div class="form-section">
      <h3 class="section-title">Dados Bancários</h3>
      
      <div class="form-group">
        <label for="banco">Banco</label>
        <input
          type="text"
          id="banco"
          v-model="form.banco"
          class="form-input"
          required
          disabled
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="agencia">Agência</label>
          <input
            type="text"
            id="agencia"
            v-model="form.agencia"
            class="form-input"
            required
            placeholder="Número da agência"
          />
        </div>

        <div class="form-group">
          <label for="digito_agencia">Dígito Agência</label>
          <input
            type="text"
            id="digito_agencia"
            v-model="form.digito_agencia"
            class="form-input input-small"
            placeholder="Dígito"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="conta">Conta</label>
          <input
            type="text"
            id="conta"
            v-model="form.conta"
            class="form-input"
            required
            placeholder="Número da conta"
          />
        </div>

        <div class="form-group">
          <label for="digito_conta">Dígito Conta</label>
          <input
            type="text"
            id="digito_conta"
            v-model="form.digito_conta"
            class="form-input input-small"
            required
            placeholder="Dígito"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="convenio">Convênio</label>
        <input
          type="text"
          id="convenio"
          v-model="form.convenio"
          class="form-input"
          placeholder="Número do convênio"
        />
      </div>

      <div class="form-group">
        <label for="produto">Produto</label>
        <input
          type="text"
          id="produto"
          v-model="form.produto"
          class="form-input"
          required
          disabled
        />
      </div>
    </div>

    <!-- Seção 2: Dados da Empresa -->
    <div class="form-section">
      <h3 class="section-title">Dados da Empresa</h3>           

      <div class="form-group">
        <label for="cnpj">CNPJ</label>
        <input
          type="text"
          id="cnpj"
          v-model="form.cnpj"
          v-mask="'##.###.###/####-##'"
          class="form-input"
          required
          placeholder="00.000.000/0000-00"
        />
      </div>

      <div class="form-group">
        <label for="nome_empresa">Nome da Empresa</label>
        <input
          type="text"
          id="nome_empresa"
          v-model="form.nome_empresa"
          class="form-input"
          required
          placeholder="Razão social"
        />
      </div>

      <div class="form-group">
        <label for="nome_fantasia">Nome Fantasia</label>
        <input
          type="text"
          id="nome_fantasia"
          v-model="form.nome_fantasia"
          class="form-input"
          placeholder="Nome fantasia"
        />
      </div>

      <div class="form-group">
        <label for="inscricao_estadual">Inscrição Estadual</label>
        <input
          type="text"
          id="inscricao_estadual"
          v-model="form.inscricao_estadual"
          class="form-input"
          placeholder="Inscrição estadual"
        />
      </div>
    </div>

    <!-- Seção 3: Endereço -->
    <div class="form-section">
      <h3 class="section-title">Endereço</h3>
      
      <div class="form-group">
        <label for="logradouro">Logradouro</label>
        <input
          type="text"
          id="logradouro"
          v-model="form.logradouro"
          class="form-input"
          required
          placeholder="Rua/Av."
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="numero">Número</label>
          <input
            type="text"
            id="numero"
            v-model="form.numero"
            class="form-input input-small"
            required
            placeholder="Nº"
          />
        </div>

        <div class="form-group">
          <label for="complemento">Complemento</label>
          <input
            type="text"
            id="complemento"
            v-model="form.complemento"
            class="form-input"
            placeholder="Complemento"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="bairro">Bairro</label>
        <input
          type="text"
          id="bairro"
          v-model="form.bairro"
          class="form-input"
          required
          placeholder="Bairro"
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="cidade">Cidade</label>
          <input
            type="text"
            id="cidade"
            v-model="form.cidade"
            class="form-input"
            required
            placeholder="Cidade"
          />
        </div>

        <div class="form-group">
          <label for="uf">UF</label>
          <input
            type="text"
            id="uf"
            v-model="form.uf"
            class="form-input input-small"
            required
            placeholder="Estado"
            maxlength="2"
          />
        </div>

        <div class="form-group">
          <label for="cep">CEP</label>
          <input
            type="text"
            id="cep"
            v-model="form.cep"
            v-mask="'#####-###'"
            class="form-input"
            required
            placeholder="00000-000"
          />
        </div>
      </div>
    </div>

    <!-- Seção 4: Informações do Arquivo -->
    <div class="form-section">
      <h3 class="section-title">Configuração do Arquivo</h3>
      
      <div class="form-group">
        <label for="codigo_empresa">Código da Empresa</label>
        <input
          type="text"
          id="codigo_empresa"
          v-model="form.codigo_empresa"
          class="form-input"
          required
          placeholder="Código interno"
        />
      </div>

      <div class="form-group">
        <label for="numero_sequencial_arquivo">Nº Sequencial do Arquivo</label>
        <input
          type="text"
          id="numero_sequencial_arquivo"
          v-model="form.numero_sequencial_arquivo"
          class="form-input"
          required
          placeholder="Sequência numérica"
        />
      </div>

      <div class="form-group">
        <label for="data_geracao">Data de Geração</label>
        <input
          type="date"
          id="data_geracao"
          v-model="form.data_geracao"
          class="form-input"
          required
        />
      </div>

      <div class="form-group">
        <label for="hora_geracao">Hora de Geração</label>
        <input
          type="time"
          id="hora_geracao"
          v-model="form.hora_geracao"
          class="form-input"
          required
        />
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

var props = defineProps({
  initialData: Object,
  bank: {
    type: String,
    required: true
  },
  products: {
    type: String,
    required: true
  }
})

var emit = defineEmits(['update'])

var form = ref({
  banco: props.bank || '',
  produto: props.products || '',
  cnpj: '',
  agencia: '',
  conta: '',
  digito_agencia: '',
  digito_conta: '',
  convenio: '',
  nome_empresa: '',
  nome_fantasia: '',
  inscricao_estadual: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  uf: '',
  cep: '',
  codigo_empresa: '',
  numero_sequencial_arquivo: '',
  data_geracao: '',
  hora_geracao: ''
})

watch(() => props.initialData, function(val) {
  if (val) {
    form.value = { ...form.value, ...val }
  }
}, { immediate: true })

watch(() => form.value.cnpj, async function(cnpj) {
  var cleanCnpj = cnpj?.replace(/\D/g, '')
  if (cleanCnpj?.length === 14) {
    try {
      var res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`)
      var data = await res.json()
      form.value.nome_empresa = data.razao_social || form.value.nome_empresa
      form.value.nome_fantasia = data.nome_fantasia || form.value.nome_fantasia
    } catch (err) {
      console.error('Erro ao consultar CNPJ:', err)
    }
  }
})

var handleSubmit = function() {
  emit('update', form.value)
}

var validateFields = function() {
  var requiredFields = [
    'banco', 'produto', 'agencia', 'conta', 'digito_conta',
    'nome_empresa', 'cnpj', 'logradouro', 'numero',
    'bairro', 'cidade', 'uf', 'cep',
    'codigo_empresa', 'numero_sequencial_arquivo',
    'data_geracao', 'hora_geracao'
  ]
  return requiredFields.every(function(field) { 
    return !!form.value[field] 
  })
}

defineExpose({
  validateFields: validateFields
})
</script>
