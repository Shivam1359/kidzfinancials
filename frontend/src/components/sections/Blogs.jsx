import { useRef } from 'react';
import back_icon from '../../assets/back-icon.png';
import blog_1 from '../../assets/blog-img1.jpg';
import blog_2 from '../../assets/blog-img2.jpg';
import blog_3 from '../../assets/blog-img3.jpg';
import blog_4 from '../../assets/blog-img4.jpg';
// Add imports for blog_3 and blog_4 if available
// If not available, we'll create unique references to existing images
import next_icon from '../../assets/next-icon.png';
import '../../components/Blogs/Blogs.css';
import ImageOptimizer from '../common/ImageOptimizer';

const Blogs = () => {
    const slider = useRef();
    let tx = 0;

    const slideForward = () => {
        if(tx > -18){
            tx -= 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`;
    };

    const slideBackward = () => {
        if(tx < -18){
            tx += 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`;
    };


    const blogPosts = [
        {
            id: 1,
            title: "Health Insurance asdadasda",
            excerpt: "Personal Accident Insurance: Why do you need it beyond Life and Health Coverage?",
            image: blog_1,
            alt: "Health Insurance Coverage Document"
        },
        {
            id: 2,
            title: "Health Insurance",
            excerpt: "Personal Accident Insurance: Why do you need it beyond Life and Health Coverage?",
            image: blog_2,
            alt: "Person reviewing health insurance policy"
        },
        {
            id: 3,
            title: "Health Insurance",
            excerpt: "Personal Accident Insurance: Why do you need it beyond Life and Health Coverage?",
            image: blog_3, // Use blog_3 instead of blog_2
            alt: "Family protected by insurance"
        },
        {
            id: 4,
            title: "Health Insurance",
            excerpt: "Personal Accident Insurance: Why do you need it beyond Life and Health Coverage?",
            image: blog_4, // Use blog_4 instead of blog_1
            alt: "Health Insurance Benefits Chart"
        }
    ];

    return (
        <div className='blogs' aria-labelledby="blog-section-title">
            <h2 id="blog-section-title" className="visually-hidden">Featured Blog Posts</h2>
            
            <button 
                className='next-btn' 
                onClick={slideForward} 
                aria-label="Next blogs"
            >
                <ImageOptimizer src={next_icon} alt="" width={70} height={70} />
            </button>
            
            <button 
                className='back-btn' 
                onClick={slideBackward} 
                aria-label="Previous blogs"
            >
                <ImageOptimizer src={back_icon} alt="" width={70} height={70} />
            </button>
            
            <div className="slider">
                <ul ref={slider} aria-live="polite">
                    {blogPosts.map((post) => (
                        <li key={post.id}>
                            <div className="slide">
                                <div className="blog-info">
                                    <ImageOptimizer 
                                        src={post.image} 
                                        alt={post.alt} 
                                        width={200} 
                                        height={150}
                                        loading="lazy"
                                    />
                                    <div>
                                        <h3>{post.title}</h3>
                                        <span>{post.excerpt}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Blogs;
