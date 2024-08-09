import React, { useState, useEffect } from 'react';
import Question from '../components/Question';
import { useNavigate } from 'react-router-dom';
import '../style/quiz.css';
import Navbar from '../components/Navbar';
import WarningBox from '../components/WarningBox';

// import { useLocation, useNavigate } from 'react-router-dom';

export default function Quiz() {
    const navigate = useNavigate();
    // const location = useLocation();
    // const { questionsReq } = location.state || {};

    const savedUsername = localStorage.getItem('username');
    const amountquestion = localStorage.getItem('question');
    const difficultyquestion = localStorage.getItem('difficulty');
    const duration = parseInt(localStorage.getItem('time')) || 0;

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(parseInt(localStorage.getItem('score')) || 0);
    const [timeLeft, setTimeLeft] = useState(duration);
    const [answersHistory, setAnswersHistory] = useState(Array(amountquestion).fill(null));
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 400); // Set default based on initial width
    const [isWarnBoxVisible, setWarnBoxVisible] = useState(false);

    const amount = amountquestion;



    useEffect(() => {
        // Function to handle window resize
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 400); // Update state based on window width
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        document.title = 'Quiz';

        // Ambil string JSON dari localStorage
        const questionsReqString = localStorage.getItem('fetchedQuestions');

        // Ubah string JSON kembali menjadi array
        const questionsReq = questionsReqString ? JSON.parse(questionsReqString) : [];

        if (!questionsReq.length) {
            navigate('/dashboard'); // Redirect if no questions are available
        } else {
            setQuestions(questionsReq);
        }

        // Muat jawaban dari localStorage
        const savedAnswers = localStorage.getItem('answersHistory');
        if (savedAnswers) {
            setAnswersHistory(JSON.parse(savedAnswers));
        }

        // Ambil waktu terakhir dari localStorage jika ada
        const savedTimeLeft = localStorage.getItem('timeLeft');
        if (savedTimeLeft) {
            setTimeLeft(parseInt(savedTimeLeft));
        }
    }, [navigate]);


    useEffect(() => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');

        if (!email || !password) {
            navigate('/'); // Redirect to login if no email or password
        }

        else if (!amountquestion || !difficultyquestion || !duration) {
            navigate('/dashboard'); // Redirect to login if no email or password
        }

    }, [navigate, amountquestion, difficultyquestion, duration]);

    useEffect(() => {
        if (questions.length > 0 && timeLeft > 0 && !quizFinished) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setQuizFinished(true); // Set the quiz as finished
                        localStorage.removeItem('timeLeft'); // Hapus waktu terakhir setelah kuis selesai
                    } else {
                        localStorage.setItem('timeLeft', prevTime - 1); // Simpan waktu terakhir ke localStorage
                        return prevTime - 1;
                    }
                });
            }, 1000);

            return () => clearInterval(timer);
        } else if (quizFinished) {
            handleFinishQuiz();
        }
    }, [questions, timeLeft, quizFinished]);

    useEffect(() => {
        // Ambil answersHistory dari localStorage
        const savedAnswersHistory = JSON.parse(localStorage.getItem('answersHistory')) || [];

        // Hitung jumlah soal yang sudah dijawab
        const answeredCount = savedAnswersHistory.filter(answer => answer !== null).length;

        // Simpan jumlah soal yang sudah dijawab ke localStorage
        localStorage.setItem('quizAnswered', answeredCount.toString());

    }, [answersHistory]);


    function toggleWarnBox() {
        setWarnBoxVisible(!isWarnBoxVisible)
    }

    function onConfirm() {
        setWarnBoxVisible(!isWarnBoxVisible)
        handleFinishQuiz();
    }

    function getCurrentDateTime() {
        const now = new Date(); // Create a new Date object with the current date and time

        // Extract date and time components
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const day = now.getDate();
        const month = now.getMonth() + 1; // Months are zero-based, so add 1
        const year = now.getFullYear();

        // Format time and date as strings
        const formattedTime = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')}`;
        const formattedDate = `${day.toString().padStart(2, '0')} - ${month.toString().padStart(2, '0')} - ${year}`;

        return {
            time: formattedTime,
            date: formattedDate
        };
    }

    const handleFinishQuiz = () => {
        const currentDateTime = getCurrentDateTime();

        localStorage.setItem('quizTime', currentDateTime.time);
        localStorage.setItem('quizDate', currentDateTime.date);

        localStorage.setItem('score', score);
        localStorage.setItem('amountquestion', amountquestion);
        localStorage.removeItem('question');
        localStorage.removeItem('difficulty');
        localStorage.removeItem('time');
        localStorage.removeItem('answersHistory'); // Hapus jawaban setelah kuis selesai
        localStorage.removeItem('timeLeft'); // Hapus waktu terakhir
        localStorage.setItem('quizInProgress', 'false');

        navigate('/result');
    };

    const numberArray = Array.from({ length: amount }, (_, i) => i + 1);

    const handleClick = (index) => {
        setCurrentQuestionIndex(index);
    };

    const test = () => {
        if (!isNavVisible) {

        } else {
            setIsNavVisible(!isNavVisible);
        }
    };

    const handleNavClick = (e) => {
        e.stopPropagation();
    };


    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        if (h > 0) {
            return `${h}h ${m}m`;
        } else if (m > 0) {
            return `${m}m ${s}s`;
        } else {
            return `${s}s`;
        }
    };

    return (
        <div className='quizContainer'>
            <Navbar username={savedUsername} disableLogout={true} disableResult={true} />
            <WarningBox isWarnBoxVisible={isWarnBoxVisible} toggleWarnBox={toggleWarnBox} onConfirm={onConfirm} />

            <div className='quizBox' onClick={test}>
                <div className='questionContainer'>
                    <div className='questionIndex'>
                        <p>
                            {isMobileView ?
                                `Q : ${currentQuestionIndex + 1} of ${amount}` :
                                `Question : ${currentQuestionIndex + 1} of ${amount}`}
                        </p>
                        <p>
                            {isMobileView ?
                                `T: ${formatTime(timeLeft)}` :
                                `Time : ${formatTime(timeLeft)}`}
                        </p>
                    </div>

                    {questions.length > 0 ? (
                        <Question
                            data={questions[currentQuestionIndex]}
                            currentQuestionIndex={currentQuestionIndex}
                            setCurrentQuestionIndex={setCurrentQuestionIndex}
                            answersHistory={answersHistory}
                            setAnswersHistory={setAnswersHistory}
                            setScore={setScore}
                            amount={amount}
                        />
                    ) : (
                        <p>Loading questions...</p>
                    )}

                    <div className="quizInstruction">
                        <p>- Select the correct answer by clicking on it -</p>
                    </div>

                </div>

                <div className={`quizNavCont ${isNavVisible ? 'visible' : ''}`} onClick={handleNavClick} >
                    <div className='quizNav'>
                        <div className='quizTime'>
                            <p>{formatTime(timeLeft)}</p>
                        </div>

                        <div className="numbQuestCont">
                            <div className='numberQuestion'>
                                {numberArray.map((num, index) => (
                                    <div key={num}
                                        className={`numb ${answersHistory[index] ? 'answered' : ''}`}
                                        onClick={() => handleClick(num - 1)}
                                    >
                                        {num}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="buttonNP">
                            <button onClick={() => setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0))} disabled={currentQuestionIndex === 0}>Prev</button>
                            <button onClick={currentQuestionIndex === amount - 1 ? toggleWarnBox : () => setCurrentQuestionIndex(prevIndex => Math.min(prevIndex + 1, amount - 1))}>
                                {currentQuestionIndex === amount - 1 ? 'Finish' : 'Next'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`quizNavMob ${isNavVisible ? 'selected' : ''}`} onClick={() => setIsNavVisible(!isNavVisible)}>
                    <span className="material-symbols-outlined">
                        menu
                    </span>
                </div>
            </div>
        </div>
    );
};

