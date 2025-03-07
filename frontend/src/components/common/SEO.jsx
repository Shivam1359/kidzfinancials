import { useEffect } from 'react';

/**
 * SEO Component for managing document head metadata
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} [props.canonical] - Optional canonical URL
 * @param {Object} [props.meta] - Additional meta tags as key-value pairs
 */
const SEO = ({ title, description, canonical, meta = {} }) => {
  useEffect(() => {
    // Update document title
    document.title = `${title} - KidzFinancials`;
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;
    
    // Handle canonical URL if provided
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonical;
    } else if (canonicalLink) {
      canonicalLink.remove();
    }
    
    // Add any additional meta tags
    const metaTags = [];
    Object.entries(meta).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.appendChild(tag);
        metaTags.push(tag);
      }
      tag.content = content;
    });
    
    // Cleanup function to remove any meta tags we added
    return () => {
      metaTags.forEach(tag => {
        if (document.head.contains(tag)) {
          document.head.removeChild(tag);
        }
      });
    };
  }, [title, description, canonical, meta]);
  
  // This component doesn't render anything
  return null;
};

export default SEO;
