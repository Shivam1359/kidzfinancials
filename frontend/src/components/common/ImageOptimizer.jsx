import { useEffect, useState } from 'react';

/**
 * ImageOptimizer - An accessible and performant image component
 */
const ImageOptimizer = ({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  className = '',
  containerClassName = '',
  onLoad,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Calculate aspect ratio for the container
  const aspectRatio = height && width ? (height / width) * 100 : null;
  
  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };
  
  const handleError = () => {
    setError(true);
  };
  
  // Use IntersectionObserver for better performance
  useEffect(() => {
    if (!loading || loading === 'eager') return;
    
    const imgElement = document.querySelector(`img[data-src="${src}"]`);
    if (!imgElement) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          imgElement.setAttribute('src', src);
          observer.disconnect();
        }
      });
    }, {
      rootMargin: '200px 0px', // Load image when within 200px of viewport
      threshold: 0.01
    });
    
    observer.observe(imgElement);
    
    return () => {
      if (imgElement) observer.unobserve(imgElement);
    };
  }, [src, loading]);
  
  // Always enforce width and height for better CLS
  const finalWidth = width || 100;
  const finalHeight = height || 100;
  
  return (
    <div 
      className={`image-container ${containerClassName}`}
      style={aspectRatio ? { paddingBottom: `${aspectRatio}%`, position: 'relative', overflow: 'hidden' } : {}}
    >
      {error ? (
        <div className="image-error" role="alert">
          <p>Image failed to load</p>
        </div>
      ) : (
        <img
          src={loading === 'eager' ? src : undefined}
          data-src={src}
          alt={alt || "Image"}  // Always provide alt text, even if just "Image"
          width={finalWidth}
          height={finalHeight}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
          style={aspectRatio ? { position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto' } : {}}
          {...props}
        />
      )}
    </div>
  );
};

export default ImageOptimizer;
