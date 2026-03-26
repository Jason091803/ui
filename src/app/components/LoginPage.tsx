import { useState } from 'react';

interface LoginPageProps {
  onNavigateToSignup: () => void;
  onNavigateToReset: () => void;
  onNavigateToTerms: () => void;
  onNavigateToPrivacy: () => void;
  onNavigateToHome: () => void;
}

export default function LoginPage({ onNavigateToSignup, onNavigateToReset, onNavigateToTerms, onNavigateToPrivacy, onNavigateToHome }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, userType });
    // Navigate to home page
    onNavigateToHome();
  };

  return (
    <div className="size-full flex flex-col bg-[#F5F1E8] overflow-auto">
      {/* Header */}
      <header className="bg-[color:var(--theme-primary)] text-white py-6 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl">Login</h1>
          <div className="w-12 h-0.5 bg-white mx-auto mt-1"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pt-12 pb-8 max-w-md mx-auto w-full">
        {/* Logo/Title */}
        <h2 className="text-[color:var(--theme-primary)] text-3xl text-center mb-12">Braver Ventures</h2>

        {/* Login Form */}
        <div className="space-y-6">
          <h3 className="text-xl text-center text-black mb-8">Login to your Account</h3>

          {/* User Type Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-1 flex shadow-sm border border-gray-100 w-full">
              <button 
                type="button"
                onClick={() => setUserType('patient')}
                className={`flex-1 py-3 rounded-full text-sm font-medium transition-colors ${userType === 'patient' ? 'bg-[color:var(--theme-primary)] text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Patient
              </button>
              <button 
                type="button"
                onClick={() => setUserType('doctor')}
                className={`flex-1 py-3 rounded-full text-sm font-medium transition-colors ${userType === 'doctor' ? 'bg-[color:var(--theme-primary)] text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Doctor
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <input
              type="email"
              placeholder="email@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400"
            />

            {/* Password Input */}
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400"
            />

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[color:var(--theme-primary)] text-white py-4 rounded-lg hover:bg-[color:var(--theme-secondary)] transition-colors"
            >
              Login
            </button>
          </form>

          {/* Links */}
          <div className="space-y-4 text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onNavigateToSignup}
                className="text-[color:var(--theme-primary)] underline hover:text-[color:var(--theme-secondary)]"
              >
                Create one
              </button>
            </p>
            <p className="text-gray-600">
              Forgot your password?{' '}
              <button
                onClick={onNavigateToReset}
                className="text-[color:var(--theme-primary)] underline hover:text-[color:var(--theme-secondary)]"
              >
                Reset
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 text-center text-gray-600 text-sm">
        <p>
          By clicking login, you agree to our{' '}
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
