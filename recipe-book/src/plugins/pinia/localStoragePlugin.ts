import type { PiniaPluginContext } from 'pinia';

const localStoragePlugin = (context: PiniaPluginContext) => {
  const { store } = context;

  const storedState = localStorage.getItem(store.$id); //store name => 'recipes' In this case

  if (storedState) {
    store.$patch(JSON.parse(storedState));
  }

  store.$subscribe((_, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state));
  });
};

export default localStoragePlugin;
