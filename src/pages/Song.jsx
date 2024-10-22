import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { FastAverageColor } from 'fast-average-color';
import '../components/Songs/SongDetail.css';

function Song() {
    const { title } = useParams();
    console.log(title);

    
    const songDetails = {
        title: "Club classics featuring bb trickz",
        artist: {
        name:  "Charli xcx",
        img: "https://i.scdn.co/image/ab6761610000e5eb936885667ef44c306483c838"
        },
        img: "https://i1.sndcdn.com/artworks-VPS1zBxZVlmT-0-t500x500.jpg", // Cambia esta ruta por la correcta
        year: 2024,
        duration: "2:54",
        videoUrl: "https://youtu.be/yi_8VKPnd7c?si=r9XzgaL5sa59pD5_",
        album: {
        name: "Brat"
        },
        artists: ["Charli xcx", "Bb trickz"],
        "lyrics": [
        {
        "lines": [
            {
            "startTimeMs": "0",
            "words": "You were the shadow to my light",
            "syllables": []
            },
            {
            "startTimeMs": "0",
            "words": "Did you feel us?",
            "syllables": []
            },
            {
            "startTimeMs": "0",
            "words": "Another star",
            "syllables": []
            }
        ]
        },
        {
        "lines": [
            {
            "startTimeMs": "0",
            "words": "You fade away",
            "syllables": []
            },
            {
            "startTimeMs": "0",
            "words": "Afraid our aim is out of sight",
            "syllables": []
            },
            {
            "startTimeMs": "0",
            "words": "Wanna see us",
            "syllables": []
            },
            {
            "startTimeMs": "0",
            "words": "Alive",
            "syllables": []
            }
        ]
        },
        {
        "lines": [
            {
            "startTimeMs": "0",
            "words": "Where are you now?",
            "syllables": []
            },
            {
            "startTimeMs": "0",
            "words": "Where are you now?",
            "syllables": []
            },
            {
            "startTimeMs": "0",
            "words": "Where are you now?",
            "syllables": []
            },
            {
            "startTimeMs": "0",
            "words": "Was it all in my fantasy?",
            "syllables": []
            },
            {
            "startTimeMs": "0",
            "words": "Where are you now?",
            "syllables": []
            },
            {
            "startTimeMs": "0",
            "words": "Were you only imaginary?",
            "syllables": []
            }
        ]
        }
    ]
    };

    const [videoId, setVideoId] = useState(null);
    const [averageColor, setAverageColor] = useState('#000');

    const getVideoIdFromUrl = (url) => {
        const urlObj = new URL(url);
        return urlObj.searchParams.get("v") || urlObj.pathname.split('/').pop();
    };

    useEffect(() => {
        const fac = new FastAverageColor();
        
        // Obtener el color promedio de la imagen
        fac.getColorAsync(songDetails.img)
            .then(color => {
            setAverageColor(color.hex); // Guardar el color en el estado
            })
            .catch(error => {
            console.error('Error al obtener el color promedio:', error);
            });
        
        // Limpieza del componente
        return () => fac.destroy();
    }, [songDetails.img]);

    React.useEffect(() => {
        if (songDetails.videoUrl) {
            const extractedVideoId = getVideoIdFromUrl(songDetails.videoUrl);
            console.log(extractedVideoId);
            setVideoId(extractedVideoId);
        }
    }, [songDetails.videoUrl]);

    return (
        <Layout>
    <div className='song-detail' style={{
        background: `linear-gradient(175deg, ${averageColor}, rgba(0, 0, 0, 0.8))`, // Gradiente con el color promedio
        }}>
        <div className="overlay" >
            <img src={songDetails.img} alt="Song cover" className="song-cover" />
            <div className="song-info">
                <h2>Canción</h2>
                <h1>{songDetails.title}</h1>
                <div className='song-meta'>
                    <img src={songDetails.artist.img} alt="Imagen del artista" /> <p> <strong>{songDetails.artist.name}</strong>  •  {songDetails.album.name} •  {songDetails.year} • {songDetails.duration} </p>
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
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="YouTube Video"
                    ></iframe>
                ) : (
                    <p>No hay video disponible</p>
                )}
                <div className='artists'>
                    {songDetails.artists.map((artista, index) => (
                        <div key={index} className='song-artist'>
                            <img src={songDetails.artist.img} alt="Imagen del artista" />
                            <div className='artist-name'>
                                <strong>Artista</strong>
                                <br />
                                <strong key={index}>{artista}</strong>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='lyrics'>
                <h3>LYRICS</h3>
                {songDetails.lyrics.map((stanza, stanzaIndex) => (
                <div key={stanzaIndex} className='stanza'>
                    {stanza.lines.map((line, lineIndex) => (
                        <p key={lineIndex}>{line.words}</p>
                    ))}
                </div>
                ))}
            </div>
        </div>
        </div>
        </Layout>
    )
}


export default Song
