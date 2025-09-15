import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export default function DemoSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const progress1 = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const progress2 = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);  
  const progress3 = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);

  return (
    <section ref={containerRef} className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-[#EAEAEA] mb-4"
          >
            How <span className="gradient-text">LexiGuard</span> Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-[#A0A0A0] max-w-3xl mx-auto"
          >
            Experience the power of AI-driven legal analysis in three simple steps
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Steps */}
          <div className="space-y-12">
            {/* Step 1 */}
            <motion.div
              style={{ opacity: progress1 }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1C3D5A] to-[#14B8A6] flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-[#EAEAEA] mb-2">
                  Upload Securely
                </h3>
                <p className="text-gray-600 dark:text-[#A0A0A0] leading-relaxed">
                  Drag and drop your legal document or select files from your device. 
                  All uploads are encrypted and processed with enterprise-grade security.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              style={{ opacity: progress2 }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1C3D5A] to-[#14B8A6] flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-[#EAEAEA] mb-2">
                  AI Analysis
                </h3>
                <p className="text-gray-600 dark:text-[#A0A0A0] leading-relaxed">
                  Our advanced AI algorithms analyze your document, identifying key clauses, 
                  potential risks, and compliance issues in seconds.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              style={{ opacity: progress3 }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1C3D5A] to-[#14B8A6] flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-[#EAEAEA] mb-2">
                  Get Insights
                </h3>
                <p className="text-gray-600 dark:text-[#A0A0A0] leading-relaxed">
                  Receive comprehensive analysis with risk scores, recommendations, 
                  and actionable insights to make informed legal decisions.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Mock UI */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden"
            >
              {/* Mock Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="ml-4 text-xs text-gray-500">LexiGuard Analysis</div>
              </div>

              {/* Mock Content */}
              <div className="p-6">
                {/* Upload State */}
                <motion.div
                  style={{ opacity: progress1 }}
                  className="border-2 border-dashed border-[#14B8A6] rounded-lg p-8 text-center mb-6"
                >
                  <FileText className="w-12 h-12 text-[#14B8A6] mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-[#A0A0A0]">Contract_NDA.pdf</p>
                </motion.div>

                {/* Processing State */}
                <motion.div
                  style={{ opacity: progress2 }}
                  className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6"
                >
                  <Clock className="w-5 h-5 text-blue-500 animate-spin" />
                  <span className="text-blue-700 dark:text-blue-400">Analyzing document...</span>
                </motion.div>

                {/* Results State */}
                <motion.div
                  style={{ opacity: progress3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-700 dark:text-green-400">Analysis Complete</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm text-yellow-700 dark:text-yellow-400">Termination Clause</span>
                      </div>
                      <span className="text-xs bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">MEDIUM</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-700 dark:text-red-400">Liability Limitation</span>
                      </div>
                      <span className="text-xs bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 px-2 py-1 rounded">HIGH</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}