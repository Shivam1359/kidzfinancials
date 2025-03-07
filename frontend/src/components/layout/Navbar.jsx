import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import '../../components/Navbar/Navbar.css';
import logo from "/src/assets/react.svg";

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
        <nav 
            className={`container ${sticky ? 'dark-nav': ''}`} 
            ref={navRef}
            role="navigation"
            aria-label="Main navigation"
        >
            <img 
                src={logo} 
                alt="KidzFinancials Logo" 
                className='logo' 
                onClick={handleLogoClick}
                style={{ cursor: 'pointer' }}
                width="180"
                height="40"
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
                <li><ScrollLink to='services' smooth={true} offset={-210} duration={500} tabIndex={0} role="button">Services</ScrollLink></li>
                <li><ScrollLink to='about' smooth={true} offset={-100} duration={500} tabIndex={0} role="button">About Us</ScrollLink></li>
                <li><ScrollLink to='blogs' smooth={true} offset={-210} duration={500} tabIndex={0} role="button">Blogs</ScrollLink></li>
                <li><ScrollLink to='contact' smooth={true} offset={-210} duration={500} className='btn' tabIndex={0} role="button">Contact us</ScrollLink></li>
            </ul>
            <button 
                className='menu-icon' 
                onClick={toggleMenu} 
                aria-label={mobileMenu ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenu}
            >
                <img src={logo} alt="" />
            </button>
        </nav>
    );
};

export default Navbar;
