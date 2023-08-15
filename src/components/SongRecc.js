import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';

const SongRecc = ({reccData}) => {

    const play = () => {
        new Audio(reccData.song_preview).play();
    }
    const art = reccData.album_art.url;

    return (
        <div>
            <p>Thanks for that info! Quick vibe check...</p>
            <p>How do we feel about this track?</p>
            <div>
                {reccData.album_art && <img src={art} width={reccData.album_art.width} height={reccData.album_art.height} alt="Album Art"></img>}
                {/* {reccData.album_art.length ? <img src={art} width={reccData.album_art.width} height={reccData.album_art.height} alt="Album Art"></img> : <p>No Art Available</p>} */}
                <p>Suggested Track: {reccData.song_title} by {reccData.artist}</p>
                {reccData.song_preview && <button onClick={play}>Play Preview</button>}
            </div>
        </div>
    )
} 
export default SongRecc;