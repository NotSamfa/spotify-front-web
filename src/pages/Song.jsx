import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Layout from '../components/Layout';
import { FastAverageColor } from 'fast-average-color';
import '../components/Songs/SongDetail.css';

function Song() {
    const { name } = useParams();
    const [song, setSong] = useState('');
    const [videoId, setVideoId] = useState(null);
    const [averageColor, setAverageColor] = useState('#000');
    const [album, setAlbum] = useState('')
    const [artist, setArtist] = useState('')
    const [year, setYear] = useState('')
    const navigate = useNavigate();

    const getVideoIdFromUrl = (url) => {
        const urlObj = new URL(url);
        return urlObj.searchParams.get("v") || urlObj.pathname.split('/').pop();
    };
    
    const extractYear= (date) => {
        setYear(date.substring(0, 4));
    }

    const handleToArtist = (name) => {
        const to = `/artist/${name}`;
        navigate(to);
    };

    useEffect(() => {
        async function fetchSong(name) {
            try {
                const response = await fetch('http://localhost:3000/cancion/titulo/' + name);
                
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                
                const data = await response.json();
                setSong(data.cancion);
                
                const fac = new FastAverageColor();
        
                fac.getColorAsync(data.cancion.imagen)
                    .then(color => {
                        setAverageColor(color.hex);
                    })
                    .catch(error => {
                        console.error('Error al obtener el color promedio:', error);
                    });
                
                const fetchAlbumById = async (id) => {
                    try {
                        const response = await fetch(`http://localhost:3000/album/${id}`);
                        if (!response.ok) {
                            throw new Error(`Error al obtener los detalles del álbum con ID: ${id}`);
                        }
                        const data = await response.json();
                        setAlbum(data.album);
                        extractYear(data.album.fecha_lanzamiento);

                    } catch (error) {
                        console.error('Error al obtener el álbum:', error);
                    }
                };

                const fetchArtistById = async (id) => {
                    try {
                        const response = await fetch(`http://localhost:3000/artista/${id}`);
                        if (!response.ok) {
                            throw new Error(`Error al obtener los detalles del artista con ID: ${id}`);
                        }
                        const data = await response.json();
                        setArtist(data.artista);

                    } catch (error) {
                        console.error('Error al obtener el álbum:', error);
                    }
                };

                fetchAlbumById(data.cancion.album)
                fetchArtistById(data.cancion.artista._id)
                
                // Limpieza del componente
                return () => {
                    fac.destroy();
                    response.destroy();
                };
            }catch (error) {
                console.error('Error al hacer la petición:', error);
            }
        };

        fetchSong(name).catch(error => console.error('Error fetching album:', error));
    }, [name, song, year, artist]);

    React.useEffect(() => {
        if (song.url) {
            const extractedVideoId = getVideoIdFromUrl(song.url);
            console.log(extractedVideoId);
            setVideoId(extractedVideoId);
        }
    }, [song.url]);

    return (
        <Layout>
    <div className='song-detail' style={{
        background: `linear-gradient(175deg, ${averageColor}, rgba(0, 0, 0, 0.8))`,
        }}>
        <div className="overlay" >
            <img src={song.imagen} alt="Song cover" className="song-cover" />
            <div className="song-info">
                <h2>Canción</h2>
                <h1>{song.titulo}</h1>
                <div className='song-meta'>
                    <img src={artist.imagen} alt="Imagen del artista" /> <p> <strong className='artist-name' onClick={() => handleToArtist(artist.nombre)}>{artist.nombre}</strong>  •  {album.titulo} •  {year} • {song.duracion} </p>
                </div>
            </div>
        </div>
        <div className='song-content'>
            <div className="video-container">
                {videoId ? (
                    <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="YouTube Video"
                    ></iframe>
                ) : (
                    <p>No hay video disponible</p>
                )}
                <div className='artists'>
                    <div className='song-artist'>
                        <img src={artist.imagen} alt="Imagen del artista" />
                        <div className='artist-name' onClick={() => handleToArtist(artist.nombre)}>
                            <strong>Artista</strong>
                            <br />
                            <strong>{artist.nombre}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </Layout>
    )
}


// const songDetails = {
//     title: "Club classics featuring bb trickz",
//     artist: {
//     name:  "Charli xcx",
//     img: "https://i.scdn.co/image/ab6761610000e5eb936885667ef44c306483c838"
//     },
//     img: "https://i1.sndcdn.com/artworks-VPS1zBxZVlmT-0-t500x500.jpg", // Cambia esta ruta por la correcta
//     year: 2024,
//     duration: "2:54",
//     videoUrl: "https://youtu.be/yi_8VKPnd7c?si=r9XzgaL5sa59pD5_",
//     album: {
//     name: "Brat"
//     },
//     artists: ["Charli xcx", "Bb trickz"],
// };



export default Song
