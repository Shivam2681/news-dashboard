"use client"

import { useRouter } from "next/navigation";
import { Newspaper, ChevronRight, Globe, Sparkles, LineChart } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1D1E30] to-black text-white overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      {/* Starry Effect */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      ></div>
      
      <div className="relative z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#FF007A] to-[#8A2BE2] rounded-lg flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF007A] to-[#8A2BE2]">
                NewsFlow
              </span>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-extrabold mb-6 max-w-4xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF007A] to-[#8A2BE2]">
              Your Personalized News Hub
            </span>
          </h1>
          
          <p className="text-xl text-[#B0B0B0] mb-12 max-w-2xl">
            Stay informed with a customizable dashboard featuring real-time news updates, 
            trending topics, and personalized content feeds.
          </p>

          <button
            onClick={() => router.push('/dashboard')}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-[#FF007A] to-[#8A2BE2] rounded-full shadow-lg hover:shadow-[0_0_15px_rgba(138,43,226,0.5)]"
          >
            <span>Go to Dashboard</span>
            <ChevronRight className="w-6 h-6 ml-2 transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
          </button>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            {[
              {
                icon: Globe,
                title: "Real-time Updates",
                description: "Get instant access to breaking news and live updates from trusted sources worldwide"
              },
              {
                icon: Sparkles,
                title: "Customizable Feed",
                description: "Tailor your news feed to your interests with advanced filtering and categorization"
              },
              {
                icon: LineChart,
                title: "Trending Topics",
                description: "Stay on top of what's happening with trending stories and popular discussions"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-[#2A2B3F]/80 border-none rounded-xl shadow-[0_0_30px_rgba(138,43,226,0.3)] hover:shadow-[0_0_40px_rgba(138,43,226,0.4)] transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-[#FF007A] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#B0B0B0]">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 relative w-full max-w-4xl">
            <div className="rounded-lg overflow-hidden shadow-[0_0_30px_rgba(138,43,226,0.3)]">
              <img
                src="/dashboard.png"
                alt="News Dashboard Preview"
                className="w-full object-contain h-[500px]"
              />
            </div>
          </div>
        </main>

        <footer className="py-12 border-t border-[#28293E] mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-[#B0B0B0]">
              © 2025 NewsFlow. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}