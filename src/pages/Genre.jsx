import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import MusicItem from '../components//MusicSection/MusicItem';
import './Genre.css';



function Genre() {
    const { name } = useParams();
    let bgColor = 'var(--clr-gray';
    const [gradientBg, setGradientBg] = useState(`linear-gradient(0deg, ${bgColor} 80%, var(--clr-gray) 100%)`);

   

    bgColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    
    useEffect(() => {
        setGradientBg(`linear-gradient(0deg, var(--clr-dark) 80%, ${bgColor} 100%)`);
    }, [bgColor]);


    return (
        <Layout>
            <div className='genre' style={{ background: gradientBg }}>
                <div className='genre__title'>
                    <h1>{name}</h1>
                </div>
                <div className='genre__template'> 
                    {popAlbums.map((album, index) => 
                        <MusicItem key={index} data={album} />
                    )}
                </div>
            </div>
        </Layout>
    );
}


const backgroundColors = [
    '#DAA520', // Dorado
    '#C0C0C0', // Plateado
    '#FF4500', // Naranja rojo
    '#FF6347', // Tomate
    '#4682B4', // Azul acero
    '#6A5ACD', // Azul oscuro
    '#B22222', // Rojo fuego
    '#FF8C00'  // Naranja oscuro
];


let popAlbums = [
    { title: 'Future Nostalgia', artist: 'Dua Lipa', imageUrl: 'https://via.placeholder.com/150?text=Future+Nostalgia'},
    { title: '1989', artist: 'Taylor Swift', imageUrl: 'https://via.placeholder.com/150?text=1989'},
    { title: 'Lover', artist: 'Taylor Swift', imageUrl: 'https://via.placeholder.com/150?text=Lover'},
    { title: '25', artist: 'Adele', imageUrl: 'https://via.placeholder.com/150?text=25'},
    { title: 'After Hours', artist: 'The Weeknd', imageUrl: 'https://via.placeholder.com/150?text=After+Hours'},
    { title: 'Happier Than Ever', artist: 'Billie Eilish', imageUrl: 'https://via.placeholder.com/150?text=Happier+Than+Ever'},
    { title: 'Born This Way', artist: 'Lady Gaga', imageUrl: 'https://via.placeholder.com/150?text=Born+This+Way'},
    { title: 'Fame', artist: 'Lady Gaga', imageUrl: 'https://via.placeholder.com/150?text=Fame'},
    { title: 'Purpose', artist: 'Justin Bieber', imageUrl: 'https://via.placeholder.com/150?text=Purpose'},
    { title: 'Divide', artist: 'Ed Sheeran', imageUrl: 'https://via.placeholder.com/150?text=Divide'},
    { title: 'Sweetener', artist: 'Ariana Grande', imageUrl: 'https://via.placeholder.com/150?text=Sweetener'},
    { title: 'Fearless (Taylor\'s Version)', artist: 'Taylor Swift', imageUrl: 'https://via.placeholder.com/150?text=Fearless'},
    { title: 'The Album', artist: 'BLACKPINK', imageUrl: 'https://via.placeholder.com/150?text=The+Album'},
    { title: 'Red (Taylor\'s Version)', artist: 'Taylor Swift', imageUrl: 'https://via.placeholder.com/150?text=Red'},
    { title: 'Lover', artist: 'Taylor Swift', imageUrl: 'https://via.placeholder.com/150?text=Lover'}
];


export default Genre