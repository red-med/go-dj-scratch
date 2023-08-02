import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SpotifyLogin from './components/SpotifyLogin';

function App() {
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  let spotAuthURL = 'https://accounts.spotify.com/authorize?';
  let spotTokenURL = 'https://accounts.spotify.com/api/token';
  let accToken = "";

  function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  let state = generateRandomString(16);
  let scope = 'user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private';
  let show_dialog = true;
  let response_type = 'code';
  let args = new URLSearchParams({
    response_type: response_type,
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
    state: state,
    show_dialog: show_dialog
  });
  spotAuthURL += args;

  const parseCode = async () => {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code');
    }
    console.log('here is our code:', code);
    return code;
} 
  const handleRedirect = async () => {
    let code = await parseCode();
    console.log('here is what we pass to get token function:', code);
    accToken = await getAccessToken(code);
    console.log('here is our access token: ', accToken);
    window.history.pushState("","", REDIRECT_URI); //removes extra parameters from url bar
  }

  const getAccessToken = async (code) => {
    // console.log('here is the code we are passing in: ', code);
    let body = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI
      };
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (btoa(CLIENT_ID + ":" + CLIENT_SECRET))
    };
    axios.post(spotTokenURL, body, {headers: headers})
    .then((response) => {
      console.log('response:', response);
      console.log('response data:', response.data);
      accToken = response.data.access_token;
      console.log('within post request then section, token is: ', accToken);
      console.log('made it to calling API time. here is the token: ', accToken);
    })
    .catch((error) => {
      console.log('error:' , error);
    })
    console.log('this is what we return from getAT function:', accToken);
    return accToken;
  }
  const getAPI = (url) => {
    axios.get(url, {headers: {'Authorization': 'Bearer ' + accToken }})
    .then((response) => {
      console.log('response:', response);
      console.log('response data:', response.data);
    })
    .catch((error) => {
      console.log('error:' , error);
    })
    
  }
  const getArtist = () => {
    let id = '0TnOYISbd1XYRBk9myaseg';
    let endpoint = `https://api.spotify.com/v1/artists/${id}`;
    getAPI(endpoint);
  }

  const onPageLoad = async () => {
    if (window.location.search.length > 0) {
      accToken = await handleRedirect();
  
      if (accToken) {
        console.log('made it to calling API time. here is the token: ', accToken)
        getArtist();
      } else {
        console.log("probs an async issue!"); 
        // show some components/elements if accToken vs not. 
      }
    }
  }

  onPageLoad();



  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1>Go DJ!</h1>
        <h3>(That's my DJ)</h3>
        <p>
          This application takes in your preferences and creates an easy-to-mix playlist
          for you to start your DJ journey! 
        </p>
        {/* {<SpotifyLogin></SpotifyLogin>} */}
        <a
          className="Login-link"
          href={spotAuthURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Login to Spotify
        
        </a>
      </header>
    </div>
  );
}

export default App;
