import PropTypes from 'prop-types';
import styles from './SongsSection.module.css';


{/* Usar con SongItem preferiblemente */}
function SongsSection({title, children}) {
    return (
        <div className={styles.songs}>
            <h2>{title}</h2>
            {children}
        </div>
    );
}

SongsSection.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};


export default SongsSection