// src/plugins/mask.js
import { masks, applyMask } from '../utils/masks';

export default {
  install(app) {
    app.config.globalProperties.$applyMask = applyMask;
    
    app.provide('masks', masks);
    app.provide('applyMask', applyMask);
    
 
    app.directive('mask', {
      mounted(el, binding) {
        el.addEventListener('input', (e) => {
          e.target.value = applyMask(e.target.value, binding.value);
        });
      }
    });
  }
};