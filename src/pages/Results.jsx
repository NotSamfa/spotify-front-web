import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Section from '../components/MusicSection/Section';
import MusicItem from '../components/MusicSection/MusicItem';
import SongsSection from '../components/Songs/SongsSection';
import SongItem from '../components/Songs/SongItem';
import Layout from '../components/Layout';


/* 
    Pueden realizarse las consultas acá
    Estos datos (query) son traidos desde search a través de navigate [Componente /Navbar/Search]
*/
function Results({sidebarOpen}) {
    const {query} = useParams();

     const limitItems = (items) => sidebarOpen ? items.slice(0, 5) : items;
    
    console.log(query);
    
    return (
        <Layout>
            <SongsSection title={'Canciones'}>
                {limitItems(songs).map((song, index) => (
                    <SongItem key={index} data={song} />
                ))}
            </SongsSection>

            <Section title={'Artistas'}>
                {limitItems(artists).map((artist, index) => (
                    <MusicItem key={index} data={artist} isArtist={true} />
                ))}
            </Section>

            <Section title={'Álbumes'}>
                {limitItems(albums).map((album, index) => (
                    <MusicItem key={index} data={album} />
                ))}
            </Section>
        </Layout>
    );
}

Results.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired
};

let songs = [
    {
        "title": "Hybrid Theory",
        "artist": "Linkin Park",
        "imageUrl": "https://via.placeholder.com/150"
    },
    {
        "title": "Meteora",
        "artist": "Linkin Park",
        "imageUrl": "https://via.placeholder.com/150"
    },
    {
        "title": "Absolution",
        "artist": "Muse",
        "imageUrl": "https://via.placeholder.com/150"
    }
];

let artists = [
    { title: 'Linkin Park', artist: 'Linkin Park', imageUrl: 'https://via.placeholder.com/150', isArtist: true},
    { title: 'Muse', artist: 'Muse', imageUrl: 'https://via.placeholder.com/150', isArtist: true},
    { title: 'IU', artist: 'IU', imageUrl: 'https://via.placeholder.com/150', isArtist: true},
    { title: 'Cage the Elephant', artist: 'Cage the Elephant', imageUrl: 'https://via.placeholder.com/150', isArtist: true},
    { title: 'Charli XCX', artist: 'Charli XCX', imageUrl: 'https://via.placeholder.com/150', isArtist: true},
    { title: 'Jamiroquai', artist: 'Jamiroquai', imageUrl: 'https://via.placeholder.com/150', isArtist: true}
];


let albums = [
    { title: 'Black Holes and Revelations', artist: 'Muse', imageUrl: 'https://via.placeholder.com/150'},
    { title: 'Palette', artist: 'IU', imageUrl: 'https://via.placeholder.com/150'},
    { title: 'Travelling Without Moving', artist: 'Jamiroquai', imageUrl: 'https://via.placeholder.com/150'},
    { title: 'Social Cues', artist: 'Cage the Elephant', imageUrl: 'https://via.placeholder.com/150'},
    { title: 'Crash', artist: 'Charli XCX', imageUrl: 'https://via.placeholder.com/150'},
    { title: 'A Thousand Suns', artist: 'Linkin Park', imageUrl: 'https://via.placeholder.com/150'},
    { title: 'Drones', artist: 'Muse', imageUrl: 'https://via.placeholder.com/150'},
    { title: 'LILAC', artist: 'IU', imageUrl: 'https://via.placeholder.com/150'}
];


export default Results

