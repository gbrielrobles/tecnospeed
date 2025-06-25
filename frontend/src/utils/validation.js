// Validações baseadas nas regras do backend
export const validationRules = {
  // CNPJ: exatamente 14 dígitos
  cnpj: {
    validate: (value) => {
      const digits = value.replace(/\D/g, '');
      return digits.length === 14;
    },
    message: 'CNPJ deve conter exatamente 14 dígitos numéricos.',
    required: true
  },

  // Agência: exatamente 4 dígitos
  branchNumber: {
    validate: (value) => {
      const digits = value.replace(/\D/g, '');
      return /^\d{4}$/.test(digits);
    },
    message: 'Número da agência deve conter exatamente 4 dígitos numéricos.',
    required: true
  },

  // Conta: entre 5 e 12 dígitos
  accountNumber: {
    validate: (value) => {
      const digits = value.replace(/\D/g, '');
      return /^\d{5,12}$/.test(digits);
    },
    message: 'Número da conta deve conter entre 5 e 12 dígitos numéricos.',
    required: true
  },

  // Telefone: 10 ou 11 dígitos
  phone: {
    validate: (value) => {
      const digits = value.replace(/\D/g, '');
      return digits.length === 10 || digits.length === 11;
    },
    message: 'Telefone deve conter 10 ou 11 dígitos numéricos.',
    required: true
  },

  // DDD válido
  ddd: {
    validate: (value) => {
      const validDDDs = [
        '11','12','13','14','15','16','17','18','19',
        '21','22','24','27','28',
        '31','32','33','34','35','37','38',
        '41','42','43','44','45','46',
        '47','48','49',
        '51','53','54','55',
        '61','62','64','63','65','66','67','68','69',
        '71','73','74','75','77','79',
        '81','82','83','84','85','86','87','88','89',
        '91','92','93','94','95','96','97','98','99'
      ];
      const digits = value.replace(/\D/g, '');
      const ddd = digits.slice(0, 2);
      return validDDDs.includes(ddd);
    },
    message: 'DDD inválido. Forneça um DDD brasileiro válido.',
    required: true
  },

  // Email válido
  email: {
    validate: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    message: 'Email inválido.',
    required: true
  },

  // Nome não vazio
  name: {
    validate: (value) => {
      return value.trim().length > 0;
    },
    message: 'Nome é obrigatório.',
    required: true
  },

  // Cargo não vazio
  position: {
    validate: (value) => {
      return value.trim().length > 0;
    },
    message: 'Cargo é obrigatório.',
    required: true
  },

  // UF: exatamente 2 caracteres
  uf: {
    validate: (value) => {
      return value.length === 2;
    },
    message: 'UF deve conter exatamente 2 caracteres.',
    required: true
  },

  // Cidade não vazia
  city: {
    validate: (value) => {
      return value.trim().length > 0;
    },
    message: 'Cidade é obrigatória.',
    required: true
  },

  // Convênio não vazio
  agreement: {
    validate: (value) => {
      return value.trim().length > 0;
    },
    message: 'Convênio é obrigatório.',
    required: true
  }
};

// Função para validar um campo
export const validateField = (value, fieldType) => {
  const rule = validationRules[fieldType];
  if (!rule) return { isValid: true, message: '' };

  // Se o campo é obrigatório e está vazio
  if (rule.required && (!value || (typeof value === 'string' && value.trim() === '') || value === 0)) {
    const fieldNames = {
      'cnpj': 'CNPJ',
      'branchNumber': 'Número da agência',
      'accountNumber': 'Número da conta',
      'phone': 'Telefone',
      'ddd': 'DDD',
      'email': 'Email',
      'name': 'Nome',
      'position': 'Cargo',
      'uf': 'UF',
      'city': 'Cidade',
      'agreement': 'Convênio',
      'legalName': 'Razão social'
    };
    
    const fieldName = fieldNames[fieldType] || fieldType.charAt(0).toUpperCase() + fieldType.slice(1);
    return { isValid: false, message: `${fieldName} é obrigatório.` };
  }

  // Se não é obrigatório e está vazio, é válido
  if (!rule.required && (!value || (typeof value === 'string' && value.trim() === '') || value === 0)) {
    return { isValid: true, message: '' };
  }

  // Para campos numéricos, converte para string antes de validar
  let valueToValidate = value;
  if (typeof value === 'number') {
    valueToValidate = value.toString();
  }
  
  // Se o valor é uma string vazia, não aplica validação específica
  if (valueToValidate === '') {
    return { isValid: true, message: '' };
  }

  // Para campos numéricos, remove caracteres não numéricos antes de validar
  if (fieldType === 'branchNumber' || fieldType === 'accountNumber') {
    valueToValidate = valueToValidate.toString().replace(/\D/g, '');
  }

  // Aplica a validação específica
  const isValid = rule.validate(valueToValidate);
  return { isValid, message: isValid ? '' : rule.message };
};

// Função para validar telefone com DDD
export const validatePhone = (value) => {
  const phoneValidation = validateField(value, 'phone');
  if (!phoneValidation.isValid) return phoneValidation;

  const dddValidation = validateField(value, 'ddd');
  if (!dddValidation.isValid) return dddValidation;

  return { isValid: true, message: '' };
};

// Função para validar formulário completo
export const validateForm = (formData) => {
  const errors = {};
  let isValid = true;

  for (const [field, value] of Object.entries(formData)) {
    const validation = validateField(value, field);
    if (!validation.isValid) {
      errors[field] = validation.message;
      isValid = false;
    }
  }

  return { isValid, errors };
};