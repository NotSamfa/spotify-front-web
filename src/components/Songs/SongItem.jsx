import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './SongItem.module.css'

function SongItem({data, enumSong}) {
    const navigate = useNavigate();

    function handleClickCard() {
        navigate(`/song/${data.titulo}`);
    }

    function handleClickTitle(event) {
        event.stopPropagation();
        navigate(`/song/${data.titulo}`);
    }

    // function handleCardArtist(event){
    //     event.stopPropagation();
    //     navigate(`/artist/${data.artist}`);
    // }

    return (
        <div className={styles.song} onClick={handleClickCard}>
            {enumSong && <span>{enumSong}</span>}
            <img src={data.imagen || 'https://via.placeholder.com/150'} alt={data.titulo} />
            <div className={styles.infoContainer}>
                <div className={styles.infoMain}>
                    <a className={styles.title} onClick={handleClickTitle}>{data.titulo}</a>
                    <p className={styles.artist}>{data.artista.nombre}</p>
                    {/* <a className={styles.artist} onClick={handleCardArtist}>{data.artist}</a> */}
                </div>
                <div className={styles.duration}>
                    <span>{data.duracion}</span>
                </div>
            </div>
        </div>
    );
}

SongItem.propTypes = {
    data: PropTypes.object.isRequired,
    enumSong: PropTypes.int
};


export default SongItem