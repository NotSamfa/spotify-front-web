import PropTypes from 'prop-types';
import styles from './Section.module.css'


function Section({title, isExpanded = false, children}) {
    return (
        <div className={isExpanded ? styles.sectionContentExpanded : styles.sectionContent}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <div className={isExpanded ? styles.sectionTemplateExpanded : styles.sectionTemplate}>
                {children}
            </div>
        </div>
    )
}

Section.propTypes = {
    title: PropTypes.string.isRequired,
    isExpanded: PropTypes.bool,
    children: PropTypes.node.isRequired
};


export default Section
