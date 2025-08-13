import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Palette, Wrench } from 'lucide-react';
import { skills } from '../../utils/portfolioData';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Palette size={24} />,
      skills: skills.frontend,
      color: 'blue'
    },
    {
      title: 'Backend',
      icon: <Code size={24} />,
      skills: skills.backend,
      color: 'green'
    },
    {
      title: 'Database',
      icon: <Database size={24} />,
      skills: skills.database,
      color: 'purple'
    },
    {
      title: 'Tools',
      icon: <Wrench size={24} />,
      skills: skills.tools,
      color: 'orange'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700',
      green: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700',
      purple: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700',
      orange: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:border-orange-700'
    };
    return colors[color] || colors.blue;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">
            Skills & Technologies
          </h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            I've worked with a variety of technologies to create robust and scalable applications. 
            Here are the key skills I've developed over the years.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="card card-hover p-4 lg:p-6"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-4 lg:mb-6">
                <div className={`p-2 rounded-lg ${getColorClasses(category.color)}`}>
                  {category.icon}
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: skillIndex * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm lg:text-base text-gray-700 dark:text-gray-300 font-medium break-words">{skill}</span>
                    <div className="flex items-center space-x-2 ml-2">
                      <div className="w-12 lg:w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.random() * 40 + 60}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          className={`h-full rounded-full ${
                            category.color === 'blue' ? 'bg-blue-500 dark:bg-blue-400' :
                            category.color === 'green' ? 'bg-green-500 dark:bg-green-400' :
                            category.color === 'purple' ? 'bg-purple-500 dark:bg-purple-400' :
                            'bg-orange-500 dark:bg-orange-400'
                          }`}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 lg:mt-16"
        >
          <div className="text-center mb-6 lg:mb-8">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">
              Additional Skills
            </h3>
            <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">
              I'm constantly learning and expanding my skill set to stay current with the latest technologies.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4">
            {['Git', 'Docker', 'AWS', 'CI/CD', 'Agile', 'REST APIs', 'GraphQL', 'Testing', 'Performance', 'Security', 'SEO', 'Accessibility'].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="card p-3 lg:p-4 text-center card-hover"
              >
                <span className="text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 break-words">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 lg:mt-16 card p-6 lg:p-8"
        >
          <div className="text-center">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">
              Currently Learning
            </h3>
            <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300 mb-4 lg:mb-6">
              I'm always excited to learn new technologies and frameworks.
            </p>
            <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
              {['Next.js 14', 'TypeScript', 'GraphQL', 'Docker', 'AWS'].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 lg:px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs lg:text-sm font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
