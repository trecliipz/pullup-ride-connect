
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation, MapPin, Clock, Shield, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pullup-50 via-white to-success-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Your ride is just a{" "}
              <span className="gradient-bg bg-clip-text text-transparent">
                PullUp
              </span>{" "}
              away
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Safe, reliable, and affordable rides at your fingertips. 
              Experience the future of transportation with PullUp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto px-8 py-4 text-lg font-semibold gradient-bg hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                >
                  <Navigation className="mr-2 h-5 w-5" />
                  Book a Ride
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold border-2 border-pullup-500 text-pullup-600 hover:bg-pullup-50"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-pullup-100 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-1/3 right-16 w-16 h-16 bg-success-100 rounded-full opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-pullup-200 rounded-full opacity-60 animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose PullUp?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing transportation with cutting-edge technology and unmatched service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Real-time Tracking",
                description: "Track your ride in real-time with our advanced GPS technology and get accurate ETAs."
              },
              {
                icon: Clock,
                title: "Quick & Reliable",
                description: "Average pickup time under 5 minutes. We value your time as much as you do."
              },
              {
                icon: Shield,
                title: "Safe & Secure",
                description: "All drivers are thoroughly vetted and vehicles are regularly inspected for your safety."
              },
              {
                icon: Star,
                title: "5-Star Service",
                description: "Consistently rated as the best ride-sharing service with 4.9+ star average rating."
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Built by the community, for the community. Join millions of satisfied riders."
              },
              {
                icon: Navigation,
                title: "Smart Routing",
                description: "AI-powered route optimization ensures you reach your destination via the fastest route."
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-pullup-100 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-pullup-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Experience PullUp?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join millions of riders who trust PullUp for their daily transportation needs.
          </p>
          <Link to="/book">
            <Button 
              size="lg" 
              variant="secondary"
              className="px-8 py-4 text-lg font-semibold bg-white text-pullup-600 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
            >
              <Navigation className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PullUp</h3>
              <p className="text-gray-400">
                Your trusted ride-sharing partner for safe, reliable, and affordable transportation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/support" className="hover:text-white transition-colors">Support</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/book" className="hover:text-white transition-colors">Book a Ride</Link></li>
                <li><Link to="/history" className="hover:text-white transition-colors">Trip History</Link></li>
                <li><Link to="/profile" className="hover:text-white transition-colors">Profile</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@pullup.com</li>
                <li>1-800-PULLUP</li>
                <li>24/7 Customer Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PullUp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
