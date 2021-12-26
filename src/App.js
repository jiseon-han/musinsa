import './App.css';
import { Routes, Route } from 'react-router-dom';
import Characters from './pages/Characters';

function App() {
  return (
    <div className="App">
      <header>MUSINSA</header>
      <Routes>
        <Route path="/" element={<Characters />} />
      </Routes>
    </div>
  );
}

export default App;
