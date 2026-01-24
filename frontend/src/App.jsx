import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
