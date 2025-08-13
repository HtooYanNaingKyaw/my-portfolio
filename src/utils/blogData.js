import blogData from '../data/blog.json';

// Export the entire blog data
export default blogData;

// Export individual sections
export const posts = blogData.posts;
export const categories = blogData.categories;
export const tags = blogData.tags;

// Blog post helper functions
export const getPublishedPosts = () => {
  return posts.filter(post => post.status === 'published');
};

export const getFeaturedPosts = () => {
  return posts.filter(post => post.featured && post.status === 'published');
};

export const getPostBySlug = (slug) => {
  return posts.find(post => post.slug === slug);
};

export const getPostById = (id) => {
  return posts.find(post => post.id === id);
};

export const getPostsByCategory = (categorySlug) => {
  return posts.filter(post => 
    post.category.toLowerCase() === categorySlug.toLowerCase() && 
    post.status === 'published'
  );
};

export const getPostsByTag = (tag) => {
  return posts.filter(post => 
    post.tags.some(postTag => 
      postTag.toLowerCase().includes(tag.toLowerCase())
    ) && post.status === 'published'
  );
};

export const getPostsByDate = () => {
  return posts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
};

export const getRecentPosts = (limit = 5) => {
  return getPostsByDate().slice(0, limit);
};

export const getRelatedPosts = (currentPost, limit = 3) => {
  const currentTags = currentPost.tags;
  const currentCategory = currentPost.category;
  
  return posts
    .filter(post => 
      post.id !== currentPost.id && 
      post.status === 'published' &&
      (post.category === currentCategory || 
       post.tags.some(tag => currentTags.includes(tag)))
    )
    .sort((a, b) => {
      // Prioritize posts with more matching tags
      const aMatches = a.tags.filter(tag => currentTags.includes(tag)).length;
      const bMatches = b.tags.filter(tag => currentTags.includes(tag)).length;
      return bMatches - aMatches;
    })
    .slice(0, limit);
};

// Category helper functions
export const getCategoryBySlug = (slug) => {
  return categories.find(category => category.slug === slug);
};

export const getCategoryByName = (name) => {
  return categories.find(category => category.name === name);
};

export const getCategoriesWithPostCount = () => {
  return categories.map(category => {
    const postCount = getPostsByCategory(category.slug).length;
    return {
      ...category,
      postCount
    };
  }).filter(category => category.postCount > 0);
};

// Tag helper functions
export const getTagsWithPostCount = () => {
  const tagCounts = {};
  
  posts.forEach(post => {
    if (post.status === 'published') {
      post.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
};

export const getPopularTags = (limit = 10) => {
  return getTagsWithPostCount().slice(0, limit);
};

// Search functionality
export const searchPosts = (query) => {
  const searchTerm = query.toLowerCase();
  
  return posts.filter(post => 
    post.status === 'published' &&
    (post.title.toLowerCase().includes(searchTerm) ||
     post.excerpt.toLowerCase().includes(searchTerm) ||
     post.content.toLowerCase().includes(searchTerm) ||
     post.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
  );
};

// Archive functionality
export const getPostsByYear = (year) => {
  return posts.filter(post => 
    post.status === 'published' &&
    new Date(post.publishedAt).getFullYear() === year
  );
};

export const getPostsByYearMonth = (year, month) => {
  return posts.filter(post => {
    if (post.status !== 'published') return false;
    
    const postDate = new Date(post.publishedAt);
    return postDate.getFullYear() === year && 
           postDate.getMonth() === month - 1; // Month is 0-indexed
  });
};

export const getArchiveYears = () => {
  const years = [...new Set(
    posts
      .filter(post => post.status === 'published')
      .map(post => new Date(post.publishedAt).getFullYear())
  )];
  
  return years.sort((a, b) => b - a);
};

// SEO helper functions
export const getPostSEO = (slug) => {
  const post = getPostBySlug(slug);
  return post ? post.seo : null;
};

export const getAllPostSlugs = () => {
  return posts
    .filter(post => post.status === 'published')
    .map(post => post.slug);
};

export const getAllCategorySlugs = () => {
  return categories.map(category => category.slug);
};

// Pagination helper
export const getPaginatedPosts = (page = 1, postsPerPage = 6) => {
  const allPosts = getPostsByDate();
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  
  return {
    posts: allPosts.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(allPosts.length / postsPerPage),
      totalPosts: allPosts.length,
      hasNextPage: endIndex < allPosts.length,
      hasPrevPage: page > 1
    }
  };
};
