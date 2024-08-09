import React, { useEffect, useState } from 'react';
import '../style/result.css'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import WarningBox from '../components/WarningBox';

export default function Result() {
    const navigate = useNavigate();
    const savedUsername = localStorage.getItem('username');

    const [isWarnBoxVisible, setWarnBoxVisible] = useState(false);

    // Mengambil data riwayat hasil quiz dari localStorage

    const storageKey = savedUsername === "Admin" ? 'quizHistory' : 'quizHistoryCreate';

    const [quizHistory, setQuizHistory] = useState(() => {
        const savedHistory = localStorage.getItem(storageKey);
        return savedHistory ? JSON.parse(savedHistory) : [];
    });


    useEffect(() => {
        document.title = 'Result';

        // Jika ada hasil quiz terbaru, tambahkan ke riwayat
        const totalQuestions = localStorage.getItem('amountquestion');
        const totalScore = localStorage.getItem('score');
        const quizTitle = localStorage.getItem('title');
        const quizAnswered = localStorage.getItem('quizAnswered');

        const quizTime = localStorage.getItem('quizTime');
        const quizDate = localStorage.getItem('quizDate');

        if (totalQuestions && totalScore && quizTitle && quizAnswered) {
            const newQuizResult = {
                totalQuestions,
                totalScore,
                quizTitle,
                quizAnswered,
                percentage: ((totalScore / totalQuestions) * 100).toFixed(1),
                quizTime,
                quizDate,
            };

            // Perbarui riwayat hasil quiz
            const updatedQuizHistory = [newQuizResult, ...quizHistory];
            setQuizHistory(updatedQuizHistory);
            localStorage.setItem(storageKey, JSON.stringify(updatedQuizHistory));


            // Hapus data hasil quiz dari localStorage untuk persiapan quiz berikutnya
            localStorage.removeItem('amountquestion');
            localStorage.removeItem('score');
            localStorage.removeItem('title');
            localStorage.removeItem('quizAnswered');
            localStorage.removeItem('quizTime');
            localStorage.removeItem('quizDate');
        }
    }, [quizHistory]);

    useEffect(() => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');

        if (!email || !password) {
            navigate('/'); // Redirect to login if no email or password
        }
    }, [navigate]);

    const navigateDashboard = () => {
        navigate('/dashboard');
    };

    function toggleWarnBox() {
        setWarnBoxVisible(!isWarnBoxVisible)
    }

    function onConfirm() {
        localStorage.removeItem(storageKey);
        setWarnBoxVisible(!isWarnBoxVisible)
        window.location.reload();
    }

    return (
        <div className='resultContainer'>
            <Navbar username={savedUsername} disableResult={true} />
            <WarningBox isWarnBoxVisible={isWarnBoxVisible} toggleWarnBox={toggleWarnBox} onConfirm={onConfirm} />
            <div className="resultContContent">
                <div className='resultBox'>
                    <h2>Result</h2>
                    <div className="resCardBox">


                        {
                            quizHistory.length > 0 ? (
                                quizHistory.map((result, index) => (
                                    <ResultCard
                                        key={index}
                                        correctAnswers={result.totalScore}
                                        incorrectAnswers={result.quizAnswered - result.totalScore}
                                        quizAnswered={result.quizAnswered}
                                        totalQuestions={result.totalQuestions}
                                        quizTitle={result.quizTitle}
                                        percentage={result.percentage}
                                        quizTime={result.quizTime}
                                        quizDate={result.quizDate}
                                    />
                                ))
                            ) : (<p>No quizzes completed yet</p>)
                        }



                    </div>

                    <div className='resultButton'>
                        <button onClick={toggleWarnBox}>Remove History</button>
                        <button onClick={navigateDashboard}>Dashboard</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

function ResultCard({ correctAnswers, incorrectAnswers, quizAnswered, totalQuestions, quizTitle, percentage, quizTime, quizDate }) {
    return (
        <div>
            <div className="resultCard">
                <div className="headResCard">
                    <h5>{quizTitle}</h5>
                    <p>{quizTime}</p>
                    <p>{quizDate}</p>
                </div>


                <div className="score">
                    <p>Score :</p>
                    <span>{percentage}%</span>
                </div>

                <div className='detailAnswer'>
                    <p>Correct: {correctAnswers}</p>
                    <p>Incorrect: {incorrectAnswers}</p>
                    <p>Answered: {quizAnswered}</p>
                    <p>Total: {totalQuestions}</p>
                </div>
            </div>
        </div>
    );
}
