import PropTypes from 'prop-types';
import './ContentLayout.css'


function ContentLayout({sidebarOpen, children}) {

    return (
        <div className={`app-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            {children}     
        </div>
    )
}


ContentLayout.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
};

export default ContentLayout
