import { useState } from 'react';
import PropTypes from 'prop-types';
import Layout from '../Layout'
import SidebarBtn from './SidebarBtn';
import SidebarTags from './SidebarTags';
import './Sidebar.css'
import SidebarItem from './SidebarItem';


{/* Cambiar lógica del filtro de tags según lo que traiga la consulta */}

const tags = ['Álbumes', 'Artistas'];

function Sidebar({isOpen, onToggle}) {
    const [selectedTag, setSelectedTag] = useState('');
    const customStyle = 'sidebar';


    const filteredItems = content.filter(item => {
        if (selectedTag === 'Álbumes') {
            return !item.isArtist;
        } else if (selectedTag === 'Artistas') {
            return item.isArtist;
        }
        return true;
    });

    return (
        <Layout customStyle={customStyle}>
            <div className={`sidebar__menu ${isOpen ? '' : 'closed'}`}>
                <SidebarBtn isOpen={isOpen} onToggle = {onToggle}/>
                {isOpen && <SidebarTags tags={tags} selectedTag={selectedTag} onSelection={setSelectedTag} />}
            </div>

            <ul className='sidebar__content'>
                {filteredItems.map((item) => (
                    <SidebarItem key={item.title} isOpen={isOpen} data={item}/>
                ))}
            </ul>
        </Layout>
    )
}

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
};


const content = [
    {
        id: 1,
        title: 'LILAC',
        artist: 'IU',
        imageUrl: 'https://via.placeholder.com/50',
        isArtist: false, // Es un álbum
    },
    {
        id: 2,
        title: 'Cage The Elephant',
        artist: 'Cage The Elephant',
        imageUrl: 'https://via.placeholder.com/50',
        isArtist: true, // Es una artista
    },
    {
        id: 3,
        title: 'Taste of Love',
        artist: 'Twice',
        imageUrl: 'https://via.placeholder.com/50',
        isArtist: false, // Es un álbum
    },
    {
        id: 4,
        title: 'Simulation Theory',
        artist: 'Muse',
        imageUrl: 'https://via.placeholder.com/50',
        isArtist: false, // Es un álbum
    },
    {
        id: 5,
        title: 'Arctic Monkeys',
        artist: 'Arctic Monkeys',
        imageUrl: 'https://via.placeholder.com/50',
        isArtist: true, // Es una artista
    },
    {
        id: 6,
        title: 'Scaled and Icy',
        artist: 'Twenty One Pilots',
        imageUrl: 'https://via.placeholder.com/50',
        isArtist: false, // Es un álbum
    },
    {
        id: 7,
        title: 'Hybrid Theory',
        artist: 'Linkin Park',
        imageUrl: 'https://via.placeholder.com/50',
        isArtist: false, // Es un álbum
    },
    {
        id: 8,
        title: 'The Black Keys',
        artist: 'The Black Keys',
        imageUrl: 'https://via.placeholder.com/50',
        isArtist: true, // Es una artista
    },
    {
        id: 9,
        title: 'IU',
        artist: 'IU',
        imageUrl: 'https://via.placeholder.com/50',
        isArtist: true, // Es una artista
    },
    {
        id: 10,
        title: 'Twice',
        artist: 'Twice',
        imageUrl: 'https://via.placeholder.com/50',
        isArtist: true, // Es una artista
    },
    {
        id: 11,
        title: 'Twenty One Pilots',
        artist: 'Twenty One Pilots',
        imageUrl: 'https://via.placeholder.com/50',
        isArtist: true, // Es una artista
    },
    {
        id: 12,
        title: 'Linkin Park',
        artist: 'Linkin Park',
        imageUrl: 'https://via.placeholder.com/50',
        isArtist: true, // Es una artista
    },
    {
        id: 13,
        title: 'The Strokes',
        artist: 'The Strokes',
        imageUrl: 'https://via.placeholder.com/50',
        isArtist: true, // Es una artista
    },
    {
        id: 14,
        title: 'Paramore',
        artist: 'Paramore',
        imageUrl: 'https://via.placeholder.com/50',
        isArtist: true, // Es una artista
    }
];




export default Sidebar