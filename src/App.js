import './App.css';
import { GoogleFont } from 'react-google-fonts';
import axios from 'axios';
import React, { useState, useEffect, Suspense, lazy } from 'react';
// import SpotifyLogin from './components/SpotifyLogin';
import SongRecc from './components/SongRecc';
import Playlist from './components/Playlist';

const SettingForm = lazy(() => import('./components/SettingForm'));
const GenreForm = lazy(() => import('./components/GenreForm'));
const ModeForm = lazy(() => import('./components/ModeForm'))
const PopForm = lazy(() => import('./components/PopForm'))


const SETTING_OPTIONS = ["House Party", "Club", "Dinner Party", "Sad Girl Hours"]
const GENRE_OPTIONS = ["hip-hop", "pop", "r-n-b", "funk", "afrobeat", "bossanova", "deep-house","disco", "house", "indie", "indie-pop", "soul", "reggae", "reggaeton", "rock"]
const MODE_OPTIONS = ["major", "minor", "both"];
const POP_OPTIONS = ["obscure", "popular", "mix"];
const API_URL = "https://go-dj-api.onrender.com/start"

function App() {
  const [DJName, setDJName] = useState();
  const [DJData, setDJData] = useState();
  const [setting, setSetting] = useState();
  const [genres, setGenres] = useState(null);
  const [mode, setMode] = useState();
  const [popularity, setPopularity] = useState();
  const [reccData, setReccData] = useState([]);
  const [playlistData, setPlaylistData] = useState([]);
  const [patchyBody, setPatchyBody] = useState({});
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const fadeInStyle1 = {
    opacity: fadeIn ? 1 : 0,
    transition: 'opacity 1500ms linear'
  };
  const fadeInStyle2 = {
    opacity: fadeIn ? 1 : 0,
    transition: 'opacity 2500ms linear'
  };
  // const font = "'Permanent Marker', cursive";

  const handleName = (event) => {
    setDJName(event.target.value)
  }
  const createDJ = (event) => {
    event.preventDefault();
    console.log("made it to createDJ");
    const requestBody = {"name": `${DJName}`};
    axios.post(`${API_URL}`, requestBody)
      .then((result) => {
        console.log(result.data);
        setDJData(result.data.DJ);
        
      })
      .catch((err) => {console.log(err)});
      console.log(DJData);
  };
  // const getSongRecc = () => {
  //   const DJid = DJData[0].id;

  // }
  
  const updateSetting = (settingOption) => {
      setSetting(settingOption);
      console.log(setting);
    }

  const updateGenre = (genreSelected) => {
    if (genres === null) {
      setGenres(genreSelected);
      
    } else {
      setGenres(genres + ',' + genreSelected);
    }
      // setGenres(genres + ',' + genreSelected);
      console.log(genres);
      
  }  
  const updateMode = (selection) => {
    if (selection === "minor"){
      setMode(0);
    } else {
      setMode(1);
    }
    console.log(selection);
    console.log(mode);
  }
  const updatePop = (selection) => {
    if (selection === "obscure") {
      setPopularity(0.3)
    } else if (selection === "popular") {
      setPopularity(0.7);
    } else {
      setPopularity(0.5)
    }
    console.log(selection);
    console.log(popularity)
  }
  const settingtoQuery = () => {
    let settingData = {}
    if (setting === "House Party") {
      settingData = {
        "valence" : .65,
        "danceability" : .65,
        "energy" : .70
      };
      console.log("settingData is set on ", setting)
    } else if (setting === "Dinner Party") {
      settingData = {
        "valence" : .6,
        "danceability" : .5,
        "energy" : .6
      };
      console.log("settingData is set on ", setting)
    } else if (setting === "Sad Girl Hours") {
      settingData = {
        "valence" : .25,
        "danceability" : .30,
        "energy" : .25
      };
      console.log("settingData is set on ", setting)
    } else if (setting === "Club") {
      settingData = {
        "valence" : .70,
        "danceability" : .70,
        "energy" : .90
      };
      console.log("settingData is set on ", setting)
    } else {
      console.log("issue with setting!");
    }
    console.log("here is the current value of settingData: ", settingData);
    return settingData
  }
  const genretoQuery = () => {
    //maybe not needed?
  }
  const quizToQuery = async () => {
    //return to this once all query functions are done. not yet passed down.
    
    let firstQuery = {}
    const settingResult = settingtoQuery();
    for (const [key, value] of Object.entries(settingResult)) {
        firstQuery[key] = value;
    }
    firstQuery["market"]="US";
    firstQuery["limit"] = 1;
    firstQuery["seed_genres"] = genres;
    firstQuery["max_mode"] = mode;
    firstQuery["popularity"] = popularity;
    setPatchyBody(firstQuery);
    console.log(patchyBody);
    await axios.patch(`${API_URL}/${DJData.id}`, firstQuery)
      .then((result) => {
        console.log(result.data);
        setReccData(result.data);
    
      })
      .catch((err) => {
        console.log(err)
      })
  } 

  const handleReccResponse = (selection) => {
    if (selection === 1) {
      quizToPlaylist(reccData.song_id);
      return (<p> Great! We will use this track's data to get the best playlist for you.</p>)
    } else if (selection === 0) {
      quizToQuery();
      return (
        <div>
        <p> Okay, how about this one? </p> 
        <SongRecc reccData={reccData} handleReccResponse={handleReccResponse}></SongRecc>
        </div>)
    }
  }  

  const quizToPlaylist = async (songID) => {
    
    const newPatchyBody = {...patchyBody};
    newPatchyBody["limit"] = 10;
    newPatchyBody["seed_tracks"] = songID;
    console.log(newPatchyBody);
    setPatchyBody(newPatchyBody);
    await axios.patch(`${API_URL}/${DJData.id}`, newPatchyBody)
      .then((result) => {
        console.log("here is our result.data: ", result.data);
        setPlaylistData(result.data);
        console.log("playlistData:", playlistData);
      })
      .catch((err) => {
        console.log(err)
      })
  
    console.log("playlistData:", playlistData);
  }
  // const renderPlaylist = () => {
  //   return playlistData.map(trackInfo => {

  //   })
  // }
  
  const showNextForm = (nextFormFunc) => {
    // what do I want to do here? maybe instead of including this "NEXT" button 
    // in very form component I should have a separate component I can just call
    // again and again? 
    console.log("I'll put this here for now");
  }

  return (
    <div className="App">
      <header className="App-header">
        
        <h1 style={fadeInStyle1}>Go DJ!</h1>
        <h2 style={fadeInStyle2}>(That's my DJ)</h2>
        
      </header>
      <main className="main-page-body">
          <p className='info'>
            This application takes in your preferences and creates an easy-to-mix playlist
            for you to start your DJ journey! 
          </p>
        
          <form onSubmit={createDJ}>
            <p>Enter your DJ name to start: </p>
            <div className='name_input'>
            <input className="name-textbox" type="text" onChange={handleName} name="name"></input>
            <button className="name_submit_button" type={"submit"}>Submit</button>
            </div>
          </form>
          
          <div>
            <p></p>
          </div>
          {/* {<SpotifyLogin></SpotifyLogin>} */}
          {/* <a
            className="Login-link bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded focus:outline-none focus:shadow-outline"
            href='https://accounts.spotify.com/authorize?'
            target="_blank"
            rel="noreferrer"
            type="button"
          >
            Login to Spotify
          
          </a> */}
          {DJData && (
          <form className="pref_questions" onSubmit={(event) => {event.preventDefault(); quizToQuery();}}>
            <Suspense fallback={<p>Loading...</p>}>
              <h2> </h2>
              <SettingForm setting={setting} settingOptions={SETTING_OPTIONS} updateSetting={updateSetting} settingtoQuery={settingtoQuery}></SettingForm>
            </Suspense>

            {setting && (<Suspense fallback={<p>Loading...</p>}>
              <h2> </h2>
              <GenreForm genres={genres} genreOptions={GENRE_OPTIONS} updateGenre={updateGenre} genretoQuery={genretoQuery}></GenreForm>
            </Suspense>)}

            {genres && (<Suspense fallback={<p>Loading...</p>}>
              <h2> </h2>
              <ModeForm mode={mode} modeOptions={MODE_OPTIONS} updateMode={updateMode}></ModeForm>
            </Suspense>)}

            {(mode === 1 || mode === 0) && (<Suspense fallback={<p>Loading...</p>}>
              <h2> </h2>
              <PopForm popularity={popularity} popOptions={POP_OPTIONS} updatePop={updatePop}></PopForm>
            </Suspense>)}
            {popularity && (<button type={"submit"}>Submit</button>)}
            <div>
              <p></p>
            </div>
          </form>)}

          {reccData.artist ? (<Suspense fallback={<p>Loading suggestion...</p>}>
              <h2> </h2>
              <SongRecc reccData={reccData} handleReccResponse={handleReccResponse}></SongRecc>
            </Suspense>) : <p></p>}
          <div>
          {(playlistData.length > 0) && (<Suspense fallback={<p>Loading suggestions...</p>}>
              <h2> Here is your playlist: </h2>
              <div className='all_playlist_tracks'>
                <Playlist playlistData={playlistData}></Playlist>
              </div>
            </Suspense>)}
          </div>

          
      </main>
    </div>
  );
}

export default App;
