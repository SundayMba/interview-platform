import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react'
import DashBoard from './pages/Dashboard';


function App() {
  const { isSignedIn, isLoaded } = useAuth();

  //wait until auth completes initialiazation
  if (!isLoaded) {
    return null;
  }
  
  return (
    <>
      <Routes>
        <Route path="/" element={ !isSignedIn ? <HomePage /> : <DashBoard /> } />
        <Route path="/dashboard" element={ isSignedIn ? <DashBoard /> : <HomePage /> } />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
