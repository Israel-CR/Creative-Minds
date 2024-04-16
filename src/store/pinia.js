// En tu archivo de configuración de Pinia (por ejemplo, pinia.js)
import { createPinia } from 'pinia';

const pinia = createPinia();

// Función para resetear todos los stores
export function resetearStores() {
  const stores = pinia._stores;

  for (const [, store] of stores) {
    if (typeof store.reset === 'function') {
      store.reset();
    }
  }
}

export default pinia;