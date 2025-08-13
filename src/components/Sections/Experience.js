import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building, ExternalLink } from 'lucide-react';
import { experience } from '../../utils/portfolioData';

const Experience = () => {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const getDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);
    
    if (diffYears > 0) {
      return `${diffYears} year${diffYears > 1 ? 's' : ''}`;
    } else if (diffMonths > 0) {
      return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
    } else {
      return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    }
  };

  return (
    <section id="experience" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">
            Work Experience
          </h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            My professional journey and the companies I've had the privilege to work with. 
            Each role has contributed to my growth as a developer.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-600"></div>

          <div className="space-y-12">
            {experience.map((job, index) => (
              <motion.div
                key={job.id}
                variants={itemVariants}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-800 shadow-lg z-10"></div>

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <div className="card p-6 hover:shadow-lg transition-all duration-300">
                    {/* Job Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {job.position}
                        </h3>
                        <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium mb-2">
                          <Building size={16} />
                          <span>{job.company}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                          {getDuration(job.startDate, job.endDate)}
                        </div>
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <Calendar size={14} />
                        <span>
                          {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : 'Present'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <MapPin size={14} />
                        <span>{job.location}</span>
                      </div>
                    </div>

                    {/* Job Description */}
                    {/* <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {job.description}
                    </p> */}

                    {/* Achievements */}
                    {job.achievements && job.achievements.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Key Achievements:
                        </h4>
                        <ul className="space-y-2">
                          {job.achievements.map((achievement, achievementIndex) => (
                            <li key={achievementIndex} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies Used */}
                    {job.technologies && job.technologies.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {job.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs font-medium rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Looking for new opportunities
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              I'm always open to discussing new opportunities and exciting projects.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Let's Work Together
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
