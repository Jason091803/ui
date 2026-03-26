import { useState } from 'react';

interface SignupPageProps {
  onNavigateToLogin: () => void;
  onNavigateToCreateAccount: (email: string) => void;
  onNavigateToTerms: () => void;
  onNavigateToPrivacy: () => void;
}

export default function SignupPage({ onNavigateToLogin, onNavigateToCreateAccount, onNavigateToTerms, onNavigateToPrivacy }: SignupPageProps) {
  const [userType, setUserType] = useState('client');
  const [email, setEmail] = useState('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const emailToUse = email || 'prototype@gmail.com';
    console.log('Signup attempt:', { userType, email: emailToUse });
    onNavigateToCreateAccount(emailToUse);
  };

  return (
    <div className="size-full flex flex-col bg-[#F5F1E8] overflow-auto">
      {/* Header */}
      <header className="bg-[color:var(--theme-primary)] text-white py-6 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl">Sign Up</h1>
          <div className="w-12 h-0.5 bg-white mx-auto mt-1"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pt-12 pb-8 max-w-md mx-auto w-full">
        {/* Logo/Title */}
        <h2 className="text-[color:var(--theme-primary)] text-3xl text-center mb-12">Braver Ventures</h2>

        {/* Signup Form */}
        <div className="space-y-6">
          <h3 className="text-xl text-center text-black mb-8">Create an Account</h3>

          <form onSubmit={handleContinue} className="space-y-4">
            {/* User Type Dropdown */}
            <div className="relative">
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-700 appearance-none pr-10"
              >
                <option value="client">Sign up as Client</option>
                <option value="investor">Sign up as Investor</option>
                <option value="partner">Sign up as Partner</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Email Input */}
            <input
              type="email"
              placeholder="email@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400"
            />

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full bg-[color:var(--theme-primary)] text-white py-4 rounded-lg hover:bg-[color:var(--theme-secondary)] transition-colors"
            >
              Continue
            </button>
          </form>

          {/* Link to Login */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={onNavigateToLogin}
                className="text-[color:var(--theme-primary)] underline hover:text-[color:var(--theme-secondary)]"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 text-center text-gray-600 text-sm">
        <p>
          By clicking continue, you agree to our{' '}
          <button
            onClick={onNavigateToTerms}
            className="text-[color:var(--theme-primary)] underline hover:text-[color:var(--theme-secondary)]"
          >
            Terms of Service
          </button>{' '}
          and{' '}
          <button
            onClick={onNavigateToPrivacy}
            className="text-[color:var(--theme-primary)] underline hover:text-[color:var(--theme-secondary)]"
          >
            Privacy Policy
          </button>
        </p>
      </footer>
    </div>
  );
}
