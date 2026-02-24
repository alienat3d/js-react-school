import './App.css';
import {ApiQuotaProvider} from './context/ApiQuotaContext';
import Counter from './components/Counter';
import RandomCounter from './components/RandomCounter';
import ReqCredit from './components/ReqsCredit';

// 169.8.8 И, наконец, в главном компоненте App мы обернём в компонент-обёртку контекста другие компоненты, чтобы наш функционал заработал.

function App() {
  return (
    <ApiQuotaProvider>
      <div className="container">
        <Counter />
        <RandomCounter />
        <ReqCredit/>
      </div>
    </ApiQuotaProvider>
  );
}

export default App;