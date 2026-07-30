import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import RequestsPage from './pages/RequestsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule/:zoneId" element={<SchedulePage />} />
        <Route path="/requests" element={<RequestsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;