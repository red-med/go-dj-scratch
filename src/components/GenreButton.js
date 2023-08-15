import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';

const GenreButton = ({ genreOption, updateGenre }) => {



    return (
        <div className="genre_button">
            <button className='DJgenres' onClick={(event) => {event.preventDefault(); updateGenre(genreOption);}}>{genreOption}</button>
        </div>
    );
}
export default GenreButton;