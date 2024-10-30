import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import ColorThief from 'colorthief';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import MusicItem from '../components/MusicSection/MusicItem';
import Section from '../components/MusicSection/Section';
import SongsSection from '../components/Songs/SongsSection';
import SongItem from '../components/Songs/SongItem';
import './Artist.css';

function Artist() {
    const { name } = useParams();
    const [bgColor, setBgColor] = useState('var(--clr-dark)');
    const [gradientBg, setGradientBg] = useState(`linear-gradient(0deg, ${bgColor} 60%, var(--clr-gray) 100%)`);
    const [artist, setArtist] = useState('');
    const [songs, setSongs] = useState('');
    const [albums, setAlbums] = useState('');

    useEffect(() => {
        async function fetchArtist(name) {
            try {
                const response = await fetch('http://localhost:3000/artista/nombre/' + name);
                
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                
                const data = await response.json();
                setArtist(data.artista);
                
                const fetchAlbumByArtist = async (name) => {
                    try {
                        const response = await fetch(`http://localhost:3000/album/albumArtista/${name}`);
                        if (!response.ok) {
                            throw new Error(`Error al obtener los detalles del álbumes del artista: ${name}`);
                        }
                        const data = await response.json();
                        setAlbums(data.albums);

                    } catch (error) {
                        console.error('Error al obtener el álbum:', error);
                    }
                };

                const fetchSongByArtist = async (name) => {
                    try {
                        const response = await fetch(`http://localhost:3000/cancion/cancionArtista/${name}`);
                        if (!response.ok) {
                            throw new Error(`Error al obtener los detalles de las canciones del artista: ${name}`);
                        }
                        const data = await response.json();
                        setSongs(data.canciones);

                    } catch (error) {
                        console.error('Error al obtener las canciones:', error);
                    }
                };

                fetchAlbumByArtist(name)
                fetchSongByArtist(name)
                // console.log(albums)
                
                // Limpieza del componente
                return () => {
                    // fac.destroy();
                    response.destroy();
                };
            }catch (error) {
                console.error('Error al hacer la petición:', error);
            }
        };

        fetchArtist(name).catch(error => console.error('Error fetching album:', error));

        setGradientBg(`linear-gradient(0deg, var(--clr-dark) 60%, ${bgColor} 100%)`);
    }, [bgColor, name, artist, ]);

    return (
        <Layout>
            <div className='artist' style={{ background: gradientBg }}>
                <ArtistProfile artist={artist} setBgColor={setBgColor} />
                <ActionMenu artistName={name} />
                <SongsSection>
                    {songs.length > 0 ? (
                        songs.map((song, index) =>
                        <SongItem key={song._id} 
                            data={song}
                            enumSong={index + 1}
                        />
                    )): (
                        <h3>Cargando canciones...</h3>
                    )}
                </SongsSection>
                <Section  title={'Discografía'}>
                    {albums.length > 0 ? (
                        albums.map(album =>
                        <MusicItem key={album._id} 
                            data={album}
                        />
                    )): (
                        <h3>Cargando albumes...</h3>
                    )}
                </Section>
            </div>
        </Layout>
    );
}

function ArtistProfile({ artist, setBgColor }) {
    const imgRef = useRef(null);

    useEffect(() => {
        const imgElement = imgRef.current;
        const alpha = 0.85;

        if (imgElement) {
            const colorThief = new ColorThief();

            imgElement.onload = () => {
                const color = colorThief.getColor(imgElement);
                const rgbColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
                setBgColor(rgbColor);
            };
        }
    }, [imgRef, setBgColor, artist]);

    return (
        <div className='artist__profile'>
            <img
                ref={imgRef}
                src={artist.imagen}
                alt={artist.nombre}
                crossOrigin="anonymous"
            />
            <h1 className='artist__title'>{artist.nombre}</h1>
        </div>
    );
}


ArtistProfile.propTypes = {
    artist: PropTypes.object.isRequired,
    setBgColor: PropTypes.func.isRequired,
};

function ActionMenu({ artistName }) {
    const [isArtistFollowed, setIsArtistFollowed] = useState(false);

    useEffect(() => {
        const listArtist = JSON.parse(localStorage.getItem('listArtists')) || [];
        setIsArtistFollowed(listArtist.some(artist => artist.artist === artistName && artist.isArtist === true));
    }, [artistName]);

    function handleFollow() {
        const listArtist = JSON.parse(localStorage.getItem('listArtists')) || [];

        if (!isArtistFollowed) {
            listArtist.push({
                artist: artistName,
                isArtist: true
            });
        } else {
            const index = listArtist.findIndex(artist => artist.artist === artistName && artist.isArtist === true);
            if (index > -1) {
                listArtist.splice(index, 1);
            }
        }

        localStorage.setItem('listArtists', JSON.stringify(listArtist));
        setIsArtistFollowed(!isArtistFollowed);
    }

    return (
        <div className='artist__folow-container'>
            <span className='artist__follow-btn' onClick={handleFollow} >
                {isArtistFollowed ? 'Siguiendo' : 'Seguir'}
            </span>        
        </div>
    );
}

ActionMenu.propTypes = {
    artistName: PropTypes.string.isRequired
};

// const songs = [
//     {
//         title: '運命の旋律 - Main Theme',
//         imageUrl: 'https://via.placeholder.com/150',
//         artist: 'Piano Solo'
//     },
//     {
//         title: '交響曲第1番 "Dawn"',
//         imageUrl: 'https://via.placeholder.com/150',
//         artist: 'Piano Solo'
//     },
//     {
//         title: '真紅の運命',
//         imageUrl: 'https://via.placeholder.com/150',
//         artist: 'Piano Solo'
//     },
//     {
//         title: '街角の調べ',
//         imageUrl: 'https://via.placeholder.com/150',
//         artist: 'Piano Solo'
//     },
//     {
//         title: '運命への序曲',
//         imageUrl: 'https://via.placeholder.com/150',
//         artist: 'Piano Solo'
//     }
// ];


export default Artist