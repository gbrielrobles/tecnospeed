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
          />
        </div>
        <div class="form-group">
          <label for="digito_agencia">Dígito</label>
          <input
            type="text"
            id="digito_agencia"
            v-model="form.digito_agencia"
            class="form-input input-small"
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
          />
        </div>
        <div class="form-group">
          <label for="digito_conta">Dígito</label>
          <input
            type="text"
            id="digito_conta"
            v-model="form.digito_conta"
            class="form-input input-small"
            required
          />
        </div>
      </div>

      <div class="form-group">
        <label for="codigo_cedente">Código do Cedente</label>
        <input
          type="text"
          id="codigo_cedente"
          v-model="form.codigo_cedente"
          class="form-input"
          required
        />
      </div>

      <div class="form-group">
        <label for="carteira">Carteira</label>
        <input
          type="text"
          id="carteira"
          v-model="form.carteira"
          class="form-input"
          required
        />
      </div>

      <div class="form-group">
        <label for="tipo_cobranca">Tipo de Cobrança</label>
        <input
          type="text"
          id="tipo_cobranca"
          v-model="form.tipo_cobranca"
          class="form-input"
          required
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

    <!-- Seção 2: Empresa (idêntico ao CNAB240) -->
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
        />
      </div>

      <div class="form-group">
        <label for="nome_fantasia">Nome Fantasia</label>
        <input
          type="text"
          id="nome_fantasia"
          v-model="form.nome_fantasia"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="inscricao_estadual">Inscrição Estadual</label>
        <input
          type="text"
          id="inscricao_estadual"
          v-model="form.inscricao_estadual"
          class="form-input"
        />
      </div>
    </div>

    <!-- Seção 3: Geração do Arquivo -->
    <div class="form-section">
      <h3 class="section-title">Geração do Arquivo</h3>

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

const props = defineProps(['bank', 'products', 'initialData'])
const emit = defineEmits(['update'])

var form = ref({
  banco: props.bank || '',
  produto: props.products || '',
  agencia: '',
  digito_agencia: '',
  conta: '',
  digito_conta: '',
  codigo_cedente: '',
  carteira: '',
  tipo_cobranca: '',
  cnpj: '',
  nome_empresa: '',
  nome_fantasia: '',
  inscricao_estadual: '',
  data_geracao: '',
  hora_geracao: ''
})

watch(() => props.initialData, (val) => {
  if (val) {
    form.value = { ...form.value, ...val }
  }
}, { immediate: true })

watch(() => form.value.cnpj, async (cnpj) => {
  var clean = cnpj?.replace(/\D/g, '')
  if (clean?.length === 14) {
    try {
      var res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${clean}`)
      var data = await res.json()
      form.value.nome_empresa = data.razao_social || form.value.nome_empresa
      form.value.nome_fantasia = data.nome_fantasia || form.value.nome_fantasia
    } catch (err) {
      console.error('Erro ao consultar CNPJ:', err)
    }
  }
})

function handleSubmit() {
  emit('update', form.value)
}

function validateFields() {
  var requiredFields = [
    'banco', 'produto', 'agencia', 'conta', 'digito_conta',
    'codigo_cedente', 'carteira', 'tipo_cobranca',
    'cnpj', 'nome_empresa', 'data_geracao', 'hora_geracao'
  ]
  return requiredFields.every(field => !!form.value[field])
}

defineExpose({
  validateFields
})
</script>
