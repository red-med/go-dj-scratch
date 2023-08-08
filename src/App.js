import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SpotifyLogin from './components/SpotifyLogin';
import SettingForm from './components/SettingForm';
import SettingButton from './components/SettingButton';

const SETTING_OPTIONS = ["House Party", "Club", "Dinner Party", "Sad Girl Hours"]

function App() {
  const [setting, setSetting] = useState("");
  
  const updateSetting = (settingOption) => {
      setSetting(settingOption);
      console.log(setting);
    }
  const settingtoQuery = () => {
    let settingData = {}
    if (setting === "House Party") {
      settingData = {
        "valence" : .65,
        "danceability" : .65
      };
      console.log("settingData is set on ", setting)
    } else if (setting === "Dinner Party") {
      settingData = {
        "valence" : .55,
        "danceability" : .5
      };
      console.log("settingData is set on ", setting)
    } else if (setting === "Sad Girl Hours") {
      settingData = {
        "valence" : .25,
        "danceability" : .30
      };
      console.log("settingData is set on ", setting)
    } else if (setting === "Club") {
      settingData = {
        "valence" : .70,
        "danceability" : .70
      };
      console.log("settingData is set on ", setting)
    } else {
      console.log("issue with setting!");
    }
    // how do I want to set this up? I want to return these values so 
    // that I can eventually combine them to make a whole request body,
    // which will be an object. so maybe return an onject and then look
    // up how to iterate over it JS to add each pair to bigger object. 
    console.log("here is the current value of settingData: ", settingData);
    return settingData
  }
  const quizToQuery = (settingtoQuery) => {
    //return to this once all query functions are done. not yet passed down.
    let patchyBody = {};
    const settingResult = settingtoQuery()
    for (const [key, value] of Object.entries(settingResult)) {
        patchyBody[key] = value;
    }
    console.log(patchyBody)
  }
  const showNextForm = (nextFormFunc) => {
    // what do I want to do here? maybe instead of including this "NEXT" button 
    // in very form component I should have a separate component I can just call
    // again and again? 
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={Gradient} className="App-logo" alt="logo" /> */}
        <h1>Go DJ!</h1>
        <h3>(That's my DJ)</h3>
      </header>
      <main className="main-page-body">
          <p>
            This application takes in your preferences and creates an easy-to-mix playlist
            for you to start your DJ journey! 
          </p>
          {/* {<SpotifyLogin></SpotifyLogin>} */}
          <a
            className="Login-link bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded focus:outline-none focus:shadow-outline"
            href='https://accounts.spotify.com/authorize?'
            target="_blank"
            rel="noreferrer"
            type="button"
          >
            Login to Spotify
          
          </a>
          <SettingForm setting={setting} settingOptions={SETTING_OPTIONS} updateSetting={updateSetting} settingtoQuery={settingtoQuery}></SettingForm>
      </main>
    </div>
  );
}

export default App;
