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

    useEffect(() => {
        setGradientBg(`linear-gradient(0deg, var(--clr-dark) 60%, ${bgColor} 100%)`);
    }, [bgColor]);

    return (
        <Layout>
            <div className='artist' style={{ background: gradientBg }}>
                <ArtistProfile name={name} setBgColor={setBgColor} />
                <SongsSection>
                    {songs.map((song, index) =>
                        <SongItem key={song.title} data={song} enumSong={index + 1} />
                    )}
                </SongsSection>
                <Section title={'Discografía'}>
                    {songs.map((album) =>
                        <MusicItem key={album.title} data={album} />
                    )}
                </Section>
            </div>
        </Layout>
    );
}

function ArtistProfile({ name, setBgColor }) {
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
    }, [imgRef, setBgColor]);

    return (
        <div className='artist__profile'>
            <img
                ref={imgRef}
                src='/src/assets/test/placeholder-profile.jpg'
                alt={name}
                crossOrigin="anonymous"
            />
            <h1 className='artist__title'>{name}</h1>
        </div>
    );
}

ArtistProfile.propTypes = {
    name: PropTypes.string.isRequired,
    setBgColor: PropTypes.func.isRequired,
};

const songs = [
    {
        title: '運命の旋律 - Main Theme',
        imageUrl: 'https://via.placeholder.com/150',
        artist: 'Piano Solo'
    },
    {
        title: '交響曲第1番 "Dawn"',
        imageUrl: 'https://via.placeholder.com/150',
        artist: 'Piano Solo'
    },
    {
        title: '真紅の運命',
        imageUrl: 'https://via.placeholder.com/150',
        artist: 'Piano Solo'
    },
    {
        title: '街角の調べ',
        imageUrl: 'https://via.placeholder.com/150',
        artist: 'Piano Solo'
    },
    {
        title: '運命への序曲',
        imageUrl: 'https://via.placeholder.com/150',
        artist: 'Piano Solo'
    }
];


export default Artist