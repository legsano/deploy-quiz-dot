import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/navbar.css';

import dotLogo from '../assets/dotlogo.png';
import profil from '../assets/profil.png';
import downarrow from '../assets/downarrow.png';

export default function Navbar({ username, disableLogout, disableResult }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null); // Ref to the dropdown menu
    const dropdownArrowRef = useRef(null); // Ref to the dropdown arrow

    const handleLogout = () => {
        if (!disableLogout) {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            localStorage.removeItem('username');
            localStorage.removeItem('question');
            localStorage.removeItem('difficulty');
            localStorage.removeItem('time');
            localStorage.removeItem('score');
            localStorage.removeItem('amountquestion');
            localStorage.setItem('quizInProgress', 'false');
            navigate('/'); // Redirect to login or home page
        }
    };

    const handleResult = () => {
        navigate('/result')
    };

    // Check if current path is '/login'
    const isLoginPage = location.pathname === '/';

    useEffect(() => {
        // Handle clicks outside of dropdown menu
        function handleClickOutside(event) {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                dropdownArrowRef.current && !dropdownArrowRef.current.contains(event.target)
            ) {
                // Close the dropdown if clicked outside
                setDropdownVisible(false);
            }
        }


        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Cleanup event listener
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className='navbar'>
            <div className='navBox'>
                <div className='navLogo'>
                    <img src={dotLogo} alt="dotlogo" />
                    <h2>Quiz</h2>
                </div>

                {!isLoginPage && (
                    <div className="accountNav">
                        <div className="profil">
                            <img src={profil} alt="profil" />
                            <p>{username}</p>
                        </div>

                        <div
                            className={`dropdownArrow ${isDropdownVisible ? 'up' : ''}`}
                            onClick={() => setDropdownVisible(!isDropdownVisible)}
                            ref={dropdownArrowRef}
                        >
                            <img src={downarrow} alt="downarrow" />
                        </div>

                        <div
                            className={`dropdownMenu ${isDropdownVisible ? 'visible' : ''}`}
                            ref={dropdownRef}
                        >
                            <div className='mobProfil'>
                                <img src={profil} alt="profil" />
                                <p>{username}</p>
                            </div>

                            <button onClick={handleResult} disabled={disableResult}>Result</button>
                            <button onClick={handleLogout} disabled={disableLogout}>Logout</button>

                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
