import { useState } from 'react';
import './App.css';
import {
  SignedIn,
  SignInButton,
  SignOutButton,
  SignedOut,
  UserButton,
} from '@clerk/clerk-react';

function App() {
  return (
    <>
      <h1>Welcome to the Interview Platform</h1>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      <UserButton />
    </>
  );
}

export default App;
