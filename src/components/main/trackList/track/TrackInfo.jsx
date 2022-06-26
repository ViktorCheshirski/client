import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { setTrackInfoDisplay } from '../../../../reducers/fileReducer';
import './track.css'

const TrackInfo = () => {
    const track = useSelector(state => state.files.trackToDisplay)
    const isAuth = useSelector(state=> state.user.isAuth)
    const dispatch = useDispatch();

    function xHandler(){
        dispatch(setTrackInfoDisplay(""));
    }

    function addHandler(){
        alert("Button doesn't work yet!");
    }
    
    if (track!==""){
    return(
        <div className="trackInfo__container">
            <img src={track.image} alt="" className="track__cover"></img>
            <div className="trackInfo__title">{track.title}</div>
            <div className="trackInfo__artist">{track.artist}</div>
            <div className='trackInfo__buttons'>
                <button className="trackInfo__button" onClick={xHandler}>x</button>
                {isAuth ? <button className="trackInfo__button" onClick={addHandler}>Добавить в коллекцию</button>: <></>}
            </div>
        </div>
    )} else {
        return (
            <div className='empty'></div>
        )
    }
};

export default TrackInfo;