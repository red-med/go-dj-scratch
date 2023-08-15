import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';

const SongRecc = ({reccData, handleReccResponse }) => {

    let songClip = new Audio(reccData.song_preview);
    let feedback = null;
    const art = reccData.album_art.url;
    
    const play = () => {
        songClip.play();
    }
    
    const pause = () => {
        songClip.pause();
    }

    return (
        <div>
            {(feedback === null) && 
            <div>
            <p>Thanks for that info! Quick vibe check...</p>
            <p>How do we feel about this track?</p> 
            </div>}
            <div> 
                {reccData.album_art && <img src={art} width={reccData.album_art.width} height={reccData.album_art.height} alt="Album Art"></img>}
                {/* {reccData.album_art.length ? <img src={art} width={reccData.album_art.width} height={reccData.album_art.height} alt="Album Art"></img> : <p>No Art Available</p>} */}
                <p>Suggested Track: {reccData.song_title} by {reccData.artist}</p>
                {reccData.song_preview && <button onClick={play}>Play Preview</button>}
                {reccData.song_preview && <button onClick={pause}>Pause Preview</button>}
            </div>
            <p>Are we on the right... track?</p>
            <button onClick={() => {feedback = 1; handleReccResponse(feedback);}}> Yeah, I like this! </button>
            <button onClick={() => {feedback = 0; handleReccResponse(feedback);}}> Nah, try again. </button>
        </div>
    )
} 
export default SongRecc;