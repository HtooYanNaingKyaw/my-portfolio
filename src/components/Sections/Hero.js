import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Twitter, ChevronDown } from 'lucide-react';
import { personal, social } from '../../utils/portfolioData';

const Hero = () => {
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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float dark:bg-blue-500"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float dark:bg-purple-500" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float dark:bg-pink-500" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-full"
        >
          {/* Greeting */}
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg tracking-wide">
              Hello, I'm
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 dark:text-white mb-6 gradient-text break-words"
          >
            {personal.name}
          </motion.h1>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-8"
          >
            {personal.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed px-4"
          >
            {personal.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 px-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary flex items-center gap-3 w-full sm:w-auto"
            >
              Get In Touch
              <ArrowRight size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary w-full sm:w-auto"
            >
              View My Work
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-6"
          >
            {social.github && (
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-pulse-glow"
              >
                <Github size={24} className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors" />
              </motion.a>
            )}
            
            {social.linkedin && (
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-pulse-glow"
              >
                <Linkedin size={24} className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors" />
              </motion.a>
            )}
            
            {social.twitter && (
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-pulse-glow"
              >
                <Twitter size={24} className="text-blue-400 hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-200 transition-colors" />
              </motion.a>
            )}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center space-y-2 cursor-pointer group"
              onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                <ChevronDown size={20} className="sm:w-6 sm:h-6" />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300 font-medium tracking-wide">
                Scroll Down
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
