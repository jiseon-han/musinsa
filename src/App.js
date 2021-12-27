import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Characters from './pages/Characters';

function App() {
  return (
    <div className="App">
      <header>MUSINSA</header>
      <Routes>
        <Route path="/characters" element={<Characters />} />
        <Route path="/" element={<Navigate to="/characters" />} />
      </Routes>
    </div>
  );
}

export default App;
