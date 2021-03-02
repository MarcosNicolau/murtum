import '../../styles/pages.scss';
const Pages = ({ pages, length }) => {
    return (
        <div className="pages">
            {pages.map((page, index) => {
                console.log(page);
                return (
                    <div className='page' key={index}>
                        <button 
                            onClick={() => window.location.href = `/products?search=tech&length=${page}`}
                            className={length === page ? 'active-page' : ''}    
                        >
                        {index + 1}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default Pages;