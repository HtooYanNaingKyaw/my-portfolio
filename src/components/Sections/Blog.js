import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowRight, ExternalLink } from 'lucide-react';
import { 
  getPublishedPosts, 
  categories as blogCategories, 
  tags as blogTags,
  getPostsByCategory,
  getPostsByTag 
} from '../../utils/blogData';

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  
  const allPosts = getPublishedPosts();
  const categories = blogCategories;
  const tags = blogTags;

  const filters = [
    { id: 'all', label: 'All Posts' },
    { id: 'featured', label: 'Featured' },
    { id: 'category', label: 'By Category' },
    { id: 'tag', label: 'By Tag' }
  ];

  const getFilteredPosts = () => {
    switch (activeFilter) {
      case 'all':
        return allPosts;
      case 'featured':
        return allPosts.filter(post => post.featured);
      case 'category':
        return selectedCategory === 'all' 
          ? allPosts 
          : getPostsByCategory(selectedCategory);
      case 'tag':
        return selectedTag === 'all' 
          ? allPosts 
          : getPostsByTag(selectedTag);
      default:
        return allPosts;
    }
  };

  const filteredPosts = getFilteredPosts();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
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
    <section id="blog" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">
            Latest Blog Posts
          </h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            I share my thoughts on web development, design, and technology. 
            Here are some of my recent articles and tutorials.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Category/Tag Filters */}
        {(activeFilter === 'category' || activeFilter === 'tag') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {activeFilter === 'category' ? (
              <>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.slug
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </>
            ) : (
              <>
                <button
                  onClick={() => setSelectedTag('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedTag === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  All Tags
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedTag === tag
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </>
            )}
          </motion.div>
        )}

        {/* Posts Count */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredPosts.length} of {allPosts.length} posts
          </p>
        </div>

        {/* Blog Posts Grid */}
        <motion.div
          key={`${activeFilter}-${selectedCategory}-${selectedTag}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="group card overflow-hidden card-hover"
              >
                {/* Post Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {post.title.split(' ').map(word => word[0]).join('')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  {post.url && (
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                        >
                          <ExternalLink size={20} className="text-gray-700 group-hover:text-white" />
                        </motion.a>
                      </div>
                    </div>
                  )}

                  {/* Featured Badge */}
                  {post.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gray-800 text-white text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Post Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{getReadingTime(post.content)} min read</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs font-medium rounded flex items-center space-x-1"
                      >
                        <Tag size={12} />
                        <span>{tag}</span>
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs font-medium rounded">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Read More Link */}
                  {post.url ? (
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 font-medium"
                    >
                      <span>Read More</span>
                      <ArrowRight size={16} />
                    </a>
                  ) : (
                    <span className="inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                      <span>Coming Soon</span>
                      <ArrowRight size={16} />
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No blog posts found for the selected filter.
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
              Want to read more?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              I regularly write about web development, design patterns, and the latest technologies.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://your-blog-url.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Visit My Blog</span>
              <ExternalLink size={18} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
