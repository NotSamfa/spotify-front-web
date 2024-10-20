import PropTypes from 'prop-types';

function SidebarBtn({isOpen, onToggle}) {
    return (
        <button className='sidebar__btn' onClick={onToggle}>
            <span className='sidebar__library-icon-wrapper'>
                {isOpen ? 
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" width="24px" fill="#b1b1b1"><path d="M270-80q-45 0-77.5-30.5T160-186v-558q0-38 23.5-68t61.5-38l395-78v640l-379 76q-9 2-15 9.5t-6 16.5q0 11 9 18.5t21 7.5h450v-640h80v720H270Zm10-217 80-16v-478l-80 16v478Z"/></svg>
                :
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" width="24px" fill="#b1b1b1"><path d="M300-80q-58 0-99-41t-41-99v-520q0-58 41-99t99-41h500v600q-25 0-42.5 17.5T740-220q0 25 17.5 42.5T800-160v80H300Zm-60-267q14-7 29-10t31-3h20v-440h-20q-25 0-42.5 17.5T240-740v393Zm160-13h320v-440H400v440Zm-160 13v-453 453Zm60 187h373q-6-14-9.5-28.5T660-220q0-16 3-31t10-29H300q-26 0-43 17.5T240-220q0 26 17 43t43 17Z"/></svg>
                }
            </span>
            {isOpen && <p>Tu biblioteca</p>}
        </button>
    );
}

SidebarBtn.propTypes = {
      isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
};

export default SidebarBtn;