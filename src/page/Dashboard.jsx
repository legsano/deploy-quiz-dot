import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { getQuestions } from '../Api';
import '../style/dashboard.css';
import QuizCard from '../components/QuizCard';

export default function Dashboard() {
    const navigate = useNavigate();
    const savedUsername = localStorage.getItem('username');

    const deskCard1 = 'Simple quiz to test your knowledge of general knowledge';
    const deskCard2 = 'Advanced quiz to test your knowledge of general knowledge';
    const deskCard3 = 'Caution : This quiz maybe can burn your brain';

    useEffect(() => {
        document.title = 'Dashboard';
    }, []);

    useEffect(() => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        const quizInProgress = localStorage.getItem('quizInProgress');

        if (!email || !password) {
            navigate('/'); // Redirect to login if no email or password
        }
        else if (quizInProgress === 'true') {
            navigate('/quiz');
        }
    }, [navigate]);

    const handleNavigateToQuiz = async (amount, difficulty, time, title) => {
        localStorage.setItem('question', amount);
        localStorage.setItem('difficulty', difficulty);
        localStorage.setItem('time', time);
        localStorage.setItem('quizInProgress', 'true');
        localStorage.setItem('title', title);
        // localStorage.setItem('shuffledStatus', '1');

        localStorage.removeItem('amountquestion');
        localStorage.removeItem('score');
        // localStorage.removeItem('title');

        console.log('Shuffled Status Dshbrd:', localStorage.getItem('shuffledStatus'));

        // Fetch questions and navigate
        try {
            const fetchedQuestions = await getQuestions(amount, difficulty);
            localStorage.setItem('fetchedQuestions', JSON.stringify(fetchedQuestions));

            navigate('/quiz');
            // navigate('/quiz', { state: { questionsReq: fetchedQuestions } });
        } catch (error) {
            console.error('Failed to fetch questions:', error);
        }
    };

    return (
        <div className='dashboard'>
            <Navbar username={savedUsername} />
            <div className="dashboardContent">
                <div className="dashtext">
                    <h1>Take a Quiz</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus consequuntur fugit distinctio alias ratione debitis ipsum, quidem similique recusandae nisi? </p>
                </div>

                <div className='dashCard'>
                    <QuizCard title='Quiz Easy' desk={deskCard1} amount={5} time={30} difficulty='easy' navigateToQuiz={handleNavigateToQuiz} />
                    <QuizCard title='Quiz Hard' desk={deskCard2} amount={10} time={600} difficulty='medium' navigateToQuiz={handleNavigateToQuiz} />
                    <QuizCard title='Quiz Asian' desk={deskCard3} amount={50} time={3000} difficulty='hard' navigateToQuiz={handleNavigateToQuiz} />
                </div>

            </div>
        </div>
    );
}
