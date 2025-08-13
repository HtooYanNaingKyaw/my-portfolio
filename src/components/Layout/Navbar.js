import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { personal } from '../../utils/portfolioData';
import { portfolioConfig } from '../../config/portfolio';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference or default to light mode
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    console.log('Initial dark mode state:', savedDarkMode);
    setDarkMode(savedDarkMode);
    
    // Apply dark mode class to body
    if (savedDarkMode) {
      document.body.classList.add('dark');
      console.log('Added dark class to body');
    } else {
      document.body.classList.remove('dark');
      console.log('Removed dark class from body');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    console.log('Toggling dark mode from', darkMode, 'to', newDarkMode);
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.body.classList.add('dark');
      console.log('Added dark class to body');
    } else {
      document.body.classList.remove('dark');
      console.log('Removed dark class from body');
    }
  };

  const resetDarkMode = () => { // Temporary debug function
    console.log('Resetting dark mode to light');
    setDarkMode(false);
    localStorage.removeItem('darkMode');
    document.body.classList.remove('dark');
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    ...(portfolioConfig.showExperience ? [{ name: 'Experience', href: '#experience' }] : []),
    ...(portfolioConfig.showEducation ? [{ name: 'Education', href: '#education' }] : []),
    { name: 'Projects', href: '#projects' },
    ...(portfolioConfig.showBlog ? [{ name: 'Blog', href: '#blog' }] : []),
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            {/* <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {personal.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div> */}
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {personal.name}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ y: -2 }}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Right Side - Dark Mode Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Debug Reset Button (temporary) */}
            {/* <button
              onClick={resetDarkMode}
              className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 text-xs font-medium"
            >
              Reset
            </button> */}

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {darkMode ? (
                <Sun size={20} className="text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon size={20} className="text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isOpen ? (
                <X size={24} className="text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu size={24} className="text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl"
          >
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ x: 4 }}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
