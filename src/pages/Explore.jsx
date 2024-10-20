import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import './Explore.css'
import { useNavigate } from 'react-router-dom';


function Explore({sidebarOpen}) {
    const navigate = useNavigate();

    function handleNavigateToGenre(name) {
        const to = `/genre/${name}`;

        navigate(to)
    }

    return (
        <Layout>
            <h2 className='explore__title'>Explorar Todo</h2>
            <div className='explore__container'>
            {genres.map((genre, index) => {
                const className = genre.img.split('/').pop().replace('.jpg', '');
        
                return (
                    <div className={`card ${sidebarOpen ? '' : 'expanded'} ${className}`} key={index}
                         onClick={() => handleNavigateToGenre(genre.name)}>
                        <span>{genre.name}</span>
                        <img src={genre.img} alt={className}/>
                    </div>
                );
            })}
            </div>
        </Layout>
    );
}

Explore.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired
};

const genres = [
  { name: 'Pop', img: '/src/assets/explore-genres/pop.jpg' },
  { name: 'K-pop', img: '/src/assets/explore-genres/k-pop.jpg' },
  { name: 'Hip hop', img: '/src/assets/explore-genres/hip-hop.jpg' },
  { name: 'Indie', img: '/src/assets/explore-genres/indie.jpg'},
  { name: 'Alternativa', img: '/src/assets/explore-genres/alt.jpg' },
  { name: 'Metal', img: '/src/assets/explore-genres/metal.jpg' },
  { name: 'Blues', img: '/src/assets/explore-genres/blues.jpg' },
  { name: 'Funk', img: '/src/assets/explore-genres/funk.jpg' },
  { name: 'Clásica', img: '/src/assets/explore-genres/classical.jpg' }
];

export default Explore;


