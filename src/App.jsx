import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { CalculationsDetails } from './pages/CalculationsDetails';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculations" element={<CalculationsDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
