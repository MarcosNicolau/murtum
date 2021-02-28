import useQuery from '../../utils/use-query';
import SearchItem from './search-item';
import '../../styles/products-list.scss';

const SearchResult = () => {
    const search = useQuery().get('search');
    return (
        <>
            <h2 className='query'>{search}</h2>
            <SearchItem search={search}/>
        </>
    );
}

export default SearchResult;