import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "./ui/button";

import { 
  Home, 
  Info, 
  Upload, 
  HelpCircle, 
  Mail, 
  Sun, 
  Moon, 
  Menu, 
  X,
  Shield
} from "lucide-react";

const navigationItems = [
  { title: "Home", url: "/", icon: Home }, // <-- set to root
  { title: "About", url: createPageUrl("About"), icon: Info },
  { title: "Upload", url: createPageUrl("Upload"), icon: Upload },
  { title: "Dashboard", url: "/dashboard", icon: Shield },
  { title: "Glossary", url: createPageUrl("Glossary"), icon: Shield },
  { title: "FAQ", url: createPageUrl("FAQ"), icon: HelpCircle },
  { title: "Contact", url: createPageUrl("Contact"), icon: Mail },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

useEffect(() => {
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [isDarkMode]);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <style>{`
        :root {
          --primary: #1C3D5A;
          --primary-focus: #112538;
          --success: #C5A553;
          --success-focus: #A78B41;
          --highlight: #14B8A6;
          --highlight-focus: #0F766E;
          --risk-low: #10B981;
          --risk-medium: #F59E0B;
          --risk-high: #EF4444;
        }

        .dark {
          --bg-base: #121212;
          --bg-card: #1E1E1E;
          --text-primary: #EAEAEA;
          --text-secondary: #A0A0A0;
        }

        .light {
          --bg-base: #F8F9FA;
          --bg-card: #FFFFFF;
          --text-primary: #1A1A1A;
          --text-secondary: #555555;
        }

        body {
          font-family: 'Inter', sans-serif;
        }

        .gradient-text {
          background: linear-gradient(45deg, var(--primary), var(--highlight));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glassmorphism {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .aurora-bg {
          background: linear-gradient(-45deg, #1C3D5A, #112538, #14B8A6, #0F766E);
          background-size: 400% 400%;
          animation: aurora 15s ease infinite;
        }

        @keyframes aurora {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>

      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#121212] text-[#EAEAEA]' : 'bg-[#F8F9FA] text-[#1A1A1A]'}`}>
        
        {/* Navigation */}
<nav className={`sticky top-0 z-50 glassmorphism border-b transition-all duration-300 ${isDarkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-gradient-to-r from-[#1C3D5A] to-[#14B8A6] rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold gradient-text">LexiGuard</span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center ml-8 space-x-4"> 
        {navigationItems.map((item) => (
          <Link
            key={item.title}
            to={item.url}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-opacity-10 hover:bg-[#1C3D5A] ${
              location.pathname === item.url 
                ? 'text-[#1C3D5A] font-medium' 
                : isDarkMode ? 'text-[#A0A0A0] hover:text-[#EAEAEA]' : 'text-[#555555] hover:text-[#1A1A1A]'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.title}
          </Link>
        ))}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="hover:bg-opacity-10 hover:bg-[#1C3D5A]"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        <Link to={createPageUrl("Upload")}>
          <Button className="hidden md:inline-flex bg-gradient-to-r from-[#1C3D5A] to-[#14B8A6] hover:from-[#112538] hover:to-[#0F766E] text-white">
            Get Started
          </Button>
        </Link>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>
    </div>
  </div>

  {/* Mobile Menu */}
  {isMobileMenuOpen && (
    <div className={`md:hidden border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="px-2 pt-6 pb-4 space-y-1.5"> {/* Increased top padding and tighter spacing */}
        {navigationItems.map((item) => (
          <Link
            key={item.title}
            to={item.url}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              location.pathname === item.url 
                ? 'bg-[#1C3D5A] bg-opacity-10 text-[#1C3D5A] font-medium' 
                : isDarkMode ? 'text-[#A0A0A0] hover:text-[#EAEAEA] hover:bg-gray-800' : 'text-[#555555] hover:text-[#1A1A1A] hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.title}
          </Link>
        ))}

        <Link to={createPageUrl("Upload")} onClick={() => setIsMobileMenuOpen(false)}>
          <Button className="w-full mt-4 bg-gradient-to-r from-[#1C3D5A] to-[#14B8A6] hover:from-[#112538] hover:to-[#0F766E] text-white">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )}
</nav>


        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className={`border-t transition-all duration-300 ${isDarkMode ? 'bg-[#1E1E1E] border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#1C3D5A] to-[#14B8A6] rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold gradient-text">LexiGuard</span>
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#555555]'}`}>
                  AI-powered legal document analysis for smarter business decisions.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  {navigationItems.slice(0, 3).map((item) => (
                    <li key={item.title}>
                      <Link
                        to={item.url}
                        className={`text-sm transition-colors ${isDarkMode ? 'text-[#A0A0A0] hover:text-[#EAEAEA]' : 'text-[#555555] hover:text-[#1A1A1A]'}`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  {navigationItems.slice(3).map((item) => (
                    <li key={item.title}>
                      <Link
                        to={item.url}
                        className={`text-sm transition-colors ${isDarkMode ? 'text-[#A0A0A0] hover:text-[#EAEAEA]' : 'text-[#555555] hover:text-[#1A1A1A]'}`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Connect</h3>
                <p className={`text-sm ${isDarkMode ? 'text-[#A0A0A0]' : 'text-[#555555]'}`}>
                  Stay updated with the latest features and insights.
                </p>
              </div>
            </div>

            <div className={`mt-8 pt-8 border-t text-center text-sm ${isDarkMode ? 'border-gray-800 text-[#A0A0A0]' : 'border-gray-200 text-[#555555]'}`}>
              <p>&copy; 2025 LexiGuard. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
