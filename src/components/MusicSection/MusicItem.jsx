import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MusicItem.module.css'

/*  
    Se puede usar 'deconstruct' el objeto en caso se requiera, 
    pero ha de modificarse también el contenido del componente.

    Se sugiere cambiar la logica para saber si es genero o artista [data.isGenre] [data.isArtist]
    por ahora son booleanos
*/
function MusicItem({ data }) {
    const navigate = useNavigate();

    function handleClickTitle(event) {
        event.stopPropagation();
        let to = `/album/${data.title}`;

        if (data.isGenre !== undefined) to = `/genre/${data.title}`;
        if (data.isArtist !== undefined) to = `/artist/${data.title}`;

        navigate(to);
    }

    function handleClickArtist(event) {
        event.stopPropagation();
        navigate(`/artist/${data.artist}`);
    }

    function handleCardClick() {
        let to = '/album/';

        if (data.isGenre !== undefined) to = '/genre/';

        navigate(to + data.title);
    }

    return (
        <div className={styles.musicItem} onClick={data.isArtist !== undefined ? handleClickTitle : handleCardClick}>
            <img className={data.isArtist !== undefined ? styles.artistImage : styles.musicImage} 
                src={data.imageUrl || 'https://via.placeholder.com/150'} alt={data.name} />
            
            {data.isArtist !== undefined && 
                <div role='button' className={styles.playButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#121212">
                        <path d="M320-200v-560l440 280-440 280Z"/>
                    </svg>            
                </div> 
            }
            
            <a className={styles.title} onClick={handleClickTitle}>{data.title}</a>     
            
            {!data.isGenre && 
                <a className={styles.information} onClick={data.isArtist !== undefined ? handleClickTitle : handleClickArtist}>
                    {data.isArtist !== undefined ? 'Artista' : data.artist}
                </a>
            }
        </div>
    );
}


MusicItem.propTypes = {
    data: PropTypes.object.isRequired
};


export default MusicItem
