import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import ColorThief from 'colorthief';
import PropTypes from 'prop-types';
import Layout from "../components/Layout";
import { FastAverageColor } from 'fast-average-color';
import './Album.css';

function Album() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [album, setAlbum] = useState('');
    const [songs, setSongs] = useState('');
    const [averageColor, setAverageColor] = useState('#000');

    const handleToSong = (name) => {
        const to = `/song/${name}`;
        navigate(to);
    };

    const handleToArtist = (name) => {
        const to = `/artist/${name}`;
        navigate(to);
    };

    useEffect(() => {
        async function fetchAlbum(name) {
            try {
                const response = await fetch('http://localhost:3000/album/albumTitulo/' + name);
                
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                
                const data = await response.json();
                setAlbum(data.album);
                
                const fac = new FastAverageColor();
        
                fac.getColorAsync(data.album.imagen)
                    .then(color => {
                        setAverageColor(color.hex);
                    })
                    .catch(error => {
                        console.error('Error al obtener el color promedio:', error);
                    });
                
                const songsData = await Promise.all(
                    data.album.canciones.map(async (cancionId) => {
                        const response = await fetch(`http://localhost:3000/cancion/${cancionId}`);
                        if (!response.ok) {
                            throw new Error(`Error al obtener los detalles de la canción con ID: ${cancionId}`);
                        }
                        const data = await response.json();
                        return data.cancion;
                    })
                );

                setSongs(songsData);
                
                // Limpieza del componente
                return () => {
                    fac.destroy();
                    response.destroy();
                    songsData.destroy();
                };
            }catch (error) {
                console.error('Error al hacer la petición:', error);
            }
        };

        fetchAlbum(name).catch(error => console.error('Error fetching album:', error));
    }, [name, songs]);

    return (
        <Layout>
            <div className='album' style={{ background: `linear-gradient(175deg, ${averageColor}, rgba(0, 0, 0, 0.8))`}}>
                <AlbumHeader
                    album={album}
                    // nameArtist={album.artista}
                    numSongs={songs.length}
                    onClickArtist={() => handleToArtist('Artist')}
                    setBgColor={setAverageColor}
                />
                <AlbumMenu albumName={name} />
                <div className='album__content'>
                    {songs.length > 0 ? (
                        songs.map((song, index) =>
                        <AlbumSong key={song._id} 
                            song={song}
                            nameArtist={album.artista.nombre}
                            numSong={index + 1}
                            onClickSong={() => handleToSong(song.titulo)}
                            onClickArtist={() => handleToArtist(album.artista.nombre)}
                        />
                    )): (
                        <h3>Cargando albumes...</h3>
                    )}
                </div>
            </div>
        </Layout>
    );
}

function AlbumHeader({ album, numSongs = 0, setBgColor }) {
    const imgRef = useRef(null);

    useEffect(() => {
        const imgElement = imgRef.current;
        const alpha = 0.85;

        if (imgElement) {
            const colorThief = new ColorThief();

            imgElement.onload = () => {
                const color = colorThief.getColor(imgElement);
                const rgbColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`
                setBgColor(rgbColor);
            };
        }
    }, [imgRef, setBgColor]);

    return (
        <div className='album__header'>
            <img
                ref={imgRef}
                src={album.imagen}
                alt={album.titulo}
                crossOrigin="anonymous"
            />
            <div className='album__info'>
                <p className='content-type'>Álbum</p>
                <h1 className='album__name'>{album.titulo}</h1>
                <div className='info__extra'>
                    {/* <p className='album__artist' onClick={onClickArtist}>{album.artista.nombre}</p>
                    <span>•</span> */}
                    <p className='album__song-counter'>{numSongs} canciones</p>
                </div>
            </div>
        </div>
    );
}

AlbumHeader.propTypes = {
    album: PropTypes.object.isRequired,
    numSongs: PropTypes.number,
    // onClickArtist: PropTypes.func.isRequired,
    setBgColor: PropTypes.func.isRequired,
};


function AlbumMenu({ albumName }) {
    const [isAlbumAdded, setIsAlbumAdded] = useState(false);

    useEffect(() => {
        const listAlbums = JSON.parse(localStorage.getItem('listAlbums')) || [];
        setIsAlbumAdded(listAlbums.includes(albumName));
    }, [albumName]);

    function handleAddAlbum() {
        const listAlbums = JSON.parse(localStorage.getItem('listAlbums')) || [];

        if (!isAlbumAdded) {
            listAlbums.push(albumName);
        } else {
            
            const index = listAlbums.indexOf(albumName);
            if (index > -1) {
                listAlbums.splice(index, 1);
            }
        }

        localStorage.setItem('listAlbums', JSON.stringify(listAlbums));
        setIsAlbumAdded(!isAlbumAdded);
    }

    return (
        <div className='album__add-container'>
            <span className={`album__add-btn ${isAlbumAdded ? 'album__added' : ''}`} onClick={handleAddAlbum}>
                {isAlbumAdded 
                ? 
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#121212">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>


                :
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#b1b1b1">
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                    </svg>
                }
            </span>
        </div>
    );
}

AlbumMenu.propTypes = {
    albumName: PropTypes.string.isRequired
};


function AlbumSong({ song, nameArtist, numSong = 0, onClickSong, onClickArtist }) {
    return (
        <div className='album__song'>
            <span>{numSong}</span>
            <div className='song__info'>
                <p className='song__title' onClick={onClickSong}>
                    {song.titulo}
                </p>
                <p className='song__artist' onClick={onClickArtist}>
                    {nameArtist}
                </p>
            </div>
        </div>
    );
}

AlbumSong.propTypes = {
    song: PropTypes.object.isRequired,
    nameArtist: PropTypes.string.isRequired,
    numSong: PropTypes.number,
    onClickSong: PropTypes.func.isRequired,
    onClickArtist: PropTypes.func.isRequired,
};

// const albumSongs = [
//     {
//         title: '運命の旋律 - Main Theme',
//         artist: 'Piano Solo',
//     },
//     {
//         title: '交響曲第1番 "Dawn"',
//         artist: 'Piano Solo',
//     },
//     {
//         title: '真紅の運命',
//         artist: 'Piano Solo',
//     },
//     {
//         title: '街角の調べ',
//         artist: 'Piano Solo',
//     },
//     {
//         title: '運命への序曲',
//         artist: 'Piano Solo',
//     }
// ];

export default Album;
