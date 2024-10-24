import { useEffect, useState } from 'react';
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
    const [albumPop, setAlbumPop] = useState('');
    const [albumRock, setAlbumRock] = useState('');
    const [albums, setAlbums] = useState('');
    const allAlbums = [];

    useEffect(() => {        
        async function fetchAlbumGenrePop() {
            try {
                const response = await fetch('http://localhost:3000/album/albumGenero/Pop');
                
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                
                const data = await response.json();
                setAlbumPop(data.albums);
                
                return () => response.destroy();
            }catch (error) {
                console.error('Error al hacer la petición:', error);
            }
        };

        async function fetchAlbumGenreRock() {
            try {
                const response = await fetch('http://localhost:3000/album/albumGenero/Rock');
                
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                
                const data = await response.json();
                setAlbumRock(data.albums);
                
                return () => response.destroy();
            }catch (error) {
                console.error('Error al hacer la petición:', error);
            }
        };

        async function fetchAlbumGenres(genres, allAlbums) {
            try {
            for (const genre of genres) {
                const response = await fetch(`http://localhost:3000/album/albumGenero/${genre}`);
                
                if (!response.ok) {
                throw new Error(`Error en la respuesta de la API para el género ${genre}`);
                }
                
                const data = await response.json();
                allAlbums.push(...data.albums);
            }
            setAlbums(allAlbums);
            
            return () => allAlbums.forEach(album => album.destroy && album.destroy());
            } catch (error) {
            console.error('Error al hacer la petición:', error);
            }
        }

        fetchAlbumGenreRock().catch(error => console.error('Error fetching genres rock:', error));
        fetchAlbumGenrePop().catch(error => console.error('Error fetching genres pop:', error));
        fetchAlbumGenres(['Hip Hop', 'Reggaeton'], allAlbums).catch(error => console.error('Error fetching genres rock:', error));

}, [albumPop, albumRock, albums, allAlbums]);

    return (
        <Layout>
            <Section title={'Lo mejor del Rock'} isExpanded={!sidebarOpen}>
                {albumRock.length > 0 ? (limitItems(albumRock).map((playlist, index) => (
                    <MusicItem key={`${playlist.titulo}${index}`} data={playlist} />
                    ))
                ) : (
                    <h3>Cargando géneros rock...</h3>
                )}
            </Section>
        
            <Section title={'Lo mejor del Pop'} isExpanded={!sidebarOpen}>
                {albumPop.length > 0 ? (limitItems(albumPop).map((playlist, index) => (
                    <MusicItem key={`${playlist.titulo}${index}`} data={playlist} />
                    ))
                ) : (
                    <h3>Cargando géneros pop...</h3> // Muestra un mensaje mientras se cargan los datos
                )}
            </Section>

            <Section title={'Novedades para ti'} isExpanded={!sidebarOpen}>
                {albums.length > 0 ? (limitItems(albums).map((playlist, index) => (
                    <MusicItem key={`${playlist.titulo}${index}`} data={playlist} />
                    ))
                ) : (
                    <h3>Cargando novedades...</h3>
                )}
            </Section>
        </Layout>  
    );
}

Home.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired
};


// let rockPlaylists = [
//     { title: 'Classic Rock', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
//     { title: 'Rock Ballads', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
//     { title: 'Grunge Essentials', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
//     { title: 'Alternative Rock', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
//     { title: '90s Rock Anthems', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
//     { title: 'Hard Rock Hits', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true }
// ];

// let popPlaylists = [
//     { title: 'Pop Hits', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
//     { title: 'Dance Pop', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
//     { title: 'Teen Pop', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
//     { title: 'Pop Party', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
//     { title: 'Pop Classics', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true },
//     { title: 'Electropop', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150', isGenre: true }
// ];

// let newReleases = [
//     { title: '3.15.20', artist: 'Childish Gambino', imageUrl: 'https://via.placeholder.com/150', isAlbum: true },
//     { title: 'Crash', artist: 'Charli XCX', imageUrl: 'https://via.placeholder.com/150', isAlbum: true },
//     { title: 'Persona 5 Soundtrack', artist: 'Atlus Game Music', imageUrl: 'https://via.placeholder.com/150', isAlbum: true },
//     { title: 'SawanoHiroyuki[nZk]', artist: 'Hiroyuki Sawano', imageUrl: 'https://via.placeholder.com/150', isAlbum: true },
//     { title: 'Social Cues', artist: 'Cage the Elephant', imageUrl: 'https://via.placeholder.com/150', isAlbum: true },
//     { title: 'Scaled and Icy', artist: 'Twenty One Pilots', imageUrl: 'https://via.placeholder.com/150', isAlbum: true }
// ];


export default Home;
