import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import { rootStore, StoreContext } from './stores/RootStore';
import viteLogo from '/vite.svg';

const Counter = observer(() => {
  const { counterStore } = useContext(StoreContext);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={counterStore.increment}>
          count is {counterStore.count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
});

function App() {
  return (
    <>
      <StoreContext.Provider value={rootStore}>
        <Counter />
      </StoreContext.Provider>
    </>
  );
}

export default App;
