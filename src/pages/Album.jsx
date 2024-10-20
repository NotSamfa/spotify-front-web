import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import ColorThief from 'colorthief';
import PropTypes from 'prop-types';
import Layout from "../components/Layout";
import './Album.css';

function Album() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [bgColor, setBgColor] = useState('var(--clr-dark)');
    const [gradientBg, setGradientBg] = useState(`linear-gradient(0deg, ${bgColor} 50%, var(--clr-gray) 100%)`);

    const handleToSong = (name) => {
        const to = `/song/${name}`;
        navigate(to);
    };

    const handleToArtist = (name) => {
        const to = `/artist/${name}`;
        navigate(to);
    };

    useEffect(() => {
        setGradientBg(`linear-gradient(0deg, var(--clr-dark) 50%, ${bgColor} 100%)`);
    }, [bgColor]);

    return (
        <Layout>
            <div className='album' style={{ background: gradientBg }}>
                <AlbumHeader
                    name={name}
                    numSongs={albumSongs.length}
                    onClickArtist={() => handleToArtist('Artist')}
                    setBgColor={setBgColor}
                />
                <div className='album__content'>
                    {albumSongs.map((song, index) => (
                        <AlbumSong
                            key={song.title}
                            song={song}
                            numSong={index + 1}
                            onClickSong={() => handleToSong(song.title)}
                            onClickArtist={() => handleToArtist(song.artist)}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}

function AlbumHeader({ name, numSongs = 0, onClickArtist, setBgColor }) {
    const imgRef = useRef(null);

    useEffect(() => {
        const imgElement = imgRef.current;
        const alpha = 0.85;

        if (imgElement) {
            const colorThief = new ColorThief();

            imgElement.onload = () => {
                const color = colorThief.getColor(imgElement);
                const rgbColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`
                console.log(color);
                setBgColor(rgbColor);
            };
        }
    }, [imgRef, setBgColor]);

    return (
        <div className='album__header'>
            <img
                ref={imgRef}
                src='/src/assets/test/placeholder-album.webp'
                alt={name}
                crossOrigin="anonymous"
            />
            <div className='album__info'>
                <p className='content-type'>Álbum</p>
                <h1 className='album__name'>takt op. 運命は真紅き旋律の街を</h1>
                <div className='info__extra'>
                    <p className='album__artist' onClick={onClickArtist}>Nombre Artista</p>
                    <span>•</span>
                    <p className='album__song-counter'>{numSongs} canciones</p>
                </div>
            </div>
        </div>
    );
}

AlbumHeader.propTypes = {
    name: PropTypes.string.isRequired,
    numSongs: PropTypes.number,
    onClickArtist: PropTypes.func.isRequired,
    setBgColor: PropTypes.func.isRequired,
};

function AlbumSong({ song, numSong = 0, onClickSong, onClickArtist }) {
    return (
        <div className='album__song'>
            <span>{numSong}</span>
            <div className='song__info'>
                <p className='song__title' onClick={onClickSong}>
                    {song.title}
                </p>
                <p className='song__artist' onClick={onClickArtist}>
                    {song.artist}
                </p>
            </div>
        </div>
    );
}

AlbumSong.propTypes = {
    song: PropTypes.object.isRequired,
    numSong: PropTypes.number,
    onClickSong: PropTypes.func.isRequired,
    onClickArtist: PropTypes.func.isRequired,
};

const albumSongs = [
    {
        title: '運命の旋律 - Main Theme',
        artist: 'Piano Solo',
    },
    {
        title: '交響曲第1番 "Dawn"',
        artist: 'Piano Solo',
    },
    {
        title: '真紅の運命',
        artist: 'Piano Solo',
    },
    {
        title: '街角の調べ',
        artist: 'Piano Solo',
    },
    {
        title: '運命への序曲',
        artist: 'Piano Solo',
    }
];

export default Album;
