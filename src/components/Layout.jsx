import PropTypes from 'prop-types';
import './Layout.css'

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    customStyle: PropTypes.string
}

function Layout({customStyle = '', children}) {
    return (
        <div className={`layout ${customStyle}`}>
            {children}
        </div>
    )
}

export default Layout
