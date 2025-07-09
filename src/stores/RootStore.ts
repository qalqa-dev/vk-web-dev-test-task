import { makeObservable, observable } from 'mobx';
import { createContext } from 'react';
import { counterStore } from './CounterStore';

class RootStore {
  counterStore = counterStore;

  constructor() {
    makeObservable(this, {
      counterStore: observable,
    });
  }
}

export const rootStore = new RootStore();
export const StoreContext = createContext(rootStore);
