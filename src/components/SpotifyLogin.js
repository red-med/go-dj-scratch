import React from 'react';
import axios from 'axios';
// import {fs} from 'fs';

// MAY NOT USE THIS AT ALL ANYMORE - WILL COME BACK TO IT AS A REACH GOAL
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;


const SpotifyLogin = (props) => {
    function generateRandomString(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    const handleAuth = async () => {
        localStorage.clear();
        console.log(REDIRECT_URI, CLIENT_ID, CLIENT_SECRET);
        let spotAuthURL = 'https://accounts.spotify.com/authorize?'
    
        let state = generateRandomString(16);
        let scope = 'user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private';
        let show_dialog = true;
        let args = new URLSearchParams({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state,
            show_dialog: show_dialog
        });

        spotAuthURL += args;
        // TAKE USER TO SPOTIFY'S LOGIN AND PERMISSIONS PAGE
        window.location.href = spotAuthURL;
        

            // console.log("Made it to this point with code and state returned.");
            // console.log(code);
            // let body = new URLSearchParams({
            // grant_type: 'authorization_code',
            // code: code,
            // redirect_uri: REDIRECT_URI
            // });

            // console.log(code, body);
        

    }
    return (<button onClick={handleAuth}>Log into Spotify to start! FR!! </button>);

}

export default SpotifyLogin;