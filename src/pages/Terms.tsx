
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, AlertTriangle, CreditCard, Users, Gavel } from "lucide-react";
import Navbar from "@/components/Navbar";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-600">Last updated: December 16, 2024</p>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-pullup-600" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Welcome to PullUp! These Terms of Service ("Terms") govern your use of our ride-sharing 
                platform and services. By accessing or using PullUp, you agree to be bound by these Terms. 
                If you do not agree to these Terms, please do not use our services.
              </p>
              <div className="mt-4 p-4 bg-pullup-50 rounded-lg border border-pullup-200">
                <p className="text-pullup-800 text-sm">
                  <strong>Important:</strong> These Terms include a mandatory arbitration clause and class action waiver 
                  that affects your legal rights. Please read Section 12 carefully.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-pullup-600" />
                Our Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  PullUp provides a technology platform that connects riders with independent drivers 
                  for transportation services. Our services include:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Ride Matching",
                      description: "Connect riders with nearby drivers based on location and preferences"
                    },
                    {
                      title: "Real-time Tracking",
                      description: "GPS tracking for safety and convenience during rides"
                    },
                    {
                      title: "Payment Processing",
                      description: "Secure payment handling between riders and drivers"
                    },
                    {
                      title: "Safety Features",
                      description: "Background checks, incident reporting, and emergency assistance"
                    }
                  ].map((service, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                      <p className="text-gray-700 text-sm">{service.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 text-sm">
                    <strong>Note:</strong> PullUp is a technology platform, not a transportation company. 
                    Drivers are independent contractors, not employees of PullUp.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-pullup-600" />
                User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Account Requirements</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>You must be at least 18 years old to create an account</li>
                    <li>Provide accurate and complete information during registration</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Notify us immediately of any unauthorized account use</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Rider Obligations</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Treat drivers and other users with respect and courtesy</li>
                    <li>Follow all applicable laws and regulations</li>
                    <li>Do not bring prohibited items (weapons, illegal substances, etc.)</li>
                    <li>Pay all fees and charges associated with your use of the service</li>
                    <li>Provide accurate pickup and destination information</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Driver Obligations</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Maintain valid driver's license and vehicle registration</li>
                    <li>Carry appropriate insurance coverage</li>
                    <li>Pass background checks and vehicle inspections</li>
                    <li>Provide safe and professional transportation services</li>
                    <li>Comply with all traffic laws and safety regulations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Conduct */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
                Prohibited Conduct
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  The following activities are strictly prohibited when using PullUp:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Safety Violations</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Threatening or harassing other users</li>
                      <li>Engaging in violent or illegal behavior</li>
                      <li>Discrimination based on protected characteristics</li>
                      <li>Bringing weapons or dangerous items</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Platform Abuse</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Creating fake accounts or providing false information</li>
                      <li>Manipulating ratings or reviews</li>
                      <li>Attempting to circumvent payment systems</li>
                      <li>Interfering with the operation of the platform</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Legal Violations</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Using the service for illegal activities</li>
                      <li>Violating any applicable laws or regulations</li>
                      <li>Infringing on intellectual property rights</li>
                      <li>Engaging in fraudulent activities</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Service Misuse</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Using the service for commercial purposes without permission</li>
                      <li>Reverse engineering or attempting to hack the platform</li>
                      <li>Spamming or sending unsolicited communications</li>
                      <li>Collecting user data without consent</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-pullup-600" />
                Payment Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Pricing</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Fares are calculated based on time, distance, and demand</li>
                      <li>Surge pricing may apply during high-demand periods</li>
                      <li>All prices include applicable taxes and fees</li>
                      <li>Pricing estimates are not guaranteed final amounts</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Payment Processing</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Payment is automatically charged after trip completion</li>
                      <li>We accept credit cards, debit cards, and digital wallets</li>
                      <li>Tips can be added through the app after your ride</li>
                      <li>Receipts are provided electronically</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Cancellations and Refunds</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Cancellations within 2 minutes of booking are typically free</li>
                      <li>Cancellation fees may apply after the driver has started toward your location</li>
                      <li>Refunds are processed at our discretion based on individual circumstances</li>
                      <li>Disputed charges can be reported through the app or customer support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gavel className="mr-2 h-5 w-5 text-pullup-600" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  PullUp's liability is limited as follows:
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2">Service "As Is"</h4>
                    <p className="text-red-800 text-sm">
                      Our services are provided "as is" without warranties of any kind. We do not guarantee 
                      that the service will be uninterrupted, error-free, or meet your specific requirements.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-900 mb-2">Limitation of Damages</h4>
                    <p className="text-yellow-800 text-sm">
                      PullUp's total liability for any claims arising from your use of our services shall not 
                      exceed $100 or the amount you paid to PullUp in the 12 months preceding the claim.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Third-Party Actions</h4>
                    <p className="text-blue-800 text-sm">
                      We are not liable for the actions of drivers, riders, or other third parties. 
                      Drivers are independent contractors responsible for their own actions.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Questions About These Terms?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Customer Support</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>Email: support@pullup.com</li>
                      <li>Phone: 1-800-PULLUP</li>
                      <li>Available 24/7</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Legal Department</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>Email: legal@pullup.com</li>
                      <li>Address: 123 Tech Street</li>
                      <li>San Francisco, CA 94105</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Changes to Terms:</strong> We may update these Terms from time to time. 
                    Continued use of our services after changes constitutes acceptance of the new Terms.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;
