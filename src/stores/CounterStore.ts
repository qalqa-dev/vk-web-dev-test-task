import { action, makeObservable, observable } from 'mobx';

class CounterStore {
  count = 0;

  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action,
    });
  }

  increment = () => {
    this.count += 1;
  };
}

export const counterStore = new CounterStore();
