import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';

const PopButton = ({ popOption, updatePop }) => {



    return (
        <div className="popularity_button">
            <button className='DJpop' onClick={() => {updatePop(popOption);}}>{popOption}</button>
        </div>
    );
}
export default PopButton;