import PropTypes from 'prop-types';


function RoundButton({children, onClick = null}) {
    return (
        <div role='button' className='search-bar__round-button' onClick={onClick}>
            {children}
        </div>
    )
}

RoundButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func
};


export default RoundButton
