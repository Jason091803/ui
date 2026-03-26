interface TermsOfServicePageProps {
  onNavigateBack: () => void;
}

export default function TermsOfServicePage({ onNavigateBack }: TermsOfServicePageProps) {
  return (
    <div className="size-full flex items-center justify-center bg-[#F5F1E8] overflow-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl text-[color:var(--theme-primary)] mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-600">Effective Date: Oct 21, 2025</p>
        </div>

        {/* Terms Content */}
        <div className="space-y-6 text-sm">
          {/* Section 1 */}
          <div>
            <h2 className="text-black mb-2">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By using our services, you agree to be bound by these terms.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-black mb-2">2. User Responsibilities</h2>
            <p className="text-gray-600 leading-relaxed">
              You are responsible for keeping your account secure and complying with all applicable laws.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-black mb-2">3. Service Changes</h2>
            <p className="text-gray-600 leading-relaxed">
              We may modify or terminate the service at any time without notice.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-black mb-2">4. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              We are not liable for any damages resulting from the use of our service.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-black mb-2">5. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              For questions, contact: test@braverventures.com
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={onNavigateBack}
            className="bg-[color:var(--theme-primary)] text-white px-8 py-3 rounded-lg hover:bg-[color:var(--theme-secondary)] transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
