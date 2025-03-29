import { useNavigate } from 'react-router-dom';
// Swiper imports
import 'swiper/css'; // Core Swiper styles
import 'swiper/css/navigation'; // Navigation styles
import 'swiper/css/pagination'; // Pagination styles
import { Autoplay, Navigation, Pagination } from 'swiper/modules'; // Import necessary modules
import { Swiper, SwiperSlide } from 'swiper/react';

// React Icons for navigation
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Local assets and components
import blog_1 from '../../assets/blog-img1.jpg';
import blog_2 from '../../assets/blog-img2.jpg';
import blog_3 from '../../assets/blog-img3.jpg';
import blog_4 from '../../assets/blog-img4.jpg';
import ImageOptimizer from '../common/ImageOptimizer';

const blogPosts = [
    {
        id: 1,
        title: "Understanding RRSPs vs. TFSAs",
        excerpt: "Learn the key differences and benefits of RRSPs and TFSAs to make informed decisions for your savings.",
        image: blog_1,
        alt: "Comparison chart of RRSP and TFSA features",
        link: "/blog/rrsp-vs-tfsa"
    },
    {
        id: 2,
        title: "Beginner's Guide to Mortgage Insurance",
        excerpt: "Do you really need mortgage insurance? Understand the pros, cons, and alternatives available.",
        image: blog_2,
        alt: "Illustration of a house with a protective shield",
        link: "/blog/mortgage-insurance-guide"
    },
    {
        id: 3,
        title: "Maximizing RESP Government Grants",
        excerpt: "Discover strategies to get the most out of government grants like the CESG for your child's education.",
        image: blog_3,
        alt: "Graduation cap and stack of coins",
        link: "/blog/maximizing-resp-grants"
    },
    {
        id: 4,
        title: "Simple Tax Tips for Young Families",
        excerpt: "Navigate common tax credits and deductions available to families in Canada to reduce your tax burden.",
        image: blog_4,
        alt: "Calculator and tax forms",
        link: "/blog/family-tax-tips"
    }
];

const Blogs = () => {
    const navigate = useNavigate();

    const handleBlogClick = (link) => {
        if (link) navigate(link);
    };

    const handleExploreBlogs = () => {
        navigate('/blog');
    };

    return (
        <div className='relative px-4 sm:px-6 lg:px-16 py-16 md:py-20 bg-neutral-50' aria-labelledby="blog-section-title">
            <h2 id="blog-section-title" className="visually-hidden">Featured Blog Posts</h2>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                }}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination-custom',
                }}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                breakpoints={{
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    }
                }}
                className="!pb-16"
            >
                {blogPosts.map((post) => (
                    <SwiperSlide key={post.id} className="h-auto pb-2">
                        <div
                            className="group h-full bg-white rounded-lg overflow-hidden shadow-md border border-neutral-200 hover:shadow-lg transform transition-all duration-300 ease-in-out hover:-translate-y-1 cursor-pointer flex flex-col"
                            onClick={() => handleBlogClick(post.link)}
                            role="article"
                            tabIndex={0}
                            onKeyPress={(e) => e.key === 'Enter' && handleBlogClick(post.link)}
                        >
                            <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                                <ImageOptimizer
                                    src={post.image}
                                    alt={post.alt}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                    width={400}
                                    height={192}
                                />
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-lg font-semibold text-primary-800 mb-2 transition-colors group-hover:text-primary-600 line-clamp-2">{post.title}</h3>
                                <p className="text-sm text-neutral-600 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                                <span className="mt-auto inline-flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-800 transition-colors">
                                    Read More
                                    <FaArrowRight className="ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="group swiper-button-prev-custom absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 z-10 cursor-pointer bg-white/70 hover:bg-primary-600 rounded-full p-3 shadow-md transition-colors duration-200">
                <FaArrowLeft className="text-primary-600 group-hover:text-white text-xl transition-colors duration-200" />
            </div>
            <div className="group swiper-button-next-custom absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 z-10 cursor-pointer bg-white/70 hover:bg-primary-600 rounded-full p-3 shadow-md transition-colors duration-200">
                <FaArrowRight className="text-primary-600 group-hover:text-white text-xl transition-colors duration-200" />
            </div>

            <div className="swiper-pagination-custom text-center absolute bottom-6 left-0 right-0 z-10 space-x-2">
            </div>

            <div className="text-center mt-16">
                <button 
                    type="button" 
                    className="btn-primary inline-flex items-center" 
                    onClick={handleExploreBlogs}
                    aria-label="Explore all blog posts"
                >
                    Explore All Blogs
                </button>
            </div>
        </div>
    );
};

export default Blogs;
