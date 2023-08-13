import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ModeButton from './ModeButton';

const ModeForm = ({mode, modeOptions, updateMode}) => {

    const modeButtonComponents = modeOptions.map(modeOption => {
        return (<ModeButton className='select_DJ_mode' modeOption={modeOption} updateMode={updateMode} >{modeOption}</ModeButton>);
    });

    return (
        <div className="'DJ_mode_form'">
            <p>Do you want tracks in major keys, minor, or both?</p>
            {modeButtonComponents}
            <p onClick={() => {console.log("yeah dawg");}}>Next</p>  
        {/* set up hovering styling for the word "Next" so it looks like a button */}
    </div>
    );
}
export default ModeForm;