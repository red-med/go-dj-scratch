import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import SettingButton from './SettingButton';
import PropTypes from 'prop-types';

const SettingForm = ({setting, settingtoQuery, settingOptions, updateSetting, showNextForm}) => {
    
    const settingButtonComponents = settingOptions.map(settingOption => {
        return (<SettingButton className='select_DJ_setting' settingOption={settingOption} updateSetting={updateSetting} >{settingOption}</SettingButton>);
    });

    return (
        <div className="'DJ_setting_form'">
            <p>Which of the following best describes the occasion for your set? Please choose one.</p>
            {settingButtonComponents}
            <p onClick={() => {settingtoQuery();}}>Next</p> 
            {/* set up hovering styling for the word "Next" so it looks like a button */}
        </div>
    );

}

SettingForm.propTypes = {
    setting: PropTypes.string,
    settingOptions: PropTypes.array,
    updateSetting: PropTypes.func,
}

export default SettingForm;