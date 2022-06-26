import React from 'react';
import { ReactComponent as Play } from '../../../../assets/play.svg';
import {useDispatch, useSelector} from "react-redux";
import './track.css'
import {setTrackInfoDisplay, setTrackToPlay} from "../../../../reducers/fileReducer";

const Track = ({track}) => {
    const tr = useSelector(state => state.files.trackToDisplay)
    const dispatch = useDispatch()

    function onClickHandler(){
        dispatch(setTrackInfoDisplay(track));
    }

    function onPlayHandler(){
        dispatch(setTrackToPlay(track));
    }

    return (
        <div className='track'>
            <img src= {track.image} alt="" className="track__img" onClick={(e)=>onPlayHandler(e)}/>
            <div className='play__button' onClick={(e)=>onPlayHandler()}><Play/></div>
            <div className='track__info' onClick={()=>onClickHandler()}>
                <div className="title">{track.title}</div>
                <div className="artist">{track.artist}</div>
            </div>
        </div>
    );
};

export default Track;