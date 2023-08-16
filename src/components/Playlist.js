import React from 'react';
import axios from 'axios';
import { useState } from 'react';


const Playlist = ({playlistData}) => {
    console.log("here is playlistData:", playlistData);
    const playlistTracks = playlistData.map(trackInfo => {
        let art = trackInfo.album_art.url;
        let songClip = new Audio(trackInfo.song_preview);
        const play = () => {
            songClip.play();
        }
        const pause = () => {
            songClip.pause();
        }
    return ( 
    
        <div className='track'>
            {trackInfo.album_art && <img src={art} width={trackInfo.album_art.width} height={trackInfo.album_art.height} alt="Album Art"></img>}
            <p>Suggested Track: {trackInfo.song_title} by {trackInfo.artist}</p>
                {trackInfo.song_preview && <button onClick={play}>Play Preview</button>}
                {trackInfo.song_preview && <button onClick={pause}>Pause Preview</button>}
            <p></p>
        </div>
        )})
    return (playlistTracks)
}
export default Playlist;