import HomePage from './pages/HomePage';
import { Routes, Route, Navigate } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react'
import DashBoard from './pages/DashBoardPage';
import Problems from './pages/ProblemsPage';


function App() {
  const { isSignedIn, isLoaded } = useAuth();

  //wait until auth completes initialiazation
  if (!isLoaded) {
    return null;
  }
  
  return (
    <>
      <Routes>
        <Route path="/" element={ !isSignedIn ? <HomePage /> : <Navigate to="/dashboard" /> } />
        <Route path="/dashboard" element={ isSignedIn ? <DashBoard /> : <Navigate to="/" /> } />
        <Route path="/problems" element={ isSignedIn ? <Problems /> : <Navigate to="/" /> } />
      </Routes>
      <Toaster  toastOptions={{duration: 200}}/>
    </>
  );
}

export default App;
