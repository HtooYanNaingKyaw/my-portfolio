import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { projects, getFeaturedProjects } from '../../utils/portfolioData';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const featuredProjects = getFeaturedProjects();

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'featured', label: 'Featured' },
    { id: 'website', label: 'Website' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' }
  ];

  // Use category-based filtering from the JSON data
  const getFilteredProjects = () => {

    switch (activeFilter) {
      case 'all':
        return projects;
        
      case 'featured':
        return featuredProjects;
        
      case 'website':
        const websiteProjects = projects.filter(project => 
          project.category === 'website'
        );
        return websiteProjects;
        
      case 'frontend':
        const frontendProjects = projects.filter(project => 
          project.category === 'frontend'
        );
        return frontendProjects;
        
      case 'backend':
        const backendProjects = projects.filter(project => 
          project.category === 'backend'
        );
        return backendProjects;
        
      default:
        return projects;
    }
  };

  const filteredProjects = getFilteredProjects();

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
    <section id="projects" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">
            My Projects
          </h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Here are some of the projects I've worked on. Each project represents a unique challenge 
            and showcases different aspects of my development skills.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 lg:gap-4 mb-8 lg:mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveFilter(filter.id);
              }}
              className={`px-4 lg:px-6 py-2 rounded-full font-medium transition-all duration-200 text-sm lg:text-base ${
                activeFilter === filter.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Count */}
        <div className="text-center mb-6 lg:mb-8">
          <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredProjects && filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group card overflow-hidden card-hover"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {project.title.split(' ').map(word => word[0]).join('')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-4">
                      {project.github && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                        >
                          <Github size={20} className="text-gray-700 group-hover:text-white" />
                        </motion.a>
                      )}
                      {project.live && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                        >
                          <ExternalLink size={20} className="text-gray-700 group-hover:text-white" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gray-800 text-white text-xs font-medium rounded-full capitalize">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs font-medium rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs font-medium rounded">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Project Links */}
                  <div className="flex space-x-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        <Eye size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No projects found for the selected filter.
              </p>
            </div>
          )}
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
              Interested in working together?
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
              Let's Talk
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
