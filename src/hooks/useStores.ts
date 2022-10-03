import { useContext } from 'react';
import { StoreContext } from '../store/root.store';

export const useStores = () => useContext(StoreContext);
