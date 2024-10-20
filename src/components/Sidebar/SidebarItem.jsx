import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './SidebarItem.module.css';


{/* Cambiar logica para saber si es un artista o no [data.isArtist]
    Cambiar valores que usa del objeto data */}
function SidebarItem({isOpen, data}) {
    const navigate = useNavigate();


    function handleClick(){
        let to = `/album/${data.title}`;

        if (data.isArtist) to = `/artist/${data.artist}`;

        navigate(to);
    }


    return (
        <li className={styles.item} onClick={handleClick}>
            <img src={data.imageUrl || 'https://via.placeholder.com/50'} alt={data.title} 
            className={`${styles.itemImage} ${data.isArtist ? styles.artist : ''}`} />

            {isOpen &&
                <div className={styles.infoContainer}>
                    <p className={styles.title}>{data.isArtist ? data.artist : data.title}</p>
                    <p className={styles.info}>{data.isArtist ? 'Artista' : data.artist}</p>
                </div>

            }
        </li>
    );
}

SidebarItem.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired
};

export default SidebarItem