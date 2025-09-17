import React from "react";
import { motion } from "framer-motion";
import { Shield, Brain, Clock, FileCheck, Lock, BarChart } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Risk Analysis",
    description: "Advanced AI algorithms analyze your documents for potential legal risks and compliance issues.",
    size: "large",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Shield,
    title: "Secure Processing",
    description: "Enterprise-grade security with end-to-end encryption for your sensitive documents.",
    size: "small",
    gradient: "from-green-500 to-teal-500"
  },
  {
    icon: Clock,
    title: "Instant Results",
    description: "Get comprehensive analysis results in seconds, not hours or days.",
    size: "small",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: FileCheck,
    title: "Clause Library",
    description: "Access to extensive database of legal clauses and their risk assessments.",
    size: "medium",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: BarChart,
    title: "Risk Scoring",
    description: "Clear visual risk scores help you prioritize which issues need immediate attention.",
    size: "medium",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    icon: Lock,
    title: "Compliance Check",
    description: "Ensure your documents meet industry standards and regulatory requirements.",
    size: "small",
    gradient: "from-yellow-500 to-orange-500"
  }
];

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="relative py-24 bg-gradient-to-r from-[#1C3D5A] to-[#14B8A6] overflow-hidden">
      
      {/* Background animated circles */}
      <motion.div
        className="absolute w-72 h-72 bg-white/10 rounded-full top-[-50px] left-[-50px] animate-pulse"
        animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-56 h-56 bg-white/5 rounded-full bottom-[-40px] right-[-40px] animate-pulse"
        animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Powerful Features for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0F2A40] to-[#1C3D5A]">
              Legal Analysis
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/80 max-w-3xl mx-auto"
          >
            Our comprehensive suite of AI-powered tools helps you identify risks, 
            understand complex clauses, and make informed legal decisions.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 auto-rows-fr"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{
  scale: 1.05,
  y: -5,
  boxShadow: "0 20px 50px rgba(20, 184, 166, 0.7)", // brighter & stronger
  transition: { duration: 0.3 },
}}
                className="group"
              >
                <div className="h-full p-8 rounded-2xl bg-gradient-to-b from-[#0F2A40] to-[#143E5A] transition-all duration-300 flex flex-col justify-between min-h-[280px]">
                  <div>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-200 mb-3">
                      {feature.title}
                    </h3>

                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {feature.size === "large" && (
                    <div className="mt-8 pt-6 border-t border-gray-600">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Processing Speed</span>
                        <span className="font-medium text-[#14B8A6]">under 30 seconds</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
