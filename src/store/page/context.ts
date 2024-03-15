import { createContext, useContext } from 'react';
import { pageStore } from './index';

export const StoreContext = createContext(pageStore);

export const useStores = () => useContext(StoreContext);