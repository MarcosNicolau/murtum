import axios from 'axios';
import { useState } from 'react';
import Loader from '../loader';
import '../../styles/product/questions.scss';

const Questions = ({ productQuestions, productId, user, isOwn }) => {
    const [question, setQuestion] = useState('');
    const [questions, setQuestions] = useState(productQuestions);
    const [loading, setLoading] = useState(false);
    
    const sendQuestion = async () => {
        if(!user) return window.location.href = '/login';
        if(!question) return;
        try {
            setLoading(true);
            const res = await axios.post('/products/send-question', { question, productId });
            console.log(res.data);
            setLoading(false);
            setQuestions(res.data);
            setQuestion('');
        }
        catch(err){
            console.log(err);
        }
    }
    console.log(isOwn);
    return (
        <div className="questions-answers-container">
            <h2>Questions and answers</h2>
            {isOwn || 
                <div className="send-questions">
                    <textarea placeholder='Ask...' value={question} className='text-inputs' onChange={e => setQuestion(e.target.value)}></textarea>
                    <button className="ask-btn" onClick={sendQuestion}>Ask</button>
                </div> 
            }
            {loading && <Loader />}
            <div className="all-questions-answers">
                {questions.map(question => {
                    return (
                        <div key={question.createdAt} className="single-question-answer">
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