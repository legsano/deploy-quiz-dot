import '../style/quizcard.css';

export default function QuizCard({ title, desk, amount, time, difficulty, navigateToQuiz }) {
    const handleButtonClick = () => {
        navigateToQuiz(amount, difficulty, time, title); // Call the function with parameters
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
        <div className="quizCard">
            <div className="quizCardBox">
                <p>{title}</p>
                <p>{desk}</p>
                <p>question : {amount}</p>
                <p>time : {formatTime(time)}</p>
                <button onClick={handleButtonClick}>Take Quiz</button>
            </div>
        </div>
    )
}