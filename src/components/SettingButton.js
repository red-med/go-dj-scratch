import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';

const SettingButton = ({setting, settingOption, updateSetting}) => {
// some planning for this component: will have multiple of these buttons on display in one single page.
// user will select one from all of these. that information will be stored to evaluate DANCEABILITY and VALENCE
// this means this in the presentaional component will be rendered within a SettingForm container component 
//props passed into SettingFrom from App  will include button selection options so that I can have the same layout for each button, only pass in the phrase I want.


//props.settingOption = "Dance Party", to be passed in from SettingForm
//for now we will define that here and then lift it up to App. 
//setting and setSetting wil be handled as state in App but for now we will put it here. 

    

    return (
        <div className="'DJ_setting_button'">
            <button className='DJsetting' onClick={(event) => {event.preventDefault(); updateSetting(settingOption);}}>{settingOption}</button>
        </div>
    );
};

export default SettingButton;