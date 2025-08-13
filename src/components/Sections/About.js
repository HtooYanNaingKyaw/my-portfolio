import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Globe, User } from 'lucide-react';
import { personal, contact } from '../../utils/portfolioData';

const About = () => {
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
    <section id="about" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Column - Image and Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-80 h-80 mx-auto lg:mx-0 relative">
                {/* Background decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl transform rotate-6 shadow-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl transform -rotate-6 shadow-xl"></div>
                
                {/* Main profile image container */}
                <div className="absolute inset-2 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center shadow-lg overflow-hidden">
                  {/* Profile Image */}
                  {personal.avatar ? (
                    <img 
                      src={personal.avatar}
                      alt={personal.name}
                      className="w-full h-full object-cover rounded-3xl"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  
                  {/* Fallback avatar with initials */}
                  <div 
                    className={`w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-3xl flex items-center justify-center relative ${
                      personal.avatar ? 'hidden' : 'flex'
                    }`}
                  >
                    {/* Avatar icon */}
                    <div className="absolute top-6 right-6 p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <User size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    
                    {/* Large initials */}
                    <div className="text-center">
                      <div className="text-8xl font-bold text-gray-400 dark:text-gray-500 mb-2">
                        {personal.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        Profile Photo
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <MapPin size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{contact.address}</span>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Mail size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <a 
                    href={`mailto:${contact.email}`}
                    className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Phone size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <a 
                    href={`tel:${contact.phone}`}
                    className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
                
                {personal.website && (
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Globe size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <a 
                      href={personal.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {personal.website.replace('https://', '')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Bio */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2 className="section-title">
                About Me
              </h2>
              <div className="section-divider"></div>
            </div>

            <div className="prose prose-lg text-gray-600 dark:text-gray-300 space-y-6">
              <p className="text-lg leading-relaxed">
                {personal.bio}
              </p>
              
              <p className="text-lg leading-relaxed">
                I'm passionate about creating user-friendly applications and solving complex problems through clean, efficient code. 
                With a strong foundation in both frontend and backend development, I enjoy building full-stack applications 
                that make a difference in people's lives.
              </p>
              
              <p className="text-lg leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or sharing my knowledge through blog posts and tutorials.
              </p>
            </div>

            {/* Availability Status */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-blue-800 dark:text-blue-200 font-semibold text-lg">
                  {contact.availability}
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg card-hover">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">5+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg card-hover">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">20+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg card-hover">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">15+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Technologies</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg card-hover">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Client Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
