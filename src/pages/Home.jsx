import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import MusicItem from '../components/MusicSection/MusicItem';
import Section from '../components/MusicSection/Section';


function Home({sidebarOpen}) {
    const limitItems = (items) => sidebarOpen ? items.slice(0, 5) : items;


    // Si se traen las listas cada que se carga el componente [Revisar el componente Results]
    // Se debe remover los limitItems antes de cada map en caso se implemente esta solución
    /*if (!isOpen) {
        rockPlaylists = limitItems(rockPlaylists); 
        popPlaylists = limitItems(popPlaylists);
        newReleases = limitItems(newReleases);
    }*/

       return (
        <Layout>  
            <Section title={'Lo mejor del Rock'} isExpanded={!sidebarOpen}>
                {limitItems(rockPlaylists).map((playlist, index) => (
                    <MusicItem key={`${playlist.title}${index}`} data={playlist} />
                ))}
            </Section>
          
            <Section title={'Lo mejor del Pop'} isExpanded={!sidebarOpen}>
               {limitItems(popPlaylists).map((playlist, index) => (
                    <MusicItem key={`${playlist.title}${index}`} data={playlist} />
                ))}
            </Section>

            <Section title={'Novedades para ti'} isExpanded={!sidebarOpen}>
               {limitItems(newReleases).map((album, index) => (
                    <MusicItem key={`${album.title}${index}`} data={album} />
                ))}
            </Section>
        </Layout>  
    );
}

Home.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired
};


let rockPlaylists = [
    { title: 'Classic Rock', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
    { title: 'Rock Ballads', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
    { title: 'Grunge Essentials', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
    { title: 'Alternative Rock', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
    { title: '90s Rock Anthems', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
    { title: 'Hard Rock Hits', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true }
];

let popPlaylists = [
    { title: 'Pop Hits', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
    { title: 'Dance Pop', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
    { title: 'Teen Pop', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
    { title: 'Pop Party', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
    { title: 'Pop Classics', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
    { title: 'Electropop', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true }
];

let newReleases = [
    { title: '3.15.20', artist: 'Childish Gambino', imageUrl: 'https://via.placeholder.com/150', isAlbum: true },
    { title: 'Crash', artist: 'Charli XCX', imageUrl: 'https://via.placeholder.com/150', isAlbum: true },
    { title: 'Persona 5 Soundtrack', artist: 'Atlus Game Music', imageUrl: 'https://via.placeholder.com/150', isAlbum: true },
    { title: 'SawanoHiroyuki[nZk]', artist: 'Hiroyuki Sawano', imageUrl: 'https://via.placeholder.com/150', isAlbum: true },
    { title: 'Social Cues', artist: 'Cage the Elephant', imageUrl: 'https://via.placeholder.com/150', isAlbum: true },
    { title: 'Scaled and Icy', artist: 'Twenty One Pilots', imageUrl: 'https://via.placeholder.com/150', isAlbum: true }
];


export default Home;
