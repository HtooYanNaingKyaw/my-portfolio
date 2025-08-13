import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, ExternalLink } from 'lucide-react';
import { education } from '../../utils/portfolioData';

const Education = () => {
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
      month: 'long'
    });
  };

  return (
    <section id="education" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">
            Education
          </h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            My academic background and educational achievements that have shaped my journey 
            in technology and development.
          </p>
        </motion.div>

        {/* Education Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-6 lg:gap-8"
        >
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              variants={itemVariants}
              className="card p-4 lg:p-6 hover:shadow-lg transition-all duration-300 card-hover"
            >
              {/* Education Header */}
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 mb-2">
                    <GraduationCap size={16} className="lg:w-5 lg:h-5" />
                    <span className="font-semibold text-sm lg:text-base">{edu.degree}</span>
                  </div>
                  <h3 className="text-base lg:text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {edu.institution}
                  </h3>
                </div>
                {edu.gpa && (
                  <div className="text-right">
                    <div className="px-2 lg:px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded-full">
                      GPA: {edu.gpa}
                    </div>
                  </div>
                )}
              </div>

              {/* Education Details */}
              <div className="space-y-2 lg:space-y-3 mb-3 lg:mb-4">
                <div className="flex items-center space-x-2 text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                  <Calendar size={12} className="lg:w-3.5 lg:h-3.5" />
                  <span>
                    {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                  <MapPin size={12} className="lg:w-3.5 lg:h-3.5" />
                  <span className="break-words">{edu.location}</span>
                </div>
                {edu.field && (
                  <div className="flex items-center space-x-2 text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                    <Award size={12} className="lg:w-3.5 lg:h-3.5" />
                    <span>Field: {edu.field}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {edu.description && (
                <p className="text-gray-600 dark:text-gray-300 mb-3 lg:mb-4 leading-relaxed text-left text-sm lg:text-base">
                  {edu.description}
                </p>
              )}

              {/* Courses/Subjects */}
              {edu.courses && edu.courses.length > 0 && (
                <div className="mb-3 lg:mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm lg:text-base">
                    Key Courses:
                  </h4>
                  <div className="flex flex-wrap gap-1 lg:gap-2">
                    {edu.courses.map((course, courseIndex) => (
                      <span
                        key={courseIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs font-medium rounded"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {edu.achievements && edu.achievements.length > 0 && (
                <div className="mb-3 lg:mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm lg:text-base">
                    Achievements:
                  </h4>
                  <ul className="space-y-1">
                    {edu.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start space-x-2 text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                        <span className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-blue-500 rounded-full mt-1.5 lg:mt-2 flex-shrink-0"></span>
                        <span className="break-words">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Certificates/Links */}
              {edu.certificates && edu.certificates.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm lg:text-base">
                    Certificates:
                  </h4>
                  <div className="space-y-1 lg:space-y-2">
                    {edu.certificates.map((cert, certIndex) => (
                      <a
                        key={certIndex}
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-xs lg:text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                      >
                        <ExternalLink size={12} className="lg:w-3.5 lg:h-3.5" />
                        <span className="break-words">{cert.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 lg:mt-16"
        >
          <div className="card p-6 lg:p-8">
            <div className="text-center">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">
                Continuous Learning
              </h3>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300 mb-4 lg:mb-6 max-w-2xl mx-auto">
                I believe in lifelong learning and continuously improving my skills through 
                online courses, workshops, and staying updated with the latest technologies.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
                <div className="text-center p-3 lg:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">50+</div>
                  <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Online Courses</div>
                </div>
                <div className="text-center p-3 lg:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">20+</div>
                  <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Certifications</div>
                </div>
                <div className="text-center p-3 lg:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">100+</div>
                  <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Hours Learning</div>
                </div>
                <div className="text-center p-3 lg:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">15+</div>
                  <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Technologies</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
