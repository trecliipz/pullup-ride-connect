
import React from 'react';
import { X } from 'lucide-react';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SecurityModal: React.FC<SecurityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-500 hover:text-gray-700 text-2xl"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
          🛡️ PullUp Security & Privacy Policy
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 pb-2 border-b-2 border-orange-500">
              🔐 Data Protection
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              PullUp employs industry-standard encryption to protect your personal information, payment details, and location data. All data transmission is secured using TLS 1.3 encryption protocols.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We never store your full payment information on our servers. All payment processing is handled through PCI-DSS compliant third-party processors.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 pb-2 border-b-2 border-orange-500">
              📍 Location Privacy
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Location data is only collected when the app is in use and is necessary for ride matching and navigation. Historical location data is automatically deleted after 7 days unless required for support purposes.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You can disable location services at any time through your device settings, though this will limit app functionality.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 pb-2 border-b-2 border-orange-500">
              👥 Driver & Rider Safety
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              All drivers undergo comprehensive background checks, including criminal history and driving record verification. Vehicles are regularly inspected for safety compliance.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Real-time GPS tracking is active during all rides for safety monitoring. Emergency assistance is available 24/7 through our in-app emergency button.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 pb-2 border-b-2 border-orange-500">
              🔄 Data Sharing
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              PullUp does not sell your personal information to third parties. Data may be shared with drivers only as necessary to complete rides (pickup location, destination, contact info).
            </p>
            <p className="text-gray-700 leading-relaxed">
              Anonymized usage data may be used for service improvement and analytics purposes.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 pb-2 border-b-2 border-orange-500">
              🚨 Incident Reporting
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Any safety incidents can be reported through our 24/7 support system. All reports are taken seriously and investigated promptly.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Users can rate and review rides to maintain community safety standards.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 pb-2 border-b-2 border-orange-500">
              📞 Contact & Support
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              For security concerns or questions: security@pullup.com
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              Emergency support: Available through in-app emergency button
            </p>
            <p className="text-gray-700 leading-relaxed">
              General support: support@pullup.com | 1-800-PULLUP-1
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 pb-2 border-b-2 border-orange-500">
              📋 Compliance
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              PullUp complies with GDPR, CCPA, and local privacy regulations. Users have the right to access, modify, or delete their personal information at any time.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Last updated: June 16, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityModal;
