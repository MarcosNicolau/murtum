import axios from 'axios';
import { useState } from 'react';
import '../../styles/product/questions.scss';

const Questions = ({ productQuestions, id }) => {
    const [question, setQuestion] = useState('');
    const [questions, setQuestions] = useState(productQuestions);
    const [loading, setLoading] = useState(false);

    const sendQuestion = async () => {
        if(!question) return;
        try {
            setLoading(true);
            const res = await axios.post('/products/send-question', { question, id });
            console.log(res.data);
            setLoading(false);
            setQuestions(res.data);
            setQuestion('');
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="questions-answers-container">
            <h2>Questions and answers</h2>
            <div className="send-questions">
                <textarea placeholder='Ask...' value={question} className='text-inputs' onChange={e => setQuestion(e.target.value)}></textarea>
                <button className="ask-btn" onClick={sendQuestion}>Aks</button>
            </div>
            <div className="all-questions-answers">
                {loading && <h1>Loading...</h1>}
                {questions.map(question => {
                    return (
                        <div className="single-question-answer">
                            <p className='question'>Question: {question.question}</p>
                            {question.answer && <p className='answer'>Answer: {question.answer}</p>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Questions;