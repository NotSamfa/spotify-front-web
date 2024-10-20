import PropTypes from 'prop-types';

function SidebarTags({tags, selectedTag, onSelection}) {

    function handleSelection(tag) {
        onSelection(tag);
    }

    function handleCancelation() {
        onSelection('');
    }


    return (
        <div className='sidebar__tags'>
            {selectedTag ?
                <>
                    <div className='tag cancel-tag' onClick={handleCancelation}>
                        <span className='cancel-icon-wrapper'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#b1b1b1"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                        </span>
                    </div>
                    <div className='tag selected-tag' onClick={handleCancelation}>
                        <span>{selectedTag}</span>
                    </div>
                </>
                :
                tags.map((tag) => (
                    <div key={tag} className='tag' onClick={() => handleSelection(tag)}>
                        <span>{tag}</span>
                    </div>
                ))
            }
        </div>
    );
}

SidebarTags.propTypes = {
    tags: PropTypes.array.isRequired,
    selectedTag: PropTypes.string.isRequired,
    onSelection: PropTypes.func.isRequired
};

export default SidebarTags