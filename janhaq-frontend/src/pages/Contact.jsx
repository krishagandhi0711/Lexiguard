import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { SendEmail } from "../integrations/Core";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await SendEmail({
        to: "support@lexiguard.ai",
        subject: `Contact Form: ${formData.subject} - ${formData.name}`,
        body: `
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Subject: ${formData.subject}

Message:
${formData.message}`
      });

      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', subject: 'General Inquiry', message: '' });
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#121212] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md w-full"
        >
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-[#EAEAEA] mb-4">Message Sent!</h2>
          <p className="text-gray-600 dark:text-[#A0A0A0] mb-8">Thank you for contacting us. We'll get back to you within 24 hours.</p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-[#1C3D5A] to-[#14B8A6] hover:from-[#112538] hover:to-[#0F766E] text-white"
          >
            Send Another Message
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-[#EAEAEA] mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-[#A0A0A0] max-w-2xl mx-auto">
            Have questions about LexiGuard or need help with your legal document analysis? We're here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="bg-white dark:bg-[#1E1E1E] shadow-lg border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-[#EAEAEA]">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-r from-[#1C3D5A] to-[#14B8A6]">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-[#EAEAEA] mb-1">Email</h3>
                    <p className="text-gray-600 dark:text-[#A0A0A0]">support@lexiguard.ai</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">We'll respond within 24 hours</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-r from-[#1C3D5A] to-[#14B8A6]">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-[#EAEAEA] mb-1">Phone</h3>
                    <p className="text-gray-600 dark:text-[#A0A0A0]">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mon-Fri, 9am-6pm PST</p>
                  </div>
                </div>

                {/* Office */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-r from-[#1C3D5A] to-[#14B8A6]">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-[#EAEAEA] mb-1">Office</h3>
                    <p className="text-gray-600 dark:text-[#A0A0A0]">San Francisco, CA</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Remote-first company</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Card */}
            <Card className="bg-gradient-to-r from-[#1C3D5A] to-[#14B8A6] text-white shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Enterprise Solutions</h3>
                <p className="text-sm opacity-90 mb-4">
                  Looking for custom integrations or enterprise features? Let's discuss how LexiGuard can fit your organization.
                </p>
                <Button className="bg-white text-[#1C3D5A] hover:bg-gray-100 w-full py-2">
                  Schedule a Demo
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white dark:bg-[#1E1E1E] shadow-lg border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-[#EAEAEA]">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        className="border-gray-300 dark:border-gray-600"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className="border-gray-300 dark:border-gray-600"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Your company name"
                        className="border-gray-300 dark:border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                        <SelectTrigger className="border-gray-300 dark:border-gray-600">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                          <SelectItem value="Technical Support">Technical Support</SelectItem>
                          <SelectItem value="Enterprise Sales">Enterprise Sales</SelectItem>
                          <SelectItem value="Partnership">Partnership</SelectItem>
                          <SelectItem value="Press/Media">Press/Media</SelectItem>
                          <SelectItem value="Bug Report">Bug Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      className="border-gray-300 dark:border-gray-600"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-[#1C3D5A] to-[#14B8A6] hover:from-[#112538] hover:to-[#0F766E] text-white flex items-center justify-center"
                  >
                    {isSubmitting ? "Sending..." : <>
                      <Send className="w-5 h-5 mr-2" /> Send Message
                    </>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
