import portfolioData from '../data/portfolio.json';

// Export the entire portfolio data
export default portfolioData;

// Export individual sections for easier access
export const personal = portfolioData.personal;
export const skills = portfolioData.skills;
export const projects = portfolioData.projects;
export const experience = portfolioData.experience;
export const education = portfolioData.education;
export const certifications = portfolioData.certifications;
export const interests = portfolioData.interests;
export const languages = portfolioData.languages;
export const social = portfolioData.social;
export const contact = portfolioData.contact;
export const settings = portfolioData.settings;
export const blog = portfolioData.blog;

// Helper functions for common data operations
export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured);
};

export const getSkillsByCategory = (category) => {
  return skills[category] || [];
};

export const getAllSkills = () => {
  return Object.values(skills).flat();
};

export const getExperienceByDate = () => {
  return experience.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
};

export const getProjectsByTechnology = (technology) => {
  return projects.filter(project => 
    project.technologies.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
};

// Blog helper functions
export const getFeaturedBlogPosts = () => {
  return blog.filter(post => post.featured);
};

export const getBlogPostsByCategory = (category) => {
  return blog.filter(post => post.category === category);
};

export const getBlogPostsByTag = (tag) => {
  return blog.filter(post => 
    post.tags.some(postTag => 
      postTag.toLowerCase().includes(tag.toLowerCase())
    )
  );
};

export const getBlogPostsByDate = () => {
  return blog.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
};

export const getBlogPostBySlug = (slug) => {
  return blog.find(post => post.slug === slug);
};

export const getBlogCategories = () => {
  const categories = [...new Set(blog.map(post => post.category))];
  return categories.sort();
};

export const getBlogTags = () => {
  const allTags = blog.flatMap(post => post.tags);
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags.sort();
};

export const getPublishedBlogPosts = () => {
  return blog.filter(post => post.status === 'published');
};
