import {
  useAuth,
  SignInButton,
  SignedIn,
  UserButton,
} from '@clerk/clerk-react';
import { ArrowRightIcon, BookOpenIcon, SparklesIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router';

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  return (
    <nav className="bg-base-100/80 sticky top-0 z-50 backdrop-blur-md border-b border-primary/50 shadow-lg">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to={'/'}
          className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
        >
          {/* LOGO Container */}
          <div className="size-10 rounded-xl bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
            <SparklesIcon className="size-6 text-white" />
          </div>
          {/* LOGO Text */}
          <div className="flex flex-col">
            <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider font-black text-xl">
              Collab
            </span>
            <span className="text-base-content/50 text-xs -my-1">
              Code together
            </span>
          </div>
        </Link>

        {!isSignedIn && (
          <SignInButton mode="modal">
            <button className="btn group hover:scale-105 transition-all duration-200 bg-linear-to-br from-primary via-secondary to-accent rounded-xl shadow-2xl p-4">
              <span className="font-mono font-black">Get Started</span>
              <ArrowRightIcon className="size-5 text-white group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </SignInButton>
        )}

        <SignedIn>
          <div className="flex items-center gap-3">
            {/* Problems Link */}
            <Link
              to="/problems"
              className={`flex p-5 items-center gap-2 btn rounded-lg shadow-xl ${isActive('/problems') ? 'bg-primary text-primary-content' : 'bg-base-200 btn-outline text-base-content'}`}
            >
              <BookOpenIcon className="size-4" />
              <span className="font-bold font-mono">Problems</span>
            </Link>

            {/* Dashboard Link */}
            <Link
              to="/dashboard"
              className={`flex p-5 items-center gap-2 btn rounded-lg shadow-xl ${isActive('/dashboard') ? 'bg-primary text-primary-content' : 'bg-base-200 btn-outline text-base-content'}`}
            >
              <BookOpenIcon className="size-4" />
              <span className="font-bold font-mono">Dashboard</span>
            </Link>
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
