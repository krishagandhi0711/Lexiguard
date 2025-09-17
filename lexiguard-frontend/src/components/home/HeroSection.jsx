import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils"; 
import { Button } from "../ui/button";        
import { ArrowRight, Shield, Upload } from "lucide-react";

export default function HeroSection() {
  const gradientAnimation = {
    background: [
      "linear-gradient(135deg, #0B111A, #0F1E2A, #0E3B34)",
      "linear-gradient(135deg, #143E5A, #0F2A40, #0F766E)",
      "linear-gradient(135deg, #0F2A40, #0F1E2A, #14B8A6)"
    ],
    transition: {
      duration: 30,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "linear"
    }
  };

  return (
    <motion.section
      className="relative overflow-hidden"
      animate={gradientAnimation}
    >
      {/* Aurora Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[400px] h-[400px] bg-gradient-to-r from-[#14B8A6]/50 via-[#143E5A]/40 to-[#0F1E2A]/0 rounded-full blur-3xl opacity-60"
          animate={{ x: [-50, 50, -50], y: [0, 20, 0] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] bg-gradient-to-r from-[#0F1E2A]/40 via-[#0F2A40]/30 to-[#14B8A6]/0 rounded-full blur-2xl opacity-50 top-32 left-20"
          animate={{ x: [0, -30, 0], y: [0, 15, 0] }}
          transition={{ duration: 28, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-[#14B8A6]/40 via-[#143E5A]/30 to-[#0F1E2A]/0 rounded-full blur-3xl opacity-40 bottom-0 right-10"
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "mirror" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#1C3D5A]/10 to-[#14B8A6]/10 border border-[#1C3D5A]/20 text-sm font-medium text-[#1C3D5A] dark:text-[#14B8A6] mb-8"
          >
            <Shield className="w-4 h-4" />
            AI-Powered Legal Analysis
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="gradient-text">Secure Your Legal</span>
            <br />
            <span className="text-gray-100 dark:text-[#EAEAEA]">Documents with AI</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 dark:text-[#A0A0A0] max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Upload your legal documents and receive instant AI-powered analysis of risks, 
            key clauses, and potential issues. Make informed decisions with confidence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary Button */}
            <Button 
              asChild
              size="lg"
              className="relative bg-gradient-to-r from-[#1C3D5A] to-[#14B8A6] 
                         hover:from-[#112538] hover:to-[#0F766E] 
                         text-white px-8 py-4 text-lg font-semibold rounded-xl
                         hover:scale-105 transition-all duration-200 
                         shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 
                         focus:ring-[#14B8A6]/50"
            >
              <Link to={createPageUrl("Upload")} className="flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Analyze Document
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>

            {/* Secondary Button */}
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg font-semibold rounded-xl
                         border-2 border-[#14B8A6]/50 text-[#14B8A6] 
                         hover:bg-[#14B8A6]/10 hover:text-[#14B8A6] 
                         transition-all duration-200 hover:scale-105 
                         focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/50"
            >
              <Link to={createPageUrl("About")} className="flex items-center">
                Learn More
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 pt-8 border-t border-white/10"
          >
            <p className="text-sm text-gray-300 dark:text-[#A0A0A0] mb-6">
              Trusted by legal professionals worldwide
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">10k+</div>
                <div className="text-sm text-gray-300 dark:text-[#A0A0A0] mt-1">Documents Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">99.8%</div>
                <div className="text-sm text-gray-300 dark:text-[#A0A0A0] mt-1">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">500+</div>
                <div className="text-sm text-gray-300 dark:text-[#A0A0A0] mt-1">Legal Firms</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
