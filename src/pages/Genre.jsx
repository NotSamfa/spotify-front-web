import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import MusicItem from '../components//MusicSection/MusicItem';
import './Genre.css';



function Genre() {
    const { name } = useParams();
    const location = useLocation();
    const { averageColor } = location.state || {}; 
    // let bgColor = 'var(--clr-gray';
    // const [gradientBg, setGradientBg] = useState(`linear-gradient(0deg, ${bgColor} 80%, var(--clr-gray) 100%)`);
    const [albumGenre, setAlbumGenre] = useState('');

    

    // bgColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    
    useEffect(() => {
        async function fetchAlbumGenre(name) {
            try {
                const response = await fetch('http://localhost:3000/album/albumGenero/' + name);
                
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                
                const data = await response.json();
                setAlbumGenre(data.albums);
                

                
                return () => response.destroy();
            }catch (error) {
                console.error('Error al hacer la petición:', error);
            }
        };

        // setGradientBg(`linear-gradient(0deg, var(--clr-dark) 80%, ${bgColor} 100%)`);
        fetchAlbumGenre(name).catch(error => console.error('Error fetching genres:', error));
    }, [name]);


    return (
        <Layout>
            <div className='genre' style={{
                background: `linear-gradient(175deg, ${averageColor}, rgba(0, 0, 0, 0.8))`,
            }}>
                <div className='genre__title'>
                    <h1>{name}</h1>
                </div>
                <div className='genre__template'> 
                    {albumGenre.length > 0 ? (
                        albumGenre.map(album =>
                            
                        <MusicItem key={album._id} data={album} />
                    )): (
                        <h3>Cargando géneros...</h3>
                    )}
                </div>
            </div>
        </Layout>
    );
}


// const backgroundColors = [
//     '#DAA520', // Dorado
//     '#C0C0C0', // Plateado
//     '#FF4500', // Naranja rojo
//     '#FF6347', // Tomate
//     '#4682B4', // Azul acero
//     '#6A5ACD', // Azul oscuro
//     '#B22222', // Rojo fuego
//     '#FF8C00'  // Naranja oscuro
// ];


// let popAlbums = [
//     { title: 'Future Nostalgia', artist: 'Dua Lipa', imageUrl: 'https://via.placeholder.com/150?text=Future+Nostalgia'},
//     { title: '1989', artist: 'Taylor Swift', imageUrl: 'https://via.placeholder.com/150?text=1989'},
//     { title: 'Lover', artist: 'Taylor Swift', imageUrl: 'https://via.placeholder.com/150?text=Lover'},
//     { title: '25', artist: 'Adele', imageUrl: 'https://via.placeholder.com/150?text=25'},
//     { title: 'After Hours', artist: 'The Weeknd', imageUrl: 'https://via.placeholder.com/150?text=After+Hours'},
//     { title: 'Happier Than Ever', artist: 'Billie Eilish', imageUrl: 'https://via.placeholder.com/150?text=Happier+Than+Ever'},
//     { title: 'Born This Way', artist: 'Lady Gaga', imageUrl: 'https://via.placeholder.com/150?text=Born+This+Way'},
//     { title: 'Fame', artist: 'Lady Gaga', imageUrl: 'https://via.placeholder.com/150?text=Fame'},
//     { title: 'Purpose', artist: 'Justin Bieber', imageUrl: 'https://via.placeholder.com/150?text=Purpose'},
//     { title: 'Divide', artist: 'Ed Sheeran', imageUrl: 'https://via.placeholder.com/150?text=Divide'},
//     { title: 'Sweetener', artist: 'Ariana Grande', imageUrl: 'https://via.placeholder.com/150?text=Sweetener'},
//     { title: 'Fearless (Taylor\'s Version)', artist: 'Taylor Swift', imageUrl: 'https://via.placeholder.com/150?text=Fearless'},
//     { title: 'The Album', artist: 'BLACKPINK', imageUrl: 'https://via.placeholder.com/150?text=The+Album'},
//     { title: 'Red (Taylor\'s Version)', artist: 'Taylor Swift', imageUrl: 'https://via.placeholder.com/150?text=Red'},
//     { title: 'Lover', artist: 'Taylor Swift', imageUrl: 'https://via.placeholder.com/150?text=Lover'}
// ];


export default Genre