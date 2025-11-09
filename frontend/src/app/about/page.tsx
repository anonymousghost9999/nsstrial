'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { Heart, Users, Target, Award, Sparkles, HandHeart } from 'lucide-react';

export default function AboutPage() {
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
    const count = 20;
    const generated = Array.from({ length: count }, (_, i) => {
      const size = 4 + Math.random() * 8;
      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size,
        bg: i % 3 === 0 ? '#FF9933' : i % 3 === 1 ? '#FFFFFF' : '#138808',
        delay: `${(Math.random() * 5).toFixed(2)}s`,
        duration: `${(5 + Math.random() * 10).toFixed(2)}s`,
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
        
        {/* Animated spectral orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#FF9933]/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#138808]/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-tr from-[#FF9933]/20 via-white/10 to-[#138808]/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#FF9933]/10 via-white/30 to-[#138808]/10 rounded-full blur-3xl animate-spin-slow"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 opacity-20">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
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
                <Heart className="w-16 h-16 text-blue-800" />
              </div>
            </div>
            
            <h1 className="text-6xl sm:text-7xl font-extrabold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-blue-800 to-[#138808] animate-gradient-x">
                About NSS IIIT-H
              </span>
            </h1>
            
            <div className="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-full"></div>
            
            <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
              Empowering students to create meaningful change through service, leadership, and community engagement
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Mission Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg border-2 border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933]/10 via-transparent to-[#138808]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-10">
                <div className="flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-[#FF9933] to-orange-600 rounded-2xl shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To develop the personality and character of students through voluntary community service, 
                  fostering social responsibility and creating a positive impact in society through sustainable initiatives.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-[#138808]/10 via-transparent to-[#FF9933]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-10">
                <div className="flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-[#138808] to-green-700 rounded-2xl shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To be the leading student organization that inspires and empowers youth to become 
                  compassionate leaders, driving transformative change and building a more equitable society.
                </p>
              </div>
            </div>
          </div>

          {/* What We Do Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] to-[#138808] mb-4">
                What We Do
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our diverse initiatives span across multiple domains, creating lasting impact
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: HandHeart,
                  title: "Community Service",
                  description: "Regular outreach programs, blood donation drives, and support for underprivileged communities",
                  gradient: "from-orange-500 to-red-500"
                },
                {
                  icon: Users,
                  title: "Skill Development",
                  description: "Workshops, training sessions, and leadership programs to enhance student capabilities",
                  gradient: "from-blue-500 to-indigo-500"
                },
                {
                  icon: Target,
                  title: "Social Awareness",
                  description: "Campaigns on health, hygiene, environment, and social issues affecting communities",
                  gradient: "from-green-500 to-teal-500"
                },
                {
                  icon: Award,
                  title: "Educational Support",
                  description: "Tutoring programs, scholarship drives, and educational material distribution",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: Heart,
                  title: "Health Initiatives",
                  description: "Health camps, awareness sessions, and partnerships with medical institutions",
                  gradient: "from-red-500 to-orange-500"
                },
                {
                  icon: Sparkles,
                  title: "Environmental Action",
                  description: "Tree plantation, clean-up drives, and sustainability awareness programs",
                  gradient: "from-emerald-500 to-green-600"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  <div className="relative p-8">
                    <div className={`inline-flex items-center justify-center w-14 h-14 mb-4 bg-gradient-to-br ${item.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-20">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF9933] via-blue-800 to-[#138808] p-12 shadow-2xl">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {[
                  { number: "500+", label: "Active Volunteers" },
                  { number: "10+", label: "Events Organized" },
                  { number: "10K+", label: "Lives Impacted:@IIITH-Campus and @outside IIITH" },
                  { number: "5+", label: "Years of Service" }
                ].map((stat, index) => (
                  <div key={index} className="group">
                    <div className="text-5xl font-extrabold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-lg text-white/90 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Join Us CTA */}
          <div className="text-center">
            <div className="inline-block p-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-3xl shadow-2xl">
              <div className="bg-white rounded-3xl px-12 py-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Ready to Make a Difference?
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join us in our mission to create positive change in society
                </p>
                <a
                  href="/members"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF9933] to-[#138808] text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Users className="w-6 h-6" />
                  <span>Meet Our Team</span>
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
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
      `}</style>
    </div>
  );
}
