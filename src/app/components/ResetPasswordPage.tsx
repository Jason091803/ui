import { useState } from 'react';
import { Lock } from 'lucide-react';

interface ResetPasswordPageProps {
  onNavigateToLogin: () => void;
  onNavigateToVerify: (email: string) => void;
}

export default function ResetPasswordPage({ onNavigateToLogin, onNavigateToVerify }: ResetPasswordPageProps) {
  const [email, setEmail] = useState('');

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to verify page with email
    onNavigateToVerify(email || 'jasondong127@gmail.com');
  };

  return (
    <div className="size-full flex flex-col bg-[#F5F1E8] overflow-auto">
      {/* Header */}
      <header className="bg-[color:var(--theme-primary)] text-white py-6 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl">Reset Password</h1>
          <div className="w-12 h-0.5 bg-white mx-auto mt-1"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pt-12 pb-8 max-w-md mx-auto w-full">
        {/* Lock Icon and Instructions */}
        <div className="bg-white rounded-lg p-8 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <Lock className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-700">
            <span className="block mb-1">Forgot your password?</span>
            <span className="text-sm">Enter your registered email to receive a reset code</span>
          </p>
        </div>

        {/* Reset Form */}
        <form onSubmit={handleSendCode} className="space-y-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder="email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400"
          />

          {/* Send Verification Code Button */}
          <button
            type="submit"
            className="w-full bg-[color:var(--theme-primary)] text-white py-4 rounded-lg hover:bg-[color:var(--theme-secondary)] transition-colors"
          >
            Send Verification Code
          </button>

          {/* Back to Login Button */}
          <button
            type="button"
            onClick={onNavigateToLogin}
            className="w-full bg-white text-[color:var(--theme-primary)] py-4 rounded-lg border-2 border-[color:var(--theme-primary)] hover:bg-gray-50 transition-colors"
          >
            Back to Login
          </button>
        </form>

        {/* Bottom Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Remember your password?{' '}
            <button
              onClick={onNavigateToLogin}
              className="text-[color:var(--theme-primary)] underline hover:text-[color:var(--theme-secondary)]"
            >
              Log in
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
