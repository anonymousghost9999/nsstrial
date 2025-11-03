'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook, Twitter, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  // Generate floating particles only on client to avoid SSR hydration mismatches
  const [particles, setParticles] = useState<Array<{
    left: string;
    top: string;
    size: number;
    bg: string;
    delay: string;
    duration: string;
  }>>([]);

  useEffect(() => {
    const count = 15;
    const generated = Array.from({ length: count }, (_, i) => {
      const size = 4 + Math.random() * 8;
      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size,
        bg: i % 3 === 0 ? '#FF9933' : i % 3 === 1 ? '#000080' : '#138808',
        delay: `${(Math.random() * 5).toFixed(2)}s`,
        duration: `${(8 + Math.random() * 12).toFixed(2)}s`,
      };
    });
    setParticles(generated);
  }, []);
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Spectral Background with India Flag Colors */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-green-50"></div>
        
        {/* Animated spectral orbs - different pattern than About page */}
        <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-[#FF9933]/25 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-[#138808]/20 to-transparent rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-white/40 via-[#FF9933]/10 to-transparent rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
        <div className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-gradient-to-tl from-[#138808]/15 via-white/20 to-transparent rounded-full blur-3xl animate-pulse-slow delay-3000"></div>
        
        {/* Radial waves */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px]">
          <div className="absolute inset-0 rounded-full border-2 border-[#FF9933]/20 animate-ping-slow"></div>
          <div className="absolute inset-0 rounded-full border-2 border-[#138808]/20 animate-ping-slow delay-1000"></div>
        </div>
        
        {/* Floating particles with different animation */}
        <div className="absolute inset-0 opacity-20">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float-rotate"
              style={{
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.bg,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>
      </div>

      <Navbar />

      <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6 animate-bounce-slow">
              <div className="p-6 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-full shadow-2xl">
                <MessageCircle className="w-16 h-16 text-blue-800" />
              </div>
            </div>
            
            <h1 className="text-6xl sm:text-7xl font-extrabold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-blue-800 to-[#138808] animate-gradient-x">
                Get In Touch
              </span>
            </h1>
            
            <div className="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-full"></div>
            
            <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
              Have questions or want to collaborate? We'd love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Contact Form */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF9933] via-blue-500 to-[#138808] rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-10 shadow-xl border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Send Us a Message</h2>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 outline-none"
                      placeholder="How can we help?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 outline-none resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF9933] to-[#138808] text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-orange-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-8 flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#FF9933] to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Email Us</h3>
                    <a href="mailto:nss@iiit.ac.in" className="text-blue-600 hover:text-blue-800 font-medium text-lg">
                      nss@iiit.ac.in
                    </a>
                    <p className="text-gray-600 text-sm mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-8 flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
                    <a href="tel:+914066531000" className="text-blue-600 hover:text-blue-800 font-medium text-lg">
                      +91 40 6653 1000
                    </a>
                    <p className="text-gray-600 text-sm mt-1">Mon-Fri, 9 AM - 6 PM IST</p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-[#138808]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-8 flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#138808] to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Visit Us</h3>
                    <p className="text-gray-700 font-medium text-lg">
                      IIIT Hyderabad
                    </p>
                    <p className="text-gray-600 mt-1">
                      Professor CR Rao Road, Gachibowli,<br />
                      Hyderabad, Telangana 500032, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FF9933] via-blue-800 to-[#138808] p-8 shadow-xl">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative">
                  <h3 className="text-2xl font-bold text-white mb-6">Follow Us On Social Media</h3>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: Instagram, label: "Instagram", href: "https://instagram.com/nss.iiith", color: "from-pink-500 to-purple-600" },
                      { icon: Facebook, label: "Facebook", href: "https://facebook.com/nss.iiith", color: "from-blue-600 to-blue-800" },
                      { icon: Twitter, label: "Twitter", href: "https://twitter.com/nss_iiith", color: "from-sky-400 to-blue-600" },
                      { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/nss-iiith", color: "from-blue-700 to-blue-900" },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group/social flex items-center gap-3 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-110 border border-white/30`}
                      >
                        <social.icon className="w-6 h-6 text-white" />
                        <span className="text-white font-medium hidden sm:inline">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="relative group mb-20">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF9933] via-blue-500 to-[#138808] rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-4 shadow-xl border border-gray-200 overflow-hidden">
              <div className="aspect-video rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4433939732124!2d78.34868231487774!3d17.44514998804752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19688beb557fa0ee!2sIIIT%20Hyderabad!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="inline-block p-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-3xl shadow-2xl">
              <div className="bg-white rounded-3xl px-12 py-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Join Our Community
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Become a part of NSS and make a real difference in society
                </p>
                <a
                  href="/about"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF9933] to-[#138808] text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <span>Learn More About Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float-rotate {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-float-rotate {
          animation: float-rotate ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-2000 {
          animation-delay: 2s;
        }
        
        .delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
}
