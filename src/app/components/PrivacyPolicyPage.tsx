interface PrivacyPolicyPageProps {
  onNavigateBack: () => void;
}

export default function PrivacyPolicyPage({ onNavigateBack }: PrivacyPolicyPageProps) {
  return (
    <div className="size-full flex items-start justify-center bg-[#F5F1E8] overflow-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full my-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl text-[#6B46C1] mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-600">Effective Date: Oct 21, 2025</p>
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-6 text-sm">
          {/* Section 1 */}
          <div>
            <h2 className="text-black mb-2">1. Purpose and Scope</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              This Privacy Policy governs your use of this beta version (the "Platform"), which is provided solely for testing, demonstration, and evaluation. The Platform is not a production system and is not intended for processing, collecting, or storing any personal, sensitive, or confidential data.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              By accessing or using the Platform, you acknowledge and agree that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>You will not upload, input, or otherwise provide any real, personal, or confidential information (including personal data as defined under any privacy law).</li>
              <li>You understand this Platform is provided "as is," without warranty of any kind, and not suitable for real-world or commercial use.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-black mb-2">2. No Collection or Processing of Personal Data</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              The Platform is not designed to collect, process, or retain any personal data, as defined by laws including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>The General Data Protection Regulation (EU) 2016/679 (GDPR),</li>
              <li>The California Consumer Privacy Act (CCPA),</li>
              <li>The Privacy Act 1988 (Cth) of Australia,</li>
              <li>Or any equivalent data protection regulation in other jurisdictions.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Any data entered by users is treated as test input and may be automatically deleted, anonymized, or non-retrievable at any time.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-black mb-2">3. Voluntary Test Data</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              If you choose to enter any data into the Platform:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>You represent and warrant that such data does not contain personal, private, or confidential information.</li>
              <li>You grant the Platform operators a non-exclusive, royalty-free, worldwide, irrevocable licence to process, store, and use such test data solely for testing, debugging, and performance evaluation.</li>
              <li>You acknowledge that such data may not be encrypted, stored securely, or retrievable, and that you bear all risk associated with such use.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-black mb-2">4. Beta Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              This is a beta product and may contain errors, bugs, and incomplete functionality. The Platform provider:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Does not guarantee security, accuracy, or reliability,</li>
              <li>Disclaims all warranties (express or implied), and</li>
              <li>Shall not be liable for any loss, damage, or claim (including direct, indirect, incidental, consequential, or punitive damages) arising out of or relating to use, access, or reliance on the Platform or any data entered.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-black mb-2">5. No Legal Relationship or Obligation</h2>
            <p className="text-gray-600 leading-relaxed">
              Use of the Platform does not create any contractual, fiduciary, or legal relationship between you and the provider. The provider does not assume responsibility or liability under any privacy, consumer, or data protection law in any jurisdiction. You agree to indemnify and hold harmless the provider, its affiliates, officers, and agents from any claims, damages, or liabilities arising from or relating to your use of the Platform.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-black mb-2">6. Data Retention and Deletion</h2>
            <p className="text-gray-600 leading-relaxed">
              As this Platform is for evaluation only, no commitment is made to retain or delete data in accordance with any statutory period. All data may be erased at any time without notice.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-black mb-2">7. Third-Party Services</h2>
            <p className="text-gray-600 leading-relaxed">
              The Platform may rely on third-party services (such as hosting or analytics) solely for testing. The provider does not control or accept responsibility for these third parties' data handling. You acknowledge and agree that no assurances or warranties are made regarding compliance of third parties with any privacy regulation.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-black mb-2">8. International Use</h2>
            <p className="text-gray-600 leading-relaxed">
              The Platform is not intended for use in any specific jurisdiction and does not comply with any particular national data protection regime. Access or use from outside Australia is at your own risk, and you are solely responsible for compliance with local laws.
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-black mb-2">9. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              To the maximum extent permitted by applicable law:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>The Platform and all related services are provided "AS IS" and "AS AVAILABLE", without any warranties or representations.</li>
              <li>The provider disclaims all liability for any data loss, breach, or damage, whether foreseeable or not.</li>
              <li>Your sole and exclusive remedy is to cease using the Platform.</li>
            </ul>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-black mb-2">10. Amendments</h2>
            <p className="text-gray-600 leading-relaxed">
              This Privacy Policy may be updated, replaced, or withdrawn at any time without notice. Continued use after modification constitutes acceptance of the updated version.
            </p>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-black mb-2">11. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              For questions regarding this Privacy Policy, please contact: test@braverventures.com
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={onNavigateBack}
            className="bg-[#6B46C1] text-white px-8 py-3 rounded-lg hover:bg-[#5a3ba3] transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
