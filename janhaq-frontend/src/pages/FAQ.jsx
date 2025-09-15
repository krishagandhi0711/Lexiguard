import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

const faqs = [
  {
    question: "How accurate is LexiGuard's AI analysis?",
    answer: "Our AI achieves 99.8% accuracy in identifying legal risks and key clauses. We continuously train our models on millions of legal documents and validate results with experienced legal professionals."
  },
  {
    question: "What types of documents can I analyze?",
    answer: "LexiGuard supports contracts, NDAs, terms of service, employment agreements, partnership agreements, and most other legal documents. We accept PDF files and high-quality images of documents."
  },
  {
    question: "Is my document data secure and private?",
    answer: "Absolutely. We use enterprise-grade encryption for all file uploads and processing. Your documents are never stored longer than necessary for analysis, and we never share your data with third parties."
  },
  {
    question: "How long does the analysis take?",
    answer: "Most document analyses are completed within 30 seconds. Complex documents with many clauses may take up to 2 minutes. You'll see real-time progress updates during processing."
  },
  {
    question: "Can I download or share the analysis results?",
    answer: "Yes! You can download detailed analysis reports as text files and share results with your team. All reports include risk scores, key findings, and actionable recommendations."
  },
  {
    question: "Do you offer API access for developers?",
    answer: "We're currently developing our API for enterprise customers. Contact us if you're interested in integrating LexiGuard's analysis capabilities into your existing workflows."
  },
  {
    question: "What makes LexiGuard different from other legal tech tools?",
    answer: "LexiGuard combines deep legal expertise with cutting-edge AI to provide instant, actionable insights. Our focus on user experience and document security sets us apart from traditional legal analysis tools."
  },
  {
    question: "Is LexiGuard suitable for non-lawyers?",
    answer: "Absolutely! We designed LexiGuard to make legal analysis accessible to everyone. Our clear explanations, visual risk scores, and plain-English recommendations help anyone understand their legal documents."
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-[#EAEAEA] mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-[#A0A0A0] max-w-2xl mx-auto">
            Get answers to common questions about LexiGuard's AI-powered legal document analysis.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:no-underline hover:text-[#1C3D5A] dark:hover:text-[#14B8A6] transition-colors">
                  <span className="font-semibold text-gray-900 dark:text-[#EAEAEA]">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 dark:text-[#A0A0A0] leading-relaxed pt-2">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 p-8 bg-gradient-to-r from-[#1C3D5A]/5 to-[#14B8A6]/5 rounded-2xl border border-[#1C3D5A]/10 dark:border-[#14B8A6]/10"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-[#EAEAEA] mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 dark:text-[#A0A0A0] mb-6">
            We're here to help! Contact our team for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@lexiguard.ai"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#1C3D5A] to-[#14B8A6] text-white font-semibold rounded-lg hover:from-[#112538] hover:to-[#0F766E] transition-all duration-200 hover:scale-105"
            >
              Email Support
            </a>
            <button
  onClick={() => alert("Live chat coming soon!")} // replace with actual function
  className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#1C3D5A] text-[#1C3D5A] dark:border-[#14B8A6] dark:text-[#14B8A6] font-semibold rounded-lg hover:bg-[#1C3D5A]/5 dark:hover:bg-[#14B8A6]/5 transition-all duration-200 hover:scale-105"
>
  Live Chat
</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}