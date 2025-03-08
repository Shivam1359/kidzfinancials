import React, { useRef } from 'react'
import back_icon from '../../assets/back-icon.png'
import blog_1 from '../../assets/blog-img1.jpg'
import blog_2 from '../../assets/blog-img2.jpg'
import next_icon from '../../assets/next-icon.png'
import './Blogs.css'

const Blogs = () => {
    const slider = useRef();
    let tx = 0;

    const slideForward = () => {
        if(tx > -50){
            tx -= 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`;
    }

    const slideBackward = () => {
        if(tx < 0){
            tx += 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`;
    }

    return (
        <div className='blogs'>
            <img src={next_icon} alt="Next" className='next-btn' onClick={slideForward} />
            <img src={back_icon} alt="Back" className='back-btn' onClick={slideBackward} />
            <div className="slider">
                <ul ref={slider}>
                    <li>
                        <div className="slide">
                            <div className="blog-info">
                                <img 
                                    src={blog_1} 
                                    alt="Blog 1" 
                                    className="blog-image" 
                                />
                                <div>
                                    <h3>Health Insurance</h3>
                                    <span>Personal Accident Insurance: Why do you need it beyond Life and Health Coverage?</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="blog-info">
                                <img 
                                    src={blog_2}
                                    alt="Person reviewing health insurance policy" 
                                    className="blog-image" 
                                />
                                <div>
                                    <h3>Health Insurance</h3>
                                    <span>Personal Accident Insurance: Why do you need it beyond Life and Health Coverage?</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="blog-info">
                                <div className="image-container">
                                    <img 
                                        src={blog_2}
                                        alt="Family protected by insurance" 
                                        className="blog-image" 
                                    />
                                </div>
                                <div>
                                    <h3>Health Insurance</h3>
                                    <span>Personal Accident Insurance: Why do you need it beyond Life and Health Coverage?</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="blog-info">
                                <div className="image-container">
                                    <img 
                                        src={blog_1}
                                        alt="Blog 4" 
                                        className="blog-image" 
                                    />
                                </div>
                                <div>
                                    <h3>Health Insurance</h3>
                                    <span>Personal Accident Insurance: Why do you need it beyond Life and Health Coverage?</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Blogs