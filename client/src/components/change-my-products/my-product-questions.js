import { useState } from 'react';
import axios from 'axios';
import Loader from '../loader';
import '../../styles/product/questions.scss';

const MyProductQuestons = ({ productQuestions, productId }) => {
    const [questions, setQuestions] = useState(productQuestions);
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const sendAnswer = async (item) => {
        if(!answer) return;
        try {
            setLoading(true);
            const res = await axios.post('/my-products/send-answer', { answer, productId, item });
            setLoading(false);
            setQuestions(res.data);
            setAnswer('');
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="questions-answers-container">
            <h2>Questions and answers</h2>
            <div className="all-questions-answers">
                {loading && <Loader />}
                {questions.map(question => {
                    return (
                        <div key={question.createdAt} className="single-question-answer">
                            <p className='question'>Question: {question.question}</p>
                            {question.answer ? <p className='answer'>Answer: {question.answer}</p> : 
                            <div className="send-answer">
                                <textarea type="text" placeholder='Answer...' onChange={e => setAnswer(e.target.value)}></textarea>
                                <input type="button" value="Answer" className='ask-btn' onClick={() => sendAnswer(question)}/>
                            </div>
                            }
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MyProductQuestons;