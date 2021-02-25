import useQuery from '../../utils/use-query';
import SearchItem from './search-item';
import '../../styles/search-result.scss';

const SearchResult = () => {
    const search = useQuery().get('search');
    return (
        <div className="search-container">
            <h2>{search}</h2>
            <SearchItem search={search}/>
        </div>
    );
}

export default SearchResult;