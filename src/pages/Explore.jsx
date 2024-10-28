import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import './Explore.css'
import { useNavigate } from 'react-router-dom';
import { FastAverageColor } from 'fast-average-color';


function Explore({sidebarOpen}) {
    const navigate = useNavigate();
    const [genres, setGenres] = useState('');

    function handleNavigateToGenre(name, averageColor) {
        const to = `/genre/${name}`;
        navigate(to,  { state: { averageColor } })
    }

    useEffect(() => {
        const fetchGenres = async () => {
            const response = await fetch('http://localhost:3000/genero');
            const data = await response.json();
            
            if (data.Ok && data.resp) {
                // setGenres(data.resp);

                const genresWithImages = data.resp.map(genre => {
                    const localImg = genreImageMap[genre.nombre];
                    return { ...genre, 
                        img: localImg,
                        averageColor: '#ffffff'
                    };
                });

                setGenres(genresWithImages);

                const fac = new FastAverageColor();

                // console.log(genresWithImages)

                genresWithImages.forEach((genre, index) => {
                    if (genre.img) {
                        fac.getColorAsync(genre.img)
                        .then(color => {
                            setGenres(prevGenres => {
                                const updatedGenres = [...prevGenres];
                                updatedGenres[index].averageColor = color.hex;
                                return updatedGenres;
                            });
                        })
                        .catch(error => {
                            console.error('Error al obtener el color promedio:', error);
                        });
                    }
                });

                // Limpieza del componente
                return () => fac.destroy();
            }
            else {
                console.error('Error al obtener el mensaje:', data);
            }
        };

        

        fetchGenres().catch(error => console.error('Error fetching genres:', error));
    }, []);

    return (
        <Layout>
            <h2 className='explore__title'>Explorar Todo</h2>
            <div className='explore__container'>
            {genres.length > 0 ? (
                genres.map(genre => (
                <div key={genre._id} onClick={() => handleNavigateToGenre(genre.nombre, genre.averageColor)} className={`card ${sidebarOpen ? '' : 'expanded'}`} style={{ backgroundColor: genre.averageColor }}>
                    <img
                        loading="lazy"
                        src={genreImageMap[genre.nombre] || '../assets/explore-genres/default.jpg'}
                        alt={genre.nombre}
                        />
                    <span>{genre.nombre}</span>
                </div>
                ))
            ) : (
                <h3>Cargando géneros...</h3>
            )}
            </div>
            {/* {genres.map((genre, index) => {
                const className = genre.img.split('/').pop().replace('.jpg', '');
        
                return (
                    <div className={`card ${sidebarOpen ? '' : 'expanded'} ${className}`} key={index}
                         onClick={() => handleNavigateToGenre(genre.name)}>
                        <span>{genre.name}</span>
                        <img src={genre.img} alt={className}/>
                    </div>
                );
            })} */}
            {/* </div> */}
        </Layout>
    );
}

Explore.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired
};

const genreImageMap = {
    "Pop": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTXV_G8auhhJHqgz7MoMtJK6tD41NBUER4geUfjoO5R0vRz5i8x",
    "Hip Hop": "/explore-genres/hip-hop.jpg",
    "Indie": "/explore-genres/indie.jpg",
    "Alternativa": "/explore-genres/alt.jpg",
    "Rock": "/explore-genres/metal.jpg",
    "Reggaeton": "/explore-genres/reggaeton.jpg",
    "Jazz": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTuP8Cuw_MsXrzdjJCwgu24t5WO8wOzmpJIyizDWobdB0P2YGth"
};

export default Explore;


