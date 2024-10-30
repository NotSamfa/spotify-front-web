import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Search({isExploring, onExploring, query, onSearch}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);        
    const navigate = useNavigate();
    const inputRef = useRef(null);

    function handleQueryContent(query) {
        const to =`/search/${query}`;

        onSearch(query);

        navigate(to);
    }

    function handleCancel() {
        onSearch('');
    }

    function handleClickToNavigate() {
        const to =`/search/`;
        
        if (inputRef.current) {
            inputRef.current.focus();
        }

        if (!query) {
            navigate(to);
        }
    }

    useEffect(() => {
        const urls = [
            `http://localhost:3000/album/albumTitulo/${query}`,
            `http://localhost:3000/cancion/titulo/${query}`,
            `http://localhost:3000/artista/nombre/${query}`,

        ];

        const fetchAllData = async () => {
            try {
                setLoading(true);
                const responses = await Promise.all(urls.map((url) => fetch(url)));
                const results = await Promise.all(responses.map((response) => response.json()));
                
                setData(results);
            } catch (err) {
                setError('Error al cargar los datos', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [query]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='search-bar' onClick={handleClickToNavigate}>
            <span className='search-bar__icon'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
            </span>

            <input className='search-input' ref={inputRef} type='text' placeholder='¿Qué quieres reproducir?' 
                value = {query} onChange={(e) => handleQueryContent(e.target.value)}
                onFocus={() => onExploring(true)}/>

            {!query || !isExploring 
                ? 
                    <>
                        <div className='search-bar__line'></div>
                        <span className='search-bar__library-icon' onClick={() => onExploring(true)}>
                            {isExploring ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M500-360q42 0 71-29t29-71v-220h120v-80H560v220q-13-10-28-15t-32-5q-42 0-71 29t-29 71q0 42 29 71t71 29ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Z"/></svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#b1b1b1"><path d="M500-360q42 0 71-29t29-71v-220h120v-80H560v220q-13-10-28-15t-32-5q-42 0-71 29t-29 71q0 42 29 71t71 29ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg>}
                        </span> 
                    </> 
                : 
                    <span className='search-bar__cancel-icon' onClick={handleCancel}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#b1b1b1"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    </span>
            }

        </div>
    );
}

Search.propTypes = {
    isExploring: PropTypes.bool.isRequired,
    onExploring: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired
};

export default Search