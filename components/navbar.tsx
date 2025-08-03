import React from 'react'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
const navbar = () => {
  return (
    <nav className='bg-gray-200 flex justify-between items-center px-6 py-4 border-b'>
        {/* Left: Logo */}
        <div className='font-extrabold text-2xl'>TierEvent</div>
        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-4">
            <SignedOut>
                <SignInButton>
                    <button className="bg-black text-white rounded-full font-bold text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                        Sign In
                    </button>
                </SignInButton>
                <SignUpButton>
                    <button className="bg-black text-white rounded-full font-bold text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                        Sign Up
                    </button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>
                <div className="ml-auto">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </SignedIn>
        </div>
    </nav>
  )
}

export default navbar;  
