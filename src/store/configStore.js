import configStoreDev from './configStore.dev';
import configStoreProd from './configStore.prod';

const selectedConfigStore =
  process.env.NODE_ENV === 'production'
    ? configStoreProd
    : configStoreDev;

export const { configureStore } = selectedConfigStore;

