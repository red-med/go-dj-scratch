import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';
import PopButton from './PopButton';
import './PopForm.css'

const PopForm = ({ popOptions, updatePop}) => {

    const popButtonComponents = popOptions.map(popOption => {
        return (<PopButton className='select_DJ_pop' popOption={popOption} updatePop={updatePop} >{popOption}</PopButton>);
    });

    return (
        <div className="'DJ_pop_form'">
            <p>Do you want to play obscure tracks, crowd favorites, or a bit of each?</p>
            <div className='all_pop_buttons'>
                {popButtonComponents}
            </div>
            {/* <p onClick={() => {console.log("hell yeah dawg");}}>Next</p>   */}
        {/* set up hovering styling for the word "Next" so it looks like a button */}
    </div>
    );
}
export default PopForm;