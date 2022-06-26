import React from 'react';
import './trackList.css'
import {useSelector} from "react-redux";
import Track from "./track/Track";

const TrackList = (name) => {
    const tracks = useSelector(state => state.files.files).map(file => <Track key={file.id} track={file}/>)
    return (
        <div className='tracklist'>
            <div className="tracklist__header">{name.name}
            </div>
            {tracks}
        </div>
    );
};

export default TrackList;