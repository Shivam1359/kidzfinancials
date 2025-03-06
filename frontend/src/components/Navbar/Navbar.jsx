// import React, { useEffect, useState } from 'react'
// import { Link } from "react-scroll"; 

// import './Navbar.css'
// import logo from "/src/assets/react.svg";


// const Navbar = () => {

//     const [sticky, setSticky] = useState(false);

//     useEffect(()=>{
//         window.addEventListener('scroll',()=>{
//             window.scrollY > 50 ? setSticky(true):setSticky(false);
//         })
//     },[])

//     const [mobileMenu, setMobileMenu] = useState(false);
//     const toggleMenu = () => {
//         setMobileMenu(!mobileMenu);
//     };

//     return(
//         <nav className={`container ${sticky ? 'dark-nav': ''}`}>
//             <img src = {logo} alt="" className='logo' />
//             <ul className={mobileMenu? 'show-mobile-menu': 'hide-mobile-menu'}>
//                 <li><Link to='hero' smooth = {true} offset ={0}
//                 duration={500}>Home</Link></li>
//                 <li><Link to='service' smooth = {true} offset ={-210}
//                 duration={500}>Services</Link></li>
//                 <li><Link to='about' smooth = {true} offset ={-100}
//                 duration={500}>About Us</Link></li>
//                 <li><Link to='blogs' smooth = {true} offset ={-210}
//                 duration={500}>Blogs</Link></li>
//                 <li><Link to='contact' smooth = {true} offset ={-210}
//                 duration={500} className='btn'>Contact us</Link></li>
//             </ul>
//             <img src={logo} alt="menu" className='menu-icon' onClick={toggleMenu}/>
//         </nav>

//     )
// }


// export default Navbar
import React, { useEffect, useState, useRef } from 'react'
import { Link as ScrollLink } from "react-scroll"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import './Navbar.css'
import logo from "/src/assets/react.svg"

const Navbar = () => {
    const [sticky, setSticky] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const navRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.scrollY > 50 ? setSticky(true) : setSticky(false);
        });

        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setMobileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setMobileMenu(!mobileMenu);
    };

    const handleLogoClick = () => {
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return(
        <nav className={`container ${sticky ? 'dark-nav': ''}`} ref={navRef}>
            <img 
                src={logo} 
                alt="Logo" 
                className='logo' 
                onClick={handleLogoClick}
                style={{ cursor: 'pointer' }}
            />
            <ul className={mobileMenu ? 'show-mobile-menu' : 'hide-mobile-menu'}>
                <li>
                    <RouterLink 
                        to="/" 
                        onClick={() => {
                            setMobileMenu(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        Home
                    </RouterLink>
                </li>
                <li><ScrollLink to='services' smooth={true} offset={-210} duration={500}>Services</ScrollLink></li>
                <li><ScrollLink to='about' smooth={true} offset={-100} duration={500}>About Us</ScrollLink></li>
                <li><ScrollLink to='blogs' smooth={true} offset={-210} duration={500}>Blogs</ScrollLink></li>
                <li><ScrollLink to='contact' smooth={true} offset={-210} duration={500} className='btn'>Contact us</ScrollLink></li>
            </ul>
            <img src={logo} alt="menu" className='menu-icon' onClick={toggleMenu}/>
        </nav>
    )
}

export default Navbar