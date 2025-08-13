import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { contact, social } from '../../utils/portfolioData';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("NakmuK6yKSU-mKomI"); // You'll need to replace this with your actual EmailJS public key
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Htoo Yan Naing Kyaw',
        reply_to: formData.email,
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        'service_qwptbwr', // EmailJS service ID
        'template_3q1zfz6', // EmailJS template ID
        templateParams,
        'NakmuK6yKSU-mKomI' // EmailJS public key
      );

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">
            Get In Touch
          </h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            I'm always interested in hearing about new opportunities and exciting projects. 
            Feel free to reach out if you'd like to work together or just want to say hello!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-6 lg:space-y-8">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
                Let's Connect
              </h3>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300 mb-6 lg:mb-8 leading-relaxed">
                I'm currently available for freelance opportunities and full-time positions. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 lg:space-y-6">
              <div className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-600">
                <div className="flex-shrink-0 p-2 lg:p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Mail size={16} className="text-blue-600 dark:text-blue-400 lg:w-5 lg:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <a 
                    href={`mailto:${contact.email}`}
                    className="text-sm lg:text-base text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200 break-all"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-600">
                <div className="flex-shrink-0 p-2 lg:p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Phone size={16} className="text-blue-600 dark:text-blue-400 lg:w-5 lg:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <a 
                    href={`tel:${contact.phone}`}
                    className="text-sm lg:text-base text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-600">
                <div className="flex-shrink-0 p-2 lg:p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <MapPin size={16} className="text-blue-600 dark:text-blue-400 lg:w-5 lg:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300 break-words">
                    {contact.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 lg:mb-4 text-base lg:text-lg">Follow Me</h4>
              <div className="flex space-x-3 lg:space-x-4">
                {social.github && (
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 lg:p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-600"
                  >
                    <Github size={16} className="text-gray-700 dark:text-gray-300 lg:w-5 lg:h-5" />
                  </motion.a>
                )}
                
                {social.linkedin && (
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 lg:p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-600"
                  >
                    <Linkedin size={16} className="text-blue-600 dark:text-blue-400 lg:w-5 lg:h-5" />
                  </motion.a>
                )}
                
                {social.twitter && (
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 lg:p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-600"
                  >
                    <Twitter size={16} className="text-blue-400 dark:text-blue-300 lg:w-5 lg:h-5" />
                  </motion.a>
                )}
              </div>
            </div>

            {/* Availability Status */}
            <div className="card p-4 lg:p-6">
              <div className="flex items-center space-x-3 mb-2 lg:mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">Current Status</span>
              </div>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">{contact.availability}</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="card p-6 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">Send a Message</h3>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-4 lg:mb-6 p-3 lg:p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <p className="font-medium text-sm lg:text-base">Message sent successfully! 🎉</p>
                <p className="text-xs lg:text-sm mt-1">I'll get back to you as soon as possible.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-4 lg:mb-6 p-3 lg:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="font-medium text-sm lg:text-base">Failed to send message. 😔</p>
                <p className="text-xs lg:text-sm mt-1">Please try again or contact me directly via email.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 lg:mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field text-sm lg:text-base"
                    placeholder="Your name"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 lg:mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field text-sm lg:text-base"
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 lg:mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input-field text-sm lg:text-base"
                  placeholder="What's this about?"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 lg:mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="input-field resize-none text-sm lg:text-base"
                  placeholder="Tell me about your project or just say hello!"
                  disabled={isSubmitting}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center space-x-2 transition-all duration-200 text-sm lg:text-base ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'btn-primary'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} className="lg:w-4.5 lg:h-4.5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
