import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';
import GenreButton from './GenreButton';
import './GenreForm.css';

const GenreForm = ({genres, genreOptions, updateGenre, genretoQuery}) => {

    const genreButtonComponents = genreOptions.map(genreOption => {
        return (<GenreButton className='select_DJ_genre' genreOption={genreOption} updateGenre={updateGenre} >{genreOption}</GenreButton>);
    });

    return (
        <div className="'DJ_genre_form'">
            <p>Which genres do you want to mix? Choose up to three.</p>
            <div className='all_genre_buttons'>
                {genreButtonComponents}
            </div>
            <p onClick={() => {genretoQuery();}}>Next</p> 
        {/* set up hovering styling for the word "Next" so it looks like a button */}
    </div>
    );
}
export default GenreForm;