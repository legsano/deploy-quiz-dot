import axios from 'axios';

const getQuestions = async (amount, difficulty) => {
    const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`);
    return response.data.results;
};

export { getQuestions };
