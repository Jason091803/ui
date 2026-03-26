import { Lock, Check } from 'lucide-react';

interface VerifyResetPageProps {
  email: string;
  onNavigateToLogin: () => void;
  onNavigateBackToEmail: () => void;
}

export default function VerifyResetPage({ email, onNavigateToLogin, onNavigateBackToEmail }: VerifyResetPageProps) {
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to login after password reset
    onNavigateToLogin();
  };

  return (
    <div className="size-full flex flex-col bg-[#F5F1E8] overflow-auto">
      {/* Header */}
      <header className="bg-[color:var(--theme-primary)] text-white py-6 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl">Reset Password</h1>
          <div className="w-16 h-0.5 bg-white mx-auto mt-1"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pt-12 pb-8 max-w-md mx-auto w-full">
        {/* Email Confirmation */}
        <div className="bg-white rounded-lg p-6 mb-6 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Verification code sent to:</p>
          <p className="text-black">{email}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleResetPassword} className="space-y-4">
          {/* Verification Code Input */}
          <input
            type="text"
            placeholder="Enter verification code"
            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400"
          />

          {/* New Password Input */}
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400"
          />

          {/* Confirm New Password Input */}
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400"
          />

          {/* Success Message */}
          <div className="bg-[#C8E6C9] border border-[#A5D6A7] rounded-lg px-4 py-3 flex items-center gap-2">
            <Check className="w-5 h-5 text-[#388E3C] flex-shrink-0" />
            <p className="text-[#2E7D32] text-sm">Verification code sent to your email.</p>
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            className="w-full bg-[color:var(--theme-primary)] text-white py-4 rounded-lg hover:bg-[color:var(--theme-secondary)] transition-colors"
          >
            Reset Password
          </button>

          {/* Back to Email Button */}
          <button
            type="button"
            onClick={onNavigateBackToEmail}
            className="w-full bg-white text-gray-700 py-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Back to Email
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
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
