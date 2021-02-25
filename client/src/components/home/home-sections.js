import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/section.scss';

const Sections = () => {
    const [sections, setSections] = useState([]);
    const getSections = async () => {
        try {
            const res = await axios.get('/products/sections');
            setSections(res.data)
        }
        catch(err) {
            console.log(err);
        }
    }
    useEffect(() => getSections(), []);

    if(!sections.length) return <h1>Loading...</h1>;

    return (
         <div className="sections-container">
             {sections.map(section => {
                 return (
                     <Link to={`/products?search=${section.name.toLowerCase()}`} key={section._id}>
                        <div className='section'>
                            <h3>{section.name}</h3>
                            <img src={section.img} alt='section img'/>
                            <p>Explore</p>
                        </div>
                     </Link>
                 );
             })}
         </div>
    );
}

export default Sections;