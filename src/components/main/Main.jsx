import './main.css'
import React from 'react';
import {useDispatch} from "react-redux";
import { getFiles } from '../../actions/file';
import TrackList from "./trackList/TrackList";
import TrackInfo from './trackList/track/TrackInfo';
import Autorization from '../autorization/Autorization';


const Main = () => {
    const dispatch = useDispatch()
    
    dispatch(getFiles(0))
    return (
        <div className="main">
            <div className='main__header'></div>
            <Autorization/>
            <TrackList name = "Популярные треки всех времён"/>
            <TrackInfo/>
        </div>
    );
};

export default Main;