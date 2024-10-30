import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './SidebarItem.module.css';


function SidebarItem({isOpen, data}) {
    const navigate = useNavigate();
    const [info, setInfo] = useState('');


    function handleClick(){
        let to = `/album/${data.title}`;

        if (data.isArtist) to = `/artist/${data.artist}`;

        navigate(to);
    }

    async function fetchData(info) {
        try {

            if (!info.isArtist) {
                const response = await fetch(`http://localhost:3000/album/albumTitulo/${info.title}`);
            
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
            
                const data = await response.json();
                setInfo(data.album);

            }

            if (info.isArtist) {
                const response = await fetch(`http://localhost:3000/artista/nombre/${info.artist}`);
            
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
            
                const data = await response.json();
                setInfo(data.artista);
            }
        }catch (error) {
            console.error('Error al hacer la petición:', error);
        }
    };

    useEffect(() => {
        fetchData(data);
    }, [data]);


    return (
        <li className={styles.item} onClick={handleClick}>
            <img src={info.imagen || 'https://via.placeholder.com/50'} alt={data.title || data.artist} 
            className={`${styles.itemImage} ${data.isArtist ? styles.artist : ''}`} />

            {isOpen &&
                <div className={styles.infoContainer}>
                    <p className={styles.title}>{data.isArtist ? data.artist : data.title}</p>
                    <p className={styles.info}>{data.isArtist ? 'Artista' : info.artista?.nombre}</p>
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