import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/logins.css';

import BouncingBalls from '../components/BouncingBalls';
import Navbar from '../components/Navbar';



export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPasswordSignIn, setShowPasswordSignIn] = useState(false);
    const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);

    const [createUsername, setCreateUsername] = useState('');
    const [createEmail, setCreateEmail] = useState('');
    const [createPassword, setCreatePassword] = useState('');

    const [isSignUpActive, setSignUpActive] = useState(false);

    const newEmail = localStorage.getItem('createEmail');
    const newPassword = localStorage.getItem('createPassword');
    const newUsername = localStorage.getItem('createName');

    const username = 'Admin';
    const useEmail = 'admin@gmail.com';
    const usePassword = 'admin';

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
        document.title = 'Login';
    }, []);

    const handleLogin = () => {
        if (!email && !password) {
            alert('Email and Password are required');
            return;
        }
        else if (!email) {
            alert('Email is required');
            return;
        }
        else if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        else if (!password) {
            alert('Password is required');
            return;
        }
        if ((email === useEmail && password === usePassword) ||
            (email === newEmail && password === newPassword)) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('username', email === newEmail ? newUsername : username);
            navigate('/dashboard');
            setShowPasswordSignIn(false);
        } else {
            alert('Login is not valid');
            setEmail('');
            setPassword('');
        }
    };


    const CreateAccount = () => {
        if (!createEmail || !createPassword || !createUsername) {
            alert('All fields are required');
            return;
        }
        else if (!validateEmail(createEmail)) {
            alert('Please enter a valid email address');
            return;
        }
        localStorage.setItem('createEmail', createEmail);
        localStorage.setItem('createPassword', createPassword);
        localStorage.setItem('createName', createUsername);
        localStorage.removeItem('quizHistoryCreate');

        console.log("name : ", { createUsername });
        console.log("email : ", { createEmail });
        console.log("password : ", { createPassword });

        setCreateUsername('');
        setCreateEmail('');
        setCreatePassword('');

        setSignUpActive(false); // Kembali ke form login
        setShowPasswordSignUp(false);
    };


    const SignUp = () => {
        setSignUpActive(!isSignUpActive); // Menambahkan class .active
        setShowPasswordSignIn(false);
        setShowPasswordSignUp(false);
    };

    const ShowPasswordSignIn = () => {
        setShowPasswordSignIn(!showPasswordSignIn);
    };

    const ShowPasswordSignUp = () => {
        setShowPasswordSignUp(!showPasswordSignUp);
    };

    return (
        <div className='loginContainer'>
            <Navbar />
            <BouncingBalls />
            <div className="loginBox">
                <div className={`signInBox ${isSignUpActive ? 'disable' : ''}`}>
                    <h2>Login</h2>

                    <div className="loginInputBox">
                        <div>
                            <p>Email</p>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                disabled={isSignUpActive ? true : false}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />

                        </div>

                        <div>
                            <p>Password</p>
                            <input
                                type={showPasswordSignIn ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                disabled={isSignUpActive ? true : false}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </div>
                        <span
                            className={`material-symbols-outlined visibility ${showPasswordSignIn ? 'show' : 'hide'}`}
                            onClick={ShowPasswordSignIn}
                        >
                            {showPasswordSignIn ? 'visibility' : 'visibility_off'}
                        </span>
                    </div>

                    <div className='signIpButton'>
                        <button onClick={handleLogin} disabled={isSignUpActive ? true : false}>Sign In</button>
                        <p className='createAccount'>Don't have account ? <span onClick={SignUp}>Sign Up</span></p>
                    </div>

                </div>

                <div className={`signUpBox ${isSignUpActive ? 'active' : ''}`}>
                    <h2>Sign Up</h2>
                    <div className="CreateSignUpBox">
                        <div>
                            <p>Name</p>
                            <input
                                type="text"
                                placeholder="Name"
                                value={createUsername}
                                disabled={isSignUpActive ? false : true}
                                onChange={(e) => setCreateUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <p>Email</p>
                            <input
                                type="email"
                                placeholder="Email"
                                value={createEmail}
                                disabled={isSignUpActive ? false : true}
                                onChange={(e) => setCreateEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <p>Password</p>
                            <input
                                type={showPasswordSignUp ? 'text' : 'password'}
                                placeholder="Password"
                                value={createPassword}
                                disabled={isSignUpActive ? false : true}
                                onChange={(e) => setCreatePassword(e.target.value)}
                            />
                        </div>
                        <span
                            className={`material-symbols-outlined visibilitySU ${showPasswordSignUp ? 'show' : 'hide'}`}
                            onClick={ShowPasswordSignUp}
                        >
                            {showPasswordSignUp ? 'visibility' : 'visibility_off'}
                        </span>


                    </div>


                    <div className='signUpButton'>
                        <button onClick={SignUp} disabled={isSignUpActive ? false : true}>Back</button>
                        <button onClick={CreateAccount} disabled={isSignUpActive ? false : true}>Create</button>
                    </div>
                </div>
            </div>


        </div>
    );
};

