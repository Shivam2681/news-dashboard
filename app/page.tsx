"use client"
import { useRouter } from "next/navigation";

const GraphBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    viewBox="0 0 800 600"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#0284c7", stopOpacity: 0.2 }} />
        <stop offset="100%" style={{ stopColor: "#0ea5e9", stopOpacity: 0.1 }} />
      </linearGradient>
    </defs>
    <path
      d="M0,100 Q200,150 400,100 T800,100 L800,600 L0,600 Z"
      fill="url(#grad1)"
    />
    <path
      d="M0,200 Q200,250 400,200 T800,200"
      fill="none"
      stroke="#0284c7"
      strokeWidth="0.5"
      strokeOpacity="0.2"
    />
    <path
      d="M0,300 Q200,350 400,300 T800,300"
      fill="none"
      stroke="#0ea5e9"
      strokeWidth="0.5"
      strokeOpacity="0.2"
    />
  </svg>
);

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <GraphBackground />
      
      <div className="relative z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-600 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-500">
                NewsFlow
              </span>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-extrabold mb-6 max-w-4xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-500">
              Your Personalized News Hub
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl">
            Stay informed with a customizable dashboard featuring real-time news updates, 
            trending topics, and personalized content feeds.
          </p>

          <button
            onClick={() => router.push('/dashboard')}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-sky-600 to-blue-500 rounded-full shadow-lg hover:from-sky-700 hover:to-blue-600 hover:shadow-xl"
          >
            <span>Go to Dashboard</span>
            <svg
              className="w-6 h-6 ml-2 transition-transform duration-300 ease-in-out transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            {[
              {
                title: "Real-time Updates",
                description: "Get instant access to breaking news and live updates from trusted sources worldwide"
              },
              {
                title: "Customizable Feed",
                description: "Tailor your news feed to your interests with advanced filtering and categorization"
              },
              {
                title: "Trending Topics",
                description: "Stay on top of what's happening with trending stories and popular discussions"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}