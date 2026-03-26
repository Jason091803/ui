import { useState, useEffect } from 'react';

interface CreateAccountPageProps {
  email: string;
  onNavigateToSignup: () => void;
  onNavigateToLogin: () => void;
}

export default function CreateAccountPage({ email, onNavigateToSignup, onNavigateToLogin }: CreateAccountPageProps) {
  const [username, setUsername] = useState('');
  const [realName, setRealName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [countdown, setCountdown] = useState(58);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className="size-full flex flex-col bg-[#F5F1E8] overflow-auto relative">
      {/* Header */}
      <header className="bg-[#6B46C1] text-white py-6 px-4 flex items-center justify-center">
        <h1 className="text-xl">Create Account</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pt-8 pb-8 max-w-md mx-auto w-full">
        <form onSubmit={handleCreateAccount} className="space-y-4">
          {/* Verification Email Info */}
          <div className="bg-white rounded-2xl p-6 mb-6 text-center">
            <div className="text-4xl mb-3">📧</div>
            <p className="text-gray-600 mb-2">Verification code sent to:</p>
            <p className="text-gray-800 font-medium">{email}</p>
          </div>

          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400"
          />

          {/* Real Name Input */}
          <input
            type="text"
            placeholder="Real Name"
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400"
          />

          {/* Verification Code Input with Timer */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="flex-1 px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400"
            />
            <div className="bg-gray-200 px-6 py-4 rounded-lg flex items-center justify-center min-w-[80px]">
              <span className="text-gray-600">{countdown}s</span>
            </div>
          </div>

          {/* Create Password Input */}
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400"
          />

          {/* Confirm Password Input */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400"
          />

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full bg-[#6B46C1] text-white py-4 rounded-lg hover:bg-[#5a3ba3] transition-colors mt-6"
          >
            Create Account
          </button>

          {/* Back to Sign Up Button */}
          <button
            type="button"
            onClick={onNavigateToSignup}
            className="w-full bg-white text-[#6B46C1] py-4 rounded-lg border-2 border-[#6B46C1] hover:bg-gray-50 transition-colors"
          >
            Back to Sign Up
          </button>
        </form>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-xl">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Success Message */}
            <h3 className="text-2xl text-gray-800 mb-4">Registration Successful!</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your account has been created successfully.
              <br />
              You will now be redirected to the login page.
            </p>

            {/* Go to Login Button */}
            <button
              onClick={onNavigateToLogin}
              className="w-full bg-[#6B46C1] text-white py-4 rounded-lg hover:bg-[#5a3ba3] transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
