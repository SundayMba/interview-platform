import { Link } from 'react-router';
import { ArrowRightIcon, SparklesIcon } from "lucide-react"
import { SignInButton } from "@clerk/clerk-react";


const Navbar = () => {
  return (
    <nav className='bg-base-100/80 backdrop-blur-md border-b border-primary/10 shadow-lg sticky top-0 z-50'>
      <div className='max-w-310 flex items-center justify-between p-4 mx-auto'> 
        <Link to="/" className='flex gap-3 items-center hover:scale-105 transition-all duration-200'>
          <div className='size-12 bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center rounded-xl'>
            <SparklesIcon className='size-6'/>
          </div>
          <div className='flex flex-col'>
            <span className='bg-linear-to-r from-primary via-secondary to-accent font-black font-mono text-2xl tracking-wider bg-clip-text text-transparent'>CodeCollab</span>
            <span className='text-xs text-base-content/60 font-medium -mt-1 mx-auto'>Code together</span>
          </div>
        </Link>

        {/* Sign In Button */}
        <SignInButton mode='modal'>
          <button className='flex bg-linear-to-br from-primary via-secondary to-accent text-white px-6 py-3 rounded-xl font-semibold text-lg hover:scale-105 transition-all group duration-200 items-center gap-2 shadow-lg hover:shadow-xl'>
            <span>Get Started</span>
            <ArrowRightIcon className='group-hover:translate-x-0.5'/>
          </button>
        </SignInButton>
      </div>
    </nav>
  )
}

export default Navbar;