import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';

const ModeButton = ({ modeOption, updateMode }) => {



    return (
        <div className="mode_button">
            <button className='DJmodes' onClick={() => {updateMode(modeOption);}}>{modeOption}</button>
        </div>
    );
}
export default ModeButton;