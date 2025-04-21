// src/utils/masks.js
export const masks = {
    cnpj: (value) => {
      const digits = value.replace(/\D/g, '');
      return digits
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2') 
        .replace(/(\d{4})(\d)/, '$1-$2')
        .substring(0, 18);
    },
    phone: (value) => {
        const digits = value.replace(/\D/g, '').substring(0, 11); 
      
        return digits
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{5})(\d)/, '$1-$2')
          .substring(0, 15);
      },
    cep: (value) => {
      const digits = value.replace(/\D/g, '');
      return digits
        .replace(/(\d{5})(\d)/, '$1-$2')
        .substring(0, 9);
    }
  };
  
  export const applyMask = (value, maskType) => {
    if (!masks[maskType]) return value;
    return masks[maskType](value);
  };