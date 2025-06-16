
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, UserCheck, Database, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: December 16, 2024</p>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-pullup-600" />
                Our Commitment to Your Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                At PullUp, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our mobile application and 
                services. We are committed to protecting your personal data and ensuring transparency 
                in how we handle your information.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5 text-pullup-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Personal Information</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Name, email address, and phone number</li>
                    <li>Profile picture and account preferences</li>
                    <li>Payment information and billing details</li>
                    <li>Driver's license information (for drivers)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Location Data</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Real-time location during rides</li>
                    <li>Pickup and drop-off locations</li>
                    <li>GPS coordinates and route information</li>
                    <li>Location history for service improvement</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Usage Information</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Trip history and ride details</li>
                    <li>App usage patterns and preferences</li>
                    <li>Device information and identifiers</li>
                    <li>Communication with customer support</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-5 w-5 text-pullup-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Service Provision",
                    items: [
                      "Connect riders with drivers",
                      "Process payments and billing",
                      "Provide customer support",
                      "Send trip confirmations and updates"
                    ]
                  },
                  {
                    title: "Safety & Security",
                    items: [
                      "Verify driver and rider identities",
                      "Monitor trips for safety",
                      "Investigate incidents and disputes",
                      "Prevent fraud and abuse"
                    ]
                  },
                  {
                    title: "Service Improvement",
                    items: [
                      "Analyze usage patterns",
                      "Improve app functionality",
                      "Optimize routing algorithms",
                      "Develop new features"
                    ]
                  },
                  {
                    title: "Communication",
                    items: [
                      "Send promotional offers",
                      "Notify about service updates",
                      "Respond to customer inquiries",
                      "Share important announcements"
                    ]
                  }
                ].map((section, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">{section.title}</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      {section.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-pullup-600" />
                Information Sharing and Disclosure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We do not sell your personal information. We may share your information in the following circumstances:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">With Your Consent</h4>
                    <p className="text-gray-700 text-sm">
                      We share information when you explicitly agree to the sharing, such as connecting 
                      with social media platforms or sharing trip details with friends.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Service Providers</h4>
                    <p className="text-gray-700 text-sm">
                      We work with trusted third-party service providers who help us operate our platform, 
                      process payments, and improve our services.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Safety & Legal</h4>
                    <p className="text-gray-700 text-sm">
                      We may share information to respond to legal requests, protect safety, 
                      investigate fraud, or comply with applicable laws and regulations.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Business Transfers</h4>
                    <p className="text-gray-700 text-sm">
                      In the event of a merger, acquisition, or sale of assets, your information 
                      may be transferred as part of that transaction.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5 text-pullup-600" />
                Data Security and Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We implement robust security measures to protect your personal information:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Encryption",
                      description: "All data transmitted is encrypted using industry-standard SSL/TLS protocols"
                    },
                    {
                      title: "Access Controls",
                      description: "Strict access controls ensure only authorized personnel can access your data"
                    },
                    {
                      title: "Regular Audits",
                      description: "We conduct regular security audits and vulnerability assessments"
                    },
                    {
                      title: "Data Minimization",
                      description: "We collect only the information necessary to provide our services"
                    },
                    {
                      title: "Secure Storage",
                      description: "Data is stored in secure, compliant data centers with multiple safeguards"
                    },
                    {
                      title: "Incident Response",
                      description: "We have procedures in place to respond quickly to any security incidents"
                    }
                  ].map((measure, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-2">{measure.title}</h5>
                      <p className="text-gray-700 text-sm">{measure.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="mr-2 h-5 w-5 text-pullup-600" />
                Your Privacy Rights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  You have several rights regarding your personal information:
                </p>
                
                <div className="space-y-3">
                  {[
                    {
                      right: "Access",
                      description: "Request a copy of the personal information we have about you"
                    },
                    {
                      right: "Correction",
                      description: "Request that we correct any inaccurate or incomplete information"
                    },
                    {
                      right: "Deletion",
                      description: "Request that we delete your personal information, subject to certain exceptions"
                    },
                    {
                      right: "Portability",
                      description: "Request a copy of your data in a structured, machine-readable format"
                    },
                    {
                      right: "Objection",
                      description: "Object to certain processing of your personal information"
                    },
                    {
                      right: "Restriction",
                      description: "Request that we limit how we use your personal information"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-pullup-600 min-w-0 flex-shrink-0">
                        {item.right}:
                      </div>
                      <div className="text-gray-700">{item.description}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-pullup-50 rounded-lg border border-pullup-200">
                  <p className="text-pullup-800">
                    <strong>To exercise your rights:</strong> Contact us at privacy@pullup.com or 
                    through the app settings. We will respond to your request within 30 days.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> privacy@pullup.com</p>
                <p><strong>Phone:</strong> 1-800-PULLUP (1-800-785-587)</p>
                <p><strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105</p>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Updates to this Policy:</strong> We may update this Privacy Policy from time to time. 
                  We will notify you of any material changes by posting the new Privacy Policy on this page 
                  and updating the "Last updated" date.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
