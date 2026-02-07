import { useUser } from '@clerk/clerk-react';
import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';

import { Toaster } from 'react-hot-toast';
import ProblemPage from './pages/ProblemPage';
import ProblemsPage from './pages/ProblemsPage';
import SessionPage from './pages/SessionPage';
import DashboardPage from './pages/DashBoardPage';
import { useState } from 'react';

function App() {
  const { isSignedIn, isLoaded } = useUser();
  const [firstTimeSignedIn, setFirstTimeSignedIn] = useState(true);

  // this will get rid of the flickering effect
  if (!isLoaded) return null;
  // console.log(firstTimeSignedIn);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={isSignedIn ? <DashboardPage /> : <Navigate to={'/'} />}
        />

        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to={'/'} />}
        />
        <Route
          path="/problem/:id"
          element={isSignedIn ? <ProblemPage /> : <Navigate to={'/'} />}
        />
        <Route
          path="/session/:id"
          element={isSignedIn ? <SessionPage /> : <Navigate to={'/'} />}
        />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
